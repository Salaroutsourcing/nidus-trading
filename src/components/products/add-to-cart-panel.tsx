"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { useCart } from "@/store/cart";

export function AddToCartPanel({
  product,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    stock: number;
    image?: string;
  };
}) {
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="space-y-4 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <div>
        <p className="text-lg font-bold">Pricing on request</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Quote-driven supply for B2B and project buyers. Compare options via inquiry —
          no public prices.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold" htmlFor="pdp-qty">
          Qty
        </label>
        <input
          id="pdp-qty"
          type="number"
          min={1}
          max={Math.max(1, product.stock || 999)}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="h-10 w-20 rounded-md border border-[var(--border)] bg-[var(--background)] px-3"
        />
        <span className="text-xs text-[var(--muted)]">
          {product.stock > 0 ? "Available — confirm via quote" : "Inquire for availability"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            addItem(
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                price: 0,
                image: product.image,
                stock: Math.max(product.stock, qty),
              },
              qty
            );
            toast.success("Added to quote list");
          }}
        >
          Add to Quote List
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full">
          <Link href={`/inquiry?product=${encodeURIComponent(product.name)}`}>
            Request Quote
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full">
          <a href={COMPANY.phoneHref}>
            <Phone className="h-4 w-4" />
            Call {COMPANY.phone}
          </a>
        </Button>
      </div>
      <p className="text-[11px] text-[var(--muted)]">
        Need bulk pricing?{" "}
        <Link href="/inquiry" className="font-semibold text-[var(--accent)] hover:underline">
          Send a BOM inquiry
        </Link>
      </p>
    </div>
  );
}
