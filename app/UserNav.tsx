import Link from "next/link";
import { getUser, getProfile } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function UserNav() {
  const user = await getUser();
  const profile = user ? await getProfile() : null;

  if (!user) {
    return (
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/login"
          className="text-sm tracking-wide text-muted transition hover:text-accent font-medium"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-deep"
        >
          Join us
        </Link>
      </div>
    );
  }

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Author";
  const avatarUrl = profile?.avatar_url;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link
        href="/write"
        className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium tracking-wide text-white shadow-xs transition hover:-translate-y-0.5 hover:bg-accent-deep"
      >
        Write
      </Link>

      <Link
        href="/profile"
        className="group flex items-center gap-2.5 rounded-full border border-line bg-card/60 py-1 pl-1 pr-3 shadow-xs transition hover:border-accent/40 hover:bg-white"
        title="View profile"
      >
        {avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={displayName}
            className="size-7 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white shadow-xs">
            {initial}
          </div>
        )}
        <span className="hidden max-w-28 truncate text-xs font-medium text-foreground sm:inline-block">
          {displayName}
        </span>
      </Link>

      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-petal hover:text-accent-deep cursor-pointer"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

