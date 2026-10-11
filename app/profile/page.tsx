import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getUser, getProfile, createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Your Profile",
  description: "Manage your profile, pen name, and stories on Thousand Shades of Woman.",
};

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();
  const supabase = await createClient();

  // Load any stories authored by this user
  const { data: userStories } = await supabase
    .from("stories")
    .select("slug, title, category, status, published_at, created_at")
    .eq("submitted_by", user.id)
    .order("created_at", { ascending: false });

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Author";
  const username = profile?.username || "";
  const bio = profile?.bio || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 size-80 rounded-full bg-petal blur-3xl" />

      {/* Header banner */}
      <div className="relative mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8">
        <div className="flex items-center gap-5">
          {profile?.avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="size-16 rounded-full border-2 border-line object-cover shadow-sm"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full bg-accent text-2xl font-serif font-bold text-white shadow-md shadow-accent/20">
              {initial}
            </div>
          )}
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              {displayName}
            </h1>
            <p className="mt-0.5 text-sm text-muted">
              {username ? `@${username}` : user.email}
            </p>
          </div>
        </div>

        <Link
          href="/write"
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium tracking-wide text-white shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-deep"
        >
          Write a story
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Profile Settings */}
        <section className="rounded-3xl border border-line bg-card/80 p-6 shadow-xs backdrop-blur sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Account Details
          </h2>
          <p className="mt-1 text-xs text-muted">
            Configure how your name and identity appear across stories and comments.
          </p>

          <div className="mt-6">
            <ProfileForm
              initialDisplayName={displayName}
              initialUsername={username}
              initialBio={bio}
              email={user.email || ""}
            />
          </div>
        </section>

        {/* Stories Section */}
        <section className="space-y-6">
          <div className="rounded-3xl border border-line bg-card/80 p-6 shadow-xs backdrop-blur sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Your Stories
            </h2>
            <p className="mt-1 text-xs text-muted">
              Stories and shades you have contributed.
            </p>

            <div className="mt-6">
              {userStories && userStories.length > 0 ? (
                <div className="space-y-3">
                  {userStories.map((s) => (
                    <div
                      key={s.slug}
                      className="rounded-2xl border border-line/60 bg-background/50 p-4 transition hover:border-accent/40"
                    >
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="font-medium text-accent">{s.category}</span>
                        <span className="capitalize">{s.status}</span>
                      </div>
                      <Link
                        href={`/stories/${s.slug}`}
                        className="mt-1 block font-serif text-lg font-medium text-foreground hover:text-accent-deep"
                      >
                        {s.title}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-petal/30 p-8 text-center">
                  <p className="font-serif text-lg text-muted italic">
                    You haven&apos;t published any stories yet.
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    When submissions open, your written stories will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

