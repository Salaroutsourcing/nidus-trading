import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { generateInvoicePdf } from "@/lib/invoice";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ orderId: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await params;
  const body = await req.json().catch(() => ({}));

  const existing = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Optional line-item pricing for quote-first orders
  if (Array.isArray(body.items)) {
    for (const item of body.items) {
      if (!item?.id) continue;
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      if (Number.isNaN(price) || price < 0) {
        return NextResponse.json({ error: "Invalid item price" }, { status: 400 });
      }
      if (Number.isNaN(quantity) || quantity < 1) {
        return NextResponse.json({ error: "Invalid item quantity" }, { status: 400 });
      }
      const belongs = existing.items.some((i) => i.id === item.id);
      if (!belongs) {
        return NextResponse.json({ error: "Invalid order item" }, { status: 400 });
      }
      await prisma.orderItem.update({
        where: { id: item.id },
        data: { price, quantity, total: price * quantity },
      });
    }
  }

  const refreshed = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!refreshed) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const computedSubtotal = refreshed.items.reduce((s, i) => s + i.total, 0);
  const discount = Number(body.discount ?? refreshed.discount);
  const tax = Number(body.tax ?? refreshed.tax);
  const shipping = Number(body.shipping ?? refreshed.shipping);
  const subtotal = Number(
    body.subtotal != null && body.subtotal !== "" ? body.subtotal : computedSubtotal
  );
  const total = Number(
    body.total != null && body.total !== ""
      ? body.total
      : subtotal - discount + tax + shipping
  );
  const invoiceRemarks = body.invoiceRemarks ?? refreshed.invoiceRemarks;

  if ([discount, tax, shipping, subtotal, total].some((n) => Number.isNaN(n))) {
    return NextResponse.json({ error: "Invalid amounts" }, { status: 400 });
  }
  if (discount < 0 || tax < 0 || shipping < 0 || subtotal < 0) {
    return NextResponse.json({ error: "Amounts cannot be negative" }, { status: 400 });
  }
  if (discount > subtotal) {
    return NextResponse.json({ error: "Discount exceeds subtotal" }, { status: 400 });
  }
  if (total < 0) {
    return NextResponse.json({ error: "Total cannot be negative" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { discount, tax, shipping, subtotal, total, invoiceRemarks },
    include: { items: true },
  });

  const pdf = await generateInvoicePdf(order);
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${order.orderNumber}.pdf"`,
    },
  });
}
