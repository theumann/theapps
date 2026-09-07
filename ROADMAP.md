# Roadmap

Planned work, roughly in order. Not a backlog of every idea — things that are
decided, just not done yet.

## Deploy

- [ ] Put the site online via Cloudflare (Workers → Import a repository, or
      Pages). Build command `npm run build`, output `dist`. See README.md for
      the custom-domain and email-routing walkthrough.

## Link checking

The gap: `npm run check` (`astro check`) does typechecking only. It does not
validate a single `href`. A typo like `/work/whosln` typechecks, builds,
deploys, and 404s — nothing connects an href string to `getStaticPaths()`.
The Zod schema in `src/content.config.ts` validates the *shape* of app
frontmatter, not whether a `url` is reachable.

- [ ] **Tier 1 — internal links, gating the build.** After `npm run build`,
      walk `dist/`, extract every `href`/`src`, assert each internal one
      resolves to a real file (`/work/whosin` → `dist/work/whosin/index.html`).
      No server, no network, ~1s. Either a small zero-dependency script or
      `linkinator` pointed at `dist` with `--skip '^https?://'`.
      Wire into the deploy build so a broken link fails the deploy.
- [ ] **Tier 2 — external links, occasionally.** Same tool without the skip,
      run manually or weekly. Never a commit gate: external checks fail for
      reasons unrelated to the change (rate limits, transient 503s, sites that
      403 bots), and a gate that cries wolf gets ignored.
- [ ] **Tier 3 — content invariants.** Assert what no typechecker can reach:
      every non-draft app's `domain` matches its `url` host, no app claims
      `status: live` without a `url`, every `url` responds. This is the
      hub-vs-sibling-deploy drift CLAUDE.md warns about.

Playwright/E2E is deliberately out of scope — the site is static with no
interactivity to drive.

## Housekeeping

- [ ] `astro check` reports 15 hints, all `'z' is deprecated` from
      `import { z } from 'astro:content'` in `src/content.config.ts`. Astro now
      nudges toward importing `zod` directly. Cosmetic; clearing it would make
      the hint count meaningful again.
- [ ] No `.claude/commit-and-push.md` profile in this repo, so the
      commit-and-push skill derives gates from CLAUDE.md and package.json each
      time. Worth writing one: the gates here are `npm run check` and
      `npm run build`; there is no lint, format, or test script.
