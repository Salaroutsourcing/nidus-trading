import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { category: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      slug: body.name ? slugify(body.name) : undefined,
      description: body.description,
      shortDesc: body.shortDesc,
      sku: body.sku,
      price: body.price,
      discountPrice: body.discountPrice,
      stock: body.stock,
      images: body.images ? JSON.stringify(body.images) : undefined,
      specifications: body.specifications
        ? JSON.stringify(body.specifications)
        : undefined,
      brand: body.brand,
      tags: body.tags ? JSON.stringify(body.tags) : undefined,
      featured: body.featured,
      bestSeller: body.bestSeller,
      active: body.active,
      mpn: body.mpn,
      hsCode: body.hsCode,
      countryOfOrigin: body.countryOfOrigin,
      datasheetUrl: body.datasheetUrl,
      certifications: body.certifications
        ? JSON.stringify(body.certifications)
        : undefined,
      warrantyPeriod: body.warrantyPeriod,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
