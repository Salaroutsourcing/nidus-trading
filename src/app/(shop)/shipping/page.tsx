import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Shipping Policy",
  description: `How ${COMPANY.name} arranges delivery and logistics for quoted industrial and IT hardware orders across Pakistan.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Shipping Policy</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated: 12 August 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed">
        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">1. Quote-first fulfillment</h2>
          <p>
            {COMPANY.name} operates a quote-first model. Shipping method, cost, and
            estimated lead time are confirmed in your written quotation or invoice after
            we validate part numbers, quantity, and delivery city — not as a fixed checkout
            rate on the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">2. Coverage</h2>
          <p>
            We arrange supply and logistics nationwide across Pakistan. Share your
            delivery city and site address when requesting a quote so we can provide
            accurate lead-time and freight guidance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">3. Lead times</h2>
          <p>
            Lead times depend on stock status, import requirements, OEM allocation, and
            destination. Stock items may ship faster; indent / import items follow the
            schedule stated in your quotation. Urgent tender deadlines should be flagged
            in your inquiry notes or by calling {COMPANY.phone}.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">4. Packaging and documents</h2>
          <p>
            Goods are packed for transit according to product type. Where agreed in the
            quotation, we can include commercial documents such as packing lists,
            datasheets, country-of-origin details, and warranty information needed for
            tender or enterprise receiving.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">5. Risk and inspection</h2>
          <p>
            Please inspect packages on delivery and note visible damage with the carrier
            where applicable. Report shortages or transit damage promptly with your order
            / quote reference so we can assist with claims or replacements as applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">6. Tracking</h2>
          <p>
            After submission you receive a reference (for example NT-…). Use{" "}
            <Link
              href="/track-order"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Track Order
            </Link>{" "}
            with that number or your email to check status. Carrier tracking details are
            shared when a shipment is booked.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">7. Contact</h2>
          <p>
            Shipping questions:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>{" "}
            · {COMPANY.phone}
            <br />
            Office: {COMPANY.address}
          </p>
          <p>
            Related:{" "}
            <Link href="/refund" className="font-semibold text-[var(--accent)] hover:underline">
              Refund Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="font-semibold text-[var(--accent)] hover:underline">
              Terms of Service
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
