import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getAllStories } from "@/lib/stories";
import StoryCard from "../StoryCard";

export const metadata: Metadata = { title: "Stories" };

// searchParams holds the "?category=..." part of the URL
export default async function StoriesPage({ searchParams }: PageProps<"/stories">) {
  const { category } = await searchParams;
  const all = getAllStories();
  const stories = category ? all.filter((s) => s.category === category) : all;

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm ${
      active ? "border-accent bg-accent text-white" : "border-line bg-card hover:border-accent"
    }`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-serif text-4xl font-semibold">Stories</h1>
      <p className="mt-3 text-muted">Every story is one shade. Browse by theme.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/stories" className={pill(!category)}>All</Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/stories?category=${encodeURIComponent(c)}`}
            className={pill(category === c)}
          >
            {c}
          </Link>
        ))}
      </div>

      {stories.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">No stories in this theme yet. Yours could be the first.</p>
      )}
    </div>
  );
}
