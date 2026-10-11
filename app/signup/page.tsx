import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Join Thousand Shades of Woman to share your personal story and connect with real women.",
};

export default function SignupPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-20 size-80 rounded-full bg-petal blur-3xl" />
      <div className="relative">
        <SignupForm />
      </div>
    </div>
  );
}

