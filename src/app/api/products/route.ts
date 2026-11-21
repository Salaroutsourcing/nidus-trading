import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 0);
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = admin ? {} : { active: true };
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
  if (featured === "true") where.featured = true;
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

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
  });

  // Hide monetary fields on public API responses (admin retains full records)
  if (!admin) {
    return NextResponse.json(
      products.map((p) => {
        const { price: _price, discountPrice: _discount, ...rest } = p;
        void _price;
        void _discount;
        return rest;
      })
    );
  }

  return NextResponse.json(products);
}

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  shortDesc: z.string().optional(),
  sku: z.string().min(2),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0),
  images: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
  brand: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  active: z.boolean().optional(),
  mpn: z.string().optional().nullable(),
  hsCode: z.string().optional().nullable(),
  countryOfOrigin: z.string().optional().nullable(),
  datasheetUrl: z.string().url().optional().nullable(),
  certifications: z.array(z.string()).default([]),
  warrantyPeriod: z.string().optional().nullable(),
  categoryId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join("; ");
    return NextResponse.json({ error: message || "Check the product fields." }, { status: 400 });
  }

  const data = parsed.data;
  let slug = slugify(data.name) || slugify(data.sku);
  const slugTaken = await prisma.product.findUnique({ where: { slug } });
  if (slugTaken) {
    slug = slugify(`${data.name}-${data.sku}`) || `${slug}-${data.sku.toLowerCase()}`;
  }

  try {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      shortDesc: data.shortDesc,
      sku: data.sku,
      price: data.price,
      discountPrice: data.discountPrice,
      stock: data.stock,
      images: JSON.stringify(data.images),
      specifications: JSON.stringify(data.specifications),
      brand: data.brand,
      tags: JSON.stringify(data.tags),
      featured: data.featured ?? false,
      bestSeller: data.bestSeller ?? false,
      active: data.active ?? true,
      mpn: data.mpn,
      hsCode: data.hsCode,
      countryOfOrigin: data.countryOfOrigin,
      datasheetUrl: data.datasheetUrl,
      certifications: JSON.stringify(data.certifications),
      warrantyPeriod: data.warrantyPeriod,
      categoryId: data.categoryId,
    },
  });

  return NextResponse.json(product, { status: 201 });
  } catch (err) {
    const code =
      typeof err === "object" && err && "code" in err ? String((err as { code: string }).code) : "";
    if (code === "P2002") {
      return NextResponse.json(
        { error: "A product with this SKU or name already exists." },
        { status: 409 }
      );
    }
    throw err;
  }
}
