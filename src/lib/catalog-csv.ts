/** Spreadsheet helpers for the admin catalog importer. Safe to import from the browser. */

export const CATALOG_HEADERS = [
  "name",
  "sku",
  "category",
  "brand",
  "price",
  "specialPrice",
  "stock",
  "highlights",
  "description",
  "images",
  "warranty",
  "mpn",
] as const;

export type CatalogDraft = {
  name: string;
  sku: string;
  category?: string;
  brand?: string | null;
  price: number;
  discountPrice?: number | null;
  stock: number;
  description: string;
  shortDesc?: string;
  images: string[];
  tags: string[];
  warrantyPeriod?: string | null;
  mpn?: string | null;
};

export type CatalogIssue = { row: number; message: string };

const SAMPLE = [
  "LAPP OLFLEX Classic 110 4G1.5",
  "LAPP-OLF-110-4G15",
  "Cables",
  "LAPP",
  "18500",
  "",
  "24",
  "Flexible PVC control cable|Oil and coolant resistant",
  "4-core 1.5mm2 control cable for panels and machinery.",
  "",
  "12 Months Official OEM Warranty",
  "1121104",
];

export function catalogTemplateCsv() {
  const header = CATALOG_HEADERS.join(",");
  const sample = SAMPLE.map(csvCell).join(",");
  return `${header}\n${sample}\n`;
}

