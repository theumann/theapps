---
name: whosin
domain: whosin.team
tagline: Rosters, RSVPs/payment tracking and Whatsapp Group updates for pick-up games and amateur teams. The parts a group chat can't hold.
status: live
url: https://whosin.team/
logo: ../../assets/whosin_logo.png
stack: [TypeScript, Next.js, Prisma, Postgres, Tailwind]
order: 1
statusNote: Live, with three real groups using it — a fixed roster team and two pick-up groups, spanning the range from most to least structured. Not yet public.
---

## The problem

Most recreational sports group runs on WhatsApp, and every one of them hits the
same wall. Someone posts "football Thursday 7pm, first 14 in." Then come forty
messages. Three people say "in" twice. Two drop out in a thread nobody reads to
the end. Somebody's counting on their fingers an hour before kickoff, and the
organizer is chasing five-euro payments one DM at a time.

Chat is excellent at conversation and hopeless at state. The roster exists only
as a running tally in the organizer's head.

## The approach

The chat is where the group actually lives, and that doesn't need to change.

So whosin doesn't replace,  It coexists:

- **The app owns the structured state:** who's in, capacity, the waitlist, who
  has paid, what's on the schedule.
- **WhatsApp stays the comms layer:** banter, photos, last-minute changes.
- **Crossing the gap is one tap:** The organizer shares to WhatsApp from the
  app; players tap a public link and see the live roster without making an
  account.

That last point matters more than it sounds. Requiring every casual player to
sign up is how these tools die. Only the organizer needs an account.

## One primitive

The three groups I built this for want three different things. One wants players
to tap "I'm in." One wants the organizer to mark people paid via Venmo. One is a
fixed team that needs Yes / No / Maybe against a recurring calendar.

The temptation is three features. The abstraction that collapses them:
**a confirmation takes a slot.** What counts as a confirmation is the variable —
a player tap, an organizer marking a payment, an RSVP. Payment becomes a layer
on top rather than a prerequisite, and the open-event flow ships without waiting
on it.
