import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-blush">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">
            Thousand <span className="italic text-rose-500">Shades</span> of Women
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
            Accessories for every age, every mood, every shade of you.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold uppercase tracking-widest text-neutral-500">Explore</p>
          <ul className="space-y-2 text-neutral-700">
            <li><Link href="/shop" className="hover:text-rose-500">Shop All</Link></li>
            <li><Link href="/shop?category=shades" className="hover:text-rose-500">Signature Shades</Link></li>
            <li><Link href="/about" className="hover:text-rose-500">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-rose-500">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Join the family
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-rose-100 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Thousand Shades of Women. All rights reserved.
      </div>
    </footer>
  );
}
