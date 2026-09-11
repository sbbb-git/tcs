import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { legal } from "@/lib/legal";
import { partner, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales, TalentCare Santé",
  description:
    "Mentions légales du site TalentCare Santé : identité de l'éditeur, coordonnées, directeur de la publication, hébergeur et conditions d'utilisation du site.",
  path: "/mentions-legales/",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Mentions légales", path: "/mentions-legales/" },
];

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:gap-6">
      <dt className="w-56 shrink-0 font-medium text-ink">{label}</dt>
      <dd className="text-ink-soft">{value}</dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbSchema(crumbs)])} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <Breadcrumbs items={crumbs} />

          <h1 className="mb-8 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Mentions légales
          </h1>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Éditeur du site
            </h2>
            <dl>
              <Row label="Raison sociale" value={legal.companyName} />
              <Row label="Forme juridique" value={legal.legalForm} />
              <Row label="Capital social" value={legal.shareCapital} />
              <Row label="Siège social" value={legal.address} />
              <Row label="SIREN" value={legal.siren} />
              <Row label="SIRET" value={legal.siret} />
              <Row label="RCS" value={legal.rcs} />
              <Row label="TVA intracommunautaire" value={legal.vatNumber} />
              <Row
                label="Directeur de la publication"
                value={legal.publicationDirector}
              />
              <Row label="Email" value={site.email} />
            </dl>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Hébergeur
            </h2>
            <dl>
              <Row label="Hébergeur" value={legal.host.name} />
              <Row label="Adresse" value={legal.host.address} />
            </dl>
            <p className="mt-4 text-ink-soft">
              Site web de l&apos;hébergeur :{" "}
              <a
                href={legal.host.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                {legal.host.url}
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Propriété intellectuelle
            </h2>
            <p className="mb-4 leading-relaxed text-ink-soft">
              L&apos;ensemble des contenus présents sur {site.url}, textes,
              articles, éléments graphiques, logo et structure du site, est
              protégé par le droit d&apos;auteur. Toute reproduction ou
              représentation, totale ou partielle, sans autorisation écrite
              préalable de {site.name}, est interdite.
            </p>
            <p className="leading-relaxed text-ink-soft">
              Les citations d&apos;extraits d&apos;articles sont autorisées sous
              réserve de mentionner {site.name} et d&apos;inclure un lien vers
              la page d&apos;origine.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Liens externes
            </h2>
            <p className="leading-relaxed text-ink-soft">
              Ce site comporte des liens vers des sites tiers, dont celui de
              notre partenaire{" "}
              <a
                href={partner.links.home}
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                {partner.name}
              </a>
              . {site.name} n&apos;exerce aucun contrôle sur ces sites et ne
              saurait être tenu responsable de leur contenu.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Données personnelles
            </h2>
            <p className="leading-relaxed text-ink-soft">
              Le traitement des données transmises via les formulaires du site
              est décrit dans notre{" "}
              <a
                href="/confidentialite/"
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                politique de confidentialité
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
