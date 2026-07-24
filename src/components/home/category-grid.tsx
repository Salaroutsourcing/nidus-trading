"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CircleDot,
  Cog,
  Cpu,
  Layers,
  Monitor,
  Paintbrush,
  Shield,
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
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image?: string | null;
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
          trading partner for quote-driven supply across Pakistan.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((cat, i) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || Wrench;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 10) * 0.03 }}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <GlassCard className="group h-full overflow-hidden p-0">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 20vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[var(--accent-soft)]">
                        <Icon className="h-8 w-8 text-[var(--accent)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c2c]/75 via-[#0b1c2c]/15 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-md">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold leading-snug">
                      {cat.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                      {cat.description}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
