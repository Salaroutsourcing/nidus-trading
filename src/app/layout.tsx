import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/constants";
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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
    images: [
      {
        url: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Nidus Trading industrial supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Industrial & Electronic Solutions`,
    description: COMPANY.tagline,
  },
  alternates: {
    canonical: appUrl,
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
    logo: `${appUrl}/logo.png`,
    email: COMPANY.email,
    description: COMPANY.tagline,
    areaServed: "Pakistan",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} min-h-screen antialiased`}>
        <JsonLd data={orgSchema} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
