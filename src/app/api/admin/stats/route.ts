import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [orders, inquiries, products, revenueAgg, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" } },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        total: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    orders,
    inquiries,
    products,
    revenue: revenueAgg._sum.total || 0,
    recentOrders,
  });
}
