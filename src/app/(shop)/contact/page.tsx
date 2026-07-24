import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description: `Contact ${COMPANY.name} for quotations, orders, and support.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-[var(--muted)]">
        Reach our team for product availability, quotations, and project support.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <a
          href={COMPANY.phoneHref}
          className="glass rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-1"
        >
          <Phone className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-semibold">Phone</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{COMPANY.phone}</p>
        </a>
        <a
          href={`mailto:${COMPANY.email}`}
          className="glass rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-1"
        >
          <Mail className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-semibold">Email</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{COMPANY.email}</p>
        </a>
        <a
          href={COMPANY.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="glass rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-1"
        >
          <MessageCircle className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-semibold">WhatsApp</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Chat with sales</p>
        </a>
      </div>

      <div className="glass mt-8 rounded-2xl border border-[var(--border)] p-8">
        <h2 className="text-xl font-semibold">Prefer a structured request?</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Use our inquiry form for bulk quotes and custom requirements.
        </p>
        <Button asChild className="mt-5">
          <Link href="/inquiry">Open Inquiry Form</Link>
        </Button>
      </div>
    </div>
  );
}
