import { Suspense } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { ProductsFilters } from "@/components/products/products-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Industrial & Electronic Product Catalog Pakistan",
  description:
    "Browse electronic components, electrical items, mild steel plates, industrial caster wheels, hardware and safety equipment from Nidus Trading. Request a quote.",
  keywords: [
    "industrial caster wheels Pakistan",
    "electronic components supplier",
    "mild steel plates Pakistan",
    "electrical items supplier",
    "hardware supplier Pakistan",
  ],
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function ProductResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const brand = typeof sp.brand === "string" ? sp.brand : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : "newest";
  const availability =
    typeof sp.availability === "string" ? sp.availability : undefined;
  const tag = typeof sp.tag === "string" ? sp.tag : undefined;

  const where: Record<string, unknown> = { active: true };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { sku: { contains: q, mode: "insensitive" } },
      { tags: { contains: q, mode: "insensitive" } },
    ];
  }
  if (category) where.category = { slug: category };
  if (brand) where.brand = brand;
  if (availability === "in-stock") where.stock = { gt: 0 };
  if (availability === "inquire") where.stock = { lte: 0 };
  if (tag) where.tags = { contains: tag, mode: "insensitive" };

  const [products, categories, brands, categoryMeta] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy:
        sort === "name"
          ? { name: "asc" }
          : sort === "featured"
            ? [{ featured: "desc" }, { bestSeller: "desc" }, { createdAt: "desc" }]
            : { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { active: true, brand: { not: null } },
      select: { brand: true },
      distinct: ["brand"],
    }),
    category
      ? prisma.category.findUnique({ where: { slug: category } })
      : Promise.resolve(null),
  ]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProductsFilters
          categories={categories}
          brands={brands.map((b) => b.brand!).filter(Boolean)}
        />
      </Suspense>
      <div>
        {categoryMeta && (
          <div className="mb-5 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <h2 className="text-lg font-bold">{categoryMeta.name}</h2>
            {categoryMeta.description && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {categoryMeta.description}
              </p>
            )}
            <p className="mt-2 text-xs text-[var(--muted)]">
              Related:{" "}
              <Link href="/categories" className="text-[var(--accent)] hover:underline">
                All departments
              </Link>{" "}
              ·{" "}
              <Link href="/inquiry" className="text-[var(--accent)] hover:underline">
                Bulk inquiry
              </Link>
            </p>
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">
              {products.length}
            </span>{" "}
            result{products.length === 1 ? "" : "s"} · quote on request
          </p>
        </div>
        {products.length === 0 ? (
          <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="font-semibold">No products match your filters</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Try clearing filters or browsing categories.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  sku: product.sku,
                  stock: product.stock,
                  images: product.images,
                  brand: product.brand,
                  bestSeller: product.bestSeller,
                  shortDesc: product.shortDesc,
                  category: product.category,
                }}
              />
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6">
        <h1 className="display-font text-3xl font-bold md:text-4xl">
          Product catalog
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Filter by department, brand, and availability. Add items to your quote list
          or request a quotation — pricing is provided after review.
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
