import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { Testimonials } from "@/components/home/testimonials";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, bestSellers, posts] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { active: true, bestSeller: true },
      include: { category: true },
      take: 8,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />

      <CategoryGrid categories={categories} />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="display-font text-3xl font-semibold md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              High-demand industrial and electronic products — request a quote.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/products">View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="glass relative overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-12 md:px-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="display-font text-3xl font-semibold md:text-4xl">
              Need a bulk quotation?
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Share your BOM or requirements and our team will respond with
              availability and commercial terms for B2B and project orders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/inquiry">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/track-order">Track Quote / Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="display-font text-3xl font-semibold md:text-4xl">
              Industry Insights
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Guides on sourcing, specifications, and market-ready solutions.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/blog">Read blog</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass rounded-2xl border border-[var(--border)] p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
                Article
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
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
