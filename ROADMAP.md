# Roadmap

Planned work, roughly in order. Not a backlog of every idea — things that are
decided, just not done yet.

## Deploy

- [x] Put the site online via Cloudflare Pages — done 2026-09-16. Custom
      domains `theapps.app` and `www`, production branch `main`, build
      `npm run build`, output `dist`.
- [x] Email routing for `thierry@theapps.app` — done 2026-09-15.
- [x] Social card (`public/og.png`) — done 2026-09-21.
- [x] **Go-live commit** — done 2026-09-21. `noindex` removed and the
      `Sitemap:` line restored, so the site is indexable.
- [ ] Add the property in Google Search Console and submit
      `sitemap-index.xml`. Removing `noindex` only takes effect on the next
      crawl, which can be days or weeks; submitting the sitemap is the lever
      that speeds it up.

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
