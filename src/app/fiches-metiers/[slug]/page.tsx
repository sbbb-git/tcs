import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import OfferCard from "@/components/OfferCard";
import { getFiche, getFiches } from "@/lib/fiches";
import { getOffersByMetier } from "@/lib/jobs";
import { breadcrumbSchema, ficheSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFiches().map((fiche) => ({ slug: fiche.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const fiche = getFiche(slug);
  if (!fiche) return {};

  return pageMetadata({
    title: fiche.metaTitle ?? fiche.title,
    description: fiche.description,
    path: `/fiches-metiers/${fiche.slug}/`,
    type: "article",
    publishedTime: fiche.date,
    modifiedTime: fiche.updated,
    keywords: [
      `fiche métier ${fiche.metierMeta.name.toLowerCase()}`,
      `devenir ${fiche.metierMeta.name.toLowerCase()}`,
      `salaire ${fiche.metierMeta.name.toLowerCase()}`,
    ],
  });
}

export default async function FichePage({ params }: Params) {
  const { slug } = await params;
  const fiche = getFiche(slug);
  if (!fiche) notFound();

  const offers = getOffersByMetier(fiche.metier).slice(0, 2);
  const autres = getFiches().filter((f) => f.slug !== fiche.slug);

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Fiches métiers", path: "/fiches-metiers/" },
    { name: fiche.metierMeta.name, path: `/fiches-metiers/${fiche.slug}/` },
  ];

  const resume = [
    { icon: "graduation" as const, label: "Diplôme", value: fiche.diplome },
    { icon: "clock" as const, label: "Durée des études", value: fiche.duree },
    { icon: "building" as const, label: "Cadres d'exercice", value: fiche.exercice },
    ...(fiche.ordre
      ? [{ icon: "shield" as const, label: "Ordre professionnel", value: fiche.ordre }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          ficheSchema({
            slug: fiche.slug,
            title: fiche.title,
            description: fiche.description,
            date: fiche.date,
            updated: fiche.updated,
            wordCount: fiche.wordCount,
            metierName: fiche.metierMeta.name,
          }),
          breadcrumbSchema(crumbs),
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex items-start gap-4">
            <span className="icon-pill h-12 w-12 rounded-2xl">
              <Icon name={fiche.metierMeta.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Fiche métier</p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {fiche.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="prose-content">
            <MdxContent source={fiche.body} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <p className="eyebrow">En bref</p>
              <dl className="mt-4 space-y-4">
                {resume.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon name={item.icon} className="mt-0.5 h-4 w-4 text-ink-mute" />
                    <div>
                      <dt className="text-xs text-ink-mute">{item.label}</dt>
                      <dd className="text-sm font-medium text-ink">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/*
              Le lien vers la page d'offres, avec son rôle dit explicitement.
              C'est ce qui sépare les deux pages : celle-ci décrit le métier,
              l'autre liste ce qui recrute.
            */}
            <div className="mt-5 rounded-2xl bg-accent-50 p-6 ring-1 ring-accent-200">
              <p className="font-semibold text-ink">Vous exercez déjà ?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Cette fiche décrit le métier. Les postes à pourvoir sont sur la
                page dédiée.
              </p>
              <Link
                href={`/offres-emploi/metier/${fiche.metier}/`}
                className="btn-primary mt-5 w-full"
              >
                Voir les postes
                <Icon name="arrowRight" className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </aside>
        </div>

        {offers.length > 0 && (
          <section className="mt-16 border-t border-line pt-10" aria-labelledby="offres-fiche">
            <h2 id="offres-fiche" className="text-xl font-semibold tracking-tight text-ink">
              Postes de {fiche.metierMeta.name.toLowerCase()} à pourvoir
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {offers.map((offer) => (
                <li key={offer.slug} className="flex">
                  <OfferCard offer={offer} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="mt-14" aria-label="Autres fiches métiers">
          <p className="eyebrow">Autres fiches métiers</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {autres.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/fiches-metiers/${autre.slug}/`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:border-accent-300 hover:text-accent-800"
                >
                  <Icon name={autre.metierMeta.icon} className="h-4 w-4 text-accent-600" />
                  {autre.metierMeta.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
