/**
 * Editorial taxonomy.
 *
 * Deliberately short: a category page only earns its place when several
 * articles sit under it. One post per category produces thin pages that
 * duplicate the article card and spend crawl budget for nothing.
 *
 * The `intro` is what gives a listing page something to rank on beyond the
 * list itself, so keep it substantive rather than decorative.
 */
export type CategoryMeta = {
  name: string;
  title: string;
  description: string;
  intro: string;
};

export const categoryMeta: Record<string, CategoryMeta> = {
  "recrutement-medical": {
    name: "Recrutement médical",
    title: "Recrutement médical : méthodes et démarches | TalentCare",
    description:
      "Comment recruter un médecin en France : définition du besoin, canaux de diffusion, statuts, recrutement à l'étranger et intégration des praticiens.",
    intro:
      "Recruter un praticien ne se joue plus sur la diffusion d'une annonce. Les articles réunis ici couvrent la chaîne complète : cadrer le besoin, construire une offre lisible, aller chercher les profils là où ils se trouvent, et sécuriser l'arrivée du praticien.",
  },
  "remuneration-et-statuts": {
    name: "Rémunération et statuts",
    title: "Rémunération et statuts des médecins | TalentCare Santé",
    description:
      "Grilles, primes, statuts de praticien hospitalier, contractuel ou libéral : ce qui détermine la rémunération d'un médecin et le choix de son contrat.",
    intro:
      "La rémunération et le statut sont les deux premiers filtres qu'un praticien applique à une offre. Ces articles détaillent ce que recouvre chaque statut, ce qui se négocie réellement, et où trouver les textes qui font foi.",
  },
  "attractivite-et-fidelisation": {
    name: "Attractivité et fidélisation",
    title: "Attractivité et fidélisation des médecins | TalentCare Santé",
    description:
      "Marque employeur, conditions d'exercice, intégration et fidélisation : ce qui décide un médecin à rejoindre un établissement, puis à y rester.",
    intro:
      "Recruter un médecin coûte cher ; le garder protège cet investissement. Ces articles portent sur ce qui se joue avant la candidature — la réputation de l'établissement — et après la signature — l'intégration et les conditions d'exercice au quotidien.",
  },
  "demographie-medicale": {
    name: "Démographie médicale",
    title: "Démographie médicale en France | TalentCare Santé",
    description:
      "Répartition des médecins sur le territoire, zones sous-dotées, renouvellement des générations : le contexte qui explique la tension sur le recrutement.",
    intro:
      "Le contexte démographique explique une grande partie de la difficulté à recruter. Ces analyses posent le cadre : comment les praticiens se répartissent sur le territoire, ce que mesurent les zonages officiels, et quels leviers relèvent réellement des établissements.",
  },
};

/** Order used on the blog index — most structural topic first. */
export const categoryOrder = [
  "recrutement-medical",
  "remuneration-et-statuts",
  "attractivite-et-fidelisation",
  "demographie-medicale",
];
