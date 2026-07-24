"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string };

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
  const activeCategory = searchParams.get("category") || "";
  const activeBrand = searchParams.get("brand") || "";
  const activeAvail = searchParams.get("availability") || "";
  const activeTag = searchParams.get("tag") || "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  return (
    <aside className="h-fit space-y-5 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Search
        </label>
        <Input
          placeholder="SKU, name, keyword..."
          defaultValue={searchParams.get("q") || ""}
          onChange={(e) => update("q", e.target.value)}
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
                "w-full rounded px-2 py-1.5 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
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
                  "w-full rounded px-2 py-1.5 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
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
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Brand
        </label>
        <select
          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
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
          {[
            { value: "", label: "Any" },
            { value: "in-stock", label: "Available on quote" },
            { value: "inquire", label: "Inquire availability" },
          ].map((opt) => (
            <button
              key={opt.value || "any"}
              type="button"
              onClick={() => update("availability", opt.value)}
              className={cn(
                "block w-full rounded px-2 py-1.5 text-left hover:bg-black/[0.03] dark:hover:bg-white/5",
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
          {["best seller", "industrial", "bulk", "OEM"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => update("tag", activeTag === tag ? "" : tag)}
              className={cn(
                "rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium",
                activeTag === tag && "border-[var(--accent)] bg-[var(--accent-soft)]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Sort
        </label>
        <select
          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
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
    </aside>
  );
}
