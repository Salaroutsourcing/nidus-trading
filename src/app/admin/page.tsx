import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/admin/login");

  const [
    orders,
    pendingQuotes,
    inquiries,
    products,
    invoicedAgg,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { total: 0, status: { not: "CANCELLED" } } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" }, total: { gt: 0 } },
    }),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { label: "Orders / Quotes", value: String(orders), href: "/admin/orders" },
    { label: "Pending pricing", value: String(pendingQuotes), href: "/admin/invoices" },
    { label: "New Inquiries", value: String(inquiries), href: "/admin/inquiries" },
    { label: "Active Products", value: String(products), href: "/admin/products" },
    {
      label: "Invoiced revenue",
      value: formatPKR(invoicedAgg._sum.total || 0),
      href: "/admin/invoices",
    },
  ];

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Welcome back, {session.user.name || "Admin"}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
          >
            <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-[var(--accent)]">
            View all
          </Link>
        </div>
        <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {recentOrders.length === 0 ? (
            <p className="p-8 text-center text-sm text-[var(--muted)]">
              No orders yet. Quote submissions will appear here.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">
                      {order.total === 0 ? (
                        <span className="text-[var(--muted)]">RFQ</span>
                      ) : (
                        formatPKR(order.total)
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
