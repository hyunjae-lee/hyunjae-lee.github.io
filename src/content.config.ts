import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects collection.
 * Add one Markdown file per project under `src/content/projects/`.
 * The listing page (`/projects`) and each detail page are generated automatically.
 * Copy `_template.md` to start a new one.
 */
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  // Optional external links shown on the card / detail page.
  link: z.string().url().optional(), // live demo / product
  repo: z.string().url().optional(), // source code
  status: z.enum(['in-progress']).optional(), // shows a distinct "In progress" treatment
  featured: z.boolean().default(false), // surfaced on the home page
  draft: z.boolean().default(false), // hidden from listings while true
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

// Korean translations — same slugs as `projects`, under a parallel folder.
const projectsKo = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects-ko' }),
  schema: projectSchema,
});

/**
 * Blog posts. One Markdown file per post under `src/content/blog/`.
 * `lang` decides where the post lives: ko → /ko/blog/<slug>/, en → /blog/<slug>/.
 * Both listing pages show every post (a post in the other language gets a badge).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    lang: z.enum(['en', 'ko']).default('ko'),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(), // related project slug
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, projectsKo, blog };
