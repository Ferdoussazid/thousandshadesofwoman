import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import Reveal from "../Reveal";

export const metadata: Metadata = { title: "About" };

const BELIEFS = [
  {
    title: "Your story belongs to you",
    body: "Share it under your own name, a pen name, or anonymously, and ask us to take it down at any time.",
  },
  {
    title: "Every voice is edited with care",
    body: "We read every story before it's published. We edit for clarity, never for meaning.",
  },
  {
    title: "No one is exposed",
    body: "We never publish anything that identifies someone else without their consent.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-0 size-120 animate-drift rounded-full bg-blush/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <p className="font-script text-4xl text-accent">our story</p>
            <h1 className="mt-2 font-serif text-5xl leading-tight font-semibold sm:text-6xl">
              A home for the stories women rarely tell out loud
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              The job she walked away from. The diagnosis that rearranged her life. The first year
              of motherhood nobody warned her about. The version of herself she had to rebuild from
              scratch.
            </p>
          </div>
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute -inset-3 rotate-2 rounded-[3rem] border border-gold/50" />
            <div className="relative aspect-4/3 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-accent/20">
              <Image
                src={IMAGES.womenCircle}
                alt="A close group of young women of different backgrounds looking into the camera"
                placeholder="blur"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="size-full animate-slow-zoom object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-petal py-24">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <p className="font-serif text-3xl leading-snug text-accent-deep italic sm:text-4xl">
            &ldquo;Each story is a single shade. None of them is the whole picture, but together
            they show how many ways there are to be a woman in the world.&rdquo;
          </p>
          <p className="mt-6 text-2xl tracking-[1em] text-gold" aria-hidden>✦✦✦</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-accent">what we believe</p>
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Held with care</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BELIEFS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 150}
              className="rounded-4xl border border-line bg-card p-8 shadow-sm shadow-accent/5 transition duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-blush font-serif text-xl text-accent-deep">
                {i + 1}
              </span>
              <h3 className="mt-6 font-serif text-2xl font-semibold">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem]">
          <Image src={IMAGES.floralCosmos} alt="" placeholder="blur" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-background/75" />
          <div className="relative px-8 py-16 text-center sm:py-20">
            <p className="font-script text-4xl text-accent">where we&apos;re going</p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Right now we&apos;re a small collection of stories. Soon you&apos;ll be able to
              submit your own. Later, we hope to grow into a newsletter, a podcast, and maybe one
              day a printed anthology.
            </p>
            <Link
              href="/#waitlist"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium tracking-wide text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Be the first to know
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
