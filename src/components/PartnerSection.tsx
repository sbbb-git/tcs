import { Icon, type IconName } from "@/components/Icon";
import Section, { SectionHeader } from "@/components/Section";
import { partner } from "@/lib/site";

const OFFERS: { icon: IconName; title: string; description: string; href: string }[] = [
  {
    icon: "building",
    title: "Créer un centre de santé",
    description: "Montage du projet, choix du modèle et conformité du projet de santé.",
    href: partner.links.creation,
  },
  {
    icon: "fileCheck",
    title: "Dossier ARS",
    description: "Constitution et suivi du dossier auprès de l'Agence régionale de santé.",
    href: partner.links.dossierArs,
  },
  {
    icon: "coins",
    title: "Subventions et financements",
    description: "Identification des aides mobilisables et montage des demandes.",
    href: partner.links.subventions,
  },
];

/**
 * Bande partenaire. Recruter un praticien et structurer le centre qui
 * l'accueille sont deux moitiés du même projet.
 */
export default function PartnerSection() {
  return (
    <Section id="partenaire" tone="white" labelledBy="partenaire-title">
      <SectionHeader
        eyebrow="Partenaire"
        title="Vous ouvrez ou gérez un centre de santé ?"
        id="partenaire-title"
      />
      <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center leading-relaxed text-ink-soft">
        Nous recrutons les praticiens. Notre partenaire{" "}
        <a
          href={partner.links.centresDeSante}
          className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-800"
        >
          {partner.name}
        </a>{" "}
        accompagne la structure qui les accueille, de la création à la gestion
        quotidienne.
      </p>

      <ul className="grid gap-5 md:grid-cols-3">
        {OFFERS.map((offer) => (
          <li key={offer.title}>
            <a href={offer.href} className="card-link block h-full">
              <span className="icon-pill-soft">
                <Icon name={offer.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="mt-4 flex items-center gap-1.5 font-semibold text-ink">
                {offer.title}
                <Icon name="externalLink" className="h-4 w-4 text-ink-mute" />
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                {offer.description}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
