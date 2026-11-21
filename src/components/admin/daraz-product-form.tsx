"use client";

import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageDrop } from "@/components/admin/product-image-drop";
import { adminFetch } from "@/lib/admin-fetch";
import { parseJsonArray, parseJsonObject, slugify } from "@/lib/utils";

export type CategoryOption = { id: string; name: string };

export type AdminProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  categoryId: string;
  brand?: string | null;
  featured: boolean;
  bestSeller: boolean;
  active?: boolean;
  description: string;
  shortDesc?: string | null;
  tags: string;
  images: string;
  specifications: string;
  mpn?: string | null;
  hsCode?: string | null;
  countryOfOrigin?: string | null;
  datasheetUrl?: string | null;
  certifications?: string;
  warrantyPeriod?: string | null;
};

const WARRANTY_TYPES = [
  "No Warranty",
  "Brand Warranty",
  "Seller Warranty",
  "International Warranty",
];

const RESERVED_SPECS = new Set([
  "What's in the box",
  "Package weight",
  "Package dimensions",
]);

type SkuRow = {
  label: string;
  sku: string;
  price: string;
  discountPrice: string;
  stock: string;
};

type SpecRow = { key: string; value: string };

type FormState = {
  name: string;
  categoryId: string;
  categoryQuery: string;
  brand: string;
  highlights: string;
  description: string;
  inTheBox: string;
  images: string[];
  skus: SkuRow[];
  warrantyType: string;
  warrantyPeriod: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  specs: SpecRow[];
  mpn: string;
  hsCode: string;
  countryOfOrigin: string;
  datasheetUrl: string;
  certifications: string;
  tags: string;
  featured: boolean;
  bestSeller: boolean;
  active: boolean;
};

function blankSku(): SkuRow {
  return { label: "", sku: "", price: "", discountPrice: "", stock: "1" };
}

function emptyForm(categoryId = ""): FormState {
  return {
    name: "",
    categoryId,
    categoryQuery: "",
    brand: "",
    highlights: "",
    description: "",
    inTheBox: "",
    images: [],
    skus: [blankSku()],
    warrantyType: "No Warranty",
    warrantyPeriod: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    specs: [{ key: "", value: "" }],
    mpn: "",
    hsCode: "",
    countryOfOrigin: "",
    datasheetUrl: "",
    certifications: "",
    tags: "",
    featured: false,
    bestSeller: false,
    active: true,
  };
}

function suggestSku(name: string, index: number) {
  const base = slugify(name).replace(/-/g, "").toUpperCase().slice(0, 16) || "SKU";
  return index === 0 ? base : `${base}-${index + 1}`;
}

