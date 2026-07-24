export const COMPANY = {
  name: "Nidus Trading",
  tagline:
    "Industrial & Electronic Supply Marketplace — Quote-Driven, Reliable, Nationwide Pakistan",
  phone: "0349-0307920",
  phoneHref: "tel:+923490307920",
  email: "info@nidustrading.com",
  address: "Pakistan",
  whatsapp: "https://wa.me/923490307920",
  yearsInBusiness: 10,
  trustLine: "Quality industrial supply · B2B & B2C · Fast quote response",
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
  "Manufacturing & OEMs",
  "Construction & Fabrication",
  "Warehousing & Logistics",
  "Electrical Contractors",
  "IT & Data Rooms",
  "Workshops & Maintenance",
];

export const FAQ_ITEMS = [
  {
    q: "Do you publish product prices online?",
    a: "No. Nidus Trading operates quote-first. Add items to your Quote List or submit an inquiry — we respond with availability, lead time, and commercial terms suited to your quantity and specs.",
  },
  {
    q: "Can I order as a business (B2B) and as an individual?",
    a: "Yes. We support both B2B project orders and B2C purchases. Company name is optional on quote requests; bulk and repeat buyers receive priority commercial handling.",
  },
  {
    q: "How fast will I get a quotation?",
    a: "Most quote requests are reviewed within one business day. Urgent site or production needs can be flagged in your notes or by calling 0349-0307920.",
  },
  {
    q: "Do you supply across Pakistan?",
    a: "Yes. We arrange supply and logistics nationwide. Share your delivery city and site address when submitting a quote for accurate lead-time guidance.",
  },
  {
    q: "Can I request bulk or BOM pricing?",
    a: "Absolutely. Use the inquiry form or submit a Quote List with quantities. Attach brand preferences, drawings, or BOMs in the notes for faster matching.",
  },
  {
    q: "How do I track my quote or order?",
    a: "After submission you receive a reference (e.g. NT-…). Use Track Order with that number or your email to check status.",
  },
];

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
