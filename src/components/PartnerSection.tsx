import { ArrowUpRight, Building, Coins, FileCheck2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { partner } from "@/lib/site";

const offers = [
  {
    icon: Building,
    title: "Créer un centre de santé",
    description:
      "Montage du projet, choix du modèle et conformité du projet de santé.",
    href: partner.links.creation,
  },
  {
    icon: FileCheck2,
    title: "Dossier ARS",
    description:
      "Constitution et suivi du dossier auprès de l'Agence régionale de santé.",
    href: partner.links.dossierArs,
  },
  {
    icon: Coins,
    title: "Subventions et financements",
    description:
      "Identification des aides mobilisables et montage des demandes.",
    href: partner.links.subventions,
  },
];

/**
 * Editorial partner band. Recruiting a practitioner and structuring the centre
 * that hosts them are two halves of the same project, so the two offers are
 * presented side by side rather than competing.
 */
export default function PartnerSection() {
  return (
    <section
      id="partenaire"
      className="px-4 py-20"
      aria-labelledby="partenaire-title"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Partenaire
          </p>
          <h2
            id="partenaire-title"
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Vous ouvrez ou gérez un centre de santé ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Nous recrutons les praticiens ; notre partenaire{" "}
            <a
              href={partner.links.centresDeSante}
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {partner.name}
            </a>{" "}
            accompagne la structure qui les accueille — de la création à la
            gestion quotidienne.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {offers.map(({ icon: Icon, title, description, href }) => (
            <li key={title} className="flex">
              <Card className="w-full border-none bg-card shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    <a
                      href={href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                    >
                      {title}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
