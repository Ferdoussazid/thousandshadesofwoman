import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_IMAGES, IMAGES } from "@/lib/images";
import { CATEGORIES, getAllStories, type Category } from "@/lib/stories";
import Reveal from "../Reveal";
import StoryCard from "../StoryCard";

export const metadata: Metadata = { title: "Stories" };

export const revalidate = 60;

// searchParams holds the "?category=..." part of the URL
export default async function StoriesPage({ searchParams }: PageProps<"/stories">) {
  const { category } = await searchParams;
  const active = typeof category === "string" ? category : undefined;
  const stories = await getAllStories(active);
  const theme = active && CATEGORIES.includes(active as Category) ? CATEGORY_IMAGES[active as Category] : null;

  const pill = (on: boolean) =>
    `rounded-full border px-5 py-2 text-sm tracking-wide transition duration-300 ${
      on
        ? "border-accent bg-accent text-white shadow-md shadow-accent/25"
        : "border-line bg-card text-muted hover:-translate-y-0.5 hover:border-accent hover:text-accent"
    }`;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src={theme?.src ?? IMAGES.floralCosmos}
          alt=""
          placeholder="blur"
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/70 via-background/80 to-background" />
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-16 text-center animate-fade-up">
          <p className="font-script text-4xl text-accent">{active ? "a shade of" : "every shade"}</p>
          <h1 className="font-serif text-5xl font-semibold sm:text-6xl">{active ?? "Stories"}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            {theme?.blurb ?? "Every story is one shade. Browse by theme, or read them all."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/stories" className={pill(!active)}>All</Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/stories?category=${encodeURIComponent(c)}`}
              className={pill(active === c)}
            >
              {c}
            </Link>
          ))}
        </div>

        {stories.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, i) => (
              <Reveal key={story.slug} delay={(i % 3) * 150}>
                <StoryCard story={story} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mx-auto mt-16 max-w-lg rounded-[2.5rem] bg-petal px-8 py-14 text-center">
            <p className="font-script text-4xl text-accent">waiting for you</p>
            <p className="mt-3 font-serif text-2xl">No stories in this theme yet.</p>
            <p className="mt-2 text-muted">Yours could be the very first.</p>
            <Link
              href="/#waitlist"
              className="mt-8 inline-block rounded-full bg-accent px-7 py-3 font-medium text-white shadow-md shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Join the waitlist
            </Link>
          </Reveal>
        )}
      </div>
    </>
  );
}
