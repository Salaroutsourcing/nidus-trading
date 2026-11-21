"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductBulkDrop } from "@/components/admin/product-bulk-drop";
import {
  DarazProductForm,
  type AdminProduct,
  type CategoryOption,
} from "@/components/admin/daraz-product-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminFetch } from "@/lib/admin-fetch";
import { formatPKR } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [booting, setBooting] = useState(true);
  const [q, setQ] = useState("");

  async function load() {
    setBooting(true);
    try {
      const [productRows, categoryRows] = await Promise.all([
        adminFetch<AdminProduct[]>("/api/products"),
        adminFetch<CategoryOption[]>("/api/categories"),
      ]);
      setProducts(Array.isArray(productRows) ? productRows : []);
      setCategories(Array.isArray(categoryRows) ? categoryRows : []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setBooting(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const [productRows, categoryRows] = await Promise.all([
          adminFetch<AdminProduct[]>("/api/products"),
          adminFetch<CategoryOption[]>("/api/categories"),
        ]);
        if (cancelled) return;
        setProducts(Array.isArray(productRows) ? productRows : []);
        setCategories(Array.isArray(categoryRows) ? categoryRows : []);
      } catch (err) {
        if (!cancelled) toast.error(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (!cancelled) setBooting(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await adminFetch(`/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      if (editing?.id === id) {
        setEditing(null);
        setFormKey((value) => value + 1);
      }
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const filtered = products.filter(
    (product) =>
      !q ||
      product.name.toLowerCase().includes(q.toLowerCase()) ||
      product.sku.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <DarazProductForm
        key={`${formKey}-${editing?.id || "new"}`}
        categories={categories}
        editing={editing}
        onSaved={() => {
          setEditing(null);
          setFormKey((value) => value + 1);
          void load();
        }}
        onCancel={() => {
          setEditing(null);
          setFormKey((value) => value + 1);
        }}
      />

      <ProductBulkDrop onDone={() => void load()} />

      <div>
        <Input
          placeholder="Filter by name or SKU..."
          value={q}
          onChange={(event) => setQ(event.target.value)}
          className="mb-3 max-w-sm"
        />
        <div className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {booting ? (
            <p className="p-6 text-sm text-[var(--muted)]">Loading products…</p>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-center text-sm text-[var(--muted)]">No products found.</p>
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
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-[var(--border)]">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{product.sku}</td>
                    <td className="px-4 py-3">
                      {formatPKR(product.discountPrice || product.price)}
                    </td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditing(product);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => remove(product.id)}>
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
