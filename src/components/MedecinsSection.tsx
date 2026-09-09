import { Briefcase, Clock, MapPin, Shield } from "lucide-react";

import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: Briefcase,
    title: "Opportunités exclusives",
    description:
      "Accédez à des postes triés sur le volet dans les meilleurs établissements.",
  },
  {
    icon: MapPin,
    title: "Mobilité nationale",
    description:
      "Des opportunités partout en France selon vos préférences géographiques.",
  },
  {
    icon: Clock,
    title: "Accompagnement personnalisé",
    description:
      "Un consultant dédié vous accompagne à chaque étape de votre recherche.",
  },
  {
    icon: Shield,
    title: "Confidentialité garantie",
    description:
      "Votre candidature reste confidentielle jusqu'à votre accord explicite.",
  },
];

export default function MedecinsSection() {
  return (
    <FeatureSection
      id="medecins"
      tinted
      eyebrow="Professionnels de santé"
      title="Votre carrière mérite le meilleur accompagnement"
      intro="Médecins, infirmiers, aides-soignants, pharmaciens… Nous trouvons le poste qui correspond à vos aspirations."
      features={features}
      cta={{ href: "#contact", label: "Déposer ma candidature" }}
    />
  );
}
