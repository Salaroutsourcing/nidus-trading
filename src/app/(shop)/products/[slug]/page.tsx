import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/products/add-to-cart-panel";
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
  const image =
    images[0] ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <nav className="mb-6 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/products">Products</Link> /{" "}
        <Link href={`/products?category=${product.category.slug}`}>
          {product.category.name}
        </Link>{" "}
        / <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-xl shadow-black/10">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
              {product.category.name}
            </p>
            <h1 className="display-font mt-2 text-4xl font-semibold">
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

          <div className="glass rounded-2xl border border-[var(--border)] px-5 py-4">
            <p className="text-lg font-semibold text-[var(--navy)]">
              Pricing on request
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Quote-driven supply for B2B and project buyers. Add to your quote list
              or submit an inquiry for commercial terms.
            </p>
          </div>

          <p className="text-[var(--muted)] leading-relaxed">
            {product.description}
          </p>

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

          {Object.keys(specs).length > 0 && (
            <div className="glass rounded-2xl border border-[var(--border)] p-5">
              <h2 className="font-semibold">Specifications</h2>
              <dl className="mt-4 space-y-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-b border-[var(--border)] py-2 text-sm"
                  >
                    <dt className="text-[var(--muted)]">{key}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-[var(--muted)]">
            Related:{" "}
            <Link
              href={`/products?category=${product.category.slug}`}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              More {product.category.name}
            </Link>{" "}
            ·{" "}
            <Link href="/inquiry" className="font-medium text-[var(--accent)] hover:underline">
              Bulk inquiry
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
