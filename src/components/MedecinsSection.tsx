import FeatureSection, { type Feature } from "@/components/FeatureSection";

/*
 * Chaque carte dit ce qu'on fait, pas ce qu'on est. « Confidentialité
 * garantie » ne veut rien dire ; « rien n'est transmis avant votre accord »
 * décrit un engagement vérifiable.
 */
const features: Feature[] = [
  {
    icon: "shield",
    title: "Rien ne part sans votre accord",
    description:
      "On vous présente le poste, vous décidez. Votre CV n'arrive chez personne avant que vous ayez dit oui, poste par poste.",
  },
  {
    icon: "search",
    title: "On vous dit ce qu'il y a derrière l'annonce",
    description:
      "Effectif réel de l'équipe, organisation des gardes, temps par consultation, âge du parc d'appareils. On le demande à la structure avant de vous en parler.",
  },
  {
    icon: "bookmark",
    title: "Des postes qui ne sont publiés nulle part",
    description:
      "Une partie des structures parisiennes ne diffuse pas d'annonce et recrute par relation. Ce sont souvent les meilleures conditions.",
  },
  {
    icon: "clock",
    title: "Une réponse sous 24 heures",
    description:
      "Y compris quand la réponse est non. Un silence de trois semaines vous fait perdre plus de temps qu'un refus le lendemain.",
  },
];

export default function MedecinsSection() {
  return (
    <FeatureSection
      id="medecins"
      tone="white"
      eyebrow="Vous cherchez un poste"
      title="Ce qu'on vous doit avant que vous postuliez"
      intro="Un praticien qui change de poste engage plusieurs années. Il a le droit de savoir dans quoi il entre."
      features={features}
      cta={{ href: "/offres-emploi/", label: "Voir les postes ouverts" }}
    />
  );
}
