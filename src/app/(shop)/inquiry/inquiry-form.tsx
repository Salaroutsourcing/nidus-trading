"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/constants";

export function InquiryForm() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Unable to submit inquiry"
        );
      }
      setDone(true);
      toast.success("Inquiry submitted successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit inquiry"
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="glass mt-8 rounded-2xl border border-[var(--border)] p-8">
        <h2 className="text-xl font-semibold">Thank you</h2>
        <p className="mt-2 text-[var(--muted)]">
          Your inquiry has been received. We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass relative mt-8 space-y-4 rounded-2xl border border-[var(--border)] p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Full name *" required />
        <Input name="email" type="email" placeholder="Email *" required />
        <Input name="phone" placeholder="Phone" />
        <Input name="company" placeholder="Company" />
      </div>
      <Input
        name="subject"
        placeholder="Subject *"
        required
        defaultValue="Bulk / Custom Quote Request"
      />
      <Input
        name="productInterest"
        placeholder="Product interest"
        defaultValue={product}
      />
      <Input name="quantity" placeholder="Estimated quantity" />
      <Textarea
        name="message"
        placeholder="Describe your requirements, BOM, or delivery timeline *"
        required
        minLength={10}
      />

      {/* Honeypot: hidden from users, commonly auto-filled by bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Submit Inquiry"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        Most quotes are reviewed within one business day. Urgent tender deadline?
        Call {COMPANY.phone}.
      </p>
    </form>
  );
}
