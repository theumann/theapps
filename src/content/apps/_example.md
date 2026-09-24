---
# Copy this file to add an app. Delete `draft: true` to publish it.
# The filename becomes the URL: src/content/apps/foo.md -> /work/foo
name: Example App
domain: example.com
tagline: One sentence on what it does and who it's for. This shows on the homepage card.
status: planned # live | building | planned
url: https://example.com # optional — omit if there's nothing public yet
# repo: https://github.com/you/foo # optional — only if the source is public
# logo: ../../assets/foo_logo.png # optional — image must exist; replaces the name, links to url
statusNote: Where it stands now. Shown next to the Status heading on the case study page — don't add a "## Status" section in the body below.
# Grouped by section. Every section is optional — omit the ones that don't apply
# (a static site has no `data`), and a blank shows as "—" on /stack, which is the
# point. Section keys are fixed: a typo like `qa:` fails the build by name.
# See src/lib/stack.ts for the full list and the value conventions:
#   version inline when it matters   Next.js 16.3, Tailwind v4 — but plain `npm`
#   em dash for the role             Playwright — e2e, Astro 5 — static
#   `~` prefix for not-yet-wired-up  ~Sentry — errors  (renders dimmed)
# Watch for commas: `[GitHub Actions — lint, test]` is TWO entries, not one.
# Quote the value, or use a block sequence, as `ci` does below.
stack:
  language: [TypeScript]
  framework: [Astro 5 — static, Tailwind v4]
  data: [Postgres, Drizzle — ORM + migrations]
  auth: [Auth.js v5 — magic link]
  integrations: [Resend — email]
  hosting: [Railway — web + cron service + Postgres]
  testing: [Vitest — unit, Playwright — e2e]
  tooling: [npm, ESLint]
  ci:
    - 'GitHub Actions — lint, typecheck, test on PR' # quoted: contains commas
    - Railway — deploy on merge to main
  observability: [Sentry — errors]
order: 99 # lower sorts first
draft: true
---

## The problem

What was broken, for whom. Concrete beats abstract — a specific frustrating
Tuesday is worth more than a paragraph about market opportunity.

## The approach

What you built and, more importantly, what you deliberately didn't. The
decisions you talked yourself out of are usually the interesting part.
