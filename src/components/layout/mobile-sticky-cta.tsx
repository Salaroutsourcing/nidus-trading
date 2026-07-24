"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/95 p-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={COMPANY.phoneHref}
          className="flex items-center justify-center gap-1.5 rounded-md bg-[var(--steel)] px-2 py-2.5 text-xs font-semibold text-white"
        >
          <Phone className="h-3.5 w-3.5" />
          Call
        </a>
        <a
          href={COMPANY.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-md bg-[#25D366] px-2 py-2.5 text-xs font-semibold text-white"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <Link
          href="/inquiry"
          className="flex items-center justify-center rounded-md bg-[var(--accent)] px-2 py-2.5 text-xs font-semibold text-[#131921]"
        >
          Bulk Quote
        </Link>
      </div>
    </div>
  );
}
