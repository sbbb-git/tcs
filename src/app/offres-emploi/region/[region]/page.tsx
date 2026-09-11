import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import { getOffersByRegion } from "@/lib/jobs";
import { regionPageBySlug, regionPages } from "@/lib/regions";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  pageMetadata,
} from "@/lib/seo";

type Params = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return regionPages.map((page) => ({ region: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region } = await params;
  const page = regionPageBySlug.get(region);
  if (!page) return {};

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/offres-emploi/region/${page.slug}/`,
    keywords: [
      `emploi médecin ${page.region}`,
      `recrutement médical ${page.region}`,
      `offre emploi santé ${page.region}`,
    ],
  });
}

export default async function RegionPage({ params }: Params) {
  const { region } = await params;
  const page = regionPageBySlug.get(region);
  if (!page) notFound();

  const offers = getOffersByRegion(page.region);

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Offres d'emploi", path: "/offres-emploi/" },
    { name: page.region, path: `/offres-emploi/region/${page.slug}/` },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbSchema(crumbs), faqSchema(page.faq)])} />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex items-start gap-4">
            <span className="icon-pill h-12 w-12 rounded-2xl">
              <Icon name="mapPin" className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Offres d&apos;emploi</p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                Recrutement médical en {page.region}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {page.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {offers.length > 0 && (
          <section className="mb-16" aria-labelledby="offres-region-title">
            <h2
              id="offres-region-title"
              className="text-xl font-semibold tracking-tight text-ink"
            >
              {offers.length} poste{offers.length > 1 ? "s" : ""} à pourvoir en{" "}
              {page.region}
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {offers.map((offer) => (
                <li key={offer.slug} className="flex">
                  <OfferCard offer={offer} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Le corps éditorial : c'est lui qui rend la page indexable, pas la liste. */}
        <div className="prose-content max-w-3xl">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-14 max-w-3xl" aria-labelledby="faq-region-title">
          <h2
            id="faq-region-title"
            className="text-2xl font-semibold tracking-tight text-ink"
          >
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-3">
            {page.faq.map((item) => (
              <div key={item.question} className="rounded-xl bg-soft p-5 ring-1 ring-line">
                <dt className="font-semibold text-ink">{item.question}</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="mt-14 max-w-3xl rounded-2xl bg-accent-50 p-7 ring-1 ring-accent-200">
          <p className="text-lg font-semibold text-ink">
            Aucun poste ne correspond à votre recherche ?
          </p>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Nous travaillons sur des postes qui ne sont pas publiés. Dites-nous ce
            que vous cherchez : votre candidature n&apos;est transmise
            qu&apos;avec votre accord, poste par poste.
          </p>
          <Link href="/#contact" className="btn-primary mt-6">
            <Icon name="send" className="h-[18px] w-[18px]" />
            Déposer ma candidature
          </Link>
        </aside>

        <nav className="mt-12 max-w-3xl" aria-label="Autres régions">
          <p className="eyebrow">Autres régions</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {regionPages
              .filter((other) => other.slug !== page.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/offres-emploi/region/${other.slug}/`}
                    className="inline-flex rounded-full border border-line bg-soft px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:border-accent-300 hover:text-accent-800"
                  >
                    {other.region}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
