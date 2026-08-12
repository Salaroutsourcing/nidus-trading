import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Refund Policy",
  description: `Refund, return, and cancellation terms for ${COMPANY.name} quotations and confirmed industrial hardware orders.`,
  alternates: { canonical: "/refund" },
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Refund Policy</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated: 12 August 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed">
        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">1. Quotations are not charges</h2>
          <p>
            Submitting an inquiry or quote list on nidustrading.com does not charge your
            card. Commercial payment terms apply only after you accept a written quotation
            / invoice from {COMPANY.name}.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">2. Cancelling a quote request</h2>
          <p>
            You may ask us to close an open inquiry or quote reference before payment by
            emailing {COMPANY.email} or calling {COMPANY.phone} with your reference number.
            No refund is required for unpaid quote requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">3. Confirmed orders</h2>
          <p>
            Once an order is confirmed and payment (or contractual commitment) is received,
            cancellations and refunds depend on fulfillment stage:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>
              <span className="text-[var(--foreground)]">
                <strong>Not yet procured / not shipped:</strong> We will review
                cancellation requests case by case. Approved cancellations may receive a
                refund of amounts paid, less any non-recoverable costs already incurred.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                <strong>Indent / import / special-order items:</strong> These are often
                non-cancellable and non-refundable after procurement has started, as stated
                in your quotation.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                <strong>Shipped or delivered goods:</strong> Returns are accepted only for
                verified defects, wrong items shipped, or as required by applicable law or
                OEM warranty — not for change of mind on custom or indent goods.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">4. Defective or incorrect items</h2>
          <p>
            Report issues within a reasonable time after delivery (ideally within 7 days)
            with photos, packing details, and your order reference. If we confirm a defect
            or shipping error attributable to us, we will arrange repair, replacement, or
            refund as appropriate under the quotation and OEM warranty terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">5. OEM warranties</h2>
          <p>
            Manufacturer warranties remain with the OEM where applicable. Warranty claims
            may require serial numbers, proof of purchase, and OEM procedures.{" "}
            {COMPANY.name} can assist with documentation but warranty remedies are subject
            to the OEM&apos;s policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">6. Refund method and timing</h2>
          <p>
            Approved refunds are returned via the original payment method or another
            mutually agreed channel. Timing depends on banks and payment processors;
            we will confirm when a refund has been initiated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">7. How to request</h2>
          <p>
            Email{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>{" "}
            with your quote/order reference, reason, and supporting details, or call{" "}
            {COMPANY.phone}.
          </p>
          <p>Office: {COMPANY.address}</p>
          <p>
            Related:{" "}
            <Link
              href="/shipping"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Shipping Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="font-semibold text-[var(--accent)] hover:underline">
              Terms of Service
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
