import Image from "next/image";
import Link from "next/link";
import { CATEGORY_IMAGES } from "@/lib/images";
import { formatDate, type StoryMeta } from "@/lib/stories";

export default function StoryCard({ story }: { story: StoryMeta }) {
  const image = CATEGORY_IMAGES[story.category];

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-card shadow-sm shadow-accent/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/15"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="size-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium tracking-wider text-accent-deep uppercase backdrop-blur">
          {story.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-snug font-semibold transition-colors group-hover:text-accent">
          {story.title}
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{story.excerpt}</p>
        <div className="mt-6 flex items-end justify-between gap-4 text-sm text-muted">
          <span>
            {story.author} · {formatDate(story.date)}
          </span>
          <span className="shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
