"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const testimonials = [
  {
    quote:
      "Nidus consistently delivers quality electrical and mechanical parts on schedule for our plant maintenance cycles.",
    name: "Plant Manager",
    company: "Textile Manufacturing Co.",
  },
  {
    quote:
      "Their quotation turnaround for bulk electronic components is fast, and pricing stays competitive.",
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
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8">
        <h2 className="display-font text-3xl font-semibold md:text-4xl">
          Trusted by Industry Buyers
        </h2>
        <p className="mt-2 text-[var(--muted)]">
          Building long-term supply relationships across Pakistan.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="h-full">
              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                “{t.quote}”
              </p>
              <div className="mt-6 border-t border-[var(--border)] pt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-[var(--muted)]">{t.company}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 opacity-70">
        {["ForgeTech", "PowerGrid Co", "MechaWorks", "SolarPeak PK", "SafeLift"].map(
          (logo) => (
            <span
              key={logo}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--muted)]"
            >
              {logo}
            </span>
          )
        )}
      </div>
    </section>
  );
}
