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

  const discount = Number(body.discount ?? existing.discount);
  const tax = Number(body.tax ?? existing.tax);
  const shipping = Number(body.shipping ?? existing.shipping);
  const subtotal = Number(body.subtotal ?? existing.subtotal);
  const total = Number(body.total ?? subtotal - discount + tax + shipping);
  const invoiceRemarks = body.invoiceRemarks ?? existing.invoiceRemarks;

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
