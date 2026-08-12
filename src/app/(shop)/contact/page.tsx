import { Mail, Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Contact Industrial Supply Team",
  description: `Contact ${COMPANY.name} at ${COMPANY.phone}. Office: ${COMPANY.address}. Quotations, bulk pricing, and project support.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Contact Us</h1>
      <p className="mt-2 text-[var(--muted)]">
        Reach our team for product availability, quotations, and project support.
        Quote-first — no online payment required.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <a
          href={COMPANY.phoneHref}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
        >
          <Phone className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-bold">Phone / Call</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{COMPANY.phone}</p>
        </a>
        <a
          href={COMPANY.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
        >
          <MessageCircle className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-bold">WhatsApp</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Chat with sales for urgent site needs</p>
        </a>
        <a
          href={`mailto:${COMPANY.email}`}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
        >
          <Mail className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-bold">Email</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{COMPANY.email}</p>
        </a>
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
          <Clock className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-bold">Response window</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Most quotes reviewed within one business day. Flag urgency in notes or call.
          </p>
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 md:col-span-2">
          <MapPin className="h-5 w-5 text-[var(--accent)]" />
          <p className="mt-4 font-bold">Office address</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            {COMPANY.address}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="text-xl font-bold">Prefer a structured request?</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Use our inquiry form for bulk quotes, BOMs, and custom requirements — or
          build a Quote List from the catalog first.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/inquiry">Open Inquiry Form</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Browse catalog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
