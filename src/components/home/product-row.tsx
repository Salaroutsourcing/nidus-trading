import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";

type Product = {
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

export function ProductRow({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle?: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="display-font text-2xl font-bold md:text-3xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>
          )}
        </div>
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          See more
        </Link>
      </div>
      <div className="product-row scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
}
