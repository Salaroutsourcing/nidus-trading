"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatPKR } from "@/lib/utils";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  total: number;
  adminNotes?: string | null;
  items: Array<{ name: string; quantity: number }>;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function load() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    const map: Record<string, string> = {};
    for (const o of data) map[o.id] = o.adminNotes || "";
    setNotes(map);
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes: notes[id] || "" }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Order updated");
    void load();
  }

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Orders</h1>
      <p className="text-sm text-[var(--muted)]">
        Manage lifecycle status and internal notes.
      </p>
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="glass rounded-2xl border border-[var(--border)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-[var(--muted)]">
                  {order.customerName} · {order.customerEmail}
                </p>
                <p className="mt-1 text-sm">
                  {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
                </p>
              </div>
              <div className="text-right">
                <Badge>{order.status}</Badge>
                <p className="mt-2 font-semibold">{formatPKR(order.total)}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <Textarea
                value={notes[order.id] || ""}
                onChange={(e) =>
                  setNotes((n) => ({ ...n, [order.id]: e.target.value }))
                }
                placeholder="Admin notes"
              />
              <select
                className="h-11 rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Button
                variant="secondary"
                onClick={() => updateStatus(order.id, order.status)}
              >
                Save notes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
