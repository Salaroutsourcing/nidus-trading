import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/products/add-to-cart-panel";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import {
  formatPKR,
  getEffectivePrice,
  parseJsonArray,
  parseJsonObject,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDesc || product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.shortDesc || product.description.slice(0, 155),
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
  const price = getEffectivePrice(product.price, product.discountPrice);
  const image = images[0] || "/images/products/product-1.svg";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: product.brand || COMPANY.name,
    image: `${appUrl}${image}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${appUrl}/products/${product.slug}`,
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
        name: product.name,
        item: `${appUrl}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <nav className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/">Home</Link> / <Link href="/products">Products</Link> /{" "}
        <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[var(--border)]">
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
              <Badge tone={product.stock > 0 ? "success" : "danger"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold">{formatPKR(price)}</p>
            {price < product.price && (
              <p className="text-sm text-[var(--muted)] line-through">
                {formatPKR(product.price)}
              </p>
            )}
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
              price,
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
        </div>
      </div>
    </div>
  );
}
