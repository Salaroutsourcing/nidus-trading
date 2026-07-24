import Link from "next/link";
import { CategoryGrid } from "@/components/home/category-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Industrial & IT Hardware Categories & Departments",
  description:
    "Browse Nidus Trading departments: industrial networking & telecom, enterprise server & storage, test & measurement, PLC automation & process control, and power quality & backup infrastructure.",
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
          Five specialized, high-margin departments for government tender suppliers and
          enterprise procurement teams. Open a department to filter the catalog, compare
          MPNs and specs via inquiry, and add items to your quote list.
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
