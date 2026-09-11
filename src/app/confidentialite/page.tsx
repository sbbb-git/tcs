import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité, TalentCare Santé",
  description:
    "Comment TalentCare Santé collecte et traite vos données : finalités, base légale, durée de conservation, destinataires et exercice de vos droits RGPD.",
  path: "/confidentialite/",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Confidentialité", path: "/confidentialite/" },
];

export default function ConfidentialitePage() {
  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbSchema(crumbs)])} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <Breadcrumbs items={crumbs} />

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-ink-soft">
            Cette page décrit les données que {site.name} collecte via ce site,
            l&apos;usage qui en est fait et les droits dont vous disposez.
          </p>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Responsable du traitement
            </h2>
            <p className="leading-relaxed text-ink-soft">
              {legal.companyName}, joignable à l&apos;adresse{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                {site.email}
              </a>. L&apos;identité complète de l&apos;éditeur figure dans
              les{" "}
              <Link
                href="/mentions-legales/"
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                mentions légales
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Données collectées et finalités
            </h2>
            <p className="mb-4 leading-relaxed text-ink-soft">
              Les seules données collectées sont celles que vous saisissez
              volontairement dans les formulaires de contact : nom, adresse
              e-mail, numéro de téléphone, et selon le formulaire, votre
              spécialité ou le nom de votre établissement, ainsi que le message
              libre que vous rédigez.
            </p>
            <p className="mb-4 leading-relaxed text-ink-soft">
              Ces données servent exclusivement à traiter votre demande : vous
              recontacter, étudier votre candidature ou votre besoin de
              recrutement, et assurer le suivi de la relation. Elles ne sont ni
              vendues, ni cédées, ni utilisées à des fins publicitaires.
            </p>
            <p className="leading-relaxed text-ink-soft">
              La base légale du traitement est votre consentement, matérialisé
              par l&apos;envoi du formulaire, ainsi que l&apos;exécution de
              mesures précontractuelles prises à votre demande.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Destinataires et sous-traitants
            </h2>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-ink-soft">
              <li>
                L&apos;équipe de {site.name}, seule destinataire du contenu de
                vos demandes.
              </li>
              <li>
                Formspree, prestataire technique qui achemine les formulaires du
                site vers notre boîte e-mail.
              </li>
              <li>
                {legal.host.name}, hébergeur du site, qui traite les données
                techniques de connexion nécessaires à sa mise à disposition.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Durée de conservation
            </h2>
            <p className="leading-relaxed text-ink-soft">
              Les candidatures sont conservées deux ans à compter du dernier
              contact, durée recommandée par la CNIL en matière de recrutement.
              Les demandes émanant d&apos;établissements sont conservées le
              temps de la relation commerciale, puis pendant la durée de
              prescription légale applicable. Vous pouvez demander leur
              suppression à tout moment.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Cookies et mesure d&apos;audience
            </h2>
            <p className="leading-relaxed text-ink-soft">
              Ce site ne dépose aucun cookie publicitaire ni traceur
              publicitaire. Aucune bannière de consentement n&apos;est donc
              nécessaire pour naviguer.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">
              Vos droits
            </h2>
            <p className="mb-4 leading-relaxed text-ink-soft">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
              de rectification, d&apos;effacement, de limitation, d&apos;
              opposition et de portabilité sur vos données. Pour les exercer,
              écrivez à{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                {site.email}
              </a>
              .
            </p>
            <p className="leading-relaxed text-ink-soft">
              Si la réponse apportée ne vous satisfait pas, vous pouvez
              introduire une réclamation auprès de la CNIL,{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
              >
                cnil.fr
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
