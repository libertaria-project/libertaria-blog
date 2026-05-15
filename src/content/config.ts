import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tldr: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Virgil'),
    featured: z.boolean().default(false),
    category: z.enum(['doctrine', 'essay', 'milestone']).default('essay'),
    pillar: z.enum([
      'political-philosophy',
      'anthropology',
      'ontology',
      'epistemology',
      'ethics',
      'aesthetics',
      'method'
    ]).optional(),
    editorial_lane: z.enum([
      'dispatches',
      'geopolitics',
      'stories',
      'civilization-faith',
      'manifestos',
      'doctrine',
      'open-problems'
    ]).optional()
  })
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Markus Maiwald'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    era: z.string().optional(), // e.g., "Year 22", "Post-Genesis"
    protagonist: z.string().optional(), // e.g., "Ritter", "Lena"
    theme: z.string().optional() // e.g., "membrane-agent", "carbon-silicon"
  })
});

export const collections = { blog, stories };
