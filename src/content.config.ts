import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog structure prepared for future use (per CLAUDE.md).
 * Add Markdown files under `src/content/blog/` and build a listing page
 * (e.g. `src/pages/blog/index.astro`) when ready.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
