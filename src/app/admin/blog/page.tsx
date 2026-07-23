"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  published: boolean;
  metaTitle?: string | null;
  metaDesc?: string | null;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    metaTitle: "",
    metaDesc: "",
    published: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const data = await fetch("/api/blog").then((r) => r.json());
    setPosts(data);
  }

  useEffect(() => {
    void load();
  }, []);

  // Meta description generator hint for editors
  function suggestMeta() {
    const keyword = form.tags.split(",")[0]?.trim() || "industrial supplies";
    const base = form.excerpt || form.title;
    const suggestion = `${base}`.slice(0, 140);
    setForm((f) => ({
      ...f,
      metaTitle: f.metaTitle || `${f.title} | Nidus Trading`,
      metaDesc: f.metaDesc || `${suggestion} Explore ${keyword} with Nidus Trading.`,
    }));
    toast.message("Suggested SEO meta fields filled — review before publish");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await fetch(editingId ? `/api/blog/${editingId}` : "/api/blog", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      toast.error("Save failed");
      return;
    }
    toast.success(editingId ? "Post updated" : "Post created");
    setForm({
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      metaTitle: "",
      metaDesc: "",
      published: true,
    });
    setEditingId(null);
    void load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display-font text-3xl font-semibold">Blog</h1>
        <p className="text-sm text-[var(--muted)]">
          Create and publish SEO-optimized articles.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="glass space-y-3 rounded-2xl border border-[var(--border)] p-5"
      >
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <Input
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          required
        />
        <Textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <Input
          placeholder="Tags (comma separated keywords)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <Input
          placeholder="Meta title"
          value={form.metaTitle}
          onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
        />
        <Input
          placeholder="Meta description"
          value={form.metaDesc}
          onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={suggestMeta}>
            Suggest SEO meta
          </Button>
          <Button type="submit">{editingId ? "Update post" : "Create post"}</Button>
        </div>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] p-4"
          >
            <div>
              <p className="font-semibold">{post.title}</p>
              <Badge tone={post.published ? "success" : "warning"}>
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingId(post.id);
                  setForm({
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    tags: JSON.parse(post.tags || "[]").join(", "),
                    metaTitle: post.metaTitle || "",
                    metaDesc: post.metaDesc || "",
                    published: post.published,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={async () => {
                  await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
                  toast.success("Deleted");
                  void load();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
