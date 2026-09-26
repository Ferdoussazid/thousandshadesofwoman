import Link from "next/link";
import { formatDate, type StoryMeta } from "@/lib/stories";

export default function StoryCard({ story }: { story: StoryMeta }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-accent">
        {story.category}
      </span>
      <h3 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
        {story.title}
      </h3>
      <p className="mt-2 flex-1 text-muted">{story.excerpt}</p>
      <p className="mt-4 text-sm text-muted">
        {story.author} · {formatDate(story.date)}
      </p>
    </Link>
  );
}
