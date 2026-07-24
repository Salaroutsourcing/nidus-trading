import type { Product } from "@/types/product";
import { COMPANY } from "@/lib/constants";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://nidus-trading.vercel.app";

/**
 * schema.org Product JSON-LD tuned for B2B / government-tender procurement.
 *
 * Emphasises the metadata technical evaluators search for — MPN/SKU, brand,
 * country of origin, HS code, datasheet, warranty — and keeps the offer
 * quote-based (no public price) with PKR currency and the Nidus Trading seller.
 */
export function ProductSchema({ product }: { product: Product }) {
  const additionalProperty = [
    product.hsCode && {
      "@type": "PropertyValue",
      name: "HS Code",
      value: product.hsCode,
    },
    product.datasheetUrl && {
      "@type": "PropertyValue",
      name: "Datasheet",
      value: product.datasheetUrl,
    },
    product.warrantyPeriod && {
      "@type": "PropertyValue",
      name: "Warranty",
      value: product.warrantyPeriod,
    },
    ...(product.certifications ?? []).map((cert) => ({
      "@type": "PropertyValue",
      name: "Certification",
      value: cert,
    })),
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: `${product.brand} ${product.name} (${product.mpn})`,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.description,
    sku: product.mpn,
    mpn: product.mpn,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    countryOfOrigin: product.countryOfOrigin
      ? {
          "@type": "Country",
          name: product.countryOfOrigin,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: `${APP_URL}/products/${product.slug}`,
      priceCurrency: "PKR",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Quote Basis for Enterprise & Govt Tenders",
      },
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: COMPANY.name,
        telephone: "+92-349-0307920",
        areaServed: "PK",
      },
    },
    additionalProperty,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default ProductSchema;
