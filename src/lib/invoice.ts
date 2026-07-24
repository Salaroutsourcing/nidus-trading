import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
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

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawWrapped(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  maxWidth: number,
  lineHeight = 12
) {
  const lines = wrapText(text, font, size, maxWidth);
  let cursor = y;
  for (const line of lines.slice(0, 6)) {
    page.drawText(line, { x, y: cursor, size, font, color });
    cursor -= lineHeight;
  }
  return cursor;
}

export async function generateInvoicePdf(order: InvoiceOrder): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const navy = rgb(0.07, 0.1, 0.13);
  const accent = rgb(0.9, 0.49, 0.13);
  const muted = rgb(0.35, 0.4, 0.45);
  const line = rgb(0.85, 0.88, 0.9);
  const white = rgb(1, 1, 1);

  const isQuotation = order.total === 0 && order.subtotal === 0;
  const docTitle = isQuotation ? "QUOTATION" : "TAX INVOICE";

  let page = doc.addPage([595, 842]);
  let y = 800;

  const ensureSpace = (needed: number) => {
    if (y < needed) {
      page = doc.addPage([595, 842]);
      y = 800;
    }
  };

  page.drawText(COMPANY.name.toUpperCase(), { x: 40, y, size: 18, font: bold, color: navy });
  y -= 18;
  page.drawText(docTitle, { x: 40, y, size: 11, font: bold, color: accent });
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
  page.drawText(order.customerName.slice(0, 40), { x: 40, y, size: 10, font: bold, color: navy });
  page.drawText(COMPANY.name, { x: 320, y, size: 10, font: bold, color: navy });
  y -= 14;
  if (order.company) {
    page.drawText(order.company.slice(0, 40), { x: 40, y, size: 9, font, color: muted });
  }
  page.drawText(`Phone: ${COMPANY.phone}`, { x: 320, y, size: 9, font, color: muted });
  y -= 14;
  page.drawText(order.customerEmail.slice(0, 40), { x: 40, y, size: 9, font, color: muted });
  page.drawText(COMPANY.email, { x: 320, y, size: 9, font, color: muted });
  y -= 14;
  page.drawText(order.customerPhone, { x: 40, y, size: 9, font, color: muted });
  page.drawText(COMPANY.address, { x: 320, y, size: 9, font, color: muted });
  y -= 14;
  const addr = `${order.shippingAddress}${order.city ? `, ${order.city}` : ""}`;
  y = drawWrapped(page, addr, 40, y, font, 9, muted, 250, 12);

  y -= 20;
  ensureSpace(200);
  page.drawRectangle({ x: 40, y: y - 4, width: 515, height: 22, color: navy });
  page.drawText("Item", { x: 48, y, size: 9, font: bold, color: white });
  page.drawText("SKU", { x: 260, y, size: 9, font: bold, color: white });
  page.drawText("Qty", { x: 360, y, size: 9, font: bold, color: white });
  page.drawText("Price", { x: 410, y, size: 9, font: bold, color: white });
  page.drawText("Total", { x: 490, y, size: 9, font: bold, color: white });

  y -= 24;
  for (const item of order.items) {
    ensureSpace(80);
    page.drawText(item.name.slice(0, 34), { x: 48, y, size: 9, font, color: navy });
    page.drawText(item.sku.slice(0, 14), { x: 260, y, size: 8, font, color: muted });
    page.drawText(String(item.quantity), { x: 368, y, size: 9, font, color: navy });
    page.drawText(money(item.price), { x: 410, y, size: 8, font, color: navy });
    page.drawText(money(item.total), { x: 490, y, size: 8, font, color: navy });
    y -= 18;
    page.drawLine({
      start: { x: 40, y: y + 10 },
      end: { x: 555, y: y + 10 },
      thickness: 0.5,
      color: line,
    });
  }

  ensureSpace(160);
  y -= 10;
  const rows: Array<[string, string]> = [["Subtotal", money(order.subtotal)]];
  if (order.discount > 0) rows.push(["Discount", `- ${money(order.discount)}`]);
  if (order.tax > 0) rows.push(["Tax", money(order.tax)]);
  if (order.shipping > 0) rows.push(["Shipping", money(order.shipping)]);
  rows.push(["Total", money(order.total)]);

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

  y -= 16;
  if (order.invoiceRemarks) {
    ensureSpace(100);
    page.drawText("Remarks", { x: 40, y, size: 10, font: bold, color: accent });
    y -= 14;
    y = drawWrapped(page, order.invoiceRemarks, 40, y, font, 9, muted, 500, 12);
    y -= 12;
  }

  ensureSpace(80);
  page.drawText(`Phone: ${COMPANY.phone}  ·  ${COMPANY.email}`, {
    x: 40,
    y: Math.max(y, 70),
    size: 8,
    font,
    color: muted,
  });
  page.drawText("Thank you for choosing Nidus Trading.", {
    x: 40,
    y: Math.max(y - 16, 50),
    size: 9,
    font: bold,
    color: navy,
  });

  return doc.save();
}
