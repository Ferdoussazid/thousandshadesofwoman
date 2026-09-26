"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "./actions";

const initialState: WaitlistState = { ok: false, message: "" };

export default function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.ok) {
    return (
      <p className="mt-8 inline-flex animate-fade-up items-center gap-3 rounded-full bg-card/90 px-6 py-3 font-medium text-accent-deep shadow-md shadow-accent/10">
        <span className="text-gold" aria-hidden>✦</span>
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:flex-wrap">
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-line bg-card/90 px-6 py-3.5 shadow-sm shadow-accent/5 backdrop-blur transition outline-none placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
      />
      <button
        disabled={pending}
        className="rounded-full bg-accent px-7 py-3.5 font-medium tracking-wide text-white shadow-lg shadow-accent/30 transition duration-300 hover:-translate-y-0.5 hover:bg-accent-deep disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </button>
      <p aria-live="polite" className="px-2 text-sm text-accent-deep sm:basis-full">
        {state.message}
      </p>
    </form>
  );
}
