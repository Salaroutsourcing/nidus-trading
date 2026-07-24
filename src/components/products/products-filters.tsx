"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  return (
    <aside className="glass h-fit space-y-5 rounded-2xl border border-[var(--border)] p-5">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Search
        </label>
        <Input
          placeholder="SKU, name, keyword..."
          defaultValue={searchParams.get("q") || ""}
          onChange={(e) => update("q", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Category
        </label>
        <select
          className="h-11 w-full rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
          value={searchParams.get("category") || ""}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Brand
        </label>
        <select
          className="h-11 w-full rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
          value={searchParams.get("brand") || ""}
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
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Sort
        </label>
        <select
          className="h-11 w-full rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
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
