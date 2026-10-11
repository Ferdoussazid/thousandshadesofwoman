"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "./actions";

type ProfileProps = {
  initialDisplayName: string;
  initialUsername: string;
  initialBio: string;
  email: string;
};

export default function ProfileForm({
  initialDisplayName,
  initialUsername,
  initialBio,
  email,
}: ProfileProps) {
  const [state, formAction, isPending] = useActionState<ProfileFormState, FormData>(
    updateProfile,
    {}
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800">
          {state.success}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-medium tracking-wider text-muted uppercase">
          Email address
        </label>
        <input
          id="email"
          type="email"
          disabled
          value={email}
          className="mt-1.5 block w-full rounded-2xl border border-line/60 bg-petal/40 px-4 py-3 text-sm text-muted cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-muted/70">Your email is kept private and never shown on your public stories.</p>
      </div>

      <div>
        <label htmlFor="displayName" className="block text-xs font-medium tracking-wider text-muted uppercase">
          Display name / Pen name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          defaultValue={initialDisplayName}
          placeholder="Maya"
          className="mt-1.5 block w-full rounded-2xl border border-line bg-background/50 px-4 py-3 text-sm text-foreground transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-xs font-medium tracking-wider text-muted uppercase">
          Username
        </label>
        <div className="mt-1.5 flex rounded-2xl border border-line bg-background/50 focus-within:border-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/20">
          <span className="flex items-center pl-4 text-sm text-muted">@</span>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={initialUsername}
            placeholder="maya_storyteller"
            className="block w-full rounded-2xl bg-transparent px-2 py-3 text-sm text-foreground focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-xs font-medium tracking-wider text-muted uppercase">
          Short bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          maxLength={500}
          defaultValue={initialBio}
          placeholder="Tell other women a little about yourself, your season of life, or what you write about..."
          className="mt-1.5 block w-full rounded-2xl border border-line bg-background/50 px-4 py-3 text-sm text-foreground transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-accent px-7 py-3 text-sm font-medium tracking-wide text-white shadow-md shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
        >
          {isPending ? "Saving changes..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
