import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${COMPANY.name} | Premium Industrial & Electronic Solutions Pakistan`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.tagline,
  keywords: [
    "Nidus Trading",
    "industrial caster wheels Pakistan",
    "electronic components supplier",
    "mild steel plates Pakistan",
    "mild steel pipes",
    "electrical items supplier Pakistan",
    "industrial hardware supplier",
    "safety lifting equipment Pakistan",
    "B2B industrial trading",
  ],
  openGraph: {
    title: `${COMPANY.name} | Premium Industrial & Electronic Solutions`,
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
    url: appUrl,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    description: COMPANY.tagline,
    areaServed: "Pakistan",
    slogan: "Premium Industrial & Electronic Solutions",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-349-0307920",
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
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
