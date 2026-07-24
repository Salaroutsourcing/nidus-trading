"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminFetch } from "@/lib/admin-fetch";
import { formatPKR, parseJsonArray, parseJsonObject } from "@/lib/utils";

type Category = { id: string; name: string };
type Product = {
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
};

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  discountPrice: "",
  stock: "0",
  categoryId: "",
  brand: "",
  description: "",
  shortDesc: "",
  tags: "",
  images: "",
  specifications: "{}",
  featured: false,
  bestSeller: false,
  active: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bulkText, setBulkText] = useState("");
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [q, setQ] = useState("");

  async function load() {
    setBooting(true);
    try {
      const [p, c] = await Promise.all([
        adminFetch<Product[]>("/api/products"),
        adminFetch<Category[]>("/api/categories"),
      ]);
      setProducts(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
      if (!form.categoryId && c[0]) {
        setForm((f) => ({ ...f, categoryId: c[0].id }));
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setBooting(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    let specs: Record<string, string> = {};
    try {
      specs = parseJsonObject(form.specifications);
    } catch {
      toast.error("Specifications must be valid JSON object");
      setLoading(false);
      return;
    }
    const payload = {
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      stock: Number(form.stock),
      categoryId: form.categoryId,
      brand: form.brand || null,
      description: form.description,
      shortDesc: form.shortDesc,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      images: form.images.split(",").map((t) => t.trim()).filter(Boolean),
      specifications: specs,
      featured: form.featured,
      bestSeller: form.bestSeller,
      active: form.active,
    };

    try {
      await adminFetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success(editingId ? "Product updated" : "Product created");
      setForm({ ...emptyForm, categoryId: categories[0]?.id || "" });
      setEditingId(null);
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await adminFetch(`/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function bulkUpload() {
    try {
      const rows = JSON.parse(bulkText);
      if (!Array.isArray(rows)) throw new Error("Expected JSON array");
      setLoading(true);
      const failed: number[] = [];
      for (let i = 0; i < rows.length; i++) {
        try {
          await adminFetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rows[i]),
          });
        } catch {
          failed.push(i + 1);
        }
      }
      if (failed.length) {
        toast.error(`Failed rows: ${failed.join(", ")}`);
      } else {
        toast.success(`Uploaded ${rows.length} products`);
      }
      setBulkText("");
      void load();
    } catch {
      toast.error("Invalid bulk JSON");
    } finally {
      setLoading(false);
    }
  }

  const filtered = products.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.sku.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display-font text-3xl font-semibold">Products</h1>
        <p className="text-sm text-[var(--muted)]">
          Add, edit, delete, and bulk upload catalog items. Prices are admin-only.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-2"
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          required
        />
        <Input
          placeholder="Internal price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          placeholder="Discount price"
          type="number"
          value={form.discountPrice}
          onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
        />
        <Input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <Input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <select
          className="h-10 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          {categories.length === 0 && <option value="">No categories</option>}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />
        <Input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="md:col-span-2"
        />
        <Input
          placeholder="Short description"
          value={form.shortDesc}
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
          className="md:col-span-2"
        />
        <Textarea
          placeholder="Full description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="md:col-span-2"
          required
        />
        <Textarea
          placeholder='Specifications JSON e.g. {"Material":"Steel","Size":"4 inch"}'
          value={form.specifications}
          onChange={(e) => setForm({ ...form, specifications: e.target.value })}
          className="md:col-span-2 font-mono text-xs"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.bestSeller}
            onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })}
          />
          Best seller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>
        <div className="md:col-span-2 flex gap-2">
          <Button type="submit" disabled={loading}>
            {editingId ? "Update Product" : "Add Product"}
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setForm({ ...emptyForm, categoryId: categories[0]?.id || "" });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="font-semibold">Bulk Upload (JSON array)</h2>
        <Textarea
          className="mt-3"
          placeholder='[{"name":"...","sku":"...","price":1000,"stock":10,"categoryId":"...","description":"...","images":[],"tags":[]}]'
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
        />
        <Button className="mt-3" onClick={bulkUpload} disabled={loading}>
          Upload JSON
        </Button>
      </div>

      <div>
        <Input
          placeholder="Filter by name or SKU..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mb-3 max-w-sm"
        />
        <div className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {booting ? (
            <p className="p-6 text-sm text-[var(--muted)]">Loading products…</p>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-center text-sm text-[var(--muted)]">
              No products found.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)]">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">{p.sku}</td>
                    <td className="px-4 py-3">
                      {formatPKR(p.discountPrice || p.price)}
                    </td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(p.id);
                            setForm({
                              name: p.name,
                              sku: p.sku,
                              price: String(p.price),
                              discountPrice: p.discountPrice
                                ? String(p.discountPrice)
                                : "",
                              stock: String(p.stock),
                              categoryId: p.categoryId,
                              brand: p.brand || "",
                              description: p.description,
                              shortDesc: p.shortDesc || "",
                              tags: parseJsonArray(p.tags).join(", "),
                              images: parseJsonArray(p.images).join(", "),
                              specifications: JSON.stringify(
                                parseJsonObject(p.specifications),
                                null,
                                2
                              ),
                              featured: p.featured,
                              bestSeller: p.bestSeller,
                              active: p.active !== false,
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => remove(p.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
