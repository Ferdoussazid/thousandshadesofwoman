-- ---------------------------------------------------------------------------
-- Profiles & User Accounts (Phase 1)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique check (username ~ '^[a-z0-9_]{3,30}$'),
  display_name text not null check (char_length(display_name) between 1 and 100),
  avatar_url   text,
  bio          text check (char_length(bio) <= 500),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index profiles_username_idx on public.profiles (username);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- Profiles are publicly readable
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Users can update only their own profile
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Automatic Profile Creation on Signup (Trigger)
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  raw_name text;
  clean_username text;
  final_username text;
begin
  raw_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1),
    'Woman'
  );

  -- Sanitize username (lowercase alphanumeric + underscore)
  clean_username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9_]', '_', 'g'));
  if length(clean_username) < 3 then
    clean_username := 'user_' || clean_username;
  end if;
  clean_username := substr(clean_username, 1, 20);

  final_username := clean_username || '_' || substr(replace(new.id::text, '-', ''), 1, 4);

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    final_username,
    raw_name,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    display_name = excluded.display_name,
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);

  return new;
end;
$$;

-- Trigger whenever a new user registers in auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
