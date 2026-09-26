"use server";

import { supabase } from "@/lib/supabase";

export type WaitlistState = { ok: boolean; message: string };

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  // 23505 = unique violation: they're already on the list, which is fine
  if (error && error.code !== "23505") {
    console.error("Waitlist insert failed:", error);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  return { ok: true, message: "You're on the list. We'll email you when submissions open." };
}
