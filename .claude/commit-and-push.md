# commit-and-push profile — theapps

Repo profile for the `commit-and-push` and `post-merge` skills. Specifics only; the shared procedures live in the skills.

## Platform

**npm** on **Windows / PowerShell**. Astro 7, fully static, no adapter: `npm run build` writes plain HTML/CSS to `dist/`.

Pushing `main` is refused by the ruleset, so changes always go through a branch and a PR. Merging the PR **deploys production** (Cloudflare Pages); see "After merge".

## Review traps

Check these when the diff touches the area. Full explanations are in `CLAUDE.md`.

- **Text glued to an inline tag in `.astro` files.** A line break between text and `<a>`, `<strong>`, `<em>` or `<code>` is dropped, not turned into a space ("written down ina file"). Lines wrapping beside one need `{' '}`. Markdown content isn't affected. The build gate below greps `dist/` for it.
- **A new colour token needs a dark value in both dark blocks** of `src/styles/global.css` (the `prefers-color-scheme` media query and `:root[data-theme='dark']`). Missing one is right for one kind of dark-mode user and wrong for the other.
- **YAML flow sequences split on commas.** In `stack:` frontmatter, `[GitHub Actions — lint, test]` is two rows and renders plausibly. Quote any value containing a comma.
- **Internal links end in a slash** (`/about/`, `/apps/whosin/`). Without it Cloudflare adds a 308 hop that `npm run dev` never shows.
- **Source-of-truth pairs:** `site` in `astro.config.mjs` vs `SITE_URL` in `src/consts.ts`; `/qa/` vs HouseBud's `docs/test-plan.md`; each app's `status` / `url` / `demo` vs the sibling app's real deploy state. Sibling repos are under `C:\Users\tilt_\dev\` and are read-only from here.
- **`theme-color` tags in `Base.astro` hardcode `--color-paper` as hex.** They need changing when the paper colour changes.
- **`src/pages/404.astro` and `public/_redirects` stay.** Without the 404 page every unknown URL returns the homepage with a 200; the `/work/…` redirects keep old indexed URLs working.
- **Copy about the apps:** frame testing as growing in steps, with no self-promotional lines, no dates before January 2026, and no mention of missing devices.
- **`package-lock.json`:** local npm 11.1.0 strips the `libc` fields on any lockfile write. If the diff loses `libc` lines the change didn't intend, revert those.

## Test coverage

There is no test suite, and none is expected. Don't flag missing tests. The schema in `src/content.config.ts` (Zod, `.strict()` for `stack`) is what catches frontmatter mistakes, at build time.

## Docs

`CLAUDE.md` (conventions, traps, deploy), `README.md` (setup and deploy walkthrough), `ROADMAP.md` (tick items the change completes), and `src/content/apps/_example.md` when a frontmatter field changes.

## Gates

There is no format or lint script. Formatting is by convention.

1. `npm run check` (`astro check`). It is slow; allow it up to 5 minutes. Errors block. The hints don't: as of 2026-11-02 there are 20, all in `src/content.config.ts` (17 for the deprecated `z` import, 3 for the deprecated `z.string().url()`).
2. `npm run build`.
3. Grep the built HTML for text glued to an inline tag:
   ```
   grep -rnoE "[a-z]<(a|strong|em|code)[ >]" dist --include=*.html
   ```
   Any hit is the `.astro` line-break trap above. Expect no output.

## After the push

Cloudflare builds a preview for every push to a non-`main` branch, PR or not. Wait for the "Cloudflare Pages" check run on the pushed commit, then give the user both links from its summary:

```
gh api repos/theumann/theapps/commits/<sha>/check-runs --jq '.check_runs[] | select(.name=="Cloudflare Pages") | .status, .conclusion, .output.summary'
```

These are the branch alias `https://<branch>.theapps-7nt.pages.dev` and the per-commit URL. Suggest checking anything `npm run dev` can't show there: redirects, trailing-slash behaviour, both themes on the real build.

Don't open a PR or merge unasked. The user merges.

## After merge

Merging to `main` **deploys production** on Cloudflare Pages (theapps.app), usually within a couple of minutes.

- **Deploy status:** the "Cloudflare Pages" check run on the merge commit (same command as above, with `main`'s head SHA) should be `completed` / `success`.
- **Served content:** `curl -s https://theapps.app/<changed page>/` and grep for a string the PR introduced. A miss right after merging can be the edge cache, so retry once before reporting it.
- `_redirects` changes can only be verified on the live site or a preview, never locally.
