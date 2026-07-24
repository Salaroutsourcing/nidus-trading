"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Industrial warehouse and supply operations"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/92 via-[#0b1c2c]/78 to-[#0b1c2c]/45" />
      <div className="absolute inset-0 mesh-grid opacity-20" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-4 pb-16 pt-28 md:items-center md:px-6 md:pb-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <p className="display-font text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {COMPANY.name}
          </p>
          <h1 className="mt-5 max-w-xl text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
            Premium Industrial & Electronic Solutions
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/70">
            Quote-driven B2B and B2C supply for electronic components, electrical
            items, mild steel, caster wheels, and industrial hardware across Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-lg shadow-black/30">
              <Link href="/products">
                Browse Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/inquiry">Request a Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <a href={COMPANY.phoneHref}>
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
