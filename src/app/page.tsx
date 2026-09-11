import type { Metadata } from "next";

import Hero from "@/components/Hero";
import MedecinsSection from "@/components/MedecinsSection";
import RecruteursSection from "@/components/RecruteursSection";
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
  title: "Recrutement médical en France | TalentCare Santé",
  description:
    "Cabinet de recrutement médical partout en France : médecins généralistes et spécialistes, dentistes, sages-femmes et paramédicaux. Candidature confidentielle.",
  path: "/",
  keywords: [
    "cabinet de recrutement médical",
    "recruter un médecin",
    "offre emploi médecin",
    "recrutement paramédical",
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
      <PartnerSection />
      <LatestArticles posts={posts} />
      <HomeFaq />
      <ContactSection offers={offerRefs} />
    </>
  );
}
