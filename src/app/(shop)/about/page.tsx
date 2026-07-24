import Link from "next/link";
import { COMPANY, INDUSTRIES_SERVED } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Industrial Trading Pakistan",
  description: `Learn about ${COMPANY.name} — ${COMPANY.yearsInBusiness}+ years of industrial and electronic supply for B2B and B2C buyers across Pakistan. Quote-first, reliable fulfillment.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold md:text-5xl">
        About {COMPANY.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{COMPANY.tagline}</p>

      <div className="mt-10 space-y-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-8 leading-relaxed">
        <p>
          For more than {COMPANY.yearsInBusiness} years, {COMPANY.name} has helped
          manufacturers, contractors, workshops, warehouses, and procurement teams
          source industrial and electronic supplies across Pakistan. We operate a
          quote-first model: you share requirements, we confirm availability and
          commercial terms — without forcing public list prices that rarely match
          project volumes.
        </p>
        <p>
          Our marketplace-style catalog covers ten departments: electronic
          components, electrical items, IT & computer products, mechanical items,
          mild steel (MS) products, wooden items, paint items, hardware, industrial
          caster wheels, and safety & lifting equipment. Whether you need a single
          SKU for maintenance or a multi-line BOM for a plant upgrade, we coordinate
          sourcing with quality-conscious suppliers.
        </p>
        <p>
          We serve both B2B accounts and B2C buyers. Repeat industrial customers get
          priority quotation handling; project teams can track quote references after
          submission. Call{" "}
          <a href={COMPANY.phoneHref} className="font-semibold text-[var(--accent)]">
            {COMPANY.phone}
          </a>{" "}
          or use WhatsApp for urgent site needs.
        </p>
        <p>
          Explore the{" "}
          <Link href="/products" className="font-semibold text-[var(--accent)] hover:underline">
            product catalog
          </Link>
          , browse{" "}
          <Link href="/categories" className="font-semibold text-[var(--accent)] hover:underline">
            all departments
          </Link>
          , or{" "}
          <Link href="/inquiry" className="font-semibold text-[var(--accent)] hover:underline">
            request a quote
          </Link>{" "}
          today.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="display-font text-2xl font-bold">Industries we serve</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {INDUSTRIES_SERVED.map((item) => (
            <li
              key={item}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Years of experience", value: `${COMPANY.yearsInBusiness}+` },
          { label: "Product categories", value: "10" },
          { label: "Support line", value: COMPANY.phone },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 text-center"
          >
            <p className="display-font text-3xl font-bold text-[var(--accent)]">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/inquiry">Request a quote</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/services">Our services</Link>
        </Button>
      </div>
    </div>
  );
}
