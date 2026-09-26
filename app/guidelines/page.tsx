import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy & content guidelines" };

export default function GuidelinesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-serif text-4xl font-semibold">Privacy & content guidelines</h1>
      <div className="story-body mt-8">
        <h2>Your privacy</h2>
        <p>
          You choose how you appear: your real name, a pen name, or
          &quot;Anonymous.&quot; We will never show your email address or any
          contact details publicly.
        </p>
        <p>
          You can ask us to edit or remove your story at any time, with no
          questions asked.
        </p>
        <h2>What we publish</h2>
        <p>
          First-person, true stories about your own life: career, motherhood,
          identity, health, love and loss, starting over, and more.
        </p>
        <h2>What we don&apos;t publish</h2>
        <p>
          Stories that name or identify other people without their consent, hate
          speech or harassment, graphic content without a clear purpose,
          advertising, or fiction presented as fact.
        </p>
        <h2>Sensitive topics</h2>
        <p>
          Stories about abuse, self-harm, or loss are welcome. We add a content
          note at the top so readers can choose when they&apos;re ready to read.
        </p>
      </div>
    </div>
  );
}
