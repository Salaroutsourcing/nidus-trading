import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let products: { slug: string; updatedAt: Date }[] = [];
  let posts: { slug: string; updatedAt: Date }[] = [];
  let categories: { slug: string; updatedAt: Date }[] = [];

  try {
    [products, posts, categories] = await Promise.all([
      prisma.product.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
  } catch {
    // Build/preview without a valid DATABASE_URL still emits static routes
  }

  const staticRoutes = [
    "",
    "/products",
    "/categories",
    "/services",
    "/about",
    "/contact",
    "/inquiry",
    "/track-order",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...categories.map((c) => ({
      url: `${base}/products?category=${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
