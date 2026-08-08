"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[320px] md:min-h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=80"
          alt="Industrial warehouse supply"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131921]/95 via-[#131921]/75 to-[#131921]/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-14 md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {COMPANY.name}
            </p>
            <h1 className="display-font mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Tender-ready industrial & IT hardware — quote in minutes
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              Industrial networking, enterprise servers & storage, test & measurement,
              PLC automation, and backup power — genuine OEM, with datasheets, HS codes
              and origin docs for government tenders and enterprise procurement across Pakistan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">Shop catalog</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/inquiry">Request quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Deal / value strip */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:grid-cols-3 md:px-6">
          {[
            {
              title: "Quote-first pricing",
              desc: "No public list prices — get terms matched to quantity & specs",
              href: "/inquiry",
            },
            {
              title: `${COMPANY.yearsInBusiness}+ years trusted supply`,
              desc: "Reliable sourcing for factories, contractors & workshops",
              href: "/about",
            },
            {
              title: "Need bulk pricing?",
              desc: "Send a BOM or multi-SKU list — we respond fast",
              href: "/inquiry",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <Link
                href={item.href}
                className="block rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 transition hover:border-[var(--accent)]"
              >
                <p className="text-sm font-bold text-[var(--foreground)]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
