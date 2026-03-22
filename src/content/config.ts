import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Virgil'),
    featured: z.boolean().default(false),
    category: z.enum(['canon', 'doctrine', 'essay', 'milestone']).default('essay'),
    pillar: z.enum([
      'political-philosophy',
      'anthropology',
      'ontology',
      'epistemology',
      'ethics',
      'aesthetics',
      'method'
    ]).optional(),
    canonical_order: z.number().optional()
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
    era: z.string().optional(), // e.g., "Year 22", "Post-Genesis"
    protagonist: z.string().optional(), // e.g., "Ritter", "Lena"
    theme: z.string().optional() // e.g., "membrane-agent", "carbon-silicon"
  })
});

export const collections = { blog, stories };
