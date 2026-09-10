import type { Metadata } from "next";

import Hero from "@/components/Hero";
import MedecinsSection from "@/components/MedecinsSection";
import RecruteursSection from "@/components/RecruteursSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import PartnerSection from "@/components/PartnerSection";
import LatestArticles from "@/components/LatestArticles";
import LatestOffers from "@/components/LatestOffers";
import HomeFaq, { homeFaq } from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import { getPosts } from "@/lib/blog";
import { getOffers } from "@/lib/jobs";
import { faqSchema, jsonLdGraph, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Recrutement médical et paramédical, TalentCare Santé",
  description:
    "Cabinet de recrutement spécialisé santé : nous accompagnons médecins et soignants dans leur carrière, et les établissements dans leurs recrutements.",
  path: "/",
  keywords: [
    "cabinet de recrutement médical",
    "recrutement paramédical",
    "recruter un médecin",
    "emploi santé",
  ],
});

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  const allOffers = getOffers();
  const offers = allOffers.slice(0, 3);
  // Seul le nécessaire traverse la frontière serveur/client.
  const offerRefs = allOffers.map(({ slug, title, ville, region, reference }) => ({
    slug,
    title,
    lieu: ville ?? region,
    reference,
  }));

  return (
    <>
      <JsonLd data={jsonLdGraph([serviceSchema(), faqSchema(homeFaq)])} />
      <Hero />
      <LatestOffers offers={offers} />
      <MedecinsSection />
      <RecruteursSection />
      <TestimonialsSection />
      <PartnerSection />
      <LatestArticles posts={posts} />
      <HomeFaq />
      <ContactSection offers={offerRefs} />
    </>
  );
}
