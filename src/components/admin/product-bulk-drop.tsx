"use client";

import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/admin-fetch";
import {
  catalogTemplateCsv,
  draftsFromFile,
  type CatalogDraft,
  type CatalogIssue,
} from "@/lib/catalog-csv";

type Props = { onDone: () => void };

export function ProductBulkDrop({ onDone }: Props) {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [drafts, setDrafts] = useState<CatalogDraft[]>([]);
  const [issues, setIssues] = useState<CatalogIssue[]>([]);
  const [loading, setLoading] = useState(false);

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const parsed = draftsFromFile(file.name, text);
      setFileName(file.name);
      setDrafts(parsed.drafts);
      setIssues(parsed.issues);
      if (!parsed.drafts.length && !parsed.issues.length) {
        toast.error("Nothing to import in that file.");
      }
    };
    reader.readAsText(file);
  }

  function downloadTemplate() {
    const blob = new Blob([catalogTemplateCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nidus-products-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function upload() {
    if (!drafts.length) return;
    setLoading(true);
    try {
      const result = await adminFetch<{
        created: string[];
        updated: string[];
        failed: { row: number; sku?: string; message: string }[];
      }>("/api/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: drafts }),
      });
      const failed = result.failed || [];
      if (failed.length) {
        setIssues(
          failed.map((item) => ({
            row: item.row,
            message: item.sku ? `${item.sku}: ${item.message}` : item.message,
          }))
        );
        toast.error(
          `Saved ${result.created.length} new and updated ${result.updated.length}. ${failed.length} still need a fix.`
        );
      } else {
        toast.success(
          `Saved ${result.created.length} new product${result.created.length === 1 ? "" : "s"} and updated ${result.updated.length}.`
        );
        setDrafts([]);
        setIssues([]);
        setFileName("");
      }
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">Upload many products</h2>
          <p className="mt-1 max-w-xl text-sm text-[var(--muted)]">
            Same idea as a marketplace bulk sheet. Download the template, one row
            per product, then drop the file here. A SKU that already exists is
            updated.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={downloadTemplate}>
            Download template
          </Button>
          <Button type="button" variant="ghost" onClick={() => setOpen((value) => !value)}>
            {open ? "Hide" : "Upload file"}
          </Button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setOver(false);
              const file = event.dataTransfer.files?.[0];
              if (file) readFile(file);
            }}
            className={`flex cursor-pointer flex-col items-center rounded-md border border-dashed px-4 py-8 text-center ${
              over
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-[var(--background)]"
            }`}
            onClick={() => document.getElementById("catalog-file-input")?.click()}
          >
            <FileSpreadsheet className="h-6 w-6 text-[var(--muted)]" />
            <p className="mt-2 text-sm font-medium">Drop a CSV or JSON file</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Category is the shop name, such as Cables. Photos can be links
              separated with a pipe.
            </p>
            <input
              id="catalog-file-input"
              type="file"
              accept=".csv,.tsv,.txt,.json,text/csv,application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) readFile(file);
                event.target.value = "";
              }}
            />
          </div>

          {fileName && (
            <p className="text-sm">
              <span className="font-medium">{fileName}</span>
              <span className="text-[var(--muted)]">
                {" "}
                · {drafts.length} ready
                {issues.length ? ` · ${issues.length} blocked` : ""}
              </span>
            </p>
          )}

          {issues.length > 0 && (
            <ul className="max-h-40 space-y-1 overflow-auto rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm">
              {issues.slice(0, 12).map((issue) => (
                <li key={`${issue.row}-${issue.message}`}>
                  Row {issue.row}: {issue.message}
                </li>
              ))}
            </ul>
          )}

          {drafts.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-[var(--border)]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[var(--border)] text-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {drafts.slice(0, 8).map((draft) => (
                    <tr key={draft.sku} className="border-b border-[var(--border)]">
                      <td className="px-3 py-2">{draft.name}</td>
                      <td className="px-3 py-2">{draft.sku}</td>
                      <td className="px-3 py-2">{draft.category || "—"}</td>
                      <td className="px-3 py-2">{draft.price}</td>
                      <td className="px-3 py-2">{draft.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {drafts.length > 8 && (
                <p className="px-3 py-2 text-xs text-[var(--muted)]">
                  Showing 8 of {drafts.length}. All ready rows are included when you upload.
                </p>
              )}
            </div>
          )}

          <Button type="button" onClick={upload} disabled={loading || drafts.length === 0}>
            {loading ? "Uploading…" : `Upload ${drafts.length || ""}`.trim()}
          </Button>
        </div>
      )}
    </div>
  );
}
