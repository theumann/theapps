---
name: HouseBud
domain: housebud.app
tagline: "**Find roommates, then run the household together.** Students match on everyday habits, meet in a small group chat, and turn that group into a household with shared chores and a shopping list."
status: building
url: https://frontend-staging-971b.up.railway.app/
repo: https://github.com/theumann/housebud
logo: ../../assets/housebud_logo.svg
logoDark: ../../assets/housebud_logo_dark.svg
statusNote: In development, with a demo running on staging. Matching, chat, households, chores and the shopping list are built; production is next.
stack:
  language: [TypeScript, Node]
  framework:
    - Next.js 16.4 — App Router
    - React 19.2 — React Compiler
    - Tailwind v4
    - Express 5 — API
    - Zod — request validation
  data: [Postgres, Prisma 6 — ORM + migrations]
  auth: [Email + password — JWT + bcrypt]
  hosting: [Railway — web + API + Postgres]
  testing: [Vitest + Supertest — API integration, Playwright — e2e]
  tooling: [npm, ESLint, Prettier, tsx]
  ci: [Railway — staging on merge to main, Migrations on pre-deploy, No CI pipeline yet]
order: 3
---

## The problem

Finding a roommate and living with one are treated as two separate problems,
solved by two separate kinds of tool. Matching sites end the moment two people
agree to move in. After that, the household runs on a group chat: who took the
bins out, whose turn it is to clean the bathroom, whether anyone bought milk.
Like any chat, it's good for talking and bad at keeping track of anything.

## The approach

HouseBud treats them as one app, because matching is how a household gets
formed:

- **Match on habits, not just budget.** A compatibility questionnaire covers
  the things that actually break shared living: cleaning, guests and parties,
  smoking, pets, sharing food and bills.
- **Meet before committing.** Matches meet in small "meet & greet" chat rooms,
  capped at three per person.
- **Form the household from the room.** The room's owner clicks _Form
  household_ and everyone else gets an invite. Nobody is added without saying
  yes.
- **Then run it.** Repeating chores with an optional rotation, a shared
  shopping list, and owner controls. Each module can be switched on or off per
  household.

One decision worth calling out: the household gets its **own** chat rather
than inheriting the matching room. The matching chat shows its full history to
every participant, so carrying it over would expose conversations from before
the household existed to whoever joins later.
