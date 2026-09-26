-- Placeholder stories (the same three that used to live in content/stories/).
-- Replace them with real stories before launch.
insert into public.stories (slug, title, author_name, category, excerpt, body, status, published_at) values
  ('starting-over-at-forty', 'Starting Over at Forty', 'Sample story (replace me)', 'Starting Over', 'A new city, a new career, and the strange freedom of being a beginner again.',
   $body$This is a placeholder story. Replace it with a real one.

At forty I packed two suitcases and moved to a city where I didn't know a single person.

> Being a beginner again was terrifying, and then it was the most alive I'd felt in years.
$body$, 'published', '2026-09-03'),
  ('the-year-i-said-no', 'The Year I Said No', 'Sample story (replace me)', 'Career', 'I turned down the promotion everyone expected me to take. It was the best career decision I''ve made.',
   $body$This is a placeholder story. Replace it with a real one, written by you or shared by a friend with her permission.

For six years I said yes to everything: every late meeting, every extra project, every "can you just." When the promotion came, everyone assumed I'd take it.

> I realized I had been climbing a ladder without ever asking where it led.

## What I chose instead

I asked for a four-day week. My manager said yes, and the sky didn't fall.
$body$, 'published', '2026-09-20'),
  ('three-am-feeds', 'Three A.M. Feeds', 'Anonymous', 'Motherhood', 'Nobody told me how lonely the first months would be, or how much I''d learn about myself in the dark.',
   $body$This is a placeholder story. Replace it with a real one.

The house is silent except for the tiny sounds she makes. I scroll through my phone with one thumb and wonder whether every other mother feels this unprepared.

## The night it changed

One night I stopped trying to be a perfect mother and started trying to be a present one.
$body$, 'published', '2026-09-12')
on conflict (slug) do nothing;
