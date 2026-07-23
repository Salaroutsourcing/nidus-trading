"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      if (!res.ok) throw new Error("Unable to submit inquiry");
      setDone(true);
      toast.success("Inquiry submitted successfully");
    } catch {
      toast.error("Failed to submit inquiry");
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
      className="glass mt-8 space-y-4 rounded-2xl border border-[var(--border)] p-6"
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
      />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
