# THeApps

Showcase site for the apps I build — [theapps.app](https://theapps.app).

Hub-and-spoke: this site is the hub. Each app keeps its own domain and its own
marketing site; here it gets a card and a case study.

## Stack

- **[Astro](https://astro.build)** — static output, zero JS shipped by default
- **Tailwind CSS v4** — via `@tailwindcss/vite`, theme defined in `src/styles/global.css`
- **MDX** — available if a case study needs a component; plain Markdown otherwise
- **Cloudflare** — hosting, DNS, email routing, analytics

## Develop

```bash
npm install
npm run dev         # http://localhost:4321
npx astro dev stop  # stop the server
npm run build       # static output to dist/
npm run preview     # serve the built site
npm run check       # typecheck .astro files
```

## Adding an app

Drop a Markdown file in `src/content/apps/`. The filename becomes the URL:
`src/content/apps/foo.md` → `/work/foo`.

Copy `_example.md` as a starting point — it documents every frontmatter field.
Files prefixed with `_` are ignored by the content loader, so the example never
ships. The schema is enforced at build time in `src/content.config.ts`; a typo
in a frontmatter key fails the build rather than silently rendering wrong.

Cards sort by `order` (lower first). Set `draft: true` to keep a file in the
repo but off the site.

## Deploying to Cloudflare

Cloudflare has folded Pages into Workers, so the current path is **Workers →
Create → Import a repository**. (If your dashboard still shows Workers & Pages
with a Pages tab, that works too — same result.)

Build settings:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Astro           |
| Build command    | `npm run build` |
| Output directory | `dist`          |

Every push to `main` deploys; pull requests get preview URLs.

### Custom domain

Point `theapps.app`'s nameservers at Cloudflare, then add it as a custom domain
on the Worker. Note `.app` is on the HSTS preload list — HTTPS is mandatory and
plain HTTP will fail hard, which is expected and handled automatically once the
certificate is issued.

Two things worth turning on while you're in the dashboard, both free:

- **Email Routing** — forwards `thierry@theapps.app` (`CONTACT_EMAIL` in
  `src/consts.ts`) to a real inbox. It now lives at account level: **Compute →
  Email Service → Email Routing**, not under the domain's Email menu. If the zone
  was imported from another registrar, delete its old MX and SPF records — a
  domain gets exactly one SPF record, and Cloudflare won't replace an existing one
  for you. Set up and verified for this domain.
- **Web Analytics** — privacy-preserving, no cookie banner required.

## Notes

- `SITE_URL` in `src/consts.ts` and `site` in `astro.config.mjs` must match.
  The sitemap and canonical URLs are generated from them.
- Inter loads from Google Fonts via `<link>` in `src/layouts/Base.astro`. To
  drop the external request, switch to Astro's built-in fonts API or self-host.
- There's no OG image yet — `og:image` is unset, so link previews will be
  text-only.
