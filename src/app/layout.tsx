import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/og/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/og/logo.png",
  },
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      style={{ ["--font-sans" as string]: "'Inter Variable', system-ui, sans-serif" }}
    >
      <body className="min-h-screen bg-background font-sans">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <JsonLd data={jsonLdGraph([organizationSchema(), websiteSchema()])} />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
