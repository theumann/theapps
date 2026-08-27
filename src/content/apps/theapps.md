---
# This site itself. `unlisted` rather than `draft`: it's real and keeps both a
# case study and a /stack column, it just doesn't take a card on its own
# homepage alongside the apps it exists to point at.
name: THeApps
domain: theapps.app
tagline: The hub this site is. A homepage grid of app cards, each opening a case study.
status: live
url: https://theapps.app
statusNote: Live. The hub for everything else here — each featured app keeps its own product and domain, and this site only links out.
stack:
  language: [TypeScript]
  framework: [Astro 5 — static, Tailwind v4, 'MDX — available, unused']
  hosting: [Cloudflare Workers]
  tooling: [npm, astro check — typecheck]
  ci: [Cloudflare — push to main, PR preview URLs]
order: 999
unlisted: true
---

## The problem

Several small apps, each with its own domain and its own audience, and nothing
tying them together. A reader who finds one has no way to discover the rest, and
there's nowhere to write down *why* any of them was built the way it was.

## The approach

A hub, not a platform. Each app keeps its own product, domain and deploy — this
site holds a card and a case study for each, and links out.

That constraint is what keeps it static. There's no adapter, no API routes, and
nothing that assumes a request-time backend; `npm run build` emits plain HTML and
CSS. Apps are content rather than code — a Markdown file per app, validated
against a schema, so adding one is adding a file and a frontmatter typo fails the
build instead of rendering silently wrong.
