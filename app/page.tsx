import Image from "next/image";
import Link from "next/link";
import { CATEGORY_IMAGES, IMAGES } from "@/lib/images";
import { CATEGORIES, getAllStories } from "@/lib/stories";
import Reveal from "./Reveal";
import StoryCard from "./StoryCard";
import WaitlistForm from "./WaitlistForm";

// Re-check Supabase for new stories at most once a minute
export const revalidate = 60;

const WORDS = [
  "Courage",
  "Softness",
  "Independence",
  "Ambition",
  "Motherhood",
  "Healing",
  "Starting over",
  "Joy",
  "Resilience",
  "Sisterhood",
];

const PROMISES = [
  {
    title: "Your name, your choice",
    body: "Share under your real name, a pen name, or anonymously. We never show your contact details.",
  },
  {
    title: "Read with care",
    body: "Every story is read by a person before it's published. We edit for clarity, never for meaning.",
  },
  {
    title: "Yours to take back",
    body: "Ask us to edit or remove your story at any time. No questions, no explanations needed.",
  },
];

export default async function Home() {
  const latest = (await getAllStories()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-32 size-128 animate-drift rounded-full bg-blush/80 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-40 size-112 animate-drift rounded-full bg-mauve/20 blur-3xl [animation-delay:-8s]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-20 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-28">
          <div className="animate-fade-up">
            <p className="font-script text-4xl text-accent sm:text-5xl">for every woman</p>
            <h1 className="mt-3 font-serif text-5xl leading-[1.05] font-semibold text-balance sm:text-7xl">
              Real stories from real women,{" "}
              <em className="font-medium text-accent-deep">one shade</em> at a time.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Career, motherhood, identity, and the hard seasons in between. Every story here is
              one shade of a bigger picture, told by women who found their own way to stand on
              their own feet.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/stories"
                className="rounded-full bg-accent px-8 py-3.5 font-medium tracking-wide text-white shadow-lg shadow-accent/30 transition duration-300 hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                Read the stories
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-accent/30 bg-card/60 px-8 py-3.5 font-medium tracking-wide text-accent-deep backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent"
              >
                Why we exist
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms]">
            <div className="absolute -inset-4 rounded-t-full rounded-b-[3rem] border border-gold/50" />
            <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-2xl shadow-accent/20">
              <Image
                src={IMAGES.heroPinkSuit}
                alt="A confident woman in a bright pink suit, arms crossed, smiling softly"
                placeholder="blur"
                priority
                sizes="(min-width: 768px) 28rem, 90vw"
                className="size-full animate-slow-zoom object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 w-36 animate-float overflow-hidden rounded-full border-4 border-background shadow-xl sm:-left-12 sm:w-44">
              <Image
                src={IMAGES.womenLaughing}
                alt="Three women laughing together, arms around each other"
                placeholder="blur"
                sizes="11rem"
                className="aspect-square object-cover"
              />
            </div>
            <div className="absolute top-10 -right-4 max-w-48 animate-float-slow rounded-3xl bg-card/90 p-4 shadow-xl shadow-accent/10 backdrop-blur sm:-right-10">
              <p className="font-serif text-lg leading-snug text-accent-deep italic">
                &ldquo;I stopped waiting for permission.&rdquo;
              </p>
              <p className="mt-2 text-xs tracking-wider text-muted uppercase">A shade of courage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee of words */}
      <div className="overflow-hidden border-y border-line bg-petal py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 font-serif text-2xl whitespace-nowrap text-accent-deep/80 italic">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w} <span className="text-base text-gold not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Latest stories */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-3xl text-accent">freshly shared</p>
            <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Latest shades</h2>
          </div>
          <Link href="/stories" className="text-accent-deep underline decoration-blush underline-offset-8 transition hover:decoration-accent">
            See every story →
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {latest.map((story, i) => (
            <Reveal key={story.slug} delay={i * 150}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Themes */}
      <section className="bg-linear-to-b from-background via-petal to-background py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="font-script text-3xl text-accent">find yourself here</p>
            <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Explore by theme</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Six shades of a woman&apos;s life. Wander into whichever one you need today.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const img = CATEGORY_IMAGES[c];
              return (
                <Reveal key={c} delay={(i % 3) * 120}>
                  <Link
                    href={`/stories?category=${encodeURIComponent(c)}`}
                    className="group relative block aspect-4/5 overflow-hidden rounded-4xl shadow-md shadow-accent/10 sm:aspect-square"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="size-full object-cover transition duration-[1.4s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-accent-deep/85 via-accent-deep/25 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                      <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{c}</h3>
                      <p className="mt-1 hidden text-sm text-white/85 sm:block">{img.blurb}</p>
                      <span className="mt-3 inline-block translate-y-2 text-sm tracking-wide opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Read these stories →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Independence */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={IMAGES.risingSunset}
          alt=""
          placeholder="blur"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[70%_bottom] md:object-[center_92%]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-foreground/85 via-accent-deep/55 to-transparent" />
        <div className="mx-auto max-w-6xl px-5 py-32 sm:py-40">
          <Reveal className="max-w-xl text-white">
            <p className="font-script text-4xl text-blush">standing on her own</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight font-semibold sm:text-6xl">
              Independence isn&apos;t doing it alone. It&apos;s knowing you can.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              These are stories of women who built careers, raised children, left what hurt them,
              and started again. Read them, and remember you&apos;re never the only one.
            </p>
            <Link
              href="/stories?category=Starting%20Over"
              className="mt-10 inline-block rounded-full bg-white px-8 py-3.5 font-medium tracking-wide text-accent-deep shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blush"
            >
              Stories of starting over
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Promises */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute -inset-3 -rotate-2 rounded-[3rem] bg-blush" />
            <div className="relative aspect-4/3 overflow-hidden rounded-[2.5rem] shadow-xl shadow-accent/15">
              <Image
                src={IMAGES.womenTogether}
                alt="A group of women sitting together on steps, laughing"
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-script text-3xl text-accent">a safe place</p>
              <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Your story is held gently</h2>
            </Reveal>
            <ul className="mt-10 space-y-7">
              {PROMISES.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 150} className="flex gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush font-serif text-xl text-accent-deep">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">{p.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{p.body}</p>
                    </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={450}>
              <Link href="/guidelines" className="mt-8 inline-block text-accent-deep underline decoration-blush underline-offset-8 hover:decoration-accent">
                Read our privacy & content guidelines →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-24 px-5 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] shadow-xl shadow-accent/10">
            <Image
              src={IMAGES.floralRose}
              alt=""
              placeholder="blur"
              fill
              sizes="(min-width: 1152px) 72rem, 100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-linear-to-r from-petal via-petal/90 to-petal/30" />
            <div className="relative px-8 py-16 sm:px-14 sm:py-20">
              <p className="font-script text-4xl text-accent">your shade matters</p>
              <h2 className="mt-2 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
                Story submissions are opening soon
              </h2>
              <p className="mt-4 max-w-lg text-lg text-muted">
                Join the waitlist and we&apos;ll write to you the moment you can share your own
                story. No spam, ever. Just one gentle email.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
