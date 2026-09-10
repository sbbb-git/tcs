import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: "handshake",
    title: "Le bon profil, pas le premier disponible",
    description:
      "Une structure peut être attractive sans convenir à tous les praticiens. On cherche l'adéquation, parce qu'un praticien qui repart à un an vous ramène au point de départ.",
  },
  {
    icon: "search",
    title: "L'approche directe plutôt que la diffusion",
    description:
      "Sur les spécialités tendues, les praticiens sont en poste et ne lisent aucune annonce. Les atteindre suppose de les contacter un par un, dans la confidentialité.",
  },
  {
    icon: "fileCheck",
    title: "On vous pose les questions du candidat",
    description:
      "Composition de l'équipe, temps par consultation, âge du matériel, organisation du secrétariat. Un praticien les posera au deuxième rendez-vous. Autant y répondre au premier.",
  },
  {
    icon: "heart",
    title: "Un accompagnement personnalisé et confidentiel",
    description:
      "Un seul interlocuteur, du premier échange à la prise de poste. Votre recrutement n'est pas diffusé publiquement si vous ne le souhaitez pas.",
  },
];

export default function RecruteursSection() {
  return (
    <FeatureSection
      id="recruteurs"
      tone="soft"
      eyebrow="Vous recrutez"
      title="Plusieurs structures médicales nous font déjà confiance"
      intro="Cabinets, centres médicaux, centres d'imagerie et centres de santé, à Paris et en petite couronne."
      image={{
        src: "/images/examen-clinique.webp",
        alt: "Mesure de la tension artérielle lors d'une consultation",
        width: 1120,
        height: 840,
      }}
      features={features}
      cta={{ href: "#contact", label: "Nous décrire votre besoin" }}
    />
  );
}
