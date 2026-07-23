import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { COMPANY } from "@/lib/constants";

export type InvoiceOrder = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string | null;
  shippingAddress: string;
  city?: string | null;
  notes?: string | null;
  invoiceRemarks?: string | null;
  status: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date | string;
  items: Array<{
    name: string;
    sku: string;
    price: number;
    quantity: number;
    total: number;
  }>;
};

function money(n: number) {
  return `PKR ${n.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

export async function generateInvoicePdf(order: InvoiceOrder): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const navy = rgb(0.05, 0.12, 0.22);
  const accent = rgb(0.12, 0.55, 0.48);
  const muted = rgb(0.35, 0.4, 0.45);
  const line = rgb(0.85, 0.88, 0.9);

  let y = 800;

  page.drawText(COMPANY.name.toUpperCase(), { x: 40, y, size: 20, font: bold, color: navy });
  y -= 18;
  page.drawText("TAX INVOICE", { x: 40, y, size: 11, font: bold, color: accent });
  page.drawText(`Invoice #: ${order.orderNumber}`, {
    x: 340,
    y: 800,
    size: 11,
    font: bold,
    color: navy,
  });
  page.drawText(`Date: ${new Date(order.createdAt).toLocaleDateString("en-PK")}`, {
    x: 340,
    y: 784,
    size: 10,
    font,
    color: muted,
  });
  page.drawText(`Status: ${order.status}`, {
    x: 340,
    y: 768,
    size: 10,
    font,
    color: muted,
  });

  y = 740;
  page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 1, color: line });
  y -= 28;

  page.drawText("Bill To", { x: 40, y, size: 10, font: bold, color: accent });
  page.drawText("Ship From", { x: 320, y, size: 10, font: bold, color: accent });
  y -= 16;
  page.drawText(order.customerName, { x: 40, y, size: 10, font: bold, color: navy });
  page.drawText(COMPANY.name, { x: 320, y, size: 10, font: bold, color: navy });
  y -= 14;
  if (order.company) {
    page.drawText(order.company, { x: 40, y, size: 9, font, color: muted });
  }
  page.drawText(COMPANY.phone, { x: 320, y, size: 9, font, color: muted });
  y -= 14;
  page.drawText(order.customerEmail, { x: 40, y, size: 9, font, color: muted });
  page.drawText(COMPANY.email, { x: 320, y, size: 9, font, color: muted });
  y -= 14;
  page.drawText(order.customerPhone, { x: 40, y, size: 9, font, color: muted });
  y -= 14;
  const addr = `${order.shippingAddress}${order.city ? `, ${order.city}` : ""}`;
  page.drawText(addr.slice(0, 60), { x: 40, y, size: 9, font, color: muted });

  y -= 30;
  page.drawRectangle({ x: 40, y: y - 4, width: 515, height: 22, color: navy });
  page.drawText("Item", { x: 48, y, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("SKU", { x: 260, y, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Qty", { x: 360, y, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Price", { x: 410, y, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Total", { x: 490, y, size: 9, font: bold, color: rgb(1, 1, 1) });

  y -= 24;
  for (const item of order.items) {
    if (y < 160) break;
    page.drawText(item.name.slice(0, 34), { x: 48, y, size: 9, font, color: navy });
    page.drawText(item.sku.slice(0, 14), { x: 260, y, size: 8, font, color: muted });
    page.drawText(String(item.quantity), { x: 368, y, size: 9, font, color: navy });
    page.drawText(money(item.price), { x: 410, y, size: 8, font, color: navy });
    page.drawText(money(item.total), { x: 490, y, size: 8, font, color: navy });
    y -= 18;
    page.drawLine({ start: { x: 40, y: y + 10 }, end: { x: 555, y: y + 10 }, thickness: 0.5, color: line });
  }

  y = Math.min(y, 200);
  y -= 10;
  const rows = [
    ["Subtotal", money(order.subtotal)],
    ["Discount", `- ${money(order.discount)}`],
    ["Tax", money(order.tax)],
    ["Shipping", money(order.shipping)],
    ["Total", money(order.total)],
  ];
  for (const [label, value] of rows) {
    const isTotal = label === "Total";
    page.drawText(label, {
      x: 380,
      y,
      size: isTotal ? 11 : 9,
      font: isTotal ? bold : font,
      color: navy,
    });
    page.drawText(value, {
      x: 470,
      y,
      size: isTotal ? 11 : 9,
      font: isTotal ? bold : font,
      color: isTotal ? accent : navy,
    });
    y -= 16;
  }

  y -= 20;
  if (order.invoiceRemarks) {
    page.drawText("Remarks", { x: 40, y, size: 10, font: bold, color: accent });
    y -= 14;
    page.drawText(order.invoiceRemarks.slice(0, 90), { x: 40, y, size: 9, font, color: muted });
    y -= 20;
  }

  page.drawText(COMPANY.tagline.slice(0, 80), {
    x: 40,
    y: 60,
    size: 8,
    font,
    color: muted,
  });
  page.drawText("Thank you for choosing Nidus Trading.", {
    x: 40,
    y: 44,
    size: 9,
    font: bold,
    color: navy,
  });

  return doc.save();
}
