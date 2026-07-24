"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BatteryCharging,
  CircleDot,
  Cog,
  Cpu,
  Gauge,
  Layers,
  Network,
  Server,
  Shield,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Network,
  Server,
  Gauge,
  Cpu,
  BatteryCharging,
  Zap,
  Cog,
  Layers,
  Wrench,
  CircleDot,
  Shield,
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  image?: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="display-font text-2xl font-bold md:text-3xl">
            Shop by department
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            High-demand industrial departments — browse and add to your quote list.
          </p>
        </div>
        <Link
          href="/categories"
          className="shrink-0 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat, i) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || Layers;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="relative aspect-[5/3] bg-[var(--background)]">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 50vw, 20vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--muted)]">
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold leading-snug group-hover:text-[var(--accent)]">
                    {cat.name}
                  </p>
                  {cat.description && (
                    <p className="mt-1 line-clamp-2 text-[11px] text-[var(--muted)]">
                      {cat.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
