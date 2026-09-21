---
name: FPheLp
domain: fphelp.app
tagline: Standings, results and the money pot for a private fantasy football league, drafted for the organizer to send.
status: live
url: https://fphelp.app
logo: ../../assets/fphelp_logo.png
statusNote: Live, running a real 15-manager league through the season. The first gameweek was scored and verified end to end on 25 Aug 2026. Sign-in is allowlisted to specific addresses for now; open sign-up is the next phase.
stack:
  language: [TypeScript, Node 24]
  framework: [Next.js 16.3 — App Router, React 19.2 — React Compiler, Tailwind v4]
  data: [Postgres, Drizzle — ORM + migrations]
  auth: [Auth.js v5 — magic link, Allowlisted owners — no self-signup]
  integrations: [FPL API — unofficial, Resend — email, WhatsApp — share link]
  hosting: [Railway — web + cron service + Postgres]
  testing: [Vitest — unit, Playwright — e2e, Playwright — screenshots, Recorded API fixtures]
  tooling: [npm, ESLint, tsx]
  ci: [Railway — deploy on merge to main, Migrations on pre-deploy, No staging environment yet]
  observability: [Sentry — errors + cron monitors]
order: 2
---

## The problem

Someone runs the league. Every week they open the fantasy site, read the table,
work out who won the gameweek and by how much, remember who is owed what from a
pot of a few hundred dollars, and type all of it into WhatsApp by hand. Then they
do it again next week, for nine months.

It isn't hard work. It's just work that never stops, and the person doing it is
doing it for their friends.

## The approach

Automate the reading and the arithmetic, facilitate the sharing.

The app watches the league, computes the digest, and has a draft waiting when the
organizer opens it. They edit it with their own update and comments, tick
which blocks to include, and tap once. WhatsApp opens with the message
pre-filled and they choose the group themselves, or the digest goes out by
email. The conversation and banter around it still live there.

League members never sign in. They don't have accounts, and the app has no
contact details for them beyond what the organizer types in. Only the person
doing the work needs to be a user.

## The gate

The interesting engineering isn't the standings table. It's knowing when the
standings are true.

The fantasy API marks a gameweek `finished` before bonus points are applied, and
recalculates league tables on a schedule of its own. Both facts are invisible if
you trust the flag: you get a table that looks complete, is wrong, and has
already been sent to fifteen managers.

On 24 August the league average read 52.82. Nothing was left to play. Fourteen
hours later, with no further fixtures, it settled at 53.65. A digest sent on the
earlier reading would have published wrong totals to the whole league and
nobody would have known to check, because the message would have looked exactly
right.

The wider lesson is about the API rather than this league. It's first-party but
undocumented, with no stability guarantee and shapes that shift between seasons.
So real responses are recorded as fixtures and parsed by the real code on every
test run: when the shape changes, the test suite fails instead of the send. The
diff is the finding.
