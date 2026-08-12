import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} collects, uses, and protects personal information when you use our website, quote forms, and related services.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated: 12 August 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[var(--foreground)]">
        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">1. Who we are</h2>
          <p>
            This Privacy Policy explains how {COMPANY.name} (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) handles personal information collected through{" "}
            <Link href="/" className="font-semibold text-[var(--accent)] hover:underline">
              nidustrading.com
            </Link>{" "}
            and related quote, inquiry, and support channels.
          </p>
          <p>
            <strong>Business address:</strong> {COMPANY.address}
            <br />
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.phone}
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">2. Information we collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>
              <span className="text-[var(--foreground)]">
                Contact and business details you submit — name, company, email, phone,
                city, and message content — via inquiry, quote list, contact, checkout,
                or account registration forms.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Order and quote reference details needed to process and track requests.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Technical and usage data such as IP address, browser type, device, pages
                visited, and approximate location — when analytics cookies are accepted.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Communications you send us by email, phone, or WhatsApp.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">3. How we use information</h2>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>
              <span className="text-[var(--foreground)]">
                To respond to quotations, inquiries, and support requests.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                To prepare commercial offers, confirm availability, and fulfill orders.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                To operate, secure, and improve our website and services.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                To measure site performance with analytics tools when you consent to
                analytics cookies.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                To meet legal, accounting, and tender-documentation obligations.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">4. Cookies and analytics</h2>
          <p>
            We use essential cookies required for basic site operation (for example
            session and preference cookies). Google Analytics (GA4) loads only after you
            accept analytics cookies via our cookie banner. You can decline analytics;
            the site will still work for browsing and submitting quotes.
          </p>
          <p>
            See also our cookie controls on first visit, and review Google&apos;s policies
            for how Google processes analytics data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">5. Sharing of information</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>
              <span className="text-[var(--foreground)]">
                Service providers who help us host the website, send email, or process
                analytics (only when enabled).
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Logistics or OEM partners when needed to fulfill a confirmed order or
                quotation.
              </span>
            </li>
            <li>
              <span className="text-[var(--foreground)]">
                Authorities when required by applicable law.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">6. Data retention</h2>
          <p>
            We keep inquiry, quote, and order records for as long as needed to provide
            our services, resolve disputes, and meet legal or commercial record-keeping
            requirements. Analytics data follows the retention settings of our analytics
            provider when analytics is enabled.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">7. Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect personal
            information. No method of transmission over the internet is fully secure; please
            avoid sending highly sensitive credentials through public forms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">8. Your choices</h2>
          <p>
            You may request access, correction, or deletion of personal information we
            hold about you, or withdraw analytics cookie consent, by contacting{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>
            . We may need to retain certain records for legal or transactional purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">9. Children</h2>
          <p>
            Our services are directed to business and professional buyers. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">10. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
            date at the top will change when we do. Continued use of the site after updates
            constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="display-font text-2xl font-bold">11. Contact</h2>
          <p>
            Questions about privacy: email{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.email}
            </a>{" "}
            or call{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {COMPANY.phone}
            </a>
            . Visit our{" "}
            <Link href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
              Contact
            </Link>{" "}
            page for the full office address.
          </p>
        </section>
      </div>
    </div>
  );
}
