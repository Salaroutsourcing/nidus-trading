"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPKR } from "@/lib/utils";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  invoiceRemarks?: string | null;
};

export default function AdminInvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [edits, setEdits] = useState<
    Record<
      string,
      { discount: string; tax: string; shipping: string; remarks: string }
    >
  >({});

  async function load() {
    const data = await fetch("/api/orders").then((r) => r.json());
    setOrders(data);
    const map: typeof edits = {};
    for (const o of data) {
      map[o.id] = {
        discount: String(o.discount),
        tax: String(o.tax),
        shipping: String(o.shipping),
        remarks: o.invoiceRemarks || "",
      };
    }
    setEdits(map);
  }

  useEffect(() => {
    void load();
  }, []);

  async function generate(order: Order) {
    const edit = edits[order.id];
    const discount = Number(edit.discount || 0);
    const tax = Number(edit.tax || 0);
    const shipping = Number(edit.shipping || 0);
    const total = order.subtotal - discount + tax + shipping;

    const res = await fetch(`/api/invoices/${order.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discount,
        tax,
        shipping,
        subtotal: order.subtotal,
        total,
        invoiceRemarks: edit.remarks,
      }),
    });

    if (!res.ok) {
      toast.error("Invoice generation failed");
      return;
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
  }

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Invoices</h1>
      <p className="text-sm text-[var(--muted)]">
        Apply discounts, edit amounts, add remarks, then generate PDF invoices.
      </p>
      <div className="mt-8 space-y-4">
        {orders.map((order) => {
          const edit = edits[order.id] || {
            discount: "0",
            tax: "0",
            shipping: "0",
            remarks: "",
          };
          const previewTotal =
            order.subtotal -
            Number(edit.discount || 0) +
            Number(edit.tax || 0) +
            Number(edit.shipping || 0);
          return (
            <div
              key={order.id}
              className="glass rounded-2xl border border-[var(--border)] p-5"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {order.customerName}
                  </p>
                </div>
                <p className="font-semibold">
                  Preview: {formatPKR(previewTotal)}
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
              <Button className="mt-3" onClick={() => generate(order)}>
                Generate PDF Invoice
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
