import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_IMAGES } from "@/lib/images";
import { formatDate, getAllStories, getStory } from "@/lib/stories";
import Reveal from "../../Reveal";
import StoryCard from "../../StoryCard";

// One file renders every story. The [slug] folder name means
// /stories/anything will land here, with params.slug = "anything".

// Pre-build a page for each story at build time (fast, static pages).
// Stories published later are rendered on first visit, then cached.
export async function generateStaticParams() {
  return (await getAllStories()).map((s) => ({ slug: s.slug }));
}

// Re-check Supabase at most once a minute, so edits and takedowns show up
export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const image = CATEGORY_IMAGES[story.category];
  const more = (await getAllStories()).filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            placeholder="blur"
            fill
            priority
            sizes="100vw"
            className="-z-10 animate-slow-zoom object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-foreground/30 via-accent-deep/55 to-background" />
          <div className="mx-auto max-w-3xl px-5 pt-20 pb-24 text-center text-white animate-fade-up sm:pt-28 sm:pb-32">
            <Link
              href={`/stories?category=${encodeURIComponent(story.category)}`}
              className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur transition hover:bg-white/30"
            >
              {story.category}
            </Link>
            <h1 className="mt-6 font-serif text-5xl leading-[1.08] font-semibold text-balance drop-shadow-sm sm:text-6xl">
              {story.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-xl text-white/90 italic">{story.excerpt}</p>
            <p className="mt-6 text-sm tracking-wide text-white/80">
              {story.author} · {formatDate(story.date)}
            </p>
          </div>
        </header>

        <div className="relative mx-auto -mt-12 max-w-3xl px-5">
          <div className="rounded-[2.5rem] bg-card px-6 py-12 shadow-xl shadow-accent/10 sm:px-14 sm:py-16">
            {/* Only the team can publish stories right now, so this HTML is trusted.
                Once users can submit stories (Phase 3), sanitize it before rendering. */}
            <div className="story-body drop-cap" dangerouslySetInnerHTML={{ __html: story.html }} />
            <p className="mt-12 text-center text-2xl tracking-[1em] text-gold" aria-hidden>✦✦✦</p>
            <p className="mt-6 text-center font-script text-3xl text-accent">thank you for reading</p>
          </div>
          <div className="mt-10 text-center">
            <Link href="/stories" className="text-accent-deep underline decoration-blush underline-offset-8 hover:decoration-accent">
              ← Back to all stories
            </Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <p className="font-script text-3xl text-accent">keep reading</p>
            <h2 className="font-serif text-4xl font-semibold">More shades</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {more.map((s, i) => (
              <Reveal key={s.slug} delay={i * 150}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
