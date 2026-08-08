/**
 * Nidus Trading — B2B product type definitions.
 *
 * These fields carry the metadata that government tender evaluators and
 * enterprise procurement managers require: manufacturer part numbers,
 * HS codes for Pakistan Customs, country of origin, datasheets, and
 * certifications. Prices are never exposed publicly — the platform is
 * quote-driven ("Price on Request").
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Manufacturer Part Number — critical for B2B / tender matching. */
  mpn: string;
  brand: string;
  category: string;
  description: string;
  /** Pakistan Customs HS Code (import classification). */
  hsCode?: string;
  /** Country of Origin, e.g. "Germany", "USA", "Japan". */
  countryOfOrigin?: string;
  /** Direct PDF link for technical evaluators. */
  datasheetUrl?: string;
  /** e.g. ["CE", "UL", "ISO 9001", "PTA Approved"]. */
  certifications?: string[];
  /** e.g. "12 Months Official OEM Warranty". */
  warrantyPeriod?: string;
  inStock: boolean;
  /** Technical specifications table (key → value). */
  specifications: Record<string, string>;
  /** Primary product image URL (used for schema.org and cards). */
  imageUrl?: string;
}

/** Canonical HS code + origin shape shared with the seed catalog. */
export interface ProductComplianceMeta {
  mpn: string;
  hsCode?: string;
  countryOfOrigin?: string;
  datasheetUrl?: string;
  certifications?: string[];
  warrantyPeriod?: string;
}
