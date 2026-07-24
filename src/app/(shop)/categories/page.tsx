import Link from "next/link";
import { CategoryGrid } from "@/components/home/category-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Industrial Product Categories & Departments",
  description:
    "Browse all 10 Nidus Trading departments: electronics, electrical, IT, mechanical, mild steel, wood, paint, hardware, caster wheels, and safety equipment.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="pb-10">
      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
        <h1 className="display-font text-4xl font-bold">All departments</h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Ten industrial categories for B2B and B2C buyers. Open a department to
          filter the catalog, compare related SKUs via inquiry, and add items to
          your quote list.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Looking for something specific?{" "}
          <Link href="/products" className="font-semibold text-[var(--accent)] hover:underline">
            Search the catalog
          </Link>{" "}
          or{" "}
          <Link href="/inquiry" className="font-semibold text-[var(--accent)] hover:underline">
            request a custom quote
          </Link>
          .
        </p>
      </div>
      <CategoryGrid categories={categories} />
    </div>
  );
}
