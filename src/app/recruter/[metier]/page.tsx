import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import { getRecruterPage, getRecruterPages } from "@/lib/recruter";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ metier: string }> };

export function generateStaticParams() {
  return getRecruterPages().map((page) => ({ metier: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metier } = await params;
  const page = getRecruterPage(metier);
  if (!page) return {};

  const nom = page.metierMeta.name.toLowerCase();
  return pageMetadata({
    title: page.metaTitle ?? page.title,
    description: page.description,
    path: `/recruter/${page.slug}/`,
    keywords: [
      `recruter un ${nom}`,
      `recrutement ${nom}`,
      `cabinet de recrutement ${nom}`,
    ],
  });
}

export default async function RecruterPage({ params }: Params) {
  const { metier } = await params;
  const page = getRecruterPage(metier);
  if (!page) notFound();

  const autres = getRecruterPages().filter((p) => p.slug !== page.slug);

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Recruter", path: "/recruter/" },
    { name: page.metierMeta.name, path: `/recruter/${page.slug}/` },
  ];

  const reperes = [
    { icon: "clock" as const, label: "Délai réaliste", value: page.delai },
    { icon: "alert" as const, label: "Ce qui bloque", value: page.frein },
    { icon: "target" as const, label: "Ce qui change tout", value: page.levier },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbSchema(crumbs)])} />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex items-start gap-4">
            <span className="icon-pill h-12 w-12 rounded-2xl">
              <Icon name={page.metierMeta.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Employeurs</p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {page.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="prose-content">
            <MdxContent source={page.body} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <p className="eyebrow">Les repères</p>
              <dl className="mt-4 space-y-4">
                {reperes.map((item) => (
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

            <div className="mt-5 rounded-2xl bg-accent-50 p-6 ring-1 ring-accent-200">
              <p className="font-semibold text-ink">Un poste à pourvoir ?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Décrivez-nous votre besoin. Nous vous disons dès le premier
                échange si nous savons le mener, et dans quel délai.
              </p>
              <Link href="/#contact" className="btn-primary mt-5 w-full">
                <Icon name="send" className="h-[18px] w-[18px]" />
                Nous décrire votre besoin
              </Link>
            </div>

            {/*
              Renvoi vers les deux autres pages du même métier, avec leur rôle.
              Trois intentions, trois pages : un employeur, un candidat, une
              personne qui se renseigne sur la profession.
            */}
            <div className="mt-5 rounded-xl bg-soft p-5 text-sm leading-relaxed text-ink-soft ring-1 ring-line">
              <p>
                Vous êtes praticien plutôt qu&apos;employeur ? Voir{" "}
                <Link
                  href={`/offres-emploi/metier/${page.metier}/`}
                  className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
                >
                  les postes de {page.metierMeta.name.toLowerCase()}
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>

        <nav className="mt-14" aria-label="Recruter d'autres spécialités">
          <p className="eyebrow">Recruter d&apos;autres spécialités</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {autres.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/recruter/${autre.slug}/`}
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
