import Link from "next/link";

import Section, { SectionHeader } from "@/components/Section";

export type FaqItem = { question: string; answer: string };

/*
 * Des questions telles qu'on les pose au téléphone, pas telles qu'on les
 * rédigerait pour un moteur de recherche. Les réponses n'affirment que ce que
 * le cabinet peut tenir : rien sur les tarifs, rien de chiffré.
 */
export const homeFaq: FaqItem[] = [
  {
    question: "Concrètement, vous faites quoi ?",
    answer:
      "On met en relation des praticiens et des structures de santé qui recrutent, partout en France. Côté praticien, on présente les postes et on ne transmet rien sans votre accord. Côté structure, on va chercher les profils, y compris ceux qui ne lisent aucune annonce.",
  },
  {
    question: "Vous prenez quelles spécialités ?",
    answer:
      "Médecine générale et spécialités, chirurgie dentaire, sages-femmes et professions paramédicales. Si un besoin sort de notre périmètre, on le dit plutôt que d'accepter une mission qu'on ne saura pas mener.",
  },
  {
    question: "Vous couvrez quelles régions ?",
    answer:
      "Toute la France. Les postes se concentrent en Île-de-France et dans les grandes métropoles, mais nous recrutons aussi en zone sous-dotée, où la demande est la plus forte et les conditions souvent les plus négociables.",
  },
  {
    question: "Mon employeur actuel peut-il l'apprendre ?",
    answer:
      "Non. Aucune candidature n'est transmise sans votre accord explicite, structure par structure. C'est la condition de base pour un praticien en poste, et c'est la première chose qu'on vous confirme.",
  },
  {
    question: "Ça prend combien de temps ?",
    answer:
      "Cela dépend du poste. En cabinet ou en centre, quelques semaines suffisent parfois. Sur une spécialité tendue, comptez plusieurs mois : les praticiens visés sont en poste et ne bougent pas du jour au lendemain. Autant le dire d'emblée.",
  },
];

export default function HomeFaq() {
  return (
    <Section tone="white" width="wide" labelledBy="faq-accueil-title">
      <SectionHeader
        eyebrow="Questions fréquentes"
        title="Ce qu'on nous demande le plus"
        id="faq-accueil-title"
      />
      <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-ink-soft">
        Autre chose ?{" "}
        <Link
          href="#contact"
          className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
        >
          Écrivez-nous
        </Link>
        , on vous répond directement.
      </p>

      <dl className="mx-auto max-w-3xl space-y-3">
        {homeFaq.map((item) => (
          <div key={item.question} className="card">
            <dt className="font-semibold text-ink">{item.question}</dt>
            <dd className="mt-2 leading-relaxed text-ink-soft">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
