# Thousand Shades: project notes

**Idea:** A women's storytelling platform. Women share personal stories (career, motherhood, identity, overcoming hardship), tagged by theme. Each story is one "shade."
**Tagline:** Real stories from real women, one shade at a time.
**Categories:** Career, Motherhood, Identity, Health, Love & Loss, Starting Over
**Privacy:** Real name, pen name, or anonymous. Stories are reviewed before publishing and removed on request. See `/guidelines`.

## Roadmap

1. **Static site.** Next.js App Router, Tailwind, Markdown stories, deploy to Vercel with a custom domain.
2. **Supabase.** Stories move into Postgres, fetched in Server Components, with categories, search, and `/stories/[slug]`.
3. **Users & submissions.** Supabase Auth, a submission form with an image (Storage), an admin approval page, Row Level Security, Server Actions.
4. **Community.** Likes, comments, bookmarks, author profiles, email notifications, realtime.
5. **Monetization.** A women-owned business directory with paid listings, a newsletter, sponsorships, Stripe (or a local gateway), webhooks, SEO/Open Graph.

## Status (2026-09-26)

- [x] Project created (Next.js 16, TypeScript, Tailwind v4, ESLint)
- [x] Pages: `/`, `/about`, `/guidelines`, `/stories` (filter with `?category=`), `/stories/[slug]`
- [x] Stories are read from the Supabase `stories` table by `lib/stories.ts` (only `status = 'published'` rows). Pages re-check every 60 seconds.
- [x] 3 **placeholder** stories in `supabase/seed.sql`. Replace them with real ones before launch.
- [x] Pushed to github.com/Ferdoussazid/thousandshadesofwoman (main tracks origin/main)
- [ ] Decide what to do with the old accessories-shop PR #1 (Devin branch). It's a different concept and was left untouched.
- [ ] Import the repo into Vercel and add the domain under Settings → Domains
- [x] Waitlist: `waitlist` table plus a homepage signup form (`app/WaitlistForm.tsx`, `app/actions.ts`)
- [ ] Create the Supabase project, run the migration and seed, and add the env vars locally and in Vercel (see Supabase setup below)

## Supabase setup

1. Create a project at supabase.com.
2. SQL Editor: run `supabase/migrations/20260926000000_init.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` to `.env.local` and fill in the URL and publishable key (Project Settings → API Keys). Add the same two variables in Vercel → Settings → Environment Variables.
4. Restart `npm run dev`.

Access rules (Row Level Security): the public key can read only published stories and can add emails to the waitlist, but can't read the waitlist. Everything else is done in the dashboard.

## Adding a story

In the Supabase dashboard (Table Editor → `stories`), insert a row: `slug` (lowercase-with-dashes, used in the URL), `title`, `author_name` (name, pen name, or Anonymous), `category`, `excerpt`, `body` (Markdown), `status = published`, and `published_at`. It appears on the site within a minute. To take a story down, set `status` to `removed`.

Waitlist signups are in Table Editor → `waitlist`.

## Commands

- `npm run dev`: local site at http://localhost:3000
- `npm run build`: production build check
