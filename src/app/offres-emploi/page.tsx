import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import { getMetiersWithOffers, getOffers, getRegionsWithOffers } from "@/lib/jobs";
import { regionPageByName } from "@/lib/regions";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Offres d'emploi médical et paramédical en France",
  description:
    "Postes de médecin généraliste, spécialiste, dentiste, sage-femme et paramédical, partout en France. Candidature transmise avec votre accord.",
  path: "/offres-emploi/",
  keywords: [
    "offre emploi médecin",
    "emploi dentiste",
    "recrutement médical France",
    "annonces médicales",
  ],
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Offres d'emploi", path: "/offres-emploi/" },
];

export default function OffersPage() {
  const offers = getOffers();
  const metiers = getMetiersWithOffers();
  const regions = getRegionsWithOffers();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema(crumbs),
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/offres-emploi/#collection"),
            name: "Offres d'emploi TalentCare Santé",
            description:
              "Postes de médecin, dentiste, sage-femme et paramédical partout en France, en cabinet, centre médical, clinique et centre de santé.",
            inLanguage: "fr-FR",
            isPartOf: { "@id": absoluteUrl("/#website") },
          },
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Offres d&apos;emploi</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Toutes nos offres
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Cabinets, centres médicaux, cliniques et centres de santé, partout
            en France. Votre candidature n&apos;est transmise qu&apos;avec votre
            accord, structure par structure.
          </p>

          <nav aria-label="Métiers" className="mt-7">
            <ul className="flex flex-wrap gap-2">
              {metiers.map(({ metier, count }) => (
                <li key={metier.slug}>
                  <Link
                    href={`/offres-emploi/metier/${metier.slug}/`}
                    className="inline-flex items-center gap-2 rounded-lg bg-bg px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line transition hover:text-accent-700 hover:ring-accent-400"
                  >
                    <Icon name={metier.icon} className="h-4 w-4 text-accent-600" />
                    {metier.plural}
                    <span className="text-ink-mute">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            {offers.length} poste{offers.length > 1 ? "s" : ""} à pourvoir
          </h2>
          <p className="text-sm text-ink-mute">
            Mis à jour en continu. Aucun poste ne correspond ?{" "}
            <Link
              href="/#contact"
              className="font-medium text-accent-700 underline underline-offset-2"
            >
              Envoyez une candidature spontanée
            </Link>
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.slug} className="flex">
              <OfferCard offer={offer} />
            </li>
          ))}
        </ul>

        {regions.length > 1 && (
          <section className="mt-14 border-t border-line pt-10" aria-labelledby="regions-title">
            <h2 id="regions-title" className="text-lg font-semibold tracking-tight text-ink">
              Nos postes par région
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {regions.map(({ region, count }) => {
                const page = regionPageByName.get(region);
                const contenu = (
                  <>
                    <Icon name="mapPin" className="h-3.5 w-3.5 text-ink-mute" />
                    {region}
                    <span className="text-ink-mute">{count}</span>
                  </>
                );
                const classe =
                  "inline-flex items-center gap-2 rounded-lg bg-soft px-3 py-1.5 text-ink-soft ring-1 ring-line";

                /* Une région sans page rédigée reste une simple étiquette :
                   mieux vaut pas de lien qu'un lien vers une page vide. */
                return (
                  <li key={region}>
                    {page ? (
                      <Link
                        href={`/offres-emploi/region/${page.slug}/`}
                        className={`${classe} transition hover:ring-accent-300 hover:text-accent-800`}
                      >
                        {contenu}
                      </Link>
                    ) : (
                      <span className={classe}>{contenu}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
