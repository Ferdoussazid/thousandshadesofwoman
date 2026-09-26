import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllStories, getStory } from "@/lib/stories";

// One file renders every story. The [slug] folder name means
// /stories/anything will land here, with params.slug = "anything".

// Pre-build a page for each story at build time (fast, static pages)
export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/stories" className="text-sm text-muted hover:text-accent">
        ← All stories
      </Link>
      <p className="mt-8 text-xs font-medium uppercase tracking-wider text-accent">
        {story.category}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
        {story.title}
      </h1>
      <p className="mt-4 text-muted">
        {story.author} · {formatDate(story.date)}
      </p>
      <hr className="my-10 border-line" />
      {/* The HTML comes from our own Markdown files, so it's safe to render.
          Once users can submit stories, you'll need to sanitize it first. */}
      <div className="story-body" dangerouslySetInnerHTML={{ __html: story.html }} />
    </article>
  );
}
