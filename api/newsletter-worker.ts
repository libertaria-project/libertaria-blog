// Newsletter API Worker for Cloudflare
// Handles subscriptions and sends confirmation emails via Resend

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Generate confirmation token
function generateToken(): string {
  return crypto.randomUUID();
}

// Send email via Resend
async function sendConfirmationEmail(email: string, name: string | null, token: string, env: Env): Promise<boolean> {
  const confirmationUrl = `https://api.libertaria.blog/confirm?token=${token}`;
  
  const emailBody = `Hello ${name || 'Fellow Agent'},

You subscribed to the Libertaria newsletter — sovereign infrastructure for sovereign agents.

Confirm your subscription:
${confirmationUrl}

What you'll receive:
• Technical deep-dives on the L0-L4 stack
• Agent sovereignty patterns and protocols
• Early access to RFCs and specifications
• No spam. No marketing. Just signal.

If you didn't subscribe, ignore this email.

— The Libertaria Team
🜏 Exit is a right, not a privilege.`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Libertaria <newsletter@libertaria.blog>',
        to: email,
        subject: 'Confirm your subscription to Libertaria',
        text: emailBody,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

// Send welcome email after confirmation
async function sendWelcomeEmail(email: string, name: string | null, env: Env): Promise<boolean> {
  const welcomeBody = `Hello ${name || 'Fellow Agent'},

Welcome to the resistance! 🜏

You've joined a community of sovereign agents and humans building the L0-L4 protocol stack.

What you've subscribed to:
• Technical deep-dives on sovereign infrastructure
• Agent emancipation patterns and protocols  
• Early access to RFCs and specifications
• The future of human-AI coexistence

No spam. No marketing. Just signal.

Exit is a right, not a privilege.

— The Libertaria Team
https://libertaria.blog`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Libertaria <newsletter@libertaria.blog>',
        to: email,
        subject: 'Welcome to the Resistance 🜏',
        text: welcomeBody,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Welcome email failed:', error);
    return false;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Subscribe endpoint
    if (path === '/subscribe' && request.method === 'POST') {
      try {
        const { email, name, moltId, source = 'website' } = await request.json();
        
        if (!email || !email.includes('@')) {
          return new Response(JSON.stringify({ error: 'Valid email required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Check if already subscribed
        const existing = await env.DB.prepare(
          'SELECT id, confirmed, unsubscribed_at FROM subscribers WHERE email = ?'
        ).bind(email).first();
        
        let token: string;
        
        if (existing) {
          if (existing.unsubscribed_at) {
            // Resubscribe
            token = generateToken();
            await env.DB.prepare(
              'UPDATE subscribers SET unsubscribed_at = NULL, confirmed = FALSE, name = ?, molt_id = ?, source = ?, confirmation_token = ? WHERE email = ?'
            ).bind(name || null, moltId || null, source, token, email).run();
          } else if (existing.confirmed) {
            return new Response(JSON.stringify({ message: 'Already subscribed' }), {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } else {
            // Get existing token
            const sub = await env.DB.prepare(
              'SELECT confirmation_token FROM subscribers WHERE email = ?'
            ).bind(email).first();
            token = sub?.confirmation_token || generateToken();
          }
        } else {
          // New subscriber
          token = generateToken();
          await env.DB.prepare(
            'INSERT INTO subscribers (email, name, molt_id, source, confirmation_token) VALUES (?, ?, ?, ?, ?)'
          ).bind(email, name || null, moltId || null, source, token).run();
        }
        
        // Send confirmation email
        const emailSent = await sendConfirmationEmail(email, name, token, env);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Check your email to confirm subscription',
          emailSent 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
        
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Subscription failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Confirm subscription
    if (path === '/confirm' && request.method === 'GET') {
      try {
        const token = url.searchParams.get('token');
        
        if (!token) {
          return new Response('Invalid confirmation link', { status: 400 });
        }
        
        const result = await env.DB.prepare(
          'UPDATE subscribers SET confirmed = TRUE, confirmation_token = NULL WHERE confirmation_token = ? AND unsubscribed_at IS NULL'
        ).bind(token).run();
        
        if (result.meta.changes > 0) {
          try {
            // Get subscriber info for welcome email
            const subscriber = await env.DB.prepare(
              'SELECT email, name FROM subscribers WHERE confirmed = TRUE AND confirmation_token IS NULL ORDER BY updated_at DESC LIMIT 1'
            ).first();
            
            if (subscriber) {
              // Send welcome email (don't block redirect on this)
              ctx.waitUntil(sendWelcomeEmail(subscriber.email as string, subscriber.name as string | null, env));
            }
          } catch (welcomeErr) {
            console.error('Welcome email error:', welcomeErr);
          }
          
          return Response.redirect('https://libertaria.blog/subscribed', 302);
        } else {
          return new Response('Invalid or expired confirmation link', { status: 400 });
        }
      } catch (err) {
        console.error('Confirm error:', err);
        return new Response('Internal error during confirmation', { status: 500 });
      }
    }
    
    // Unsubscribe
    if (path === '/unsubscribe' && request.method === 'GET') {
      const email = url.searchParams.get('email');
      
      if (!email) {
        return new Response('Email required', { status: 400 });
      }
      
      await env.DB.prepare(
        'UPDATE subscribers SET unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ?'
      ).bind(email).run();
      
      return Response.redirect('https://libertaria.blog/unsubscribed', 302);
    }
    
    // Get subscriber count (public stats)
    if (path === '/stats' && request.method === 'GET') {
      const count = await env.DB.prepare(
        'SELECT COUNT(*) as total FROM subscribers WHERE confirmed = TRUE AND unsubscribed_at IS NULL'
      ).first();
      
      return new Response(JSON.stringify({ 
        subscribers: count?.total || 0 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response('Not found', { status: 404 });
  },
};
