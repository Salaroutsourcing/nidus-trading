import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma.category
    .findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true },
    })
    .catch(() => []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={categories} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
