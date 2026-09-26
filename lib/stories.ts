import { cache } from "react";
import { marked } from "marked";
import { supabase } from "./supabase";

// Stories live in the Supabase `stories` table (see supabase/migrations).
// Only rows with status = 'published' are visible to the site.

// Keep in sync with the story_category enum in supabase/migrations
export const CATEGORIES = [
  "Career",
  "Motherhood",
  "Identity",
  "Health",
  "Love & Loss",
  "Starting Over",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type StoryMeta = {
  slug: string;
  title: string;
  author: string; // a real name, a pen name, or "Anonymous"
  category: Category;
  date: string;
  excerpt: string;
};

export type Story = StoryMeta & { html: string };

const META_COLUMNS = "slug, title, author_name, category, excerpt, published_at";

type StoryRow = {
  slug: string;
  title: string;
  author_name: string;
  category: Category;
  excerpt: string;
  published_at: string;
};

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

export async function getAllStories(category?: string): Promise<StoryMeta[]> {
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
  if (error) throw new Error(`Couldn't load stories: ${error.message}`);
  return data.map(toMeta);
}

// cache() lets generateMetadata and the page share one query per request
export const getStory = cache(async (slug: string): Promise<Story | null> => {
  const { data, error } = await supabase
    .from("stories")
    .select(`${META_COLUMNS}, body`)
    .eq("status", "published")
    .eq("slug", slug)
    .returns<(StoryRow & { body: string })[]>()
    .maybeSingle();

  if (error) throw new Error(`Couldn't load story "${slug}": ${error.message}`);
  if (!data) return null;
  return { ...toMeta(data), html: marked.parse(data.body, { async: false }) };
});

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
