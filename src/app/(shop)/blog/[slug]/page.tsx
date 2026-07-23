import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Article" };
  // AI-powered suggestions hint: prefer metaDesc 150-160 chars with primary keyword near the front.
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  const tags = parseJsonArray(post.tags);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.publishedAt,
    mainEntityOfPage: `${appUrl}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={articleSchema} />
      <Link href="/blog" className="text-sm text-[var(--accent)]">
        ← Back to insights
      </Link>
      <h1 className="display-font mt-4 text-4xl font-semibold leading-tight">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        {post.author}
        {post.publishedAt
          ? ` · ${new Date(post.publishedAt).toLocaleDateString()}`
          : ""}
      </p>
      <p className="mt-6 text-lg text-[var(--muted)]">{post.excerpt}</p>
      <div className="prose-nidus mt-8 space-y-4 whitespace-pre-wrap text-[var(--foreground)] leading-relaxed">
        {post.content}
      </div>
      {/* Internal linking strategy: related category CTAs strengthen SEO silos */}
      <div className="mt-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/products?q=${encodeURIComponent(tag)}`}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs hover:border-[var(--accent)]"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
