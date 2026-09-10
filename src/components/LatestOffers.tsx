import Link from "next/link";

import { Icon } from "@/components/Icon";
import OfferCard from "@/components/OfferCard";
import Section, { SectionHeader } from "@/components/Section";
import type { Offer } from "@/lib/jobs";

export default function LatestOffers({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  return (
    <Section id="offres" tone="soft" width="full" labelledBy="offres-accueil-title">
      <SectionHeader
        eyebrow="Postes à pourvoir"
        title="Postes ouverts à Paris"
        intro="Cabinets, centres d'imagerie, centres de santé et maternités parisiens. Candidature transmise avec votre accord uniquement."
        id="offres-accueil-title"
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <li key={offer.slug} className="flex">
            <OfferCard offer={offer} headingLevel="h3" />
          </li>
        ))}
      </ul>

      <div className="mt-9 text-center">
        <Link href="/offres-emploi/" className="btn-primary">
          Voir toutes les offres
          <Icon name="arrowRight" className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </Section>
  );
}
