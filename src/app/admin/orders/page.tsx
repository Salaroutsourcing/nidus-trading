"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adminFetch } from "@/lib/admin-fetch";
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
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<Order[]>("/api/orders");
      const list = Array.isArray(data) ? data : [];
      setOrders(list);
      const n: Record<string, string> = {};
      const s: Record<string, string> = {};
      for (const o of list) {
        n[o.id] = o.adminNotes || "";
        s[o.id] = o.status;
      }
      setNotes(n);
      setStatuses(s);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(id: string) {
    try {
      await adminFetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statuses[id],
          adminNotes: notes[id] || "",
        }),
      });
      toast.success("Order updated");
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  const filtered =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="display-font text-3xl font-semibold">Orders</h1>
          <p className="text-sm text-[var(--muted)]">
            Manage status and notes. Set invoice amounts under Invoices.
          </p>
        </div>
        <Link
          href="/admin/invoices"
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Open invoices →
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["ALL", ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
              filter === s
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-md border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          No orders in this filter.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5"
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
                  <p className="mt-2 font-semibold">
                    {order.total === 0 ? "RFQ / Quote" : formatPKR(order.total)}
                  </p>
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
                  className="h-10 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
                  value={statuses[order.id] || order.status}
                  onChange={(e) =>
                    setStatuses((s) => ({ ...s, [order.id]: e.target.value }))
                  }
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Button onClick={() => save(order.id)}>Save</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
