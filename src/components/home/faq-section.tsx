"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-6">
        <h2 className="display-font text-2xl font-bold md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          How quote-first industrial supply works with Nidus Trading.
        </p>
      </div>
      <div className="divide-y divide-[var(--border)] rounded-md border border-[var(--border)] bg-[var(--surface)]">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold md:text-base">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[var(--muted)] transition",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-[var(--muted)]">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
