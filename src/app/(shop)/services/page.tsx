import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Industrial Procurement & Quotation Services",
  description:
    "Procurement support, bulk quotations, project supply, and industrial sourcing services by Nidus Trading across Pakistan.",
};

const services = [
  {
    title: "Industrial procurement",
    desc: "Source electrical, electronic, mechanical, MS, hardware, caster wheels, and safety items with consistent quality controls and SKU matching.",
    href: "/products",
  },
  {
    title: "Bulk & project quotations",
    desc: "Fast turnaround on BOMs and multi-category project requirements for contractors, fabricators, and plant maintenance teams.",
    href: "/inquiry",
  },
  {
    title: "B2B account support",
    desc: "Dedicated coordination for repeat buyers, warehouses, and workshops — including quote tracking and order status updates.",
    href: "/track-order",
  },
  {
    title: "Spec & availability guidance",
    desc: "Help confirming grades, sizes, load ratings, and alternatives when OEM parts are constrained — before you commit volume.",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Services</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        End-to-end trading support for industrial buyers who value reliability,
        clear communication, and quote-driven commercial terms.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
          >
            <h2 className="text-xl font-bold">{s.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
            <p className="mt-3 text-xs font-semibold text-[var(--accent)]">Learn more →</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-md border border-[var(--border)] bg-[var(--steel)] p-6 text-white">
        <h2 className="text-xl font-bold">Need bulk pricing?</h2>
        <p className="mt-2 text-sm text-white/80">
          Call {COMPANY.phone} or send your BOM — we respond with availability and
          commercial terms for B2B and project orders.
        </p>
        <Button asChild className="mt-4" size="lg">
          <Link href="/inquiry">Start a project inquiry</Link>
        </Button>
      </div>
    </div>
  );
}
