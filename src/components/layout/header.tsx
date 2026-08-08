"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ClipboardList,
  Menu,
  Phone,
  Search,
  Shield,
  User,
  X,
} from "lucide-react";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type Category = { id: string; name: string; slug: string };

function HeaderInner({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalItems = useCart((s) => s.totalItems());
  // The quote-list count comes from persisted client storage, so it is only
  // rendered once rehydrated, keeping server and client markup identical.
  const cartReady = useCart((s) => s.hydrated);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const activeCategory = searchParams.get("category");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-[var(--navy)] text-white dark:bg-[#0a1018]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-xs md:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--accent)]"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
            <span className="hidden text-white/70 sm:inline">
              {COMPANY.trustLine}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/track-order" className="hover:text-[var(--accent)]">
              Track Order
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 hover:text-[var(--accent)]"
            >
              <User className="h-3.5 w-3.5" />
              Account
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 hover:text-[var(--accent)]"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 md:gap-6 md:px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--steel)] text-sm font-bold text-white">
              NT
            </span>
            <span className="leading-tight">
              <span className="display-font block text-lg font-bold tracking-tight md:text-xl">
                {COMPANY.name}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] sm:block">
                Industrial Marketplace
              </span>
            </span>
          </Link>

          <form onSubmit={onSearch} className="relative mx-auto hidden max-w-2xl flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, SKU, brand..."
              className="h-11 w-full rounded-md border-2 border-[var(--steel)] bg-[var(--background)] pl-10 pr-24 text-sm outline-none focus:border-[var(--accent)]"
              aria-label="Search products"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </form>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Search products"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link
                href="/cart"
                aria-label={
                  cartReady && totalItems > 0
                    ? `Quote list, ${totalItems} item${totalItems === 1 ? "" : "s"}`
                    : "Quote list"
                }
              >
                <ClipboardList className="h-5 w-5" />
                {cartReady && totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[#131921]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/inquiry">Request Quote</Link>
            </Button>
            <Button asChild size="sm" variant="secondary" className="hidden lg:inline-flex">
              <a href={COMPANY.phoneHref}>Call</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop secondary links */}
        <nav className="mx-auto hidden max-w-7xl items-center gap-1 px-6 pb-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]",
                pathname.startsWith(link.href) && "bg-black/[0.04] text-[var(--foreground)] dark:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Department / category strip */}
      {categories.length > 0 && (
        <div className="dept-bar">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 py-2 scrollbar-hide md:px-6">
            <Link
              href="/categories"
              className="shrink-0 rounded px-2 py-1 text-xs font-bold uppercase tracking-wide text-white/95 hover:bg-white/10"
            >
              All Departments
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-white",
                  activeCategory === c.slug && "bg-white/15 text-white"
                )}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="border-b border-[var(--border)] bg-[var(--surface)] p-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-3 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, SKU, MPN..."
              aria-label="Search products"
              autoFocus
              className="h-11 flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            />
            <Button type="submit">Go</Button>
          </form>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-sm font-medium hover:bg-black/[0.04] dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/track-order" className="rounded-md px-3 py-3 text-sm font-medium">
              Track Order
            </Link>
            <Button asChild className="mt-2">
              <Link href="/inquiry">Request Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Header({ categories = [] }: { categories?: Category[] }) {
  return (
    <Suspense fallback={<div className="h-[104px] bg-[var(--surface)]" />}>
      <HeaderInner categories={categories} />
    </Suspense>
  );
}
