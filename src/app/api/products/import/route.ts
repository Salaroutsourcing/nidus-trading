import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const rowSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  price: z.number().positive(),
  discountPrice: z.number().positive().nullable().optional(),
  stock: z.number().int().min(0).default(0),
  description: z.string().optional(),
  shortDesc: z.string().optional(),
  brand: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).optional(),
  warrantyPeriod: z.string().nullable().optional(),
  mpn: z.string().nullable().optional(),
  categoryId: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  active: z.boolean().optional(),
  hsCode: z.string().nullable().optional(),
  countryOfOrigin: z.string().nullable().optional(),
  datasheetUrl: z.string().nullable().optional(),
  certifications: z.array(z.string()).optional(),
});

function descriptionFor(name: string, description?: string) {
  const text = (description || "").trim() || `${name}. Available from Nidus Trading.`;
  return text.length >= 10 ? text : `${text} Available on quote.`;
}

async function uniqueSlug(name: string, sku: string, ignoreId?: string) {
  const base = slugify(name) || slugify(sku) || "product";
  const taken = await prisma.product.findFirst({
    where: { slug: base, ...(ignoreId ? { NOT: { id: ignoreId } } : {}) },
  });
  if (!taken) return base;
  return slugify(`${name}-${sku}`) || `${base}-${sku.toLowerCase()}`;
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const rows = Array.isArray(body?.products) ? body.products : null;
  if (!rows) {
    return NextResponse.json({ error: "Expected a products array." }, { status: 400 });
  }
  if (rows.length > 200) {
    return NextResponse.json({ error: "Upload 200 products at a time." }, { status: 400 });
  }

  const categories = await prisma.category.findMany();
  const created: string[] = [];
  const updated: string[] = [];
  const failed: { row: number; sku?: string; message: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const parsed = rowSchema.safeParse(rows[i]);
    if (!parsed.success) {
      failed.push({
        row: i + 1,
        message: parsed.error.issues
          .map((issue) => `${issue.path.join(".") || "field"}: ${issue.message}`)
          .join("; "),
      });
      continue;
    }
    const data = parsed.data;
    const category =
      categories.find((item) => item.id === data.categoryId) ||
      categories.find((item) => {
        const query = (data.category || "").trim().toLowerCase();
        return query && (item.slug === query || item.name.toLowerCase() === query);
      }) ||
      categories.find((item) => {
        const query = (data.category || "").trim().toLowerCase();
        return query.length > 2 && item.name.toLowerCase().includes(query);
      });

    if (!category) {
      failed.push({
        row: i + 1,
        sku: data.sku,
        message: data.category
          ? `No category named “${data.category}”. Use a category that already exists.`
          : "Category is required. Use the category name from the shop.",
      });
      continue;
    }

    if (data.datasheetUrl && !/^https?:\/\//i.test(data.datasheetUrl)) {
      failed.push({ row: i + 1, sku: data.sku, message: "Datasheet must be a full http(s) link." });
      continue;
    }

    const payload = {
      name: data.name,
      description: descriptionFor(data.name, data.description),
      shortDesc: data.shortDesc,
      price: data.price,
      discountPrice: data.discountPrice ?? null,
      stock: data.stock,
      images: JSON.stringify(data.images),
      specifications: JSON.stringify(data.specifications || {}),
      brand: data.brand || null,
      tags: JSON.stringify(data.tags),
      featured: data.featured ?? false,
      bestSeller: data.bestSeller ?? false,
      active: data.active ?? true,
      mpn: data.mpn || null,
      hsCode: data.hsCode || null,
      countryOfOrigin: data.countryOfOrigin || null,
      datasheetUrl: data.datasheetUrl || null,
      certifications: JSON.stringify(data.certifications || []),
      warrantyPeriod: data.warrantyPeriod || null,
      categoryId: category.id,
    };

    try {
      const existing = await prisma.product.findUnique({ where: { sku: data.sku } });
      if (existing) {
        await prisma.product.update({
          where: { id: existing.id },
          data: { ...payload, slug: await uniqueSlug(data.name, data.sku, existing.id) },
        });
        updated.push(data.sku);
      } else {
        await prisma.product.create({
          data: { ...payload, sku: data.sku, slug: await uniqueSlug(data.name, data.sku) },
        });
        created.push(data.sku);
      }
    } catch {
      failed.push({
        row: i + 1,
        sku: data.sku,
        message: "Could not save this row. Check that the SKU and name are unique.",
      });
    }
  }

  return NextResponse.json({ created, updated, failed });
}
