import type { Product } from "@/types/product";
import { COMPANY, SITE_URL } from "@/lib/constants";

const APP_URL = SITE_URL;

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
      // Quote-first catalog: schema.org requires a numeric price, and 0 is the
      // documented convention for "contact for pricing" offers.
      price: 0,
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
