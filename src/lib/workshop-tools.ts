import { buildB2BDescription } from "../../prisma/catalog-b2b";
import { toolsCategory, toolsProducts } from "../../prisma/tools-list";

const listedAt = new Date("2026-11-21T00:00:00.000Z");

export type WorkshopCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  featured: boolean;
  sortOrder: number;
};

export type WorkshopProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  sku: string;
  price: number;
  discountPrice: null;
  stock: number;
  images: string;
  specifications: string;
  brand: string;
  tags: string;
  featured: boolean;
  bestSeller: boolean;
  active: boolean;
  mpn: string;
  hsCode?: string;
  countryOfOrigin?: string;
  datasheetUrl: null;
  certifications: string;
  warrantyPeriod?: string;
  categoryId: string;
  category: WorkshopCategory;
  createdAt: Date;
  updatedAt: Date;
};

export function workshopCategory(): WorkshopCategory {
  return {
    id: "cat-workshop-hand-tools",
    name: toolsCategory.name,
    slug: toolsCategory.slug,
    description: toolsCategory.description,
    image: toolsCategory.image,
    icon: toolsCategory.icon,
    featured: toolsCategory.featured,
    sortOrder: toolsCategory.sortOrder,
  };
}

export function workshopProducts(): WorkshopProduct[] {
  const category = workshopCategory();
  return toolsProducts.map((product) => ({
    id: `tool-${product.sku}`,
    name: product.title,
    slug: product.slug,
    description: buildB2BDescription(product),
    shortDesc: product.shortDesc,
    sku: product.sku,
    price: 1,
    discountPrice: null,
    stock: product.stock,
    images: JSON.stringify(product.images?.length ? product.images : [product.image]),
    specifications: JSON.stringify(
      Object.fromEntries(product.specs.map((spec) => [spec.name, spec.value]))
    ),
    brand: product.brand,
    tags: JSON.stringify(product.tags),
    featured: false,
    bestSeller: false,
    active: true,
    mpn: product.mpn,
    hsCode: product.hsCode,
    countryOfOrigin: product.countryOfOrigin,
    datasheetUrl: null,
    certifications: "[]",
    warrantyPeriod: product.warrantyPeriod,
    categoryId: category.id,
    category,
    createdAt: listedAt,
    updatedAt: listedAt,
  }));
}

export function findWorkshopProduct(idOrSlug: string) {
  return (
    workshopProducts().find(
      (product) => product.id === idOrSlug || product.slug === idOrSlug || product.sku === idOrSlug
    ) ?? null
  );
}

/** Tools that are not already stored under the same SKU. */
export function workshopProductsMissingFrom(skus: Iterable<string>) {
  const have = new Set(skus);
  return workshopProducts().filter((product) => !have.has(product.sku));
}
