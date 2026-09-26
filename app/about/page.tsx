import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-serif text-4xl font-semibold">About Thousand Shades</h1>
      <div className="story-body mt-8">
        <p>
          Every woman carries stories that rarely get told out loud: the job she
          walked away from, the diagnosis that rearranged her life, the first
          year of motherhood that nobody warned her about, the version of herself
          she had to rebuild from scratch.
        </p>
        <p>
          Thousand Shades is a home for those stories. Each one is a single
          shade. None of them is the whole picture, but together they show how
          many ways there are to be a woman in the world.
        </p>
        <h2>What we believe</h2>
        <p>
          Your story belongs to you. You can share it under your own name, a pen
          name, or anonymously, and you can ask us to take it down at any time.
        </p>
        <p>
          We read every story before it&apos;s published. We edit for clarity,
          never for meaning, and we never publish anything that identifies
          someone else without their consent.
        </p>
        <h2>Where we&apos;re going</h2>
        <p>
          Right now, we&apos;re a small collection of stories. Soon you&apos;ll be
          able to submit your own. Later, we hope to grow into a newsletter, a
          podcast, and maybe one day a printed anthology.
        </p>
      </div>
    </div>
  );
}
