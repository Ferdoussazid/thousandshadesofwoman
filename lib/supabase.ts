import "server-only";
import { createClient } from "@supabase/supabase-js";

// A server-side Supabase client using the public (publishable/anon) key.
// It can only do what the Row Level Security policies in
// supabase/migrations allow: read published stories and join the waitlist.
// It doesn't read cookies, so pages that use it can still be cached.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_placeholder";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
);

export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

