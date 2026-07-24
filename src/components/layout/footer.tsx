import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <p className="display-font text-2xl font-semibold">{COMPANY.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {COMPANY.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
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
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
            Business
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/inquiry" className="hover:text-[var(--accent)]">
                Bulk / Custom Inquiry
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
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
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
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-5 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  );
}
