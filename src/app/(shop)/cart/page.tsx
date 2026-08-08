"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <h1 className="display-font text-4xl font-bold">Quote List</h1>
        <div className="mt-8 space-y-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <h1 className="display-font text-4xl font-bold">Quote List</h1>
        <p className="mt-3 text-[var(--muted)]">
          Your quote list is empty. Add products to request pricing — no online
          payment required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/inquiry">General inquiry</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="display-font text-4xl font-bold">Quote List</h1>
      <p className="mt-2 text-[var(--muted)]">
        {totalItems()} item{totalItems() === 1 ? "" : "s"} selected for quotation.
        Pricing is provided after review — compare-by-inquiry for multi-SKU BOMs.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-4 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-md sm:w-28">
                <Image
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-bold hover:text-[var(--accent)]"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-[var(--muted)]">SKU: {item.sku}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                  Quote on request
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                  Quantity
                </label>
                <input
                  id={`qty-${item.productId}`}
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, Number(e.target.value))
                  }
                  className="h-11 w-20 rounded-md border border-[var(--border)] bg-[var(--background)] px-2"
                />
                <Button variant="ghost" onClick={() => removeItem(item.productId)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 lg:sticky lg:top-36">
          <h2 className="font-bold">Quote summary</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Submit your selection as a quote request. Our team will respond with
            availability and commercial terms for B2B or project orders.
          </p>
          <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-2">
                <span className="line-clamp-1">{i.name}</span>
                <span className="shrink-0 text-[var(--muted)]">×{i.quantity}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/checkout">Submit Quote Request</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="mt-3 w-full">
            <Link href="/inquiry">Need bulk pricing?</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
