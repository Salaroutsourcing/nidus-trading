"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adminFetch } from "@/lib/admin-fetch";
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
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<Inquiry[]>("/api/inquiries");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function update(id: string, status: string, reply?: string) {
    try {
      await adminFetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reply }),
      });
      toast.success("Inquiry updated");
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  const filtered =
    filter === "ALL" ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <h1 className="display-font text-3xl font-semibold">Inquiries</h1>
      <p className="text-sm text-[var(--muted)]">
        View, reply, and mark inquiries as converted. Replies are stored for follow-up.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {["ALL", ...INQUIRY_STATUSES].map((s) => (
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
          No inquiries in this filter.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5"
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
              <p className="mt-3 whitespace-pre-wrap text-sm">{item.message}</p>
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
                    update(
                      item.id,
                      "REPLIED",
                      replies[item.id] || item.reply || ""
                    )
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
                  className="h-10 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
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
      )}
    </div>
  );
}
