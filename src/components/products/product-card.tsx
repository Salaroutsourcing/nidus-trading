"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, parseJsonArray } from "@/lib/utils";
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
  compact?: boolean;
};

export function ProductCard({ product, compact }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const images = parseJsonArray(product.images);
  const image =
    images[0] ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] transition hover:shadow-md",
        compact && "w-full"
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[var(--background)]">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 70vw, 240px"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {product.bestSeller && <Badge tone="warning">Best Seller</Badge>}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
            {product.category?.name || product.brand}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug hover:text-[var(--accent)]">
              {product.name}
            </h3>
          </Link>
          {product.shortDesc && (
            <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
              {product.shortDesc}
            </p>
          )}
          <div className="mt-2">
            <Badge tone={product.stock > 0 ? "success" : "info"}>
              {product.stock > 0 ? "In stock — quote" : "Inquire availability"}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <Button
            size="sm"
            className="w-full"
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
            <ClipboardList className="h-3.5 w-3.5" />
            Add to Quote
          </Button>
          <Link
            href={`/inquiry?product=${encodeURIComponent(product.name)}`}
            className="text-center text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
