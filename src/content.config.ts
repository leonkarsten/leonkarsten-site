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
  /** optional card picture under /public, 4:3, e.g. /play/<slug>/card.png */
  image: z.string().optional(),
  /** a game whose cabinet on the Games page runs the game itself (?cabinet) */
  live: z.boolean().optional(),
  /** optional source repo */
  repo: z.string().url().optional(),
  version: z.string().optional(),
  updated: z.coerce.date().optional(),
  /** tags like "2 player", "keyboard" */
  tags: z.array(z.string()).default([]),
  /** how to use it, in a few short steps, shown on the tool page */
  steps: z.array(z.string()).optional(),
  /**
   * what a multi-chart tool can make, one entry per chart, in plain words.
   * Sankey Studio's copy comes from its own src/charts.js; change both together.
   */
  charts: z
    .array(
      z.object({
        name: z.string(),
        /** small inline SVG of the chart, our own markup (from the app's charts.js) */
        art: z.string().optional(),
        line: z.string(),
        analogy: z.string(),
        useWhen: z.string(),
        youGet: z.string(),
        sheet: z.string(),
      })
    )
    .optional(),
  /** on the way, named so nobody goes looking for them yet */
  coming: z.array(z.string()).optional(),
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
