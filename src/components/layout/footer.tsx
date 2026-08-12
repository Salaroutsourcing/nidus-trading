import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--steel)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <p className="display-font text-2xl font-bold">{COMPANY.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            {COMPANY.tagline}
          </p>
          <p className="mt-3 text-xs text-white/60">
            {COMPANY.yearsInBusiness}+ years · B2B & B2C · Quote-first supply
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white/60">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[var(--accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/track-order" className="hover:text-[var(--accent)]">
                Track Quote / Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white/60">
            Business
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/inquiry" className="hover:text-[var(--accent)]">
                Bulk / Custom Inquiry
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[var(--accent)]">
                Quote List
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-[var(--accent)]">
                Customer Login
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-[var(--accent)]">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white/60">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[var(--accent)]" />
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[var(--accent)]" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-white/55 md:flex-row md:px-6 md:text-left">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[var(--accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
