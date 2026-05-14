// Proxy worker for libertaria.blog -> libertaria-blog.pages.dev
// Works around Cloudflare Pages rejecting .blog TLD for custom domains

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Rewrite the host to point to the Pages deployment
    const targetUrl = new URL(url.pathname + url.search, 'https://libertaria-blog.pages.dev');
    
    // Clone the request with the new target
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    
    // Fetch from Pages
    const response = await fetch(modifiedRequest);
    
    // Clone response so we can modify headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    
    // Add CORS and security headers
    modifiedResponse.headers.set('X-Proxy-By', 'libertaria-blog-proxy');
    
    return modifiedResponse;
  },
};
