import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Name, a valid email and a message are required." },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name: name.trim(), email, message: message.trim() });
    if (error) {
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Thank you! We'll be in touch soon." });
}
