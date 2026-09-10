import FeatureSection, { type Feature } from "@/components/FeatureSection";

/*
 * Chaque carte décrit la façon de travailler du cabinet, telle qu'elle est
 * pratiquée et telle qu'elle est déjà racontée publiquement. Aucun engagement
 * chiffré n'y figure : un délai de réponse annoncé qui n'est pas tenu coûte
 * plus cher que l'absence de promesse.
 */
const features: Feature[] = [
  {
    icon: "message",
    title: "On commence par votre projet, pas par nos postes",
    description:
      "Votre rythme idéal, le type de structure que vous visez, libéral ou salariat et surtout pourquoi. Tant que ce n'est pas clair, aucune annonce ne peut l'être.",
  },
  {
    icon: "shield",
    title: "Votre candidature reste confidentielle",
    description:
      "Rien ne part chez une structure avant que vous ayez dit oui, poste par poste. C'est la condition de base quand on est déjà en exercice.",
  },
  {
    icon: "users",
    title: "Des postes qui ne passent pas par une annonce",
    description:
      "Une partie des structures parisiennes recrutent par relation et ne diffusent rien. On y accède parce qu'elles nous appellent, pas parce qu'on publie.",
  },
  {
    icon: "target",
    title: "Une candidature ciblée plutôt que dix envoyées",
    description:
      "Multiplier les candidatures ne compense pas un projet flou. Quand le projet est posé, deux ou trois pistes suffisent, et elles aboutissent.",
  },
];

export default function MedecinsSection() {
  return (
    <FeatureSection
      id="medecins"
      tone="white"
      eyebrow="Vous êtes praticien"
      title="Comment on travaille avec vous"
      intro="Changer de poste engage plusieurs années. Autant partir de ce que vous voulez faire, avant de regarder qui recrute."
      features={features}
      cta={{ href: "/offres-emploi/", label: "Voir les postes" }}
    />
  );
}
