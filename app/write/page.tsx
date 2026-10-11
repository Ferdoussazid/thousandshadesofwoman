import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getUser, getProfile } from "@/lib/supabase/server";
import StoryEditor from "./StoryEditor";

export const metadata: Metadata = {
  title: "Write a Story",
  description: "Share your personal story and experiences on Thousand Shades of Woman.",
};

export default async function WritePage() {
  const user = await getUser();
  if (!user) {
    redirect("/login?next=/write");
  }

  const profile = await getProfile();
  const displayName = profile?.display_name || user.email?.split("@")[0] || "Author";

  return (
    <div className="relative mx-auto max-w-3xl px-5 py-12 sm:py-20">
      <div className="pointer-events-none absolute -top-24 -left-28 size-96 rounded-full bg-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute top-48 -right-28 size-96 rounded-full bg-petal blur-3xl" />

      <div className="relative mb-10 text-center sm:mb-14">
        <p className="font-script text-3xl text-accent sm:text-4xl">share your shade</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Write Your Story
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Every story here is one shade of a bigger picture, told by women who found their own way to stand on their own feet.
        </p>
      </div>

      <div className="relative">
        <StoryEditor profileDisplayName={displayName} />
      </div>
    </div>
  );
}
