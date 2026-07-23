export const COMPANY = {
  name: "Nidus Trading",
  tagline:
    "Premium Industrial & Electronic Solutions – Quality, Reliability, Competitive Pricing",
  phone: "0349-0307920",
  phoneHref: "tel:+923490307920",
  email: "info@nidustrading.com",
  address: "Pakistan",
  whatsapp: "https://wa.me/923490307920",
  yearsInBusiness: 10,
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

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
