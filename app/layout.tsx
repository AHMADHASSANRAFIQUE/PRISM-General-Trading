import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A192F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prismintl.co"),
  title: "Prism General Trading | FMCG Distribution & Marketing UAE",
  description:
    "Established in 1994, Prism provides FMCG, vitamins and supplements distribution and marketing across all seven Emirates.",
  keywords: [
    "Prism General Trading",
    "UAE FMCG distribution",
    "vitamins and supplements distributor UAE",
    "healthcare consumer products Dubai",
    "brand marketing UAE",
    "modern trade distribution UAE",
  ],
  authors: [{ name: "Prism General Trading" }],
  creator: "Prism General Trading",
  publisher: "Prism General Trading",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/prism-logo.png",
    shortcut: "/images/prism-logo.png",
    apple: "/images/prism-logo.png",
  },
  openGraph: {
    title: "Prism General Trading | FMCG Distribution & Marketing UAE",
    description:
      "Established in 1994, Prism provides FMCG, vitamins and supplements distribution and marketing across all seven Emirates.",
    url: "https://prismintl.co",
    siteName: "Prism General Trading",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/prism-logo.png",
        width: 1200,
        height: 630,
        alt: "Prism General Trading Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism General Trading | FMCG Distribution & Marketing UAE",
    description:
      "Established in 1994, Prism provides FMCG, vitamins and supplements distribution and marketing across all seven Emirates.",
    images: ["/images/prism-logo.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Prism General Trading",
  legalName: "Prism General Trading",
  url: "https://prismintl.co",
  logo: "https://prismintl.co/images/prism-logo.png",
  description:
    "Established in 1994, Prism General Trading provides FMCG, vitamins, dietary supplements and healthcare consumer products distribution and marketing across all seven Emirates.",
  foundingDate: "1994",
  telephone: "+971 4 251 5753",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  email: "info@prismintl.co",
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  knowsAbout: [
    "FMCG Distribution",
    "Vitamins & Dietary Supplements",
    "Healthcare Consumer Products",
    "Trade Marketing & Retail Activation",
    "UAE Product Registration & Compliance",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 antialiased selection:bg-prism-sky/20 selection:text-prism-navy">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
