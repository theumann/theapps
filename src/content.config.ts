import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One file per app. The body is the case study; the frontmatter drives the
 * card on the homepage. Adding an app is adding a file here — nothing else.
 */
const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: z.object({
    /** Display name, e.g. "whosin". */
    name: z.string(),
    /** The domain it lives at, e.g. "whosin.team". Shown under the name. */
    domain: z.string().optional(),
    /** One line. Shown on the card. */
    tagline: z.string(),
    /** Live = shipped and usable. Building = in progress. Planned = not started. */
    status: z.enum(['live', 'building', 'planned']),
    /** Public URL, if there is one to link to yet. */
    url: z.string().url().optional(),
    /** Tech worth naming. Shown on the case study page. */
    stack: z.array(z.string()).default([]),
    /** Lower sorts first on the homepage. */
    order: z.number().default(100),
    /** Set true to hide from the site without deleting the file. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { apps };
