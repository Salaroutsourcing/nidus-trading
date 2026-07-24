"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { parseJsonArray } from "@/lib/utils";
import { useCart } from "@/store/cart";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    stock: number;
    images: string;
    brand?: string | null;
    bestSeller?: boolean;
    shortDesc?: string | null;
    category?: { name: string } | null;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const images = parseJsonArray(product.images);
  const image =
    images[0] ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80";

  return (
    <GlassCard className="group overflow-hidden p-0">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/45 via-transparent to-transparent opacity-80" />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.bestSeller && <Badge tone="warning">Best Seller</Badge>}
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
            {product.category?.name || product.brand}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug hover:text-[var(--accent)]">
              {product.name}
            </h3>
          </Link>
          {product.shortDesc && (
            <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
              {product.shortDesc}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/inquiry?product=${encodeURIComponent(product.name)}`}
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Request Quote
          </Link>
          <Button
            size="sm"
            disabled={product.stock <= 0}
            onClick={() => {
              addItem({
                productId: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                price: 0,
                image,
                stock: product.stock,
              });
              toast.success("Added to quote list");
            }}
          >
            <ClipboardList className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
