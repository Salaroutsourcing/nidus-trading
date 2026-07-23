"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { INQUIRY_STATUSES } from "@/lib/constants";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  reply?: string | null;
  productInterest?: string | null;
};

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});

  async function load() {
    const data = await fetch("/api/inquiries").then((r) => r.json());
    setItems(data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function update(id: string, status: string, reply?: string) {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reply }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Inquiry updated");
    void load();
  }

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Inquiries</h1>
      <p className="text-sm text-[var(--muted)]">
        View, reply, and mark inquiries as converted.
      </p>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass rounded-2xl border border-[var(--border)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{item.subject}</p>
                <p className="text-sm text-[var(--muted)]">
                  {item.name} · {item.email}
                </p>
                {item.productInterest && (
                  <p className="mt-1 text-xs text-[var(--accent)]">
                    Interest: {item.productInterest}
                  </p>
                )}
              </div>
              <Badge>{item.status}</Badge>
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{item.message}</p>
            <Textarea
              className="mt-4"
              placeholder="Reply message"
              value={replies[item.id] ?? item.reply ?? ""}
              onChange={(e) =>
                setReplies((r) => ({ ...r, [item.id]: e.target.value }))
              }
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  update(item.id, "REPLIED", replies[item.id] || item.reply || "")
                }
              >
                Save reply
              </Button>
              <Button
                variant="secondary"
                onClick={() => update(item.id, "CONVERTED")}
              >
                Mark converted
              </Button>
              <select
                className="h-11 rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
                value={item.status}
                onChange={(e) => update(item.id, e.target.value)}
              >
                {INQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
