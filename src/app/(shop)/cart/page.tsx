"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <h1 className="display-font text-4xl font-semibold">Quote List</h1>
        <p className="mt-3 text-[var(--muted)]">
          Your quote list is empty. Add products to request pricing.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Quote List</h1>
      <p className="mt-2 text-[var(--muted)]">
        {totalItems()} item{totalItems() === 1 ? "" : "s"} selected for quotation.
        Pricing is provided after review — no online payment required.
      </p>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="glass flex flex-col gap-4 rounded-2xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-xl sm:w-28">
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
                className="font-semibold hover:text-[var(--accent)]"
              >
                {item.name}
              </Link>
              <p className="text-xs text-[var(--muted)]">SKU: {item.sku}</p>
              <p className="mt-1 text-sm text-[var(--accent)]">Quote on request</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                Quantity
              </label>
              <input
                id={`qty-${item.productId}`}
                type="number"
                min={1}
                max={item.stock}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId, Number(e.target.value))
                }
                className="h-10 w-20 rounded-xl border border-[var(--border)] bg-white/40 px-2 dark:bg-white/5"
              />
              <Button variant="ghost" onClick={() => removeItem(item.productId)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass mt-8 ml-auto max-w-md rounded-2xl border border-[var(--border)] p-6">
        <p className="text-sm text-[var(--muted)]">
          Submit your selection as a quote request. Our team will respond with
          availability and commercial terms.
        </p>
        <Button asChild size="lg" className="mt-5 w-full">
          <Link href="/checkout">Submit Quote Request</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="mt-3 w-full">
          <Link href="/inquiry">General Inquiry Form</Link>
        </Button>
      </div>
    </div>
  );
}
