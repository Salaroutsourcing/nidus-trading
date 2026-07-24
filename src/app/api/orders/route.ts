import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  company: z.string().optional(),
  shippingAddress: z.string().min(5),
  city: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const session = await auth();
  const data = parsed.data;
  const productIds = data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Invalid products in quote list" }, { status: 400 });
  }

  // Inquiry-first: store trackable quote request without public pricing / stock deduction
  const lineItems = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: 0,
      quantity: item.quantity,
      total: 0,
    };
  });

  const itemSummary = lineItems
    .map((i) => `${i.name} × ${i.quantity} (${i.sku})`)
    .join("; ");

  try {
    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session?.user?.id,
          customerName: data.customerName,
          customerEmail: data.customerEmail.toLowerCase(),
          customerPhone: data.customerPhone,
          company: data.company,
          shippingAddress: data.shippingAddress,
          city: data.city,
          notes: data.notes,
          status: "PENDING",
          subtotal: 0,
          discount: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          items: { create: lineItems },
        },
        include: { items: true },
      });

      await tx.inquiry.create({
        data: {
          name: data.customerName,
          email: data.customerEmail.toLowerCase(),
          phone: data.customerPhone,
          company: data.company,
          subject: `Quote request ${created.orderNumber}`,
          message: [
            data.notes || "Quote request submitted from catalog quote list.",
            `Items: ${itemSummary}`,
            `Address: ${data.shippingAddress}${data.city ? `, ${data.city}` : ""}`,
          ].join("\n\n"),
          productInterest: itemSummary.slice(0, 500),
          quantity: String(lineItems.reduce((s, i) => s + i.quantity, 0)),
          status: "NEW",
          userId: session?.user?.id,
        },
      });

      return created;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Quote request failed" },
      { status: 400 }
    );
  }
}
