"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BatteryCharging,
  Bot,
  CircleDot,
  Cog,
  Cpu,
  Layers,
  Monitor,
  Paintbrush,
  Ruler,
  Shield,
  Sun,
  TreePine,
  Wrench,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Zap,
  Monitor,
  Cog,
  Layers,
  TreePine,
  Paintbrush,
  Wrench,
  CircleDot,
  Shield,
  Bot,
  Sun,
  BatteryCharging,
  Ruler,
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 max-w-2xl">
        <h2 className="display-font text-3xl font-semibold md:text-4xl">
          Product Categories
        </h2>
        <p className="mt-2 text-[var(--muted)]">
          From electronic components to heavy industrial hardware — one trusted
          trading partner.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat, i) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || Wrench;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.04 }}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <GlassCard className="h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                    {cat.description}
                  </p>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
