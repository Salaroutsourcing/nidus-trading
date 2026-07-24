import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "About Us | Industrial Trading Pakistan",
  description: `Learn about ${COMPANY.name} — premium industrial and electronic solutions with quote-driven B2B and B2C supply across Pakistan.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-semibold md:text-5xl">
        About {COMPANY.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{COMPANY.tagline}</p>

      <div className="glass mt-10 space-y-6 rounded-[2rem] border border-[var(--border)] p-8 leading-relaxed">
        <p>
          {COMPANY.name} is a B2B and B2C trading company specializing in
          industrial, electrical, electronic, mechanical, IT, and hardware
          supplies. We help manufacturers, contractors, workshops, and
          procurement teams source reliable products through a quote-first process.
        </p>
        <p>
          Our catalog spans electronic components, electrical items, IT & computer
          products, mechanical items, mild steel (MS) products, wooden items, paint
          items, hardware, industrial caster wheels, and safety & lifting equipment.
        </p>
        <p>
          With a focus on quality assurance, responsive quotations, and dependable
          fulfillment, we position ourselves as a long-term supply partner for
          growing industrial businesses across Pakistan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Years of experience", value: `${COMPANY.yearsInBusiness}+` },
          { label: "Product categories", value: "10" },
          { label: "Support", value: COMPANY.phone },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl border border-[var(--border)] p-5 text-center"
          >
            <p className="display-font text-3xl font-semibold text-[var(--accent)]">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
