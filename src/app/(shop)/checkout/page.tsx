"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/store/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, totalItems, hydrated } = useCart();
  const [loading, setLoading] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="display-font text-4xl font-semibold">Submit Quote Request</h1>
        <p className="mt-3 text-[var(--muted)]">Loading your quote list...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="display-font text-4xl font-semibold">Submit Quote Request</h1>
        <p className="mt-3 text-[var(--muted)]">Your quote list is empty.</p>
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
      if (!res.ok) throw new Error(data.error || "Quote request failed");
      clearCart();
      toast.success(`Quote request submitted: ${data.orderNumber}`);
      router.push(
        `/track-order?orderNumber=${encodeURIComponent(data.orderNumber)}&email=${encodeURIComponent(payload.customerEmail)}`
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Quote request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-6">
      <div>
        <h1 className="display-font text-4xl font-semibold">Submit Quote Request</h1>
        <p className="mt-2 text-[var(--muted)]">
          Share your details and we will respond with availability and quotation —
          no online payment.
        </p>
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
            placeholder="Delivery / site address *"
            required
          />
          <Textarea
            name="notes"
            placeholder="Specifications, brand preferences, delivery timeline..."
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Submitting..." : "Submit Quote Request"}
          </Button>
        </form>
      </div>

      <aside className="glass h-fit rounded-2xl border border-[var(--border)] p-6">
        <h2 className="font-semibold">Items for Quotation</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {totalItems()} total units · pricing on request
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-3">
              <span className="line-clamp-2">
                {i.name} × {i.quantity}
              </span>
              <span className="shrink-0 text-[var(--muted)]">RFQ</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
          You will receive a trackable quote reference after submission.
        </div>
      </aside>
    </div>
  );
}
