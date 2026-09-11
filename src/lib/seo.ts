import type { Metadata } from "next";

import { absoluteUrl, site } from "@/lib/site";
import type { Post } from "@/lib/blog";

const OG_IMAGE = {
  url: absoluteUrl("/og/default.png"),
  width: 1200,
  height: 630,
  alt: `${site.name}, cabinet de recrutement spécialisé santé`,
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  /**
   * Carte de partage propre à la page. Les dimensions sont exigées plutôt que
   * déduites : appliquer celles de l'image par défaut à une image différente
   * produit des balises qui mentent, et les validateurs recadrent ou refusent.
   */
  ogImage?: { path: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds the metadata for a page, including the canonical URL.
 *
 * `title` is used verbatim, no template suffix is appended, because the
 * 60-character budget checked at build time covers the whole rendered title.
 * Write titles that already carry the brand when it helps the snippet.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const image = ogImage
    ? {
        url: absoluteUrl(ogImage.path),
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      }
    : OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

/**
 * `Organization`, deliberately not a `LocalBusiness` subtype: those require a
 * postal address, and the cabinet has no premises open to the public. Inventing
 * an address to satisfy a validator would put false information in the markup.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/og/logo.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/og/default.png"),
    areaServed: { "@type": "Country", name: site.areaServed },
    sameAs: Object.values(site.socials),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "fr-FR",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function serviceSchema() {
  return {
    "@type": "Service",
    "@id": absoluteUrl("/#service"),
    name: "Recrutement médical et paramédical",
    serviceType: "Recrutement de professionnels de santé",
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: site.areaServed },
    audience: [
      { "@type": "Audience", audienceType: "Professionnels de santé" },
      { "@type": "Audience", audienceType: "Établissements de santé" },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}/`);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    inLanguage: "fr-FR",
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    wordCount: post.wordCount,
    keywords: post.keywords?.join(", "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl("/og/default.png")],
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

/**
 * Balisage d'une offre d'emploi.
 *
 * Google retire des résultats toute offre sans date de fin de validité ou dont
 * l'échéance est passée : `validThrough` n'est donc pas facultatif. L'organisme
 * recruteur est le cabinet, ce qui est le cas d'usage prévu pour un
 * intermédiaire de recrutement.
 *
 * Une offre balisée doit correspondre à un poste réellement ouvert. Une annonce
 * fictive relève des règles anti-spam et expose à une action manuelle.
 */
export function jobPostingSchema(offer: {
  slug: string;
  title: string;
  description: string;
  date: string;
  validThrough: string;
  contrat: string;
  region: string;
  localite?: string;
  reference: string;
  metierName: string;
}) {
  const url = absoluteUrl(`/offres-emploi/${offer.slug}/`);

  const EMPLOYMENT_TYPE: Record<string, string> = {
    CDI: "FULL_TIME",
    CDD: "TEMPORARY",
    "Praticien hospitalier": "FULL_TIME",
    "Libéral": "CONTRACTOR",
    Vacation: "PART_TIME",
  };

  return {
    "@type": "JobPosting",
    "@id": `${url}#jobposting`,
    title: offer.title,
    description: offer.description,
    datePosted: offer.date,
    validThrough: `${offer.validThrough}T23:59:59+02:00`,
    employmentType: EMPLOYMENT_TYPE[offer.contrat] ?? "OTHER",
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: offer.reference,
    },
    hiringOrganization: { "@id": absoluteUrl("/#organization") },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
        ...(offer.region !== "France entière"
          ? { addressRegion: offer.region }
          : {}),
        ...(offer.localite ? { addressLocality: offer.localite } : {}),
      },
    },
    occupationalCategory: offer.metierName,
    industry: "Santé",
    url,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Wraps any number of schema nodes into a single @graph document. */
export function jsonLdGraph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * Fiche métier.
 *
 * Déclarée en `Article` et non en `BlogPosting` : une fiche métier n'est pas
 * une publication datée dans un flux, c'est une référence mise à jour. La
 * distinction compte pour les moteurs comme pour les assistants, qui citent
 * volontiers une référence et plus rarement un billet.
 */
export function ficheSchema(fiche: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  wordCount: number;
  metierName: string;
}) {
  const url = absoluteUrl(`/fiches-metiers/${fiche.slug}/`);

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: fiche.title,
    description: fiche.description,
    inLanguage: "fr-FR",
    datePublished: fiche.date,
    dateModified: fiche.updated ?? fiche.date,
    wordCount: fiche.wordCount,
    about: { "@type": "Occupation", name: fiche.metierName },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl("/og/default.png")],
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}
