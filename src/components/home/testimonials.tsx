"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Nidus consistently delivers quality electrical and mechanical parts on schedule for our plant maintenance cycles.",
    name: "Plant Manager",
    company: "Textile Manufacturing Co.",
  },
  {
    quote:
      "Their quotation turnaround for bulk electronic components is fast, and terms stay competitive for production volumes.",
    name: "Procurement Lead",
    company: "Electronics Assembler",
  },
  {
    quote:
      "We rely on Nidus for caster wheels, fasteners, and MS products. Reliable partner for industrial procurement.",
    name: "Operations Director",
    company: "Logistics Warehouse",
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
          Long-term supply relationships across manufacturing, electrical, and logistics.
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
