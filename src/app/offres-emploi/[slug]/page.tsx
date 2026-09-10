import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import OfferCard from "@/components/OfferCard";
import { getOffer, getOffers, getOffersByMetier, validThrough } from "@/lib/jobs";
import {
  breadcrumbSchema,
  jobPostingSchema,
  jsonLdGraph,
  pageMetadata,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getOffers().map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};

  return pageMetadata({
    title: offer.title,
    description: offer.description,
    path: `/offres-emploi/${offer.slug}/`,
  });
}

export default async function OfferPage({ params }: Params) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();

  const others = getOffersByMetier(offer.metier)
    .filter((o) => o.slug !== offer.slug)
    .slice(0, 3);

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Offres d'emploi", path: "/offres-emploi/" },
    { name: offer.metierMeta.plural, path: `/offres-emploi/metier/${offer.metier}/` },
    { name: offer.title, path: `/offres-emploi/${offer.slug}/` },
  ];

  const facts = [
    { icon: "mapPin" as const, label: "Localisation", value: offer.ville ?? offer.region },
    { icon: "fileText" as const, label: "Contrat", value: offer.contrat },
    { icon: "building" as const, label: "Structure", value: offer.structure },
    { icon: "clock" as const, label: "Temps de travail", value: offer.temps },
    ...(offer.remuneration
      ? [{ icon: "coins" as const, label: "Rémunération", value: offer.remuneration }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          jobPostingSchema({
            slug: offer.slug,
            title: offer.title,
            description: offer.description,
            date: offer.date,
            validThrough: validThrough(offer),
            contrat: offer.contrat,
            region: offer.region,
            localite: offer.localite,
            reference: offer.reference,
            metierName: offer.metierMeta.name,
          }),
          breadcrumbSchema(crumbs),
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <Link
            href={`/offres-emploi/metier/${offer.metier}/`}
            className="eyebrow hover:text-accent-800"
          >
            {offer.metierMeta.plural}
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {offer.title}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-mute">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4" />
              Publiée le <time dateTime={offer.date}>{formatDate(offer.date)}</time>
            </span>
            <span>Réf. {offer.reference}</span>
            {offer.permanent && (
              <span className="inline-flex items-center gap-1.5 text-accent-700">
                <Icon name="trendingUp" className="h-4 w-4" />
                Poste ouvert en continu
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="prose-content">
            <MdxContent source={offer.body} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <p className="eyebrow">En résumé</p>
              <dl className="mt-4 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-start gap-3">
                    <Icon name={fact.icon} className="mt-0.5 h-4 w-4 text-ink-mute" />
                    <div>
                      <dt className="text-xs text-ink-mute">{fact.label}</dt>
                      <dd className="text-sm font-medium text-ink">{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 rounded-2xl bg-accent-50 p-6 ring-1 ring-accent-200">
              <p className="font-semibold text-ink">Ce poste vous intéresse ?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Votre candidature reste confidentielle et n&apos;est transmise
                qu&apos;avec votre accord explicite.
              </p>
              <Link
                href={`/?offre=${offer.slug}#contact`}
                className="btn-primary mt-5 w-full"
              >
                <Icon name="send" className="h-[18px] w-[18px]" />
                Postuler
              </Link>
              <p className="mt-3 text-center text-xs text-ink-mute">
                Réponse sous 24 heures
              </p>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section className="mt-16 border-t border-line pt-10" aria-labelledby="autres-title">
            <h2 id="autres-title" className="text-xl font-semibold tracking-tight text-ink">
              Autres postes de {offer.metierMeta.name.toLowerCase()}
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {others.map((item) => (
                <li key={item.slug} className="flex">
                  <OfferCard offer={item} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
