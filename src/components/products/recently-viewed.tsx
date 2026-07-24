"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const KEY = "nidus-recently-viewed";

export type RecentProduct = {
  slug: string;
  name: string;
  image: string;
};

export function trackRecentlyViewed(product: RecentProduct) {
  try {
    const raw = localStorage.getItem(KEY);
    const list: RecentProduct[] = raw ? JSON.parse(raw) : [];
    const next = [product, ...list.filter((p) => p.slug !== product.slug)].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const [items, setItems] = useState<RecentProduct[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list: RecentProduct[] = raw ? JSON.parse(raw) : [];
      setItems(list.filter((p) => p.slug !== currentSlug).slice(0, 6));
    } catch {
      setItems([]);
    }
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-8">
      <h2 className="display-font text-xl font-bold">Recently viewed</h2>
      <div className="product-row scrollbar-hide mt-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="w-[140px] shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
            <p className="line-clamp-2 p-2 text-xs font-semibold">{item.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TrackProductView({ product }: { product: RecentProduct }) {
  useEffect(() => {
    trackRecentlyViewed(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);
  return null;
}
