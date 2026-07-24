"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { adminFetch } from "@/lib/admin-fetch";
import { formatPKR } from "@/lib/utils";

type OrderItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  productId?: string | null;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  invoiceRemarks?: string | null;
  items: OrderItem[];
};

type EditState = {
  discount: string;
  tax: string;
  shipping: string;
  remarks: string;
  customSubtotal: string;
  items: Record<string, { price: string; quantity: string }>;
};

export default function AdminInvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [edits, setEdits] = useState<Record<string, EditState>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<Order[]>("/api/orders");
      setOrders(Array.isArray(data) ? data : []);
      const map: Record<string, EditState> = {};
      for (const o of data) {
        map[o.id] = {
          discount: String(o.discount ?? 0),
          tax: String(o.tax ?? 0),
          shipping: String(o.shipping ?? 0),
          remarks: o.invoiceRemarks || "",
          customSubtotal: "",
          items: Object.fromEntries(
            o.items.map((i) => [
              i.id,
              { price: String(i.price), quantity: String(i.quantity) },
            ])
          ),
        };
      }
      setEdits(map);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function previewFor(order: Order) {
    const edit = edits[order.id];
    if (!edit) return { subtotal: order.subtotal, total: order.total };
    const itemsSubtotal = order.items.reduce((sum, item) => {
      const e = edit.items[item.id];
      const price = Number(e?.price ?? item.price);
      const qty = Number(e?.quantity ?? item.quantity);
      return sum + price * qty;
    }, 0);
    const subtotal = edit.customSubtotal
      ? Number(edit.customSubtotal)
      : itemsSubtotal;
    const total =
      subtotal -
      Number(edit.discount || 0) +
      Number(edit.tax || 0) +
      Number(edit.shipping || 0);
    return { subtotal, total };
  }

  async function applyCatalogPrices(order: Order) {
    try {
      const products = await adminFetch<
        Array<{ id: string; price: number; discountPrice?: number | null }>
      >("/api/products");
      const byId = new Map(products.map((p) => [p.id, p]));
      setEdits((s) => {
        const edit = s[order.id];
        if (!edit) return s;
        const nextItems = { ...edit.items };
        for (const item of order.items) {
          if (!item.productId) continue;
          const p = byId.get(item.productId);
          if (!p) continue;
          const price =
            p.discountPrice != null && p.discountPrice > 0
              ? p.discountPrice
              : p.price;
          nextItems[item.id] = {
            ...nextItems[item.id],
            price: String(price),
          };
        }
        return { ...s, [order.id]: { ...edit, items: nextItems, customSubtotal: "" } };
      });
      toast.success("Catalog prices applied — review before generating PDF");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load catalog prices");
    }
  }

  async function generate(order: Order) {
    const edit = edits[order.id];
    if (!edit) return;
    const { subtotal, total } = previewFor(order);
    if (total < 0) {
      toast.error("Total cannot be negative");
      return;
    }
    setBusyId(order.id);
    try {
      const res = await fetch(`/api/invoices/${order.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discount: Number(edit.discount || 0),
          tax: Number(edit.tax || 0),
          shipping: Number(edit.shipping || 0),
          subtotal,
          total,
          invoiceRemarks: edit.remarks,
          items: order.items.map((i) => ({
            id: i.id,
            price: Number(edit.items[i.id]?.price ?? i.price),
            quantity: Number(edit.items[i.id]?.quantity ?? i.quantity),
          })),
        }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Invoice generation failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${order.orderNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Invoice downloaded");
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invoice generation failed");
    } finally {
      setBusyId(null);
    }
  }

  const quoteCount = useMemo(
    () => orders.filter((o) => o.total === 0).length,
    [orders]
  );

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Invoices</h1>
      <p className="text-sm text-[var(--muted)]">
        Set line amounts for quote requests, apply discount/tax/shipping, add remarks,
        then generate a PDF. Company: Nidus Trading · 0349-0307920
      </p>
      {quoteCount > 0 && (
        <p className="mt-2 text-xs text-[var(--accent)]">
          {quoteCount} quote request{quoteCount === 1 ? "" : "s"} with PKR 0 totals —
          set item prices below before invoicing.
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="font-semibold">No orders yet</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Quote submissions will appear here for invoicing.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => {
            const edit = edits[order.id];
            if (!edit) return null;
            const preview = previewFor(order);
            return (
              <div
                key={order.id}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {order.customerName} · {order.customerEmail}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge>{order.status}</Badge>
                      {order.total === 0 && (
                        <Badge tone="warning">Needs pricing</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--muted)]">Preview total</p>
                    <p className="text-lg font-bold">{formatPKR(preview.total)}</p>
                    <p className="text-xs text-[var(--muted)]">
                      Subtotal {formatPKR(preview.subtotal)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto rounded-md border border-[var(--border)]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--background)] text-[var(--muted)]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Item</th>
                        <th className="px-3 py-2 font-medium">Qty</th>
                        <th className="px-3 py-2 font-medium">Unit price</th>
                        <th className="px-3 py-2 font-medium">Line total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => {
                        const ie = edit.items[item.id];
                        const price = Number(ie?.price || 0);
                        const qty = Number(ie?.quantity || 1);
                        return (
                          <tr key={item.id} className="border-t border-[var(--border)]">
                            <td className="px-3 py-2">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-[var(--muted)]">{item.sku}</p>
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                type="number"
                                min={1}
                                className="w-20"
                                value={ie?.quantity ?? "1"}
                                onChange={(e) =>
                                  setEdits((s) => ({
                                    ...s,
                                    [order.id]: {
                                      ...edit,
                                      items: {
                                        ...edit.items,
                                        [item.id]: {
                                          ...ie,
                                          quantity: e.target.value,
                                          price: ie?.price ?? "0",
                                        },
                                      },
                                    },
                                  }))
                                }
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                type="number"
                                min={0}
                                className="w-32"
                                value={ie?.price ?? "0"}
                                onChange={(e) =>
                                  setEdits((s) => ({
                                    ...s,
                                    [order.id]: {
                                      ...edit,
                                      items: {
                                        ...edit.items,
                                        [item.id]: {
                                          ...ie,
                                          price: e.target.value,
                                          quantity: ie?.quantity ?? "1",
                                        },
                                      },
                                    },
                                  }))
                                }
                              />
                            </td>
                            <td className="px-3 py-2 font-medium">
                              {formatPKR(price * qty)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Input
                    type="number"
                    placeholder="Custom subtotal (optional)"
                    value={edit.customSubtotal}
                    onChange={(e) =>
                      setEdits((s) => ({
                        ...s,
                        [order.id]: { ...edit, customSubtotal: e.target.value },
                      }))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Discount"
                    value={edit.discount}
                    onChange={(e) =>
                      setEdits((s) => ({
                        ...s,
                        [order.id]: { ...edit, discount: e.target.value },
                      }))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Tax"
                    value={edit.tax}
                    onChange={(e) =>
                      setEdits((s) => ({
                        ...s,
                        [order.id]: { ...edit, tax: e.target.value },
                      }))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Shipping"
                    value={edit.shipping}
                    onChange={(e) =>
                      setEdits((s) => ({
                        ...s,
                        [order.id]: { ...edit, shipping: e.target.value },
                      }))
                    }
                  />
                </div>
                <Textarea
                  className="mt-3"
                  placeholder="Invoice remarks"
                  value={edit.remarks}
                  onChange={(e) =>
                    setEdits((s) => ({
                      ...s,
                      [order.id]: { ...edit, remarks: e.target.value },
                    }))
                  }
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => applyCatalogPrices(order)}
                  >
                    Apply catalog prices
                  </Button>
                  <Button
                    onClick={() => generate(order)}
                    disabled={busyId === order.id}
                  >
                    {busyId === order.id ? "Generating…" : "Generate PDF Invoice"}
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/orders">Open orders</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