function csvCell(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** Minimal RFC-style CSV/TSV reader. First row is the header. */
export function parseSpreadsheet(text: string): string[][] {
  const input = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const delimiter = detectDelimiter(input);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === delimiter) {
      row.push(cell.trim());
      cell = "";
      continue;
    }
    if (char === "\n") {
      row.push(cell.trim());
      cell = "";
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function detectDelimiter(text: string) {
  const firstLine = text.split("\n").find((line) => line.trim().length > 0) || "";
  const commas = (firstLine.match(/,/g) || []).length;
  const tabs = (firstLine.match(/\t/g) || []).length;
  const semis = (firstLine.match(/;/g) || []).length;
  if (tabs > commas && tabs >= semis) return "\t";
  if (semis > commas) return ";";
  return ",";
}

function pipeList(value: string) {
  return value
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function headerIndex(headers: string[]) {
  const index = new Map<string, number>();
  headers.forEach((header, i) => {
    index.set(header.trim().toLowerCase().replace(/\s+/g, ""), i);
  });
  return (names: string[]) => {
    for (const name of names) {
      const found = index.get(name.toLowerCase().replace(/\s+/g, ""));
      if (found != null) return found;
    }
    return -1;
  };
}

function cell(row: string[], at: number) {
  if (at < 0) return "";
  return (row[at] || "").trim();
}

export function draftsFromSpreadsheet(text: string): {
  drafts: CatalogDraft[];
  issues: CatalogIssue[];
} {
  const table = parseSpreadsheet(text);
  if (table.length < 2) {
    return { drafts: [], issues: [{ row: 1, message: "The file needs a header row and at least one product." }] };
  }
  const pick = headerIndex(table[0]);
  const col = {
    name: pick(["name", "productname", "title"]),
    sku: pick(["sku", "sellersku"]),
    category: pick(["category", "categoryname"]),
    brand: pick(["brand"]),
    price: pick(["price", "saleprice"]),
    special: pick(["specialprice", "discountprice", "promoprice"]),
    stock: pick(["stock", "quantity", "qty"]),
    highlights: pick(["highlights", "shortdesc", "shortdescription"]),
    description: pick(["description", "productdescription"]),
    images: pick(["images", "image", "imageurls"]),
    warranty: pick(["warranty", "warrantyperiod"]),
    mpn: pick(["mpn", "model"]),
  };
  if (col.name < 0 || col.price < 0) {
    return {
      drafts: [],
      issues: [
        {
          row: 1,
          message: "Header must include name and price. Download the template and keep its first row.",
        },
      ],
    };
  }

  const drafts: CatalogDraft[] = [];
  const issues: CatalogIssue[] = [];

  table.slice(1).forEach((row, offset) => {
    const rowNumber = offset + 2;
    const name = cell(row, col.name);
    const sku = cell(row, col.sku);
    const price = Number(cell(row, col.price).replace(/,/g, ""));
    const specialRaw = cell(row, col.special);
    const stockRaw = cell(row, col.stock);
    const highlights = pipeList(cell(row, col.highlights));
    const description =
      cell(row, col.description) ||
      (highlights.length ? highlights.join(". ") : `${name}. Available from Nidus Trading.`);

    const problems: string[] = [];
    if (name.length < 2) problems.push("name is required");
    if (!sku) problems.push("sku is required");
    if (!Number.isFinite(price) || price <= 0) problems.push("price must be a number above 0");
    if (problems.length) {
      issues.push({ row: rowNumber, message: problems.join(", ") });
      return;
    }

    const special = specialRaw ? Number(specialRaw.replace(/,/g, "")) : null;
    drafts.push({
      name,
      sku,
      category: cell(row, col.category) || undefined,
      brand: cell(row, col.brand) || null,
      price,
      discountPrice: special && special > 0 ? special : null,
      stock: Number.isFinite(Number(stockRaw)) ? Math.max(0, Math.floor(Number(stockRaw))) : 0,
      description: description.length >= 10 ? description : `${description} Available on quote.`,
      shortDesc: highlights.join(" · ") || undefined,
      images: pipeList(cell(row, col.images)),
      tags: [],
      warrantyPeriod: cell(row, col.warranty) || null,
      mpn: cell(row, col.mpn) || null,
    });
  });

  return { drafts, issues };
}

export function draftsFromJson(text: string): { drafts: CatalogDraft[]; issues: CatalogIssue[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { drafts: [], issues: [{ row: 1, message: "That file is not valid JSON." }] };
  }
  if (!Array.isArray(parsed)) {
    return { drafts: [], issues: [{ row: 1, message: "JSON upload expects an array of products." }] };
  }
  const drafts: CatalogDraft[] = [];
  const issues: CatalogIssue[] = [];
  parsed.forEach((item, index) => {
    const row = index + 1;
    if (!item || typeof item !== "object") {
      issues.push({ row, message: "each item must be an object" });
      return;
    }
    const record = item as Record<string, unknown>;
    const name = String(record.name || "");
    const sku = String(record.sku || "");
    const price = Number(record.price);
    if (name.length < 2 || sku.length < 2 || !Number.isFinite(price) || price <= 0) {
      issues.push({ row, message: "name, sku, and a price above 0 are required" });
      return;
    }
    const images = Array.isArray(record.images)
      ? record.images.map(String)
      : typeof record.images === "string"
        ? pipeList(record.images)
        : [];
    const tags = Array.isArray(record.tags) ? record.tags.map(String) : [];
    const description = String(record.description || `${name}. Available from Nidus Trading.`);
    drafts.push({
      name,
      sku,
      category:
        typeof record.category === "string"
          ? record.category
          : typeof record.categoryName === "string"
            ? record.categoryName
            : undefined,
      brand: record.brand == null ? null : String(record.brand),
      price,
      discountPrice:
        record.discountPrice == null && record.specialPrice == null
          ? null
          : Number(record.discountPrice ?? record.specialPrice) || null,
      stock: Number.isFinite(Number(record.stock)) ? Math.max(0, Math.floor(Number(record.stock))) : 0,
      description: description.length >= 10 ? description : `${description} Available on quote.`,
      shortDesc: record.shortDesc ? String(record.shortDesc) : undefined,
      images,
      tags,
      warrantyPeriod: record.warrantyPeriod ? String(record.warrantyPeriod) : null,
      mpn: record.mpn ? String(record.mpn) : null,
    });
  });
  return { drafts, issues };
}

export function draftsFromFile(filename: string, text: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".json")) return draftsFromJson(text);
  return draftsFromSpreadsheet(text);
}