function fromProduct(product: AdminProduct, categories: CategoryOption[]): FormState {
  const specs = parseJsonObject(product.specifications);
  const weight = (specs["Package weight"] || "").replace(/kg/i, "").trim();
  const dims = (specs["Package dimensions"] || "").replace(/cm/i, "");
  const [length = "", width = "", height = ""] = dims.split("x").map((part) => part.trim());
  const warranty = product.warrantyPeriod || "";
  const warrantyType =
    WARRANTY_TYPES.find((type) => warranty.startsWith(type)) || "No Warranty";
  const warrantyPeriod = warranty.startsWith(warrantyType)
    ? warranty.slice(warrantyType.length).replace(/^[\s·-]+/, "")
    : warranty;
  const specRows = Object.entries(specs)
    .filter(([key]) => !RESERVED_SPECS.has(key))
    .map(([key, value]) => ({ key, value }));

  return {
    ...emptyForm(product.categoryId),
    name: product.name,
    categoryId: product.categoryId,
    categoryQuery: categories.find((item) => item.id === product.categoryId)?.name || "",
    brand: product.brand || "",
    highlights: (product.shortDesc || "")
      .split(" · ")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n"),
    description: product.description,
    inTheBox: specs["What's in the box"] || "",
    images: parseJsonArray(product.images),
    skus: [
      {
        label: "",
        sku: product.sku,
        price: String(product.price),
        discountPrice: product.discountPrice ? String(product.discountPrice) : "",
        stock: String(product.stock),
      },
    ],
    warrantyType,
    warrantyPeriod,
    weight,
    length,
    width,
    height,
    specs: specRows.length ? specRows : [{ key: "", value: "" }],
    mpn: product.mpn || "",
    hsCode: product.hsCode || "",
    countryOfOrigin: product.countryOfOrigin || "",
    datasheetUrl: product.datasheetUrl || "",
    certifications: parseJsonArray(product.certifications).join(", "),
    tags: parseJsonArray(product.tags).join(", "),
    featured: product.featured,
    bestSeller: product.bestSeller,
    active: product.active !== false,
  };
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[#131921]">
          {step}
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-[var(--muted)]">{hint}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

type Props = {
  categories: CategoryOption[];
  editing: AdminProduct | null;
  onSaved: () => void;
  onCancel: () => void;
};

export function DarazProductForm({ categories, editing, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<FormState>(() =>
    editing ? fromProduct(editing, categories) : emptyForm(categories[0]?.id || "")
  );
  const [loading, setLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categoryMatches = useMemo(() => {
    const query = form.categoryQuery.trim().toLowerCase();
    const list = query
      ? categories.filter((item) => item.name.toLowerCase().includes(query))
      : categories;
    return list.slice(0, 8);
  }, [categories, form.categoryQuery]);

  const selectedCategory = categories.find((item) => item.id === form.categoryId);

  function patch(partial: Partial<FormState>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  function patchSku(index: number, partial: Partial<SkuRow>) {
    setForm((current) => ({
      ...current,
      skus: current.skus.map((row, i) => (i === index ? { ...row, ...partial } : row)),
    }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const name = form.name.trim();
    if (name.length < 2) {
      toast.error("Add a product name. Brand + model + the main spec works best.");
      return;
    }
    if (!form.categoryId) {
      toast.error("Choose a category. Start typing and pick one from the list.");
      return;
    }

    const highlights = form.highlights
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    let description = form.description.trim();
    if (description.length < 10) {
      const fromHighlights = highlights.join(". ");
      description =
        fromHighlights.length >= 10
          ? fromHighlights
          : `${name}. Available from Nidus Trading on quote.`;
    }

    const specifications: Record<string, string> = {};
    for (const row of form.specs) {
      const key = row.key.trim();
      const value = row.value.trim();
      if (key && value) specifications[key] = value;
    }
    if (form.inTheBox.trim()) specifications["What's in the box"] = form.inTheBox.trim();
    if (form.weight.trim()) specifications["Package weight"] = `${form.weight.trim()} kg`;
    if (form.length.trim() && form.width.trim() && form.height.trim()) {
      specifications["Package dimensions"] =
        `${form.length.trim()} x ${form.width.trim()} x ${form.height.trim()} cm`;
    }

    const warranty =
      form.warrantyType === "No Warranty"
        ? form.warrantyPeriod.trim() || null
        : [form.warrantyType, form.warrantyPeriod.trim()].filter(Boolean).join(" · ");

    const rows = form.skus.map((row, index) => ({
      ...row,
      sku: row.sku.trim() || suggestSku(name, index),
    }));
    for (const row of rows) {
      const price = Number(row.price);
      if (!Number.isFinite(price) || price <= 0) {
        toast.error(`Enter a price above 0${row.label ? ` for ${row.label}` : ""}.`);
        return;
      }
    }

    setLoading(true);
    try {
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        const productName =
          rows.length > 1 && row.label.trim() ? `${name} — ${row.label.trim()}` : name;
        const payload = {
          name: productName,
          sku: row.sku,
          price: Number(row.price),
          discountPrice: row.discountPrice ? Number(row.discountPrice) : null,
          stock: Number(row.stock || 0),
          categoryId: form.categoryId,
          brand: form.brand.trim() && form.brand.trim().toLowerCase() !== "no brand"
            ? form.brand.trim()
            : null,
          description,
          shortDesc: highlights.join(" · "),
          tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          images: form.images,
          specifications,
          featured: form.featured,
          bestSeller: form.bestSeller,
          active: form.active,
          mpn: form.mpn.trim() || null,
          hsCode: form.hsCode.trim() || null,
          countryOfOrigin: form.countryOfOrigin.trim() || null,
          datasheetUrl: form.datasheetUrl.trim() || null,
          certifications: form.certifications
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          warrantyPeriod: warranty,
        };
        const isEdit = Boolean(editing) && index === 0;
        await adminFetch(isEdit ? `/api/products/${editing!.id}` : "/api/products", {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      toast.success(
        editing
          ? "Product updated"
          : rows.length > 1
            ? `Added ${rows.length} variations`
            : "Product added"
      );
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="display-font text-3xl font-semibold">
          {editing ? "Edit product" : "Add product"}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Same order as a marketplace listing: name and category, photos, highlights,
          then price and stock. Prices stay inside the admin.
        </p>
      </div>

      <Section
        step={1}
        title="Basic information"
        hint="Name it the way a buyer would search. Then pick the closest category and the brand."
      >
        <div className="grid gap-4">
          <Field
            label="Product name"
            required
            hint="Brand + model + key spec + product type. Example: LAPP ÖLFLEX Classic 110 4G1.5 Control Cable"
          >
            <Input
              value={form.name}
              onChange={(event) => patch({ name: event.target.value })}
              placeholder="Brand, model, and what it is"
              required
            />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category" required hint="Type to search, then click a category.">
              <div className="relative">
                <Input
                  value={form.categoryQuery}
                  placeholder={selectedCategory?.name || "Search categories"}
                  onFocus={() => setCategoryOpen(true)}
                  onBlur={() => setCategoryOpen(false)}
                  onChange={(event) => {
                    patch({ categoryQuery: event.target.value, categoryId: "" });
                    setCategoryOpen(true);
                  }}
                />
                {categoryOpen && (
                  <div className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                    {categoryMatches.length === 0 ? (
                      <p className="px-3 py-2 text-sm text-[var(--muted)]">No matching category</p>
                    ) : (
                      categoryMatches.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="block w-full px-3 py-2 text-left text-sm hover:bg-[var(--accent-soft)]"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            patch({ categoryId: item.id, categoryQuery: item.name });
                            setCategoryOpen(false);
                          }}
                        >
                          {item.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </Field>
            <Field label="Brand" hint="Leave it as No Brand when the product has no maker name.">
              <div className="flex gap-2">
                <Input
                  value={form.brand}
                  onChange={(event) => patch({ brand: event.target.value })}
                  placeholder="Brand"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => patch({ brand: "No Brand" })}
                >
                  No Brand
                </Button>
              </div>
            </Field>
          </div>
        </div>
      </Section>

      <Section
        step={2}
        title="Product images"
        hint="Drop photos from your computer. The first image is the cover. Drag a photo onto another to reorder it."
      >
        <ProductImageDrop images={form.images} onChange={(images) => patch({ images })} />
      </Section>

      <Section
        step={3}
        title="Highlights and description"
        hint="Buyers read the highlights first. Keep each line specific: a size, a rating, a warranty, a standard."
      >
        <div className="grid gap-4">
          <Field label="Key features" hint="One feature per line.">
            <Textarea
              value={form.highlights}
              onChange={(event) => patch({ highlights: event.target.value })}
              placeholder={"4G1.5 mm² copper conductors\nOil-resistant grey PVC sheath\nCE marked"}
              className="min-h-[100px]"
            />
          </Field>
          <Field label="Product description">
            <Textarea
              value={form.description}
              onChange={(event) => patch({ description: event.target.value })}
              placeholder="What it is used for, who it is for, and anything a buyer needs before asking for a quote."
            />
          </Field>
          <Field label="What's in the box">
            <Input
              value={form.inTheBox}
              onChange={(event) => patch({ inTheBox: event.target.value })}
              placeholder="1 x cable drum, test certificate"
            />
          </Field>
        </div>
      </Section>

      <Section
        step={4}
        title="Price and stock"
        hint="One row is a single product. Add a variation when colour, size, or pack size changes the SKU."
      >
        <div className="space-y-3">
          {form.skus.map((row, index) => (
            <div
              key={index}
              className="grid gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] p-3 md:grid-cols-6"
            >
              <Input
                placeholder={index === 0 ? "Variation (optional)" : "Colour or size"}
                value={row.label}
                disabled={Boolean(editing)}
                onChange={(event) => patchSku(index, { label: event.target.value })}
              />
              <Input
                placeholder="Seller SKU"
                value={row.sku}
                onChange={(event) => patchSku(index, { sku: event.target.value })}
                onBlur={() => {
                  if (!row.sku.trim() && form.name.trim()) {
                    patchSku(index, { sku: suggestSku(form.name, index) });
                  }
                }}
              />
              <Input
                placeholder="Price"
                type="number"
                min="1"
                value={row.price}
                onChange={(event) => patchSku(index, { price: event.target.value })}
                required
              />
              <Input
                placeholder="Special price"
                type="number"
                value={row.discountPrice}
                onChange={(event) => patchSku(index, { discountPrice: event.target.value })}
              />
              <Input
                placeholder="Quantity"
                type="number"
                min="0"
                value={row.stock}
                onChange={(event) => patchSku(index, { stock: event.target.value })}
                required
              />
              <div className="flex items-center">
                {form.skus.length > 1 && !editing && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      patch({ skus: form.skus.filter((_, rowIndex) => rowIndex !== index) })
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          {!editing && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                patch({
                  skus: [
                    ...form.skus,
                    {
                      ...blankSku(),
                      price: form.skus[0]?.price || "",
                      sku: form.name.trim() ? suggestSku(form.name, form.skus.length) : "",
                    },
                  ],
                })
              }
            >
              Add a variation
            </Button>
          )}
          <p className="text-xs text-[var(--muted)]">
            Seller SKU is your own code. Leave it blank and we fill one from the product name.
            Each variation is saved as its own product.
          </p>
        </div>
      </Section>

      <Section
        step={5}
        title="Warranty and package"
        hint="Warranty shows on the product page. Weight and size are stored with the specifications."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Warranty type">
            <select
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-white/40 px-3 text-sm dark:bg-white/5"
              value={form.warrantyType}
              onChange={(event) => patch({ warrantyType: event.target.value })}
            >
              {WARRANTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Warranty period" hint="Example: 12 Months">
            <Input
              value={form.warrantyPeriod}
              onChange={(event) => patch({ warrantyPeriod: event.target.value })}
              placeholder="12 Months"
            />
          </Field>
          <Field label="Package weight (kg)">
            <Input
              value={form.weight}
              onChange={(event) => patch({ weight: event.target.value })}
              placeholder="0.5"
              inputMode="decimal"
            />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Length (cm)">
              <Input
                value={form.length}
                onChange={(event) => patch({ length: event.target.value })}
                inputMode="decimal"
              />
            </Field>
            <Field label="Width (cm)">
              <Input
                value={form.width}
                onChange={(event) => patch({ width: event.target.value })}
                inputMode="decimal"
              />
            </Field>
            <Field label="Height (cm)">
              <Input
                value={form.height}
                onChange={(event) => patch({ height: event.target.value })}
                inputMode="decimal"
              />
            </Field>
          </div>
        </div>
      </Section>

      <details className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
        <summary className="cursor-pointer text-sm font-semibold">
          More attributes — model, customs, certifications
        </summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Model / MPN">
            <Input
              value={form.mpn}
              onChange={(event) => patch({ mpn: event.target.value })}
            />
          </Field>
          <Field label="HS code">
            <Input
              value={form.hsCode}
              onChange={(event) => patch({ hsCode: event.target.value })}
            />
          </Field>
          <Field label="Country of origin">
            <Input
              value={form.countryOfOrigin}
              onChange={(event) => patch({ countryOfOrigin: event.target.value })}
            />
          </Field>
          <Field label="Datasheet link">
            <Input
              value={form.datasheetUrl}
              onChange={(event) => patch({ datasheetUrl: event.target.value })}
              placeholder="https://"
            />
          </Field>
          <Field label="Certifications" hint="Separate with commas. Example: CE, UL">
            <Input
              value={form.certifications}
              onChange={(event) => patch({ certifications: event.target.value })}
            />
          </Field>
          <Field label="Tags" hint="Separate with commas.">
            <Input
              value={form.tags}
              onChange={(event) => patch({ tags: event.target.value })}
            />
          </Field>
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-medium">Specifications</p>
            {form.specs.map((row, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <Input
                  placeholder="Attribute"
                  value={row.key}
                  onChange={(event) =>
                    patch({
                      specs: form.specs.map((item, i) =>
                        i === index ? { ...item, key: event.target.value } : item
                      ),
                    })
                  }
                />
                <Input
                  placeholder="Value"
                  value={row.value}
                  onChange={(event) =>
                    patch({
                      specs: form.specs.map((item, i) =>
                        i === index ? { ...item, value: event.target.value } : item
                      ),
                    })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    patch({
                      specs:
                        form.specs.length === 1
                          ? [{ key: "", value: "" }]
                          : form.specs.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => patch({ specs: [...form.specs, { key: "", value: "" }] })}
            >
              Add attribute
            </Button>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => patch({ featured: event.target.checked })}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.bestSeller}
              onChange={(event) => patch({ bestSeller: event.target.checked })}
            />
            Best seller
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => patch({ active: event.target.checked })}
            />
            Active on the shop
          </label>
        </div>
      </details>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : editing ? "Update product" : "Save product"}
        </Button>
        {editing && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
