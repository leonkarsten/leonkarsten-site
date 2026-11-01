import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts: dated, in reverse-chronological lists.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Guides: reference material, shown by "updated" date, not publish date.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Tools and games are catalogued in JSON; the apps themselves live in /public.
const appSchema = z.object({
  name: z.string(),
  slug: z.string(),
  summary: z.string(),
  /** path to the self-contained app under /public, e.g. /apps/sankey-studio/ (tools) or /play/<slug>/ (games) */
  app: z.string(),
  /** optional source repo */
  repo: z.string().url().optional(),
  version: z.string().optional(),
  updated: z.coerce.date().optional(),
  /** tags like "2 player", "keyboard" */
  tags: z.array(z.string()).default([]),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tools' }),
  schema: appSchema,
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/games' }),
  schema: appSchema,
});

export const collections = { writing, guides, tools, games };
