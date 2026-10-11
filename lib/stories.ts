import { cache } from "react";
import { marked } from "marked";
import { supabase, isSupabaseConfigured } from "./supabase";

// Stories live in the Supabase `stories` table (see supabase/migrations).
// Only rows with status = 'published' are visible to the site.

import { CATEGORIES, type Category, type StoryMeta, type Story } from "./story-types";
export { CATEGORIES, type Category, type StoryMeta, type Story };

const META_COLUMNS = "slug, title, author_name, category, excerpt, published_at";

type StoryRow = {
  slug: string;
  title: string;
  author_name: string;
  category: Category;
  excerpt: string;
  published_at: string;
};

const FALLBACK_STORIES: (StoryMeta & { body: string })[] = [
  {
    slug: "starting-over-at-forty",
    title: "Starting Over at Forty",
    author: "Sample story (replace me)",
    category: "Starting Over",
    excerpt: "A new city, a new career, and the strange freedom of being a beginner again.",
    date: "2026-09-03",
    body: `This is a placeholder story. Replace it with a real one.\n\nAt forty I packed two suitcases and moved to a city where I didn't know a single person.\n\n> Being a beginner again was terrifying, and then it was the most alive I'd felt in years.`,
  },
  {
    slug: "the-year-i-said-no",
    title: "The Year I Said No",
    author: "Sample story (replace me)",
    category: "Career",
    excerpt: "I turned down the promotion everyone expected me to take. It was the best career decision I've made.",
    date: "2026-09-20",
    body: `This is a placeholder story. Replace it with a real one, written by you or shared by a friend with her permission.\n\nFor six years I said yes to everything: every late meeting, every extra project, every "can you just." When the promotion came, everyone assumed I'd take it.\n\n> I realized I had been climbing a ladder without ever asking where it led.\n\n## What I chose instead\n\nI asked for a four-day week. My manager said yes, and the sky didn't fall.`,
  },
  {
    slug: "three-am-feeds",
    title: "Three A.M. Feeds",
    author: "Anonymous",
    category: "Motherhood",
    excerpt: "Nobody told me how lonely the first months would be, or how much I'd learn about myself in the dark.",
    date: "2026-09-12",
    body: `This is a placeholder story. Replace it with a real one.\n\nThe house is silent except for the tiny sounds she makes. I scroll through my phone with one thumb and wonder whether every other mother feels this unprepared.\n\n## The night it changed\n\nOne night I stopped trying to be a perfect mother and started trying to be a present one.`,
  },
];

function toMeta(row: StoryRow): StoryMeta {
  return {
    slug: row.slug,
    title: row.title,
    author: row.author_name,
    category: row.category,
    date: row.published_at,
    excerpt: row.excerpt,
  };
}

function toFallbackMeta(s: StoryMeta & { body: string }): StoryMeta {
  return {
    slug: s.slug,
    title: s.title,
    author: s.author,
    category: s.category,
    date: s.date,
    excerpt: s.excerpt,
  };
}

export async function getAllStories(category?: string): Promise<StoryMeta[]> {
  if (!isSupabaseConfigured) {
    let list = FALLBACK_STORIES;
    if (category) list = list.filter((s) => s.category === category);
    return list.map(toFallbackMeta);
  }

  try {
    let query = supabase
      .from("stories")
      .select(META_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false }); // newest first

    if (category) {
      // An unknown category would be rejected by the enum, so just return nothing
      if (!CATEGORIES.includes(category as Category)) return [];
      query = query.eq("category", category);
    }

    const { data, error } = await query.returns<StoryRow[]>();
    if (error || !data) {
      let list = FALLBACK_STORIES;
      if (category) list = list.filter((s) => s.category === category);
      return list.map(toFallbackMeta);
    }
    return data.map(toMeta);
  } catch {
    let list = FALLBACK_STORIES;
    if (category) list = list.filter((s) => s.category === category);
    return list.map(toFallbackMeta);
  }
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

// cache() lets generateMetadata and the page share one query per request
export const getStory = cache(async (slug: string): Promise<Story | null> => {
  if (!isSupabaseConfigured) {
    const found = FALLBACK_STORIES.find((s) => s.slug === slug);
    if (!found) return null;
    return { ...found, html: sanitizeHtml(marked.parse(found.body, { async: false }) as string) };
  }

  try {
    const { data, error } = await supabase
      .from("stories")
      .select(`${META_COLUMNS}, body`)
      .eq("status", "published")
      .eq("slug", slug)
      .returns<(StoryRow & { body: string })[]>()
      .maybeSingle();

    if (error || !data) {
      const found = FALLBACK_STORIES.find((s) => s.slug === slug);
      if (!found) return null;
      return { ...found, html: sanitizeHtml(marked.parse(found.body, { async: false }) as string) };
    }
    return { ...toMeta(data), html: sanitizeHtml(marked.parse(data.body, { async: false }) as string) };
  } catch {
    const found = FALLBACK_STORIES.find((s) => s.slug === slug);
    if (!found) return null;
    return { ...found, html: sanitizeHtml(marked.parse(found.body, { async: false }) as string) };
  }
});

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
