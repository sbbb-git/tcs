import Link from "next/link";

import { Icon } from "@/components/Icon";
import type { Offer } from "@/lib/jobs";

export default function OfferCard({
  offer,
  headingLevel = "h2",
}: {
  offer: Offer;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="card-link flex h-full flex-col">
      <div className="flex items-start gap-3.5">
        <span className="icon-pill-soft">
          <Icon name={offer.metierMeta.icon} className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">{offer.metierMeta.name}</p>
          <Heading className="mt-1 text-base font-semibold leading-snug tracking-tight text-ink">
            <Link
              href={`/offres-emploi/${offer.slug}/`}
              className="transition hover:text-accent-700"
            >
              <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
              {offer.title}
            </Link>
          </Heading>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2 text-xs">
        <li className="inline-flex items-center gap-1.5 rounded-lg bg-soft px-2.5 py-1.5 text-ink-soft ring-1 ring-line">
          <Icon name="mapPin" className="h-3.5 w-3.5 text-ink-mute" />
          {offer.region}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-lg bg-soft px-2.5 py-1.5 text-ink-soft ring-1 ring-line">
          <Icon name="fileText" className="h-3.5 w-3.5 text-ink-mute" />
          {offer.contrat}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-lg bg-soft px-2.5 py-1.5 text-ink-soft ring-1 ring-line">
          <Icon name="building" className="h-3.5 w-3.5 text-ink-mute" />
          {offer.structure}
        </li>
      </ul>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
        {offer.description}
      </p>

      <p className="mt-5 border-t border-line pt-4 text-xs text-ink-mute">
        Réf. {offer.reference}
      </p>
    </article>
  );
}
