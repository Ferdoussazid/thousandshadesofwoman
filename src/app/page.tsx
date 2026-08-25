import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ShadesIllustration from "@/components/ShadesIllustration";
import { getProducts } from "@/lib/products";
import { AGE_COLLECTIONS } from "@/lib/types";

export default async function HomePage() {
  const featured = await getProducts({ featured: true });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-amber-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Women&apos;s Accessories
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl">
              A Thousand Shades, <span className="italic text-rose-500">One You.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
              Signature sunglasses designed for every chapter of a woman&apos;s life — from her
              teens to her sixties and beyond — plus the jewelry, bags and scarves to match.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop?category=shades"
                className="rounded-full bg-neutral-900 px-7 py-3 font-medium text-white transition hover:bg-rose-500"
              >
                Shop Shades
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-neutral-300 px-7 py-3 font-medium transition hover:border-rose-400 hover:text-rose-500"
              >
                Explore All
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center sm:h-80">
            <div className="absolute inset-0 rotate-3 rounded-[3rem] bg-gradient-to-br from-rose-300 via-amber-200 to-violet-300 opacity-80" />
            <ShadesIllustration className="relative h-40 w-80 text-neutral-900/80" />
          </div>
        </div>
      </section>

      {/* Shop by age */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Shades for Every Age</h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            Four signature collections, each designed around the light a woman carries at every
            stage of her life.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AGE_COLLECTIONS.map((collection) => (
            <Link
              key={collection.key}
              href={`/shop?age_group=${collection.key}`}
              className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-36 items-center justify-center bg-gradient-to-br ${collection.gradient}`}
              >
                <ShadesIllustration className="h-16 w-32 text-neutral-900/60 transition group-hover:scale-110" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-400">
                  {collection.ageLabel}
                </p>
                <h3 className="mt-1 font-display text-xl">{collection.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {collection.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">Featured Shades</h2>
              <p className="mt-3 text-neutral-600">The frames our community loves most.</p>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-medium text-rose-500 hover:underline sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand story teaser */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl italic leading-snug text-balance sm:text-4xl">
          &ldquo;A woman is not one color. She is a thousand shades — and every one of them
          deserves to be seen.&rdquo;
        </h2>
        <Link
          href="/about"
          className="mt-8 inline-block rounded-full border border-neutral-300 px-7 py-3 font-medium transition hover:border-rose-400 hover:text-rose-500"
        >
          Read Our Story
        </Link>
      </section>
    </>
  );
}
