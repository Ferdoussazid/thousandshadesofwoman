-- Thousand Shades of Women — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price numeric(10, 2) not null,
  category text not null check (category in ('shades', 'jewelry', 'bags', 'scarves')),
  age_group text check (age_group in ('teens', 'twenties-thirties', 'forties-fifties', 'sixty-plus')),
  color_from text not null default '#fda4af',
  color_to text not null default '#fbbf24',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_messages enable row level security;

create policy "Products are publicly readable"
  on products for select using (true);

create policy "Anyone can subscribe to the newsletter"
  on newsletter_subscribers for insert with check (true);

create policy "Anyone can send a contact message"
  on contact_messages for insert with check (true);

-- Seed catalogue
insert into products (name, slug, description, price, category, age_group, color_from, color_to, featured) values
  ('Bubblegum Heart Shades', 'bubblegum-heart-shades', 'Heart-shaped frames in glossy bubblegum pink with gradient rose lenses. UV400 protection wrapped in pure fun — made for first crushes and last-day-of-school selfies.', 39, 'shades', 'teens', '#f9a8d4', '#e879f9', true),
  ('Daydream Cat-Eye', 'daydream-cat-eye', 'A soft cat-eye in translucent lilac acetate with mirrored lavender lenses. Light as a daydream, bold as a first step.', 45, 'shades', 'teens', '#c4b5fd', '#f0abfc', false),
  ('Skyline Aviator', 'skyline-aviator', 'Slim gold-tone aviators with amber gradient lenses. For boardrooms, rooftops and everywhere the future is being decided.', 89, 'shades', 'twenties-thirties', '#fcd34d', '#fb7185', true),
  ('Muse Oversized Square', 'muse-oversized-square', 'Oversized square frames in warm tortoise with smoky brown lenses. Equal parts armor and allure for the woman on her way up.', 95, 'shades', 'twenties-thirties', '#fdba74', '#f43f5e', false),
  ('Riviera Round', 'riviera-round', 'Perfectly round frames in champagne metal with rose-tinted lenses. A quiet nod to the classics, worn by the women who redefine them.', 110, 'shades', 'forties-fifties', '#fda4af', '#fbbf24', true),
  ('Signature Butterfly', 'signature-butterfly', 'Sweeping butterfly frames in deep burgundy acetate with polarized bronze lenses. Commanding, graceful, unmistakably her.', 120, 'shades', 'forties-fifties', '#f87171', '#fcd34d', false),
  ('Grande Dame Oval', 'grande-dame-oval', 'Elegant oval frames in pearl-white acetate with soft violet lenses. Lightweight comfort with a presence that needs no introduction.', 105, 'shades', 'sixty-plus', '#ddd6fe', '#fda4af', true),
  ('Legacy Square', 'legacy-square', 'Gently squared frames in warm mauve with anti-glare amethyst lenses. Designed with extra-light hinges for all-day ease and timeless poise.', 99, 'shades', 'sixty-plus', '#c084fc', '#f9a8d4', false),
  ('Petal Drop Earrings', 'petal-drop-earrings', 'Hand-finished rose-gold drops shaped like falling petals. The finishing touch to any shade of you.', 35, 'jewelry', null, '#fecdd3', '#fda4af', false),
  ('Silk Blush Scarf', 'silk-blush-scarf', '100% mulberry silk in a watercolor blush print. Wear it in your hair, on your neck, or tied to your favorite bag.', 55, 'scarves', null, '#fbcfe8', '#fef3c7', false),
  ('Mini Croissant Bag', 'mini-croissant-bag', 'A soft crescent shoulder bag in buttery vegan leather. Fits your shades, your phone and your whole mood.', 79, 'bags', null, '#fde68a', '#fdba74', false),
  ('Golden Hour Chain', 'golden-hour-chain', 'A delicate layered chain in 18k gold plating that catches the light like the last hour of the day.', 49, 'jewelry', null, '#fcd34d', '#fca5a5', false)
on conflict (slug) do nothing;
