import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Thousand Shades of Women",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Contact</p>
      <h1 className="mt-4 font-display text-4xl">We&apos;d love to hear from you</h1>
      <p className="mt-4 text-neutral-600">
        Questions about sizing, an order, or which collection fits you best? Drop us a note and
        we&apos;ll get back within one business day.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
