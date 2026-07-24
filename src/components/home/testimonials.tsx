"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Nidus supplied genuine Moxa switches and Cisco optics with full datasheets and origin docs — our tender submission cleared technical evaluation without a single query.",
    name: "Procurement Manager",
    company: "Public-Sector Telecom Project",
  },
  {
    quote:
      "Fast quotes on Dell PSUs, LTO-8 drives, and rack PDUs kept our data-center refresh on schedule. MPNs matched exactly to our BOQ.",
    name: "Data Center Lead",
    company: "Enterprise IT Services",
  },
  {
    quote:
      "For our substation upgrade they delivered Siemens PLCs, a Fluke power analyzer, and DEHN surge protection — one reliable source for specialized hardware.",
    name: "Engineering Manager",
    company: "Power Utility Contractor",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-6">
        <h2 className="display-font text-2xl font-bold md:text-3xl">
          Trusted by industry buyers
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Long-term supply relationships across government, telecom, data centers, and utilities.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="text-sm leading-relaxed text-[var(--foreground)]">
              “{t.quote}”
            </p>
            <div className="mt-5 border-t border-[var(--border)] pt-3">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-[var(--muted)]">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
