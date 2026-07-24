import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductRow } from "@/components/home/product-row";
import { FaqSection } from "@/components/home/faq-section";
import { Testimonials } from "@/components/home/testimonials";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function mapProduct(
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    stock: number;
    images: string;
    brand: string | null;
    bestSeller: boolean;
    shortDesc: string | null;
    category: { name: string };
  }
) {
  return {
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
  };
}

export default async function HomePage() {
  const [categories, bestSellers, featured, posts] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { active: true, bestSeller: true },
      include: { category: true },
      take: 10,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.product.findMany({
      where: { active: true, featured: true },
      include: { category: true },
      take: 10,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  const relevantCategories = categories.filter((c) =>
    ["caster-wheels", "ms-products", "electronic-components", "safety-lifting-equipment"].includes(
      c.slug
    )
  );

  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid categories={categories} />

      <ProductRow
        title="Best sellers"
        subtitle="High-demand products — add to quote list for commercial terms."
        href="/products?sort=featured"
        products={bestSellers.map(mapProduct)}
      />

      <ProductRow
        title="Featured for projects"
        subtitle="Popular picks for fabrication, electrical, and plant maintenance."
        href="/products?sort=featured"
        products={featured.map(mapProduct)}
      />

      {relevantCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <h2 className="display-font text-2xl font-bold md:text-3xl">
            Related departments
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Frequently requested categories for industrial buyers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {relevantCategories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/categories"
              className="rounded-md bg-[var(--steel)] px-3 py-2 text-sm font-semibold text-white"
            >
              All 10 categories
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="relative overflow-hidden rounded-md border border-[var(--border)] bg-[var(--steel)] px-6 py-10 text-white md:px-10">
          <div className="relative max-w-2xl">
            <h2 className="display-font text-3xl font-bold">Need bulk pricing?</h2>
            <p className="mt-3 text-white/80">
              Share your BOM or multi-SKU requirements. We respond with availability
              and commercial terms for B2B and project orders — no online payment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/inquiry">Request a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/track-order">Track Quote / Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="display-font text-2xl font-bold md:text-3xl">
              Buying guides
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Spec tips for caster wheels, electronics, and mild steel.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">All insights</Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                Guide
              </p>
              <h3 className="mt-2 text-base font-bold">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
