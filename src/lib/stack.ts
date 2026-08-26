/**
 * The stack taxonomy — the one place the sections are defined.
 *
 * `src/content.config.ts` builds the Zod schema from this list, so a section
 * added here becomes a valid frontmatter key everywhere at once, and a key an
 * app file invents that isn't here fails the build by name. The order below is
 * the order sections render in, on the case study page and on /stack.
 *
 * Deciding where something goes:
 * - `integrations` vs `observability` — would the product break for its users
 *   if this vendor went down? Yes: integrations. No: observability.
 * - `data` owns migrations too, so "what's the ORM" and "how do migrations
 *   run" stay next to each other.
 * - Scheduled jobs live in `hosting`, as deployment topology
 *   ("Railway — web + cron service + Postgres"), not a section of their own.
 */
export const STACK_SECTIONS = [
  { key: 'language', label: 'Language' },
  { key: 'framework', label: 'Framework & UI' },
  { key: 'data', label: 'Data' },
  { key: 'auth', label: 'Auth & Identity' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'hosting', label: 'Hosting & Infra' },
  { key: 'testing', label: 'QA & Testing' },
  { key: 'tooling', label: 'Dev Tooling' },
  { key: 'ci', label: 'CI & Delivery' },
  { key: 'observability', label: 'Observability' },
] as const;

export type StackSectionKey = (typeof STACK_SECTIONS)[number]['key'];

/** The shape `stack` takes once the schema has applied its defaults. */
export type Stack = Record<StackSectionKey, string[]>;

/**
 * Value conventions, applied by the frontmatter author rather than enforced:
 * - version inline when it matters — `Next.js 16.3`, `Tailwind v4`, but plain
 *   `npm` and `Prettier`
 * - em dash for the role qualifier — `Playwright — e2e`, `Astro 5 — static`.
 *   This is what lets one section hold `Playwright — e2e` and
 *   `Playwright — screenshots` as distinct entries instead of splitting into
 *   sub-sections.
 * - `~` prefix for intended-but-not-wired-up — `~Sentry — errors`. Rendered
 *   dimmed, so the page is useful as a working dashboard without claiming
 *   something that isn't there yet.
 */
export interface StackItem {
  /** Display text, with the `~` marker stripped. */
  label: string;
  /** True when the entry was prefixed with `~`. */
  planned: boolean;
}

const toItem = (raw: string): StackItem => {
  const planned = raw.startsWith('~');
  return { label: planned ? raw.slice(1).trim() : raw, planned };
};

export interface StackSection {
  key: StackSectionKey;
  label: string;
  items: StackItem[];
}

/**
 * Sections in taxonomy order. `includeEmpty: true` keeps the sections an app
 * has nothing for — which is what the /stack matrix wants, since a blank
 * Observability cell is real signal rather than missing data. The case study
 * page leaves it false and shows only what the app actually has.
 */
export function stackSections(stack: Stack, includeEmpty = false): StackSection[] {
  return STACK_SECTIONS.map(({ key, label }) => ({
    key,
    label,
    items: (stack[key] ?? []).map(toItem),
  })).filter((section) => includeEmpty || section.items.length > 0);
}

/** True when an app has declared anything at all. */
export const hasStack = (stack: Stack): boolean =>
  STACK_SECTIONS.some(({ key }) => (stack[key] ?? []).length > 0);
