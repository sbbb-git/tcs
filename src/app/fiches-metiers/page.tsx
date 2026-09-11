import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { getFiches } from "@/lib/fiches";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fiches métiers de la santé | TalentCare Santé",
  description:
    "Fiches métiers du secteur médical et paramédical : formation, missions, conditions d'exercice, perspectives et rémunération de chaque profession.",
  path: "/fiches-metiers/",
  keywords: ["fiche métier santé", "devenir médecin", "métiers du médical"],
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fiches métiers", path: "/fiches-metiers/" },
];

export default function FichesPage() {
  const fiches = getFiches();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema(crumbs),
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/fiches-metiers/#collection"),
            name: "Fiches métiers de la santé",
            description:
              "Formation, missions, conditions d'exercice et perspectives des métiers médicaux et paramédicaux.",
            inLanguage: "fr-FR",
            isPartOf: { "@id": absoluteUrl("/#website") },
          },
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Fiches métiers</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Les métiers de la santé, expliqués
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Formation, missions réelles, conditions d&apos;exercice, perspectives
            et rémunération. Ces fiches décrivent les professions ; les postes à
            pourvoir sont dans{" "}
            <Link
              href="/offres-emploi/"
              className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
            >
              nos offres d&apos;emploi
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fiches.map((fiche) => (
            <li key={fiche.slug} className="flex">
              <article className="card-link flex h-full flex-col">
                <div className="flex items-start gap-3.5">
                  <span className="icon-pill-soft">
                    <Icon name={fiche.metierMeta.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow">Fiche métier</p>
                    <h2 className="mt-1 text-base font-semibold leading-snug tracking-tight text-ink">
                      <Link
                        href={`/fiches-metiers/${fiche.slug}/`}
                        className="transition hover:text-accent-700"
                      >
                        <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                        {fiche.metierMeta.name}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {fiche.description}
                </p>

                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-xs text-ink-mute">
                  <span>{fiche.duree}</span>
                  <span>{fiche.diplome}</span>
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="prose-content mt-16 max-w-3xl border-t border-line pt-10">
          <h2>À quoi sert une fiche métier</h2>
          <p>
            Choisir une profession de santé engage entre trois et onze années
            d&apos;études, et le choix se fait le plus souvent à un âge où
            personne n&apos;a vu le métier de l&apos;intérieur. Les fiches
            ci-dessus décrivent ce que recouvre réellement chaque profession :
            la formation et sa durée, les missions telles qu&apos;elles
            occupent une journée, les cadres d&apos;exercice possibles et la
            façon dont la rémunération se construit.
          </p>
          <p>
            Elles s&apos;adressent autant aux lycéens et aux étudiants
            qu&apos;aux professionnels en reconversion, et aux praticiens déjà
            en exercice qui envisagent une spécialisation ou un changement de
            cadre.
          </p>

          <h2>Ce que ces fiches ne font pas</h2>
          <p>
            Elles n&apos;annoncent aucun salaire chiffré. Les montants circulant
            sur ce sujet sont presque toujours des moyennes sans périmètre, qui
            mélangent statuts, anciennetés et volumes d&apos;activité. Nous
            décrivons plutôt la structure de la rémunération, c&apos;est-à-dire
            ce qui la compose et ce qui la fait varier : c&apos;est la seule
            information qui permette de comparer deux propositions réelles.
          </p>
          <p>
            Elles ne remplacent pas non plus les sources officielles. Les
            conditions d&apos;accès aux études, les grilles de la fonction
            publique et les conventions collectives évoluent, et se vérifient
            auprès des ordres professionnels, des facultés et des agences
            régionales de santé.
          </p>

          <h2>Fiche métier ou offre d&apos;emploi</h2>
          <p>
            Les deux existent sur ce site et répondent à des questions
            différentes. Une fiche métier décrit une profession : c&apos;est une
            référence, qu&apos;on consulte avant de s&apos;engager dans un
            cursus ou de bifurquer.{" "}
            <Link href="/offres-emploi/">Nos offres d&apos;emploi</Link>{" "}
            listent des postes à pourvoir : elles s&apos;adressent à un
            praticien déjà diplômé qui cherche maintenant.
          </p>
          <p>
            Chaque fiche renvoie vers les postes de la spécialité, et chaque
            page de spécialité renvoie vers sa fiche. Si vous exercez déjà,
            partez des offres ; si vous vous orientez, partez des fiches.
          </p>
        </div>
      </div>
    </>
  );
}
