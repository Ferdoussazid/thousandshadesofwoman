import Link from "next/link";
import type { Product } from "@/lib/types";
import { AGE_GROUP_LABELS } from "@/lib/types";
import ShadesIllustration from "./ShadesIllustration";

const CATEGORY_LABELS: Record<Product["category"], string> = {
  shades: "Shades",
  jewelry: "Jewelry",
  bags: "Bags",
  scarves: "Scarves",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="flex h-52 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${product.color_from}, ${product.color_to})`,
        }}
      >
        {product.category === "shades" ? (
          <ShadesIllustration className="h-24 w-48 text-neutral-900/70 transition group-hover:scale-110" />
        ) : (
          <span className="font-display text-5xl italic text-white/80 transition group-hover:scale-110">
            {product.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-rose-400">
          <span>{CATEGORY_LABELS[product.category]}</span>
          {product.age_group && (
            <>
              <span className="text-neutral-300">•</span>
              <span>{AGE_GROUP_LABELS[product.age_group]}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 font-display text-lg">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-neutral-700">${product.price}</p>
      </div>
    </Link>
  );
}
