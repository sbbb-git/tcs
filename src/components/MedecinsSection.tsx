import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: "briefcase",
    title: "Opportunités exclusives",
    description:
      "Accédez à des postes triés sur le volet dans les meilleurs établissements.",
  },
  {
    icon: "mapPin",
    title: "Mobilité nationale",
    description:
      "Des opportunités partout en France selon vos préférences géographiques.",
  },
  {
    icon: "clock",
    title: "Accompagnement personnalisé",
    description:
      "Un consultant dédié vous accompagne à chaque étape de votre recherche.",
  },
  {
    icon: "shield",
    title: "Confidentialité garantie",
    description:
      "Votre candidature reste confidentielle jusqu'à votre accord explicite.",
  },
];

export default function MedecinsSection() {
  return (
    <FeatureSection
      id="medecins"
      tone="white"
      eyebrow="Professionnels de santé"
      title="Votre carrière mérite le meilleur accompagnement"
      intro="Médecins, infirmiers, aides-soignants, pharmaciens… Nous trouvons le poste qui correspond à vos aspirations."
      features={features}
      cta={{ href: "#contact", label: "Déposer ma candidature" }}
    />
  );
}
