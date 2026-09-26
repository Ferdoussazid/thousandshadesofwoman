import "server-only";
import { createClient } from "@supabase/supabase-js";

// A server-side Supabase client using the public (publishable/anon) key.
// It can only do what the Row Level Security policies in
// supabase/migrations allow: read published stories and join the waitlist.
// It doesn't read cookies, so pages that use it can still be cached.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase isn't configured. Copy .env.example to .env.local and fill in " +
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY " +
      "(Supabase dashboard → Project Settings → API Keys).",
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
