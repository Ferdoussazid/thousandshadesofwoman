import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Phase 1 reads stories from Markdown files.
// In Phase 2 you'll swap these functions for Supabase queries,
// and the pages that call them won't need to change much.

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

const STORIES_DIR = path.join(process.cwd(), "content/stories");

function readStoryFile(slug: string) {
  const file = fs.readFileSync(path.join(STORIES_DIR, `${slug}.md`), "utf8");
  // gray-matter splits the "front matter" (the --- block at the top) from the body
  const { data, content } = matter(file);
  const meta: StoryMeta = {
    slug,
    title: data.title,
    author: data.author || "Anonymous",
    category: data.category,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    excerpt: data.excerpt,
  };
  return { meta, content };
}

export function getAllStories(): StoryMeta[] {
  return fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readStoryFile(f.replace(/\.md$/, "")).meta)
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
}

export function getStory(slug: string): Story | null {
  if (!fs.existsSync(path.join(STORIES_DIR, `${slug}.md`))) return null;
  const { meta, content } = readStoryFile(slug);
  return { ...meta, html: marked.parse(content, { async: false }) };
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
