import FeatureSection, { type Feature } from "@/components/FeatureSection";

/*
 * Trois engagements, une phrase chacun. La version précédente expliquait sa
 * méthode en quatre paragraphes, ce qui se lit comme un argumentaire et non
 * comme une réponse à la question que se pose un praticien : qu'est-ce que
 * ça change pour moi.
 */
const features: Feature[] = [
  {
    icon: "shield",
    title: "Candidature confidentielle",
    description:
      "Rien n'est transmis à une structure sans votre accord, poste par poste.",
  },
  {
    icon: "bookmark",
    title: "Des postes non publiés",
    description:
      "Une partie des structures recrute par relation et ne diffuse aucune annonce.",
  },
  {
    icon: "users",
    title: "Un seul interlocuteur",
    description:
      "La même personne vous suit du premier échange à la prise de poste.",
  },
];

export default function MedecinsSection() {
  return (
    <FeatureSection
      id="medecins"
      tone="white"
      eyebrow="Vous cherchez un poste"
      title="Ce qu'on vous garantit"
      image={{
        src: "/images/consultation-patient.webp",
        alt: "Médecin en consultation avec un patient, dans un cabinet",
        width: 1400,
        height: 560,
      }}
      features={features}
      cta={{ href: "/offres-emploi/", label: "Voir les offres" }}
    />
  );
}
