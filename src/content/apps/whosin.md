---
name: WhosIn
domain: whosin.team
tagline: "**Manage your Activity group.** Currently serving pickup soccer groups. Will expand to any type of activity group (Book club, Hiking group, Wine club, or whatever activity for which you manage attendance and communication)."
status: live
url: https://whosin.team/
repo: https://github.com/theumann/whosin
logo: ../../assets/whosin_logo.png
stack:
  language: [TypeScript, Node 24]
  framework: [Next.js 15 — App Router, React 19, Tailwind v4, lucide-react]
  data: [Postgres, Prisma — ORM + migrations]
  auth: [Auth.js v5 — magic link, Organizer-only — players use public links]
  integrations: [Nodemailer — SMTP, WhatsApp — share link]
  hosting: [Railway — web + Postgres]
  testing: [Vitest — unit + coverage, Playwright — e2e]
  tooling: [npm, ESLint, Prettier]
  ci:
    - 'GitHub Actions — format, lint, typecheck, test on PR'
    - Railway — staging + prod on merge to main
    - Migrations on start
  observability: [Sentry — errors]
order: 1
statusNote: Live, with three real groups using it. A fixed roster team and two pick-up groups, spanning the range from most to least structured.
---

## The problem

Most recreational sport groups run on WhatsApp, and every one of them hits the
same wall. Someone posts "football Thursday 7pm, first 14 in." Then come forty
messages. Three people say "in" twice. Two drop out in a thread nobody reads to
the end. Somebody's counting on their fingers an hour before kickoff, and the
organizer is chasing five-euro payments one DM at a time.

Chat is excellent at conversation and hopeless at state. The roster exists only
as a running tally in the organizer's head.

## The approach

The chat is where the group actually lives, and that doesn't need to change.

So WhosIn doesn't replace — it coexists:

- **The app owns the structured state:** who's in, capacity, the waitlist, who
  has paid, what's on the schedule.
- **WhatsApp stays the comms layer:** banter, photos, last-minute changes.
- **Crossing the gap is one tap:** The organizer shares to WhatsApp from the
  app; players tap a public link and see the live roster without making an
  account.

That last point matters more than it sounds. Requiring every casual player to
sign up is how these tools die. Only the organizers need an account.

## One primitive

The three groups I built this for want three different things. One wants players
to tap "I'm in." One wants the organizer to mark people paid via Venmo. One is a
fixed team that needs Yes / No / Maybe against a recurring calendar.

The temptation is three features. The abstraction that collapses them:
**a confirmation takes a slot.** What counts as a confirmation is the variable.
A player tap, an organizer marking a payment, an RSVP. Payment becomes a layer
on top rather than a prerequisite, and the open-event flow ships without waiting
on it.
