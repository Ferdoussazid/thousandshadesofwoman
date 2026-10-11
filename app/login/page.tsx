import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Thousand Shades of Woman to read, write, and share stories.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-20 size-80 rounded-full bg-petal blur-3xl" />
      <div className="relative">
        <LoginForm errorParam={error} />
      </div>
    </div>
  );
}
