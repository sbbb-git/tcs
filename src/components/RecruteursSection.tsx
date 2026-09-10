import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: "handshake",
    title: "On refuse les missions qu'on ne sait pas mener",
    description:
      "Un poste hors de notre périmètre ou impossible à pourvoir dans vos conditions, on le dit au premier échange plutôt que de l'accepter et de vous faire perdre un trimestre.",
  },
  {
    icon: "target",
    title: "On vous pose les questions du candidat",
    description:
      "Combien de praticiens dans l'équipe, quel temps par consultation, quel âge a le matériel. Si vous ne pouvez pas répondre, le recrutement s'arrêtera là, avec nous ou avec un autre.",
  },
  {
    icon: "users",
    title: "L'approche directe, pas la diffusion",
    description:
      "Sur les spécialités tendues, les praticiens sont en poste et ne lisent aucune annonce. Les atteindre suppose de les contacter un par un, dans la confidentialité.",
  },
  {
    icon: "trendingUp",
    title: "On suit après la signature",
    description:
      "Un praticien qui part à dix-huit mois, c'est un recrutement à refaire. On reste en contact les premiers mois, des deux côtés.",
  },
];

export default function RecruteursSection() {
  return (
    <FeatureSection
      id="recruteurs"
      tone="soft"
      eyebrow="Vous cherchez un praticien"
      title="Comment on travaille"
      intro="Cabinets, centres d'imagerie, maternités et centres de santé, à Paris et en petite couronne."
      features={features}
      cta={{ href: "#contact", label: "Nous décrire votre besoin" }}
    />
  );
}
