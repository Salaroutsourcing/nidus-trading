import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { notifyNewInquiry } from "@/lib/notify";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, "Please add a short subject."),
  message: z
    .string()
    .min(10, "Please describe your requirement in at least 10 characters."),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  // Hidden field: real users never fill this, bots usually do.
  website: z.string().max(0).optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(clientKey(req, "inquiry"), {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many inquiries from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || "Please check the form fields.";
    return NextResponse.json(
      { error: first, fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Silently accept honeypot hits so bots do not learn they were filtered.
  const { website: _website, ...data } = parsed.data;
  if (_website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const inquiry = await prisma.inquiry.create({
    data: { ...data, email: data.email.toLowerCase(), status: "NEW" },
  });

  await notifyNewInquiry({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    company: inquiry.company,
    subject: inquiry.subject,
    message: inquiry.message,
    productInterest: inquiry.productInterest,
    quantity: inquiry.quantity,
  });

  return NextResponse.json(inquiry, { status: 201 });
}
