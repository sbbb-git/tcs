import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { getRecruterPages } from "@/lib/recruter";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Recruter un praticien | TalentCare Santé",
  description:
    "Recruter un médecin, un dentiste ou un paramédical : ce qui bloque réellement par spécialité, délais à prévoir et leviers qui changent un recrutement.",
  path: "/recruter/",
  keywords: [
    "recruter un médecin",
    "cabinet de recrutement médical",
    "recrutement praticien",
  ],
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Recruter", path: "/recruter/" },
];

export default function RecruterIndex() {
  const pages = getRecruterPages();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema(crumbs),
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/recruter/#collection"),
            name: "Recruter un praticien",
            description:
              "Ce qui bloque un recrutement par spécialité, les délais réalistes et les leviers d'attractivité.",
            inLanguage: "fr-FR",
            isPartOf: { "@id": absoluteUrl("/#website") },
          },
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Employeurs</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Recruter un praticien
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Ce qui bloque réellement un recrutement, spécialité par spécialité.
            Les délais à prévoir, les erreurs qui coûtent des candidats et les
            leviers qui ne coûtent rien.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.slug} className="flex">
              <article className="card-link flex h-full flex-col">
                <div className="flex items-start gap-3.5">
                  <span className="icon-pill-soft">
                    <Icon name={page.metierMeta.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow">Employeurs</p>
                    <h2 className="mt-1 text-base font-semibold leading-snug tracking-tight text-ink">
                      <Link
                        href={`/recruter/${page.slug}/`}
                        className="transition hover:text-accent-700"
                      >
                        <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                        {page.title}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {page.frein}.
                </p>

                <p className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs text-ink-mute">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {page.delai}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="prose-content mt-16 max-w-3xl border-t border-line pt-10">
          <h2>Pourquoi ces pages existent</h2>
          <p>
            La plupart des difficultés de recrutement en santé sont attribuées à
            la démographie médicale. Elle est réelle, mais elle n&apos;explique
            pas pourquoi, dans le même bassin et sur la même spécialité,
            certaines structures recrutent et d&apos;autres non.
          </p>
          <p>
            Ce qui fait la différence tient à des éléments précis, connus des
            praticiens et rarement écrits dans les offres : le temps par
            consultation, le ratio de patients par poste, l&apos;accès réel au
            plateau technique, la base de calcul d&apos;une rétrocession, la
            fréquence des gardes. Ces pages les nomment, spécialité par
            spécialité.
          </p>

          <h2>Trois erreurs qui coûtent des candidats</h2>
          <p>
            <strong>Décrire un poste plutôt qu&apos;une journée.</strong>{" "}
            « Patientèle importante, équipe dynamique, conditions attractives »
            se lit sur toutes les annonces et ne distingue aucune structure. Un
            praticien qui compare quatre propositions cherche des éléments
            vérifiables : une durée, un effectif, un équipement, un rythme.
          </p>
          <p>
            <strong>Répondre en trois semaines.</strong> Sur une spécialité en
            tension, le praticien contacté par plusieurs structures retient
            celle qui répond dans la journée. Un processus interne lent écarte
            les meilleurs profils avant même le premier entretien, et cela ne
            se voit jamais dans les statistiques de recrutement.
          </p>
          <p>
            <strong>Ignorer l&apos;entourage.</strong> Sur une mobilité
            géographique, l&apos;emploi du conjoint et la scolarisation des
            enfants tranchent plus souvent que le contrat. Une structure qui
            n&apos;aborde pas le sujet laisse le candidat le résoudre seul, et
            il y renonce.
          </p>

          <h2>Un poste à pourvoir</h2>
          <p>
            Décrivez-nous votre besoin. Nous vous disons dès le premier échange
            si nous savons le mener et dans quel délai, plutôt que d&apos;
            accepter une mission qui vous ferait perdre un trimestre.{" "}
            <Link href="/#contact">Nous décrire votre besoin</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
