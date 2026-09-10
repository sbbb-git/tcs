import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";
import Section, { SectionHeader } from "@/components/Section";

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

type FeatureSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  features: Feature[];
  cta: { href: string; label: string };
  tone?: "white" | "soft";
  /** Photo d'accompagnement, optionnelle. Toujours chargée en différé : aucune
   *  de ces bandes n'est visible sans défiler. */
  image?: { src: string; alt: string; width: number; height: number };
};

/**
 * Les bandes « Professionnels de santé » et « Recruteurs » partagent leur mise
 * en page et ne diffèrent que par le texte.
 */
export default function FeatureSection({
  id,
  eyebrow,
  title,
  intro,
  features,
  cta,
  tone = "white",
  image,
}: FeatureSectionProps) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} id={`${id}-title`} />

      {image && (
        <div className="mb-9 overflow-hidden rounded-2xl ring-1 ring-line">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="h-[220px] w-full object-cover sm:h-[300px]"
          />
        </div>
      )}

      <ul className="grid gap-5 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature.title} className="card flex gap-4">
            <span className="icon-pill">
              <Icon name={feature.icon} className="h-[18px] w-[18px]" />
            </span>
            <span>
              <span className="block font-semibold text-ink">{feature.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                {feature.description}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-9 text-center">
        <Link href={cta.href} className="btn-primary">
          {cta.label}
          <Icon name="arrowRight" className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </Section>
  );
}
