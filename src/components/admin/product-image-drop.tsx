"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Star, X } from "lucide-react";
import { toast } from "sonner";
import { adminFetch } from "@/lib/admin-fetch";

const MAX_IMAGES = 8;

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
};

export function ProductImageDrop({ images, onChange }: Props) {
  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);
  const [over, setOver] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [link, setLink] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  async function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      toast.error("8 photos is the limit. Remove one to add another.");
      return;
    }
    const batch = files.slice(0, room);
    if (files.length > room) {
      toast.error("Only 8 photos per product. Extra files were left out.");
    }
    setUploading((count) => count + batch.length);
    const added = (
      await Promise.all(
        batch.map(async (file) => {
          try {
            const body = new FormData();
            body.append("file", file);
            const result = await adminFetch<{ url: string }>("/api/admin/uploads", {
              method: "POST",
              body,
            });
            return result.url;
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Photo upload failed");
            return null;
          } finally {
            setUploading((count) => Math.max(0, count - 1));
          }
        })
      )
    ).filter((url): url is string => Boolean(url));
    if (added.length) onChange([...imagesRef.current, ...added]);
  }

  function addLink() {
    const url = link.trim();
    if (!url) return;
    if (images.length >= MAX_IMAGES) {
      toast.error("8 photos is the limit.");
      return;
    }
    onChange([...images, url]);
    setLink("");
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          if (event.dataTransfer.files?.length) void addFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-4 py-6 text-center transition ${
          over
            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
            : "border-[var(--border)] bg-[var(--background)]"
        }`}
        onClick={() => document.getElementById("product-photo-input")?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            document.getElementById("product-photo-input")?.click();
          }
        }}
      >
        <ImagePlus className="h-6 w-6 text-[var(--muted)]" />
        <p className="mt-2 text-sm font-medium">Drop photos here, or click to browse</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Cover photo first, then up to 7 more. JPG, PNG, or WEBP, 5 MB each.
          {uploading > 0 ? ` Uploading ${uploading}…` : ""}
        </p>
        <input
          id="product-photo-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files) void addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex != null) move(dragIndex, index);
                setDragIndex(null);
              }}
              className="group relative aspect-square overflow-hidden rounded-md border border-[var(--border)] bg-[var(--background)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold text-[#131921]">
                  <Star className="h-3 w-3" />
                  Cover
                </span>
              )}
              <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1 opacity-0 transition group-hover:opacity-100">
                {index !== 0 && (
                  <button
                    type="button"
                    className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                    onClick={() => move(index, 0)}
                  >
                    Make cover
                  </button>
                )}
                <button
                  type="button"
                  className="ml-auto rounded bg-black/70 p-1 text-white"
                  onClick={() => onChange(images.filter((_, i) => i !== index))}
                  aria-label="Remove photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Or paste an image link"
          className="h-10 flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addLink();
            }
          }}
        />
        <button
          type="button"
          onClick={addLink}
          className="h-10 rounded-md border border-[var(--border)] px-3 text-sm font-medium"
        >
          Add link
        </button>
      </div>
    </div>
  );
}
