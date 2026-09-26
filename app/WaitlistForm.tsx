"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "./actions";

const initialState: WaitlistState = { ok: false, message: "" };

export default function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.ok) {
    return <p className="mt-6 font-medium text-accent">{state.message}</p>;
  }

  return (
    <form action={formAction} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap">
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-line bg-card px-5 py-3 outline-none focus:border-accent"
      />
      <button
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </button>
      <p aria-live="polite" className="text-sm text-red-700 sm:basis-full">
        {state.message}
      </p>
    </form>
  );
}
