/**
 * Canonical origin for the site. Every absolute URL (metadata, JSON-LD,
 * sitemap, robots) must derive from this so a domain change is a one-line edit.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://nidustrading.com"
).replace(/\/$/, "");

/** Google Analytics 4 measurement ID (gtag.js). */
export const GA_MEASUREMENT_ID = "G-W77VH892JH";

export const COMPANY = {
  name: "Nidus Trading",
  tagline:
    "Specialized Industrial & IT Hardware for Government Tenders & Enterprise Procurement — Networking, Servers, Test & Measurement, PLC Automation & Backup Power — Quote-Driven Across Pakistan",
  phone: "0349-0307920",
  phoneHref: "tel:+923490307920",
  email: "info@nidustrading.com",
  address: "Pakistan",
  whatsapp: "https://wa.me/923490307920",
  yearsInBusiness: 10,
  trustLine:
    "Tender-ready B2B supply · Genuine OEM · Datasheets & origin docs · Fast quote response",
};

export const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export const INQUIRY_STATUSES = ["NEW", "REPLIED", "CONVERTED", "CLOSED"] as const;

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const INDUSTRIES_SERVED = [
  "Government & Public-Sector Tenders",
  "Telecom Operators & ISPs",
  "Data Centers & Enterprise IT",
  "Power Utilities & Substations",
  "Oil, Gas & Process Industries",
  "System Integrators & OEMs",
];

/**
 * Catalog navigation data structure (mega-menu / department nav).
 * Mirrors the seeded high-margin departments and their sub-lines.
 */
export const CATEGORY_NAV = [
  {
    name: "Industrial Networking & Telecommunications",
    slug: "industrial-networking-telecom",
    subcategories: [
      "Managed PoE Switches (Moxa, Cisco IE)",
      "Optical Transceivers (10G/40G/100G) & Armored Fiber",
      "Point-to-Point Wireless Radios",
      "4G/5G Telemetry Gateways & Routers",
    ],
  },
  {
    name: "Enterprise Server, Storage & Data Center",
    slug: "enterprise-server-storage",
    subcategories: [
      "Redundant Server PSUs (Dell, HPE)",
      "SAS/SATA RAID Controllers & FC HBAs",
      "LTO-7/8/9 Tape Drives & Cartridges",
      "Intelligent Rack PDUs & IP-KVM",
    ],
  },
  {
    name: "Precision Test, Measurement & Calibration",
    slug: "test-measurement-calibration",
    subcategories: [
      "OTDRs & Fusion Splicer Consumables",
      "Thermal Cameras (FLIR, Fluke)",
      "Power Quality Analyzers",
      "Multi-Gas Detectors & Monitors",
    ],
  },
  {
    name: "Industrial Automation, PLC & Process Control",
    slug: "automation-plc-process-control",
    subcategories: [
      "Siemens S7-1200 / S7-1500 CPUs & I/O",
      "VFDs (Schneider Altivar, ABB ACS)",
      "Pressure & Ultrasonic Flow Transmitters (HART)",
    ],
  },
  {
    name: "Power Quality & Backup Infrastructure",
    slug: "power-quality-backup",
    subcategories: [
      "3-Phase Online UPS Systems",
      "48V Rack LiFePO4 Energy Storage",
      "Class I+II Surge Protection (DEHN, Phoenix Contact)",
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Do you publish product prices online?",
    a: "No. Nidus Trading operates quote-first. Add items to your Quote List or submit an inquiry — we respond with availability, lead time, and commercial terms suited to your quantity, MPNs, and specifications.",
  },
  {
    q: "Do you supply for government and enterprise tenders?",
    a: "Yes. We specialize in tender and enterprise procurement — genuine OEM products with Manufacturer Part Numbers (MPN), HS codes, country-of-origin details, datasheets, and warranty documentation to support technical evaluation.",
  },
  {
    q: "Can you provide datasheets, HS codes, and country of origin?",
    a: "Yes. Every specialized SKU carries the MPN, HS code, origin, certifications, and OEM warranty. Datasheets are linked on each product page and can be compiled into a tender submission pack on request.",
  },
  {
    q: "How fast will I get a quotation?",
    a: "Most quote requests are reviewed within one business day. Urgent tender deadlines or project needs can be flagged in your notes or by calling 0349-0307920.",
  },
  {
    q: "Do you supply across Pakistan?",
    a: "Yes. We arrange supply and logistics nationwide. Share your delivery city and site address when submitting a quote for accurate lead-time guidance.",
  },
  {
    q: "Can I request bulk or BOM pricing?",
    a: "Absolutely. Use the inquiry form or submit a Quote List with quantities and part numbers. Attach brand preferences, drawings, or BOMs in the notes for faster matching.",
  },
  {
    q: "How do I track my quote or order?",
    a: "After submission you receive a reference (e.g. NT-…). Use Track Order with that number or your email to check status.",
  },
];

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
