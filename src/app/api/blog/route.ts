import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  const publishedOnly = !admin;
  const posts = await prisma.blogPost.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

const postSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  metaTitle: z.string().optional().nullable(),
  metaDesc: z.string().optional().nullable(),
  author: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: slugify(data.title),
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      tags: JSON.stringify(data.tags),
      published: data.published,
      publishedAt: data.published ? new Date() : null,
      metaTitle: data.metaTitle,
      metaDesc: data.metaDesc,
      author: data.author || "Nidus Trading",
    },
  });
  return NextResponse.json(post, { status: 201 });
}
