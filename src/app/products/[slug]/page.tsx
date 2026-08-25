import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ShadesIllustration from "@/components/ShadesIllustration";
import { getProductBySlug, getProducts } from "@/lib/products";
import { AGE_COLLECTIONS, AGE_GROUP_LABELS } from "@/lib/types";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const collection = AGE_COLLECTIONS.find((c) => c.key === product.age_group);
  const related = (
    await getProducts(
      product.age_group ? { ageGroup: product.age_group } : { category: product.category }
    )
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="mb-8 text-sm text-neutral-500">
        <Link href="/shop" className="hover:text-rose-500">
          Shop
        </Link>{" "}
        / <span className="text-neutral-800">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div
          className="flex h-80 items-center justify-center rounded-3xl sm:h-96"
          style={{
            background: `linear-gradient(135deg, ${product.color_from}, ${product.color_to})`,
          }}
        >
          {product.category === "shades" ? (
            <ShadesIllustration className="h-32 w-64 text-neutral-900/70" />
          ) : (
            <span className="font-display text-8xl italic text-white/80">
              {product.name.charAt(0)}
            </span>
          )}
        </div>

        <div>
          {product.age_group && (
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-400">
              {collection?.title} · {AGE_GROUP_LABELS[product.age_group]}
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold">${product.price}</p>
          <p className="mt-6 leading-relaxed text-neutral-600">{product.description}</p>

          <ul className="mt-8 space-y-2 text-sm text-neutral-600">
            <li>✦ UV400 lens protection</li>
            <li>✦ Free shipping on orders over $75</li>
            <li>✦ 30-day easy returns</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-rose-500">
              Add to Bag
            </button>
            <Link
              href="/contact"
              className="rounded-full border border-neutral-300 px-8 py-3 font-medium transition hover:border-rose-400 hover:text-rose-500"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl">You may also love</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
