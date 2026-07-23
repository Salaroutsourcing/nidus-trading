import { Suspense } from "react";
import { ProductCard } from "@/components/products/product-card";
import { ProductsFilters } from "@/components/products/products-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Products",
  description:
    "Browse industrial, electrical, electronic, mechanical and hardware products from Nidus Trading.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function ProductResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const brand = typeof sp.brand === "string" ? sp.brand : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : "newest";
  const minPrice = Number(typeof sp.minPrice === "string" ? sp.minPrice : 0);
  const maxPrice = Number(typeof sp.maxPrice === "string" ? sp.maxPrice : 0);

  const where: Record<string, unknown> = { active: true };
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { sku: { contains: q } },
      { tags: { contains: q } },
    ];
  }
  if (category) where.category = { slug: category };
  if (brand) where.brand = brand;
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: minPrice } : {}),
      ...(maxPrice ? { lte: maxPrice } : {}),
    };
  }

  const orderBy =
    sort === "price-asc"
      ? { price: "asc" as const }
      : sort === "price-desc"
        ? { price: "desc" as const }
        : sort === "name"
          ? { name: "asc" as const }
          : { createdAt: "desc" as const };

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { active: true, brand: { not: null } },
      select: { brand: true },
      distinct: ["brand"],
    }),
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <ProductsFilters
        categories={categories}
        brands={brands.map((b) => b.brand!).filter(Boolean)}
      />
      <div>
        <p className="mb-4 text-sm text-[var(--muted)]">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
        {products.length === 0 ? (
          <div className="glass rounded-2xl border border-[var(--border)] p-10 text-center">
            <p className="font-semibold">No products match your filters</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Try clearing filters or browsing categories.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="display-font text-4xl font-semibold">Product Catalog</h1>
        <p className="mt-2 text-[var(--muted)]">
          Filter by category, brand, and price. Request a quote for bulk orders.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        }
      >
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
