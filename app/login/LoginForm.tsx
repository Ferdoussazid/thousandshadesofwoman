"use client";

import { useActionState, useTransition } from "react";
import Link from "next/link";
import { signInWithEmail, signInWithGoogle, type AuthActionState } from "@/app/auth/actions";

export default function LoginForm({ errorParam }: { errorParam?: string }) {
  const [state, formAction, isPending] = useActionState<AuthActionState, FormData>(
    signInWithEmail,
    {}
  );
  const [isGooglePending, startGoogleTransition] = useTransition();

  const errorMessage = state.error || errorParam;

  return (
    <div className="w-full max-w-md rounded-3xl border border-line bg-card/90 p-8 shadow-xl shadow-accent/5 backdrop-blur sm:p-10">
      <div className="text-center">
        <p className="font-script text-3xl text-accent sm:text-4xl">welcome back</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Sign in to your space
        </h1>
        <p className="mt-2 text-sm text-muted">
          Read, write, and share your shade with our sisterhood.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800">
          {errorMessage}
        </div>
      )}

      {/* Google OAuth Button */}
      <div className="mt-8">
        <button
          type="button"
          disabled={isGooglePending || isPending}
          onClick={() => {
            startGoogleTransition(async () => {
              await signInWithGoogle();
            });
          }}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-accent/40 hover:bg-petal/40 hover:shadow disabled:opacity-60"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          {isGooglePending ? "Connecting to Google..." : "Continue with Google"}
        </button>
      </div>

      <div className="relative my-7 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line" />
        </div>
        <span className="relative bg-card px-4 font-serif text-xs text-muted tracking-widest uppercase">
          or with email
        </span>
      </div>

      {/* Email / Password Form */}
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium tracking-wider text-muted uppercase">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 block w-full rounded-2xl border border-line bg-background/50 px-4 py-3 text-sm text-foreground transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-xs font-medium tracking-wider text-muted uppercase">
              Password
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="mt-1.5 block w-full rounded-2xl border border-line bg-background/50 px-4 py-3 text-sm text-foreground transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isGooglePending}
          className="mt-2 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-muted">
        New to Thousand Shades?{" "}
        <Link href="/signup" className="font-semibold text-accent transition hover:text-accent-deep underline underline-offset-4">
          Create an account
        </Link>
      </div>
    </div>
  );
}

