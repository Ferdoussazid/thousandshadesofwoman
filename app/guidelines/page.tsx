import type { Metadata } from "next";
import Reveal from "../Reveal";

export const metadata: Metadata = { title: "Privacy & content guidelines" };

const SECTIONS = [
  {
    title: "Your privacy",
    body: [
      "You choose how you appear: your real name, a pen name, or “Anonymous.” We will never show your email address or any contact details publicly.",
      "You can ask us to edit or remove your story at any time, with no questions asked.",
    ],
  },
  {
    title: "What we publish",
    body: [
      "First-person, true stories about your own life: career, motherhood, identity, health, love and loss, starting over, and more.",
    ],
  },
  {
    title: "What we don't publish",
    body: [
      "Stories that name or identify other people without their consent, hate speech or harassment, graphic content without a clear purpose, advertising, or fiction presented as fact.",
    ],
  },
  {
    title: "Sensitive topics",
    body: [
      "Stories about abuse, self-harm, or loss are welcome. We add a content note at the top so readers can choose when they're ready to read.",
    ],
  },
];

export default function GuidelinesPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 size-120 animate-drift rounded-full bg-blush/70 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <div className="text-center animate-fade-up">
          <p className="font-script text-4xl text-accent">gently, always</p>
          <h1 className="font-serif text-5xl font-semibold sm:text-6xl">Privacy & content guidelines</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
            How we keep this a safe, honest, and kind place for every woman who shares here.
          </p>
        </div>
        <div className="mt-16 space-y-6">
          {SECTIONS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 100}
              className="rounded-4xl border border-line bg-card p-8 shadow-sm shadow-accent/5 sm:p-10"
            >
              <h2 className="flex items-center gap-4 font-serif text-3xl font-semibold text-accent-deep">
                <span className="text-lg text-gold" aria-hidden>✦</span>
                {s.title}
              </h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-muted">{p}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
