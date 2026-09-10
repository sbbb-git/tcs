import Link from "next/link";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ de la page d'accueil.
 *
 * Les réponses ne portent que sur ce que le site affirme par ailleurs :
 * périmètre des métiers, couverture nationale, confidentialité, types
 * d'établissements. Rien sur les délais ni les tarifs, qui varient et ne
 * peuvent pas être affirmés ici sans risque de dire faux.
 *
 * Le contenu est identique à celui déclaré en FAQPage : une FAQ balisée mais
 * invisible est une infraction aux règles de Google, pas une astuce.
 */
export const homeFaq: FaqItem[] = [
  {
    question: "Quels professionnels de santé recrutez-vous ?",
    answer:
      "Médecins généralistes et spécialistes, infirmiers, aides-soignants, pharmaciens et plus largement les métiers du soin. Chaque profession relève d'un marché différent — statuts, spécialisations, canaux — et suppose une approche adaptée.",
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
    <section className="px-4 py-20" aria-labelledby="faq-accueil-title">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Questions fréquentes
          </p>
          <h2
            id="faq-accueil-title"
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Ce qu&apos;on nous demande le plus
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Une question qui ne figure pas ici ?{" "}
            <Link
              href="#contact"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Écrivez-nous
            </Link>
            , nous répondons sous 24h.
          </p>
        </div>

        <dl className="space-y-4">
          {homeFaq.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border-none bg-card p-6 shadow-lg"
            >
              <dt className="mb-2 text-lg font-semibold text-foreground">
                {item.question}
              </dt>
              <dd className="leading-relaxed text-muted-foreground">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
