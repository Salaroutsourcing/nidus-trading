import { CategoryGrid } from "@/components/home/category-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Categories",
  description: "Browse all Nidus Trading product categories.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <CategoryGrid categories={categories} />;
}
