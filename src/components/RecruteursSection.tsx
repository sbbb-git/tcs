import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: "search",
    title: "Approche directe",
    description:
      "Les praticiens en poste ne lisent pas les annonces. Nous allons les chercher.",
  },
  {
    icon: "handshake",
    title: "Des profils qui restent",
    description:
      "Nous cherchons l'adéquation avec votre structure, pas le premier disponible.",
  },
  {
    icon: "heart",
    title: "Recrutement discret",
    description:
      "Votre recherche n'est pas diffusée publiquement si vous ne le souhaitez pas.",
  },
];

export default function RecruteursSection() {
  return (
    <FeatureSection
      id="recruteurs"
      tone="soft"
      eyebrow="Vous recrutez"
      title="Comment nous procédons"
      image={{
        src: "/images/examen-clinique.webp",
        alt: "Mesure de la tension artérielle lors d'une consultation",
        width: 1120,
        height: 840,
      }}
      features={features}
      cta={{ href: "/recruter/", label: "Recruter par spécialité" }}
    />
  );
}
