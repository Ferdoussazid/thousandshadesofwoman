import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Lora({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Thousand Shades",
    template: "%s · Thousand Shades",
  },
  description: "Real stories from real women, one shade at a time.",
};

// The root layout wraps every page, so the header and footer live here.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-line">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
            <Link href="/" className="font-serif text-xl font-semibold">
              Thousand <span className="text-accent">Shades</span>
            </Link>
            <div className="flex gap-6 text-sm text-muted">
              <Link href="/stories" className="hover:text-foreground">Stories</Link>
              <Link href="/about" className="hover:text-foreground">About</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Thousand Shades</p>
            <Link href="/guidelines" className="hover:text-foreground">
              Privacy & content guidelines
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
