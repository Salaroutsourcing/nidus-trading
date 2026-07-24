import { Suspense } from "react";
import { InquiryForm } from "./inquiry-form";

export const metadata = {
  title: "Request a Quote",
  description:
    "Submit bulk and custom order inquiries to Nidus Trading for industrial and electronic supply quotations across Pakistan.",
};

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Request a Quote</h1>
      <p className="mt-2 text-[var(--muted)]">
        For bulk, custom, or project orders — our team will respond promptly.
      </p>
      <Suspense fallback={<div className="mt-8 text-sm text-[var(--muted)]">Loading form...</div>}>
        <InquiryForm />
      </Suspense>
    </div>
  );
}
