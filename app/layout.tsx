import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tps-website-one.vercel.app"),
  title: {
    default: "TPS | Professional Property Sourcing & Rent-to-Rent Specialists UK",
    template: "%s | TPS",
  },
  description:
    "TPS delivers premium property sourcing, R2R, R2SA, R2HMO, social housing and supported living solutions for UK landlords and investors. Guaranteed rent. Hands-off management. Verified deal flow.",
  keywords: [
    "property sourcing UK",
    "rent to rent",
    "guaranteed rent landlord",
    "R2SA serviced accommodation",
    "R2HMO multi occupancy",
    "social housing investment",
    "supported living property",
    "property investment UK",
    "off market property deals",
    "BMV property",
    "deal sourcer",
    "property sourcing agent",
  ],
  authors: [{ name: "TPS" }],
  creator: "TPS",
  publisher: "TPS",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tps-website-one.vercel.app",
    siteName: "TPS",
    title: "TPS | Professional Property Sourcing & R2R Specialists",
    description:
      "Premium property sourcing, R2R solutions, and education for UK landlords and investors. Guaranteed rent. Verified deal flow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TPS | Professional Property Sourcing & R2R Specialists",
    description: "Premium property sourcing and R2R solutions for UK landlords and investors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    name: "TPS",
    alternateName: "The Property Source",
    url: "https://tps-website-one.vercel.app",
    logo: "https://tps-website-one.vercel.app/logo.png",
    description:
      "Professional property sourcing and rent-to-rent specialists serving UK landlords and investors.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
    sameAs: [],
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}