import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Services",
  description:
    "Procurement support, bulk quotations, project supply and industrial sourcing services by Nidus Trading.",
};

const services = [
  {
    title: "Industrial Procurement",
    desc: "Source electrical, electronic, mechanical and hardware items with consistent quality controls.",
  },
  {
    title: "Bulk & Project Quotations",
    desc: "Fast turnaround on BOMs and multi-category project requirements for contractors and plants.",
  },
  {
    title: "B2B Account Support",
    desc: "Dedicated coordination for repeat buyers, warehouses, and maintenance teams.",
  },
  {
    title: "Order Tracking",
    desc: "Transparent status updates from pending through delivery for every confirmed order.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Services</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        End-to-end trading support designed for industrial buyers who value
        reliability and speed.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.title}
            className="glass rounded-2xl border border-[var(--border)] p-6"
          >
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
          </div>
        ))}
      </div>
      <Button asChild className="mt-8" size="lg">
        <Link href="/inquiry">Start a Project Inquiry</Link>
      </Button>
    </div>
  );
}
