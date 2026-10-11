import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import UserNav from "./UserNav";
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const NAV = [
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/guidelines", label: "Guidelines" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center transition-opacity hover:opacity-90 ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="Thousand Shades of Woman"
        width={245}
        height={44}
        priority
        unoptimized
        className="h-10 w-auto sm:h-12 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
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
            <div className="flex items-center gap-4 text-sm tracking-wide text-muted sm:gap-7">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-1 transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              ))}
              <UserNav />
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
