-- Thousand Shades: initial schema.
-- Run this once in the Supabase dashboard (SQL Editor → New query → paste → Run),
-- or with the Supabase CLI: `supabase db push`.

-- ---------------------------------------------------------------------------
-- Stories
-- ---------------------------------------------------------------------------

-- Keep in sync with CATEGORIES in lib/stories.ts
create type public.story_category as enum (
  'Career',
  'Motherhood',
  'Identity',
  'Health',
  'Love & Loss',
  'Starting Over'
);

-- pending: submitted, waiting for review. published: visible on the site.
-- rejected / removed: never shown (removed = taken down at the author's request).
create type public.story_status as enum ('pending', 'published', 'rejected', 'removed');

create table public.stories (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title        text not null check (char_length(title) between 1 and 200),
  -- A real name, a pen name, or "Anonymous"
  author_name  text not null default 'Anonymous' check (char_length(author_name) between 1 and 100),
  category     public.story_category not null,
  excerpt      text not null check (char_length(excerpt) between 1 and 300),
  body         text not null, -- Markdown
  status       public.story_status not null default 'pending',
  -- Set when a submitter is signed in (Phase 3). Null for stories added by the team.
  submitted_by uuid references auth.users (id) on delete set null,
  published_at date,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint published_has_date check (status <> 'published' or published_at is not null)
);

create index stories_published_idx on public.stories (published_at desc) where status = 'published';
create index stories_category_idx on public.stories (category) where status = 'published';

create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger stories_set_updated_at
  before update on public.stories
  for each row execute function public.set_updated_at();

alter table public.stories enable row level security;

-- Anyone can read published stories. Everything else (pending, rejected, removed)
-- is invisible to the public key; the team manages it in the Supabase dashboard.
create policy "Published stories are public"
  on public.stories for select
  to anon, authenticated
  using (status = 'published');

-- ---------------------------------------------------------------------------
-- Waitlist
-- ---------------------------------------------------------------------------

create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  created_at timestamptz not null default now()
);

create unique index waitlist_email_key on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- Visitors can join the waitlist but can't read it: there is no select policy,
-- so the list is only visible in the dashboard.
create policy "Anyone can join the waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);
