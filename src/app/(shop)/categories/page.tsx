import { CategoryGrid } from "@/components/home/category-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Product Categories | Industrial Supply Pakistan",
  description:
    "Browse Nidus Trading categories: electronic components, electrical items, mild steel, industrial caster wheels, hardware, safety & lifting equipment, and more.",
  keywords: [
    "electronic components supplier",
    "industrial caster wheels Pakistan",
    "mild steel plates Pakistan",
    "electrical items",
    "safety lifting equipment",
  ],
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <CategoryGrid categories={categories} />;
}
