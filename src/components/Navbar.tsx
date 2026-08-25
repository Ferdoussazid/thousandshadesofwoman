import Link from "next/link";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=shades", label: "Shades" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-xl tracking-wide sm:text-2xl">
          Thousand <span className="italic text-rose-500">Shades</span> of Women
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 sm:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-rose-500">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/shop"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500 sm:hidden"
        >
          Shop
        </Link>
      </div>
    </header>
  );
}
