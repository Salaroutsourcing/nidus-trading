import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Order tracking is public (no login), so the reference number alone is not
 * treated as a secret: it must be paired with the email used on the request.
 * Looking up by email alone would let anyone enumerate another buyer's
 * procurement history, which is commercially sensitive for tender bidders.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber")?.trim();
  const email = searchParams.get("email")?.trim()?.toLowerCase();

  if (!orderNumber || !email) {
    return NextResponse.json(
      { error: "Enter both your quote reference and the email used on the request." },
      { status: 400 }
    );
  }

  const orders = await prisma.order.findMany({
    where: { orderNumber, customerEmail: email },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      createdAt: true,
      customerName: true,
      city: true,
      items: {
        select: { name: true, sku: true, quantity: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return NextResponse.json({ orders });
}
