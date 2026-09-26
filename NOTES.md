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
- [x] Stories are read from `content/stories/*.md` by `lib/stories.ts`
- [x] 3 **placeholder** stories. Replace them with real ones before launch.
- [ ] Create the GitHub repo `thousandshadesofwomen` and push:
  ```bash
  git remote add origin https://github.com/<username>/thousandshadesofwomen.git
  git push -u origin main
  ```
- [ ] Import the repo into Vercel and add the domain under Settings → Domains
- [ ] Waitlist: a Supabase table plus a homepage signup form (currently shows "coming soon")

## Adding a story

Copy a file in `content/stories/` and edit the front matter:

```md
---
title: "Story title"
author: "Name, pen name, or Anonymous"
category: "Career"   # must be one of the categories above
date: "2026-09-26"
excerpt: "One-sentence summary shown on cards."
---
Story text in Markdown...
```

## Commands

- `npm run dev`: local site at http://localhost:3000
- `npm run build`: production build check
