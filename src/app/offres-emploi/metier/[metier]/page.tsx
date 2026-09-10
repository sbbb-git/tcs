import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import { getOffersByMetier } from "@/lib/jobs";
import { getPost } from "@/lib/blog";
import { metierBySlug, metiers } from "@/lib/metiers";
import { breadcrumbSchema, faqSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ metier: string }> };

export function generateStaticParams() {
  return metiers.map((metier) => ({ metier: metier.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metier: slug } = await params;
  const metier = metierBySlug.get(slug);
  if (!metier) return {};

  return pageMetadata({
    title: metier.title,
    description: metier.description,
    path: `/offres-emploi/metier/${metier.slug}/`,
    keywords: [`emploi ${metier.name.toLowerCase()}`, `recrutement ${metier.name.toLowerCase()}`],
  });
}

export default async function MetierPage({ params }: Params) {
  const { metier: slug } = await params;
  const metier = metierBySlug.get(slug);
  if (!metier) notFound();

  const offers = getOffersByMetier(slug);
  const relatedPost = metier.relatedPost ? getPost(metier.relatedPost) : undefined;

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Offres d'emploi", path: "/offres-emploi/" },
    { name: metier.plural, path: `/offres-emploi/metier/${metier.slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema(crumbs),
          ...(metier.faq.length ? [faqSchema(metier.faq)] : []),
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex items-start gap-4">
            <span className="icon-pill h-12 w-12 rounded-2xl">
              <Icon name={metier.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Offres d&apos;emploi</p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                Emploi {metier.name.toLowerCase()}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {metier.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {offers.length > 0 && (
          <section className="mb-16" aria-labelledby="offres-title">
            <h2 id="offres-title" className="text-xl font-semibold tracking-tight text-ink">
              {offers.length} poste{offers.length > 1 ? "s" : ""} de{" "}
              {metier.name.toLowerCase()} à pourvoir
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
          {metier.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        {metier.faq.length > 0 && (
          <section className="mt-14 max-w-3xl" aria-labelledby="faq-metier-title">
            <h2
              id="faq-metier-title"
              className="text-2xl font-semibold tracking-tight text-ink"
            >
              Questions fréquentes
            </h2>
            <dl className="mt-6 space-y-3">
              {metier.faq.map((item) => (
                <div key={item.question} className="rounded-xl bg-soft p-5 ring-1 ring-line">
                  <dt className="font-semibold text-ink">{item.question}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

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

        {relatedPost && (
          <aside className="mt-10 max-w-3xl rounded-xl bg-soft p-5 ring-1 ring-line">
            <p className="eyebrow">Pour aller plus loin</p>
            <p className="mt-2 leading-relaxed text-ink-soft">
              <Link
                href={`/blog/${relatedPost.slug}/`}
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                {relatedPost.title}
              </Link>{" "}
              : {relatedPost.excerpt}
            </p>
          </aside>
        )}
      </div>
    </>
  );
}
