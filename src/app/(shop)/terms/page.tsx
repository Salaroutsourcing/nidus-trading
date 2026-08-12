import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${COMPANY.name} website, quotations, and supply of industrial and IT hardware.`,
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated: 12 August 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed">
        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">1. Agreement</h2>
          <p>
            By accessing nidustrading.com or requesting a quotation from{" "}
            {COMPANY.name} (&quot;we&quot;, &quot;us&quot;), you agree to these Terms of
            Service. If you do not agree, please do not use the site or submit requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">2. Who we are</h2>
          <p>
            {COMPANY.name} supplies specialized industrial and IT hardware on a
            quote-first basis for government tenders, enterprise procurement, and related
            buyers in Pakistan.
          </p>
          <p>
            <strong>Office:</strong> {COMPANY.address}
            <br />
            <strong>Email:</strong> {COMPANY.email}
            <br />
            <strong>Phone:</strong> {COMPANY.phone}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">3. Quote-first model</h2>
          <p>
            Product pages and catalogs are informational. Listed descriptions, MPNs, and
            specifications do not constitute a binding offer. Prices are not published by
            default. A binding commercial commitment exists only when we issue a written
            quotation and you accept it under the terms stated in that quotation (or a
            separate purchase order / contract).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">4. Accuracy of information</h2>
          <p>
            We aim to keep catalog content accurate. OEM specs, availability, lead times,
            and documentation can change. Confirm critical requirements in writing before
            relying on a listing for tender submission or project design.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">5. User responsibilities</h2>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>
              <span className="text-[var(--foreground)]">
                Provide accurate contact and requirement details when submitting inquiries
                or quote lists.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Do not misuse the site (scraping at abusive rates, attempting unauthorized
                access, or submitting malicious content).
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Keep account credentials confidential if you register.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">6. Orders and payment</h2>
          <p>
            Online checkout on this site creates a quote / order request; it does not
            process card payments by default. Payment methods, advance requirements,
            taxes, and delivery terms are confirmed in the commercial quotation or invoice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">7. Intellectual property</h2>
          <p>
            Site content, branding, and layout are owned by {COMPANY.name} or its
            licensors. OEM names and trademarks belong to their respective owners and are
            used to identify genuine products. You may not copy catalog content for
            competing commercial use without permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, {COMPANY.name} is not
            liable for indirect, incidental, or consequential damages arising from site
            use or reliance on catalog information. Liability related to supplied goods is
            governed by the accepted quotation, invoice, and any OEM warranty terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">9. Shipping and refunds</h2>
          <p>
            Logistics and returns are described in our{" "}
            <Link href="/shipping" className="font-semibold text-[var(--accent)] hover:underline">
              Shipping Policy
            </Link>{" "}
            and{" "}
            <Link href="/refund" className="font-semibold text-[var(--accent)] hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">10. Privacy</h2>
          <p>
            Personal data is handled as described in our{" "}
            <Link href="/privacy" className="font-semibold text-[var(--accent)] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">11. Governing law</h2>
          <p>
            These terms are governed by the laws of Pakistan. Disputes shall be subject to
            the courts of competent jurisdiction in Rawalpindi / Islamabad, unless a
            written contract states otherwise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">12. Changes</h2>
          <p>
            We may update these Terms periodically. The &quot;Last updated&quot; date will
            change when we do. Continued use of the site after changes means you accept
            the updated Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">13. Contact</h2>
          <p>
            Questions:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>{" "}
            ·{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.phone}
            </a>{" "}
            ·{" "}
            <Link href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
              Contact page
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
