"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-surface">
      <div className="absolute inset-0 mesh-grid opacity-60" />
      <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="display-font text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--navy)] sm:text-6xl lg:text-7xl">
            {COMPANY.name}
          </p>
          <h1 className="mt-5 max-w-xl text-xl font-medium leading-relaxed text-[var(--foreground)] sm:text-2xl">
            Premium Industrial & Electronic Solutions
          </h1>
          <p className="mt-4 max-w-lg text-base text-[var(--muted)]">
            Quality, reliability, and competitive pricing for B2B and B2C buyers
            across electrical, mechanical, IT, and hardware supply chains.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">
                Shop Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/inquiry">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={COMPANY.phoneHref}>
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative hidden min-h-[420px] md:block"
        >
          <div className="absolute inset-0 animate-float overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl shadow-black/20">
            <Image
              src="/images/hero-industrial.svg"
              alt="Nidus Trading industrial supply operations"
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
