import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.title ? slugify(body.title) : undefined,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      tags: body.tags ? JSON.stringify(body.tags) : undefined,
      published: body.published,
      publishedAt: body.published ? new Date() : body.published === false ? null : undefined,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      author: body.author,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
