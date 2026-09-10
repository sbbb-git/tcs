import Link from "next/link";

import Section, { SectionHeader } from "@/components/Section";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ de la page d'accueil.
 *
 * Les réponses ne portent que sur ce que le site affirme par ailleurs : rien
 * sur les tarifs, et les délais restent qualitatifs. Le contenu est identique à
 * celui déclaré en FAQPage, une FAQ balisée mais invisible étant une infraction
 * aux règles de Google.
 */
export const homeFaq: FaqItem[] = [
  {
    question: "Quels professionnels de santé recrutez-vous ?",
    answer:
      "Médecins généralistes et spécialistes, infirmiers, aides-soignants, pharmaciens et plus largement les métiers du soin. Chaque profession relève d'un marché différent, avec ses statuts, ses spécialisations et ses canaux, et suppose une approche adaptée.",
  },
  {
    question: "Dans quelles régions intervenez-vous ?",
    answer:
      "Sur l'ensemble du territoire français. Les praticiens que nous accompagnons expriment des préférences géographiques variées, et nous travaillons aussi bien avec des établissements en métropole qu'avec des structures situées dans des territoires moins dotés.",
  },
  {
    question: "Ma candidature reste-t-elle confidentielle ?",
    answer:
      "Oui. Votre candidature n'est transmise à un établissement qu'avec votre accord explicite, poste par poste. C'est une condition de départ pour un praticien en poste qui envisage une mobilité sans en informer son employeur actuel.",
  },
  {
    question: "Travaillez-vous avec le public comme avec le privé ?",
    answer:
      "Oui : hôpitaux publics, cliniques privées, EHPAD, centres de santé et cabinets. Les statuts, les grilles et les procédures diffèrent d'un secteur à l'autre, et c'est précisément une part du travail que nous prenons en charge.",
  },
  {
    question: "Combien de temps prend un recrutement médical ?",
    answer:
      "Cela dépend surtout de la spécialité et du statut visé. Un recrutement sur contrat peut aboutir en quelques semaines, tandis qu'une nomination sur un poste de praticien hospitalier titulaire suit un calendrier national plus long. Un praticien à diplôme étranger relève d'un troisième calendrier, plus long encore.",
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
        Une question qui ne figure pas ici ?{" "}
        <Link
          href="#contact"
          className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
        >
          Écrivez-nous
        </Link>
        , nous répondons sous 24 heures.
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
