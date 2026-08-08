import { COMPANY, SITE_URL } from "@/lib/constants";

/**
 * Lead notifications.
 *
 * Quote requests are the entire funnel for this site, so a submission that
 * only lands in Postgres is effectively a lost lead. Delivery is best-effort
 * and must never fail the visitor's submission: every path is caught and
 * logged so the record is still saved even if the mail provider is down.
 *
 * Configure either (or both):
 *   RESEND_API_KEY + SALES_EMAIL  — email via Resend's REST API (no SDK needed)
 *   LEAD_WEBHOOK_URL              — POST the payload anywhere (Slack, Zapier, n8n)
 */

type InquiryPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  productInterest?: string | null;
  quantity?: string | null;
};

type QuotePayload = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string | null;
  city?: string | null;
  shippingAddress: string;
  notes?: string | null;
  itemSummary: string;
};

const SALES_EMAIL = process.env.SALES_EMAIL || COMPANY.email;
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#5c6b7a;white-space:nowrap">${label}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${COMPANY.name} <${FROM_EMAIL}>`,
      to: [SALES_EMAIL],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    console.error("[notify] Resend rejected the email", res.status, await res.text());
  }
}

async function sendWebhook(payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("[notify] Lead webhook failed", res.status);
  }
}

function warnIfUnconfigured(kind: string, reference: string) {
  if (process.env.RESEND_API_KEY || process.env.LEAD_WEBHOOK_URL) return;
  console.warn(
    `[notify] ${kind} ${reference} saved but no notification channel is configured. ` +
      `Set RESEND_API_KEY (+ SALES_EMAIL) or LEAD_WEBHOOK_URL to be alerted.`
  );
}

export async function notifyNewInquiry(inquiry: InquiryPayload) {
  warnIfUnconfigured("Inquiry from", inquiry.email);

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <h2 style="margin:0 0 4px">New quote inquiry</h2>
      <p style="margin:0 0 16px;color:#5c6b7a">${escapeHtml(inquiry.subject)}</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Name", inquiry.name)}
        ${row("Email", inquiry.email)}
        ${row("Phone", inquiry.phone)}
        ${row("Company", inquiry.company)}
        ${row("Product interest", inquiry.productInterest)}
        ${row("Quantity", inquiry.quantity)}
      </table>
      <h3 style="margin:20px 0 6px;font-size:14px">Requirement</h3>
      <p style="white-space:pre-line;line-height:1.6;margin:0">${escapeHtml(inquiry.message)}</p>
      <p style="margin-top:24px">
        <a href="${SITE_URL}/admin/inquiries" style="color:#e67e22;font-weight:600">Open in admin →</a>
      </p>
    </div>`;

  await Promise.allSettled([
    sendEmail(`New inquiry — ${inquiry.name}`, html, inquiry.email),
    sendWebhook({ type: "inquiry", ...inquiry }),
  ]);
}

export async function notifyNewQuoteRequest(order: QuotePayload) {
  warnIfUnconfigured("Quote request", order.orderNumber);

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <h2 style="margin:0 0 4px">New quote request ${escapeHtml(order.orderNumber)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-top:12px">
        ${row("Name", order.customerName)}
        ${row("Email", order.customerEmail)}
        ${row("Phone", order.customerPhone)}
        ${row("Company", order.company)}
        ${row("City", order.city)}
        ${row("Address", order.shippingAddress)}
      </table>
      <h3 style="margin:20px 0 6px;font-size:14px">Items</h3>
      <p style="white-space:pre-line;line-height:1.6;margin:0">${escapeHtml(order.itemSummary)}</p>
      ${
        order.notes
          ? `<h3 style="margin:20px 0 6px;font-size:14px">Notes</h3><p style="white-space:pre-line;line-height:1.6;margin:0">${escapeHtml(order.notes)}</p>`
          : ""
      }
      <p style="margin-top:24px">
        <a href="${SITE_URL}/admin/orders" style="color:#e67e22;font-weight:600">Open in admin →</a>
      </p>
    </div>`;

  await Promise.allSettled([
    sendEmail(
      `Quote request ${order.orderNumber} — ${order.customerName}`,
      html,
      order.customerEmail
    ),
    sendWebhook({ type: "quote-request", ...order }),
  ]);
}
