import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects collection.
 * Add one Markdown file per project under `src/content/projects/`.
 * The listing page (`/projects`) and each detail page are generated automatically.
 * Copy `_template.md` to start a new one.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Optional external links shown on the card / detail page.
    link: z.string().url().optional(), // live demo / product
    repo: z.string().url().optional(), // source code
    featured: z.boolean().default(false), // surfaced on the home page
    draft: z.boolean().default(false), // hidden from listings while true
  }),
});

/**
 * Blog structure prepared for future use (per CLAUDE.md).
 * Add Markdown under `src/content/blog/` and build a listing page when ready.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
