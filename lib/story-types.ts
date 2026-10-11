// Shared story types and constants usable by both Server and Client Components

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
