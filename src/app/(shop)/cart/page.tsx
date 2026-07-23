"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <h1 className="display-font text-4xl font-semibold">Your Cart</h1>
        <p className="mt-3 text-[var(--muted)]">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Your Cart</h1>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="glass flex flex-col gap-4 rounded-2xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-xl sm:w-28">
              <Image
                src={item.image || "/images/products/product-1.svg"}
                alt={item.name}
                fill
                className="object-cover"
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
              <p className="mt-1 font-medium">{formatPKR(item.price)}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={item.stock}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId, Number(e.target.value))
                }
                className="h-10 w-20 rounded-xl border border-[var(--border)] bg-white/40 px-2 dark:bg-white/5"
              />
              <Button
                variant="ghost"
                onClick={() => removeItem(item.productId)}
              >
                Remove
              </Button>
            </div>
            <p className="min-w-24 text-right font-semibold">
              {formatPKR(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="glass mt-8 ml-auto max-w-md rounded-2xl border border-[var(--border)] p-6">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">Subtotal</span>
          <span className="font-semibold">{formatPKR(total)}</span>
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Shipping calculated at checkout. Free shipping over PKR 50,000.
        </p>
        <Button asChild size="lg" className="mt-5 w-full">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
