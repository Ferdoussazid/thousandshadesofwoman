import Link from "next/link";
import { AGE_COLLECTIONS } from "@/lib/types";

export const metadata = {
  title: "Our Story | Thousand Shades of Women",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Our Story</p>
      <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
        Every woman is a <span className="italic text-rose-500">thousand shades.</span>
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-neutral-700">
        <p>
          Thousand Shades of Women began with a simple observation: the accessories world designs
          for one imaginary woman — one age, one style, one story. But the women we know are
          teenagers finding their voice, thirty-somethings building empires, fifty-somethings at
          the height of their power, and grandmothers who still turn heads.
        </p>
        <p>
          So we built a brand around all of them. Our signature sunglasses come in four
          collections, each designed with the fit, weight and character of a different chapter of
          life — because the light a woman carries changes, and her shades should too.
        </p>
        <p>
          Around our hero shades we craft the finishing touches: jewelry that catches golden hour,
          silk scarves that travel from hair to handbag, and bags that hold a whole mood.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {AGE_COLLECTIONS.map((c) => (
          <div key={c.key} className="rounded-2xl border border-rose-100 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400">
              {c.ageLabel}
            </p>
            <h2 className="mt-1 font-display text-xl">{c.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{c.tagline}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/shop"
          className="inline-block rounded-full bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-rose-500"
        >
          Find Your Shade
        </Link>
      </div>
    </div>
  );
}
