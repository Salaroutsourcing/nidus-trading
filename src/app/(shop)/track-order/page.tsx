"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPKR } from "@/lib/utils";

type TrackedOrder = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  customerName: string;
  city?: string | null;
  items: Array<{ name: string; quantity: number; total: number }>;
};

function statusTone(status: string) {
  if (status === "DELIVERED") return "success" as const;
  if (status === "CANCELLED") return "danger" as const;
  if (status === "SHIPPED") return "info" as const;
  if (status === "PROCESSING") return "warning" as const;
  return "default" as const;
}

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function track(orderNumber?: string, email?: string) {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (orderNumber) params.set("orderNumber", orderNumber);
    if (email) params.set("email", email);
    const res = await fetch(`/api/track?${params.toString()}`);
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Unable to track order");
      setOrders([]);
      return;
    }
    setOrders(data.orders || []);
    if (!data.orders?.length) setError("No orders found");
  }

  useEffect(() => {
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");
    if (orderNumber || email) {
      void track(orderNumber || undefined, email || undefined);
    }
  }, [searchParams]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    void track(
      String(form.get("orderNumber") || ""),
      String(form.get("email") || "")
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Track Your Order</h1>
      <p className="mt-2 text-[var(--muted)]">
        Enter your Order ID or email to view real-time status updates.
      </p>

      <form
        onSubmit={onSubmit}
        className="glass mt-8 grid gap-3 rounded-2xl border border-[var(--border)] p-6 sm:grid-cols-[1fr_1fr_auto]"
      >
        <Input
          name="orderNumber"
          placeholder="Order ID (e.g. NT-DEMO-1001)"
          defaultValue={searchParams.get("orderNumber") || ""}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={searchParams.get("email") || ""}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Track"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="glass rounded-2xl border border-[var(--border)] p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-[var(--muted)]">
                  {order.customerName}
                  {order.city ? ` · ${order.city}` : ""}
                </p>
              </div>
              <Badge tone={statusTone(order.status)}>{order.status}</Badge>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPKR(item.total)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-[var(--border)] pt-3 text-sm font-semibold">
              <span>Total</span>
              <span>{formatPKR(order.total)}</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Placed {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading tracker...</div>}>
      <TrackOrderForm />
    </Suspense>
  );
}
