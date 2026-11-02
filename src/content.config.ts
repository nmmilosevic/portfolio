import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per project in src/content/projects.
// The frontmatter is the data, the markdown body is the intro text.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      kind: z.string(),
      summary: z.string(),
      card: z.string(),
      years: z.coerce.string(),
      period: z.string(),
      domain: z.string(),
      role: z.string(),
      current: z.boolean().default(false),
      // Real colours from the product, for the project name on hover: one readable on grey, one on black.
      brand: z.object({ onGrey: z.string(), onBlack: z.string() }),
      cover: image(),
      coverAlt: z.string(),
      // Where the card sits on the 12-column grid of the home page.
      place: z.object({ start: z.number(), span: z.number() }),
      owned: z.array(z.string()),
      team: z.string(),
      results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      tags: z.array(z.string()),
      chapters: z.array(
        z.object({
          title: z.string(),
          text: z.array(z.string()),
          video: z.string().optional(),
          media: z.array(z.object({ src: image(), alt: z.string() })),
        }),
      ),
    }),
});

export const collections = { projects };
