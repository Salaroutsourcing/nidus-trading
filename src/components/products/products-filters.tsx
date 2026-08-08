"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string };

const AVAILABILITY_OPTIONS = [
  { value: "", label: "Any" },
  { value: "in-stock", label: "Available on quote" },
  { value: "inquire", label: "Inquire availability" },
];

const POPULAR_TAGS = ["best seller", "industrial", "bulk", "OEM"];

export function ProductsFilters({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const activeCategory = searchParams.get("category") || "";
  const activeBrand = searchParams.get("brand") || "";
  const activeAvail = searchParams.get("availability") || "";
  const activeTag = searchParams.get("tag") || "";
  const activeQuery = searchParams.get("q") || "";

  const activeCount = [
    activeCategory,
    activeBrand,
    activeAvail,
    activeTag,
    activeQuery,
  ].filter(Boolean).length;

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  }

  // The search box previously pushed a new route on every keystroke, firing a
  // server round-trip per character. Debounce so typing stays local. The input
  // stays uncontrolled (keyed on the URL value) so it never loses focus while
  // the results below it re-render.
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  function onSearchChange(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => update("q", value.trim()), 350);
  }

  const panel = (
    <div className="space-y-5">
      <div>
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
          htmlFor="filter-search"
        >
          Search
        </label>
        <Input
          key={activeQuery}
          id="filter-search"
          type="search"
          placeholder="SKU, MPN, name, keyword..."
          defaultValue={activeQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Category
        </p>
        <ul className="max-h-56 space-y-1 overflow-y-auto text-sm">
          <li>
            <button
              type="button"
              onClick={() => update("category", "")}
              className={cn(
                "w-full rounded px-2 py-2 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
                !activeCategory && "bg-[var(--accent-soft)] font-semibold"
              )}
            >
              All categories
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => update("category", c.slug)}
                className={cn(
                  "w-full rounded px-2 py-2 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
                  activeCategory === c.slug && "bg-[var(--accent-soft)] font-semibold"
                )}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
          htmlFor="filter-brand"
        >
          Brand
        </label>
        <select
          id="filter-brand"
          className="h-11 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
          value={activeBrand}
          onChange={(e) => update("brand", e.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Availability
        </p>
        <div className="space-y-1 text-sm">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value || "any"}
              type="button"
              onClick={() => update("availability", opt.value)}
              className={cn(
                "block w-full rounded px-2 py-2 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
                activeAvail === opt.value && "bg-[var(--accent-soft)] font-semibold"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Popular tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => update("tag", activeTag === tag ? "" : tag)}
              className={cn(
                "rounded-full border border-[var(--border)] px-3 py-1.5 text-[11px] font-medium",
                activeTag === tag && "border-[var(--accent)] bg-[var(--accent-soft)]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
          htmlFor="filter-sort"
        >
          Sort
        </label>
        <select
          id="filter-sort"
          className="h-11 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
          value={searchParams.get("sort") || "newest"}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="name">Name A–Z</option>
          <option value="featured">Featured first</option>
        </select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        disabled={pending}
        onClick={() => startTransition(() => router.push("/products"))}
      >
        Clear filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile: filters collapse behind a toggle so products stay above the fold */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="product-filters"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters &amp; sort
            {activeCount > 0 && (
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[11px] font-bold text-[#131921]">
                {activeCount}
              </span>
            )}
          </span>
          {open ? <X className="h-4 w-4" /> : null}
        </Button>
        {open && (
          <div
            id="product-filters"
            className="mt-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            {panel}
          </div>
        )}
      </div>

      <aside className="hidden h-fit rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 lg:block">
        {panel}
      </aside>
    </>
  );
}
