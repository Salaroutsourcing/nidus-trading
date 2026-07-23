"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { formatPKR, getEffectivePrice, parseJsonArray } from "@/lib/utils";
import { useCart } from "@/store/cart";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    discountPrice?: number | null;
    stock: number;
    images: string;
    brand?: string | null;
    bestSeller?: boolean;
    category?: { name: string } | null;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const images = parseJsonArray(product.images);
  const image = images[0] || "/images/products/product-1.svg";
  const price = getEffectivePrice(product.price, product.discountPrice);
  const onSale = price < product.price;

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
          <div className="absolute left-3 top-3 flex gap-2">
            {product.bestSeller && <Badge tone="warning">Best Seller</Badge>}
            {onSale && <Badge tone="success">Sale</Badge>}
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
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold">{formatPKR(price)}</p>
            {onSale && (
              <p className="text-xs text-[var(--muted)] line-through">
                {formatPKR(product.price)}
              </p>
            )}
          </div>
          <Button
            size="sm"
            disabled={product.stock <= 0}
            onClick={() => {
              addItem({
                productId: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                price,
                image,
                stock: product.stock,
              });
              toast.success("Added to cart");
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
