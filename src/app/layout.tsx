import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/seo/cookie-consent";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY, FAQ_ITEMS, SITE_URL } from "@/lib/constants";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const appUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${COMPANY.name} | Industrial & IT Hardware for Tenders & Enterprise Pakistan`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.tagline,
  keywords: [
    "Nidus Trading",
    "government tender IT hardware Pakistan",
    "industrial managed switch supplier Pakistan",
    "enterprise server storage Pakistan",
    "Cisco Moxa transceiver supplier",
    "OTDR thermal camera power quality analyzer Pakistan",
    "Siemens S7-1500 PLC VFD supplier",
    "3 phase online UPS LiFePO4 Pakistan",
    "DEHN Phoenix Contact surge protection",
    "B2B industrial procurement Pakistan",
  ],
  openGraph: {
    title: `${COMPANY.name} | Industrial & IT Hardware Marketplace`,
    description: COMPANY.tagline,
    url: appUrl,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Industrial & Electronic Solutions`,
    description: COMPANY.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    alternateName: "NT Industrial Marketplace",
    url: appUrl,
    logo: `${appUrl}/icon.svg`,
    email: COMPANY.email,
    description: COMPANY.tagline,
    areaServed: "Pakistan",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Office No. 10, First Floor, Al-Falah Askaria Plaza, Committee Chowk",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      addressCountry: COMPANY.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-349-0307920",
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    knowsAbout: [
      "Government Tender Supplies",
      "Industrial IT Hardware Procurement",
      "PLC Automation",
      "Fiber Optic & Telecom Gear",
      "Test & Measurement Instrumentation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: appUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${appUrl}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} min-h-screen antialiased`}>
        <CookieConsent />
        <JsonLd data={[orgSchema, websiteSchema, faqSchema]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
