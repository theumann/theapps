import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { STACK_SECTIONS, type Stack, type StackSectionKey } from './lib/stack';

/**
 * One array per section of the taxonomy in `src/lib/stack.ts`, every one
 * optional and defaulting to empty — an app with no database just omits
 * `data:`. `.strict()` is what turns a section key an app file invented
 * (`qa:` for `testing:`) into a build failure naming the file and the key,
 * rather than a section that silently renders empty.
 *
 * Built from the list rather than written out so the two can't drift. Both
 * casts undo what `Object.fromEntries` widens: it loses the literal keys, and
 * TypeScript can't see that every one of them has been supplied.
 */
const sectionField = () => z.array(z.string()).default([]);

const stackSchema = z
  .object(
    Object.fromEntries(STACK_SECTIONS.map(({ key }) => [key, sectionField()])) as Record<
      StackSectionKey,
      ReturnType<typeof sectionField>
    >,
  )
  .strict();

/** `stack:` omitted entirely means every section empty, not a missing field. */
const emptyStack: Stack = STACK_SECTIONS.reduce(
  (acc, { key }) => ({ ...acc, [key]: [] }),
  {} as Stack,
);

/**
 * One file per app. The body is the case study; the frontmatter drives the
 * card on the homepage. Adding an app is adding a file here — nothing else.
 */
const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: ({ image }) =>
    z.object({
      /** Display name as the app writes it, e.g. "WhosIn". Not the route — that comes from the filename. */
      name: z.string(),
      /** The domain it lives at, e.g. "whosin.team". Shown under the name. */
      domain: z.string().optional(),
      /** One line. Shown on the card. */
      tagline: z.string(),
      /** Live = shipped and usable. Building = in progress. Planned = not started. */
      status: z.enum(['live', 'building', 'planned']),
      /** Public URL, if there is one to link to yet. */
      url: z.string().url().optional(),
      /** Logo image, relative to this file, e.g. ../../assets/foo_logo.png. Replaces the name where shown, linking out to `url`. */
      logo: image().optional(),
      /** One line on where the project stands, shown next to the Status heading on the case study page (in place of a "## Status" section in the body). */
      statusNote: z.string().optional(),
      /** Tech worth naming, grouped by section. Shown on the case study page and /stack. See src/lib/stack.ts for the sections and the value conventions. */
      stack: stackSchema.default(emptyStack),
      /** Lower sorts first on the homepage. */
      order: z.number().default(100),
      /** Set true to hide from the site entirely — no card, no case study, not on /stack. */
      draft: z.boolean().default(false),
      /** Set true for an app that's real but shouldn't take a homepage card: it keeps its case study and its /stack column. This site's own entry is the case. */
      unlisted: z.boolean().default(false),
    }),
});

export const collections = { apps };
