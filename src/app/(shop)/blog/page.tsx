import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Insights & News",
  description:
    "Procurement guides from Nidus Trading — industrial networking, enterprise storage, fiber OTDR testing, PLC automation, and backup power for tenders and enterprise.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="display-font text-4xl font-semibold">Insights & News</h1>
      <p className="mt-2 text-[var(--muted)]">
        SEO-focused guides for industrial buyers and procurement teams.
      </p>
      <div className="mt-10 space-y-4">
        {posts.map((post) => {
          const tags = parseJsonArray(post.tags);
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass block rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Draft"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
