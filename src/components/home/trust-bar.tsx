"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock3, Factory, Handshake } from "lucide-react";
import { COMPANY, INDUSTRIES_SERVED } from "@/lib/constants";

const items = [
  { icon: BadgeCheck, label: "Quality-assured sourcing" },
  { icon: Clock3, label: `${COMPANY.yearsInBusiness}+ years reliability` },
  { icon: Factory, label: "B2B + B2C industrial supply" },
  { icon: Handshake, label: "Fast quote response" },
];

export function TrustBar() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
                <item.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-snug">{item.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-[var(--muted)] md:text-left">
          Industries served: {INDUSTRIES_SERVED.join(" · ")}
        </p>
      </div>
    </section>
  );
}
