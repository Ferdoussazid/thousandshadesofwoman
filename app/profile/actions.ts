"use server";

import { revalidatePath } from "next/cache";
import { createClient, getUser } from "@/lib/supabase/server";

export type ProfileFormState = {
  error?: string;
  success?: string;
};

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const user = await getUser();
  if (!user) {
    return { error: "You must be signed in to update your profile." };
  }

  const displayName = String(formData.get("displayName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!displayName) {
    return { error: "Display name cannot be empty." };
  }

  if (username && !/^[a-z0-9_]{3,30}$/.test(username)) {
    return {
      error: "Username must be 3-30 characters and only contain letters, numbers, and underscores.",
    };
  }

  if (bio.length > 500) {
    return { error: "Bio cannot exceed 500 characters." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      display_name: displayName,
      username: username || undefined,
      bio: bio || null,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    if (error.code === "23505") {
      return { error: "That username is already taken. Please choose another." };
    }
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: "Profile updated successfully!" };
}
