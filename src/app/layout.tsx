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
    /*
     * L'icône Apple a son propre fichier : elle est posée sur l'écran
     * d'accueil sans marge ni fond ajouté, donc un logo transparent sur fond
     * blanc y apparaîtrait flottant dans un carré blanc. La variante favicon,
     * avec son fond de marque et ses coins arrondis, est faite pour cet usage.
     */
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0284C5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      style={{
        ["--font-sans" as string]:
          "'Inter Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <head>
        {/*
          Mesure d'audience Ahrefs, sans cookie et sans donnée personnelle :
          elle ne déclenche donc aucune obligation de bannière de consentement,
          contrairement à un traceur publicitaire. C'est la seule requête vers
          un tiers de tout le site.

          Posée en balise brute plutôt que par next/script : avec un export
          statique, c'est ce qui garantit sa présence dans le <head> du HTML
          livré, sans dépendre de l'hydratation côté navigateur.
        */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="tmms28zr1LhKrNtnFud62w"
          async
        />
      </head>
      <body className="min-h-screen bg-bg font-sans">
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
