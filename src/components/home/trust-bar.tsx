"use client";

import { motion } from "framer-motion";
import { Award, Clock3, ShieldCheck, Truck } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const items = [
  { icon: ShieldCheck, label: "Quality Assured Supply" },
  { icon: Clock3, label: `${COMPANY.yearsInBusiness}+ Years Trading Experience` },
  { icon: Truck, label: "Nationwide B2B Delivery Support" },
  { icon: Award, label: "Competitive Industrial Pricing" },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass flex items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-4"
          >
            <item.icon className="h-5 w-5 text-[var(--accent)]" />
            <p className="text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
