"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          max={Math.max(1, product.stock)}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="h-11 w-24 rounded-xl border border-[var(--border)] bg-white/40 px-3 dark:bg-white/5"
        />
        <span className="text-sm text-[var(--muted)]">
          {product.stock > 0 ? "Available — confirm via quote" : "Inquire for availability"}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          size="lg"
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
        <Button asChild size="lg" variant="secondary">
          <Link href={`/inquiry?product=${encodeURIComponent(product.name)}`}>
            Request Quote
          </Link>
        </Button>
      </div>
    </div>
  );
}
