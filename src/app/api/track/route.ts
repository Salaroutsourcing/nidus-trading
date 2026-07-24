import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber")?.trim();
  const email = searchParams.get("email")?.trim()?.toLowerCase();

  if (!orderNumber && !email) {
    return NextResponse.json(
      { error: "Provide orderNumber or email" },
      { status: 400 }
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      ...(orderNumber ? { orderNumber } : {}),
      ...(email ? { customerEmail: email } : {}),
    },
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
