import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { AGE_COLLECTIONS, type AgeGroup, type Product } from "@/lib/types";

export const metadata = {
  title: "Shop | Thousand Shades of Women",
};

const CATEGORIES: { key: Product["category"]; label: string }[] = [
  { key: "shades", label: "Shades" },
  { key: "jewelry", label: "Jewelry" },
  { key: "bags", label: "Bags" },
  { key: "scarves", label: "Scarves" },
];

interface ShopPageProps {
  searchParams: { age_group?: string; category?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const ageGroup = AGE_COLLECTIONS.find((c) => c.key === searchParams.age_group)?.key as
    | AgeGroup
    | undefined;
  const category = CATEGORIES.find((c) => c.key === searchParams.category)?.key;

  const products = await getProducts({ ageGroup, category });
  const activeCollection = AGE_COLLECTIONS.find((c) => c.key === ageGroup);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-4xl">
          {activeCollection ? `${activeCollection.title} Collection` : "Shop All"}
        </h1>
        <p className="mt-3 max-w-xl text-neutral-600">
          {activeCollection
            ? activeCollection.tagline
            : "Shades for every age, plus jewelry, bags and scarves to complete the look."}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <FilterChip href="/shop" label="All" active={!ageGroup && !category} />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.key}
            href={`/shop?category=${c.key}`}
            label={c.label}
            active={category === c.key}
          />
        ))}
        {AGE_COLLECTIONS.map((c) => (
          <FilterChip
            key={c.key}
            href={`/shop?age_group=${c.key}`}
            label={`${c.title} (${c.ageLabel})`}
            active={ageGroup === c.key}
          />
        ))}
      </div>

      {products.length === 0 ? (
        <p className="py-20 text-center text-neutral-500">No products found for this filter.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-300 text-neutral-700 hover:border-rose-400 hover:text-rose-500"
      }`}
    >
      {label}
    </Link>
  );
}
