# Thousand Shades of Women

A women's accessories brand website built with **Next.js 14 (App Router)** and **Supabase**, designed for deployment on **Vercel**. The hero product line is signature sunglasses ("shades") designed for four ages of a woman's life — Teens, 20s–30s, 40s–50s, and 60+.

## Features

- **Home page** with brand hero, "Shades for Every Age" collections, and featured products
- **Shop** with filtering by age collection and category (shades, jewelry, bags, scarves)
- **Product detail pages** with related products
- **Our Story** and **Contact** pages
- **API routes** (`/api/products`, `/api/products/[slug]`, `/api/newsletter`, `/api/contact`) backed by Supabase
- **Graceful fallback**: the site runs with a built-in catalogue when Supabase isn't configured, so you can develop and preview immediately

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` (creates `products`, `newsletter_subscribers`, and `contact_messages` tables with RLS policies, and seeds the catalogue).
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key (Project Settings → API):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Without these variables the catalogue still renders from local data, but newsletter and contact submissions are not persisted.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.
4. Deploy — Vercel auto-detects Next.js; no extra configuration needed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
