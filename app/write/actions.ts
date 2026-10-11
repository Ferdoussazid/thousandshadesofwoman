"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, getUser, getProfile } from "@/lib/supabase/server";
import { predictCategory } from "@/lib/categorizer";
import { CATEGORIES, type Category } from "@/lib/story-types";

export type PublishStoryState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50)
    .replace(/^-+|-+$/g, "");

  const suffix = Math.random().toString(36).substring(2, 6);
  return base ? `${base}-${suffix}` : `story-${suffix}`;
}

function cleanExcerpt(body: string): string {
  // Strip markdown headers, blockquotes, links, bold
  const clean = body
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .trim();

  if (clean.length <= 220) return clean;
  return clean.slice(0, 217).trim() + "...";
}

export async function publishStory(
  _prevState: PublishStoryState,
  formData: FormData
): Promise<PublishStoryState> {
  const user = await getUser();
  if (!user) {
    return { error: "You must be signed in to publish a story." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const rawExcerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const selectedCategory = String(formData.get("category") ?? "auto");
  const authorType = String(formData.get("authorType") ?? "profile");
  const customPenName = String(formData.get("penName") ?? "").trim();

  // Validation
  if (!title || title.length < 3) {
    return { error: "Please give your story a title (at least 3 characters)." };
  }
  if (title.length > 200) {
    return { error: "Title must be under 200 characters." };
  }
  if (!body || body.length < 50) {
    return { error: "Your story is a bit too short. Share at least 50 characters." };
  }

  // Determine category (auto or chosen)
  let category: Category;
  if (selectedCategory !== "auto" && CATEGORIES.includes(selectedCategory as Category)) {
    category = selectedCategory as Category;
  } else {
    const prediction = predictCategory(title, body);
    category = prediction.category;
  }

  // Determine author name privacy
  let authorName = "Anonymous";
  if (authorType === "profile") {
    const profile = await getProfile();
    authorName = profile?.display_name || user.email?.split("@")[0] || "Author";
  } else if (authorType === "pen_name") {
    authorName = customPenName || "Pen Name";
  } else {
    authorName = "Anonymous";
  }

  const excerpt = rawExcerpt ? rawExcerpt.slice(0, 300) : cleanExcerpt(body);
  const slug = slugify(title);
  const today = new Date().toISOString().split("T")[0];

  const supabase = await createClient();

  const { error } = await supabase.from("stories").insert({
    slug,
    title,
    author_name: authorName,
    category,
    excerpt,
    body,
    status: "published",
    submitted_by: user.id,
    published_at: today,
  });

  if (error) {
    console.error("Failed to insert story:", error);
    return { error: `Could not publish story: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/profile");

  redirect(`/stories/${slug}`);
}
