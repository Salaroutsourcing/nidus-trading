"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COMPANY } from "@/lib/constants";

type TrackedOrder = {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  customerName: string;
  city?: string | null;
  items: Array<{ name: string; quantity: number; sku?: string }>;
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
    if (!orderNumber?.trim() || !email?.trim()) {
      setOrders([]);
      setError("Enter both your quote reference and the email used on the request.");
      return;
    }
    setLoading(true);
    setError("");
    const params = new URLSearchParams({
      orderNumber: orderNumber.trim(),
      email: email.trim(),
    });
    try {
      const res = await fetch(`/api/track?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to track request");
        setOrders([]);
        return;
      }
      setOrders(data.orders || []);
      if (!data.orders?.length) {
        setError(
          "No quote request matches that reference and email. Check both, or call us on " +
            COMPANY.phone +
            "."
        );
      }
    } catch {
      setError("Network error — please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");
    if (orderNumber && email) {
      void track(orderNumber, email);
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
      <h1 className="display-font text-4xl font-semibold">Track Quote / Order</h1>
      <p className="mt-2 text-[var(--muted)]">
        Enter your quote reference or email to view status updates.
      </p>

      <form
        onSubmit={onSubmit}
        className="glass mt-8 grid gap-3 rounded-2xl border border-[var(--border)] p-6 sm:grid-cols-[1fr_1fr_auto]"
      >
        <Input
          name="orderNumber"
          placeholder="Reference (e.g. NT-260801-1234) *"
          required
          defaultValue={searchParams.get("orderNumber") || ""}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email used on the request *"
          required
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
                <li key={idx} className="flex justify-between gap-3">
                  <span>
                    {item.name}
                    {item.sku ? (
                      <span className="text-[var(--muted)]"> · {item.sku}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[var(--muted)]">× {item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
              Submitted {new Date(order.createdAt).toLocaleString()} · Commercial
              terms confirmed separately
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
