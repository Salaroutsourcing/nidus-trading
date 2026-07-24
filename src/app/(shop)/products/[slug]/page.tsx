import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/products/add-to-cart-panel";
import { ProductCard } from "@/components/products/product-card";
import {
  RecentlyViewed,
  TrackProductView,
} from "@/components/products/recently-viewed";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { parseJsonArray, parseJsonObject } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) return { title: "Product" };
  const title = `${product.name} | ${product.category.name} | Nidus Trading`;
  const description =
    product.shortDesc ||
    `${product.name} from Nidus Trading — request a quote for industrial supply in Pakistan.`;
  const images = parseJsonArray(product.images);
  return {
    title,
    description,
    keywords: parseJsonArray(product.tags),
    openGraph: {
      title,
      description,
      images: images[0] ? [images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product || !product.active) notFound();

  const images = parseJsonArray(product.images);
  const specs = parseJsonObject(product.specifications);
  const tags = parseJsonArray(product.tags);
  const gallery =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        ];
  const image = gallery[0];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const related = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { category: true },
    take: 6,
  });

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: product.brand || COMPANY.name,
    image: image.startsWith("http") ? image : `${appUrl}${image}`,
    category: product.category.name,
    offers: {
      "@type": "Offer",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${appUrl}/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: COMPANY.name,
      },
      description: "Request a quote — pricing provided on inquiry",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: appUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${appUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category.name,
        item: `${appUrl}/products?category=${product.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${appUrl}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <TrackProductView
        product={{ slug: product.slug, name: product.name, image }}
      />
      <nav className="mb-5 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--accent)]">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:text-[var(--accent)]">
          Products
        </Link>{" "}
        /{" "}
        <Link
          href={`/products?category=${product.category.slug}`}
          className="hover:text-[var(--accent)]"
        >
          {product.category.name}
        </Link>{" "}
        / <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_320px]">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
              priority
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {gallery.slice(0, 4).map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-md border border-[var(--border)]"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Title / specs summary */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {product.category.name}
              {product.brand ? ` · ${product.brand}` : ""}
            </p>
            <h1 className="display-font mt-2 text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">SKU: {product.sku}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.bestSeller && <Badge tone="warning">Best Seller</Badge>}
              <Badge tone={product.stock > 0 ? "success" : "info"}>
                {product.stock > 0 ? "Available on Quote" : "Inquire for Availability"}
              </Badge>
            </div>
          </div>

          {product.shortDesc && (
            <p className="text-[var(--muted)]">{product.shortDesc}</p>
          )}

          {Object.keys(specs).length > 0 && (
            <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-4">
              <h2 className="text-sm font-bold">Key specifications</h2>
              <dl className="mt-3 space-y-2">
                {Object.entries(specs)
                  .slice(0, 6)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-4 border-b border-[var(--border)] py-1.5 text-sm last:border-0"
                    >
                      <dt className="text-[var(--muted)]">{key}</dt>
                      <dd className="font-medium text-right">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag} href={`/products?q=${encodeURIComponent(tag)}`}>
                  <Badge>{tag}</Badge>
                </Link>
              ))}
            </div>
          )}

          <p className="text-sm text-[var(--muted)]">
            Related department:{" "}
            <Link
              href={`/products?category=${product.category.slug}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {product.category.name}
            </Link>{" "}
            ·{" "}
            <Link
              href="/inquiry"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Bulk inquiry
            </Link>
          </p>
        </div>

        {/* Quote box */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <AddToCartPanel
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              sku: product.sku,
              stock: product.stock,
              image,
            }}
          />
        </div>
      </div>

      {/* Tabs-like sections */}
      <div className="mt-12 space-y-8">
        <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="display-font text-xl font-bold">Description</h2>
          <p className="prose-nidus mt-4 whitespace-pre-line">
            {product.description}
          </p>
        </section>

        {Object.keys(specs).length > 0 && (
          <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="display-font text-xl font-bold">Specifications</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-[var(--border)]">
                      <th className="w-1/3 py-2.5 pr-4 text-left font-medium text-[var(--muted)]">
                        {key}
                      </th>
                      <td className="py-2.5 font-semibold">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="display-font text-xl font-bold">Related products</h2>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                More {product.category.name}
              </Link>
            </div>
            <div className="product-row scrollbar-hide">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  compact
                  product={{
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    sku: p.sku,
                    stock: p.stock,
                    images: p.images,
                    brand: p.brand,
                    bestSeller: p.bestSeller,
                    shortDesc: p.shortDesc,
                    category: p.category,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <RecentlyViewed currentSlug={product.slug} />
      </div>
    </div>
  );
}
