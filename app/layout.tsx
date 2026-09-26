import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";

const sans = Jost({ variable: "--font-sans", subsets: ["latin"] });
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const script = Pinyon_Script({ variable: "--font-script", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "Thousand Shades of Woman",
    template: "%s · Thousand Shades",
  },
  description: "Real stories from real women, one shade at a time.",
};

const NAV = [
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/guidelines", label: "Guidelines" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-baseline gap-1.5 leading-none">
      <span className="font-serif text-2xl font-semibold tracking-wide">Thousand Shades</span>
      <span className="font-script text-2xl text-accent transition-colors group-hover:text-accent-deep">
        of woman
      </span>
    </Link>
  );
}

// The root layout wraps every page, so the header and footer live here.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-50 border-b border-line/60 bg-background/75 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
            <Logo />
            <div className="flex items-center gap-5 text-sm tracking-wide text-muted sm:gap-7">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-1 transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#waitlist"
                className="hidden rounded-full bg-accent px-5 py-2 text-white shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-deep sm:inline-block"
              >
                Share your shade
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="relative overflow-hidden border-t border-line bg-petal">
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-blush blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[2fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm font-serif text-lg text-muted italic">
                Real stories from real women, one shade at a time.
              </p>
            </div>
            <div className="text-sm">
              <p className="font-medium tracking-widest text-foreground uppercase">Read</p>
              <ul className="mt-4 space-y-2 text-muted">
                <li><Link href="/stories" className="hover:text-accent">All stories</Link></li>
                <li><Link href="/about" className="hover:text-accent">About us</Link></li>
              </ul>
            </div>
            <div className="text-sm">
              <p className="font-medium tracking-widest text-foreground uppercase">Care</p>
              <ul className="mt-4 space-y-2 text-muted">
                <li><Link href="/guidelines" className="hover:text-accent">Privacy & guidelines</Link></li>
                <li><Link href="/#waitlist" className="hover:text-accent">Join the waitlist</Link></li>
              </ul>
            </div>
          </div>
          <div className="relative border-t border-line/70">
            <p className="mx-auto max-w-6xl px-5 py-6 text-xs tracking-wide text-muted">
              © {new Date().getFullYear()} Thousand Shades of Woman · Made with love, for every woman.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
