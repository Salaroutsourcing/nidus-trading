"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPKR } from "@/lib/utils";
import { useCart } from "@/store/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const cartSubtotal = subtotal();
  const shipping = cartSubtotal > 50000 ? 0 : 500;
  const total = cartSubtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="display-font text-4xl font-semibold">Checkout</h1>
        <p className="mt-3 text-[var(--muted)]">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      customerName: String(form.get("customerName")),
      customerEmail: String(form.get("customerEmail")),
      customerPhone: String(form.get("customerPhone")),
      company: String(form.get("company") || ""),
      shippingAddress: String(form.get("shippingAddress")),
      city: String(form.get("city") || ""),
      notes: String(form.get("notes") || ""),
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      clearCart();
      toast.success(`Order placed: ${data.orderNumber}`);
      router.push(`/track-order?orderNumber=${data.orderNumber}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-6">
      <div>
        <h1 className="display-font text-4xl font-semibold">Checkout</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="customerName" placeholder="Full name *" required />
            <Input
              name="customerEmail"
              type="email"
              placeholder="Email *"
              required
            />
            <Input name="customerPhone" placeholder="Phone *" required />
            <Input name="company" placeholder="Company (optional)" />
            <Input name="city" placeholder="City" />
          </div>
          <Textarea
            name="shippingAddress"
            placeholder="Shipping address *"
            required
          />
          <Textarea name="notes" placeholder="Order notes (optional)" />
          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Placing order..." : "Place Order"}
          </Button>
        </form>
      </div>

      <aside className="glass h-fit rounded-2xl border border-[var(--border)] p-6">
        <h2 className="font-semibold">Order Summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-3">
              <span>
                {i.name} × {i.quantity}
              </span>
              <span>{formatPKR(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span>{formatPKR(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
