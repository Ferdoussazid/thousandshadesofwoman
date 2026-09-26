import Link from "next/link";
import { CATEGORIES, getAllStories } from "@/lib/stories";
import StoryCard from "./StoryCard";
import WaitlistForm from "./WaitlistForm";

// Re-check Supabase for new stories at most once a minute
export const revalidate = 60;

export default async function Home() {
  const latest = (await getAllStories()).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Share your shade
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
          Real stories from real women, one shade at a time.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Career, motherhood, identity, and the hard seasons in between. Every
          story here is one shade of a bigger picture. You can share yours under
          your name, a pen name, or anonymously.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/stories"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Read the stories
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-line px-6 py-3 font-medium hover:bg-card"
          >
            Why we exist
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="font-serif text-2xl font-semibold">Latest shades</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {latest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="font-serif text-2xl font-semibold">Explore by theme</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/stories?category=${encodeURIComponent(c)}`}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm hover:border-accent hover:text-accent"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-3xl bg-accent/10 p-8 sm:p-12">
          <h2 className="font-serif text-3xl font-semibold">
            Story submissions are coming soon
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Soon you&apos;ll be able to share your own shade. Join the waitlist to
            hear when submissions open.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
