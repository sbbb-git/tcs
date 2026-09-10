import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";

const COVERED: { icon: IconName; label: string; detail: string }[] = [
  { icon: "stethoscope", label: "Médecins", detail: "Généralistes et spécialistes" },
  { icon: "heart", label: "Soignants", detail: "Infirmiers, aides-soignants" },
  { icon: "shield", label: "Pharmaciens", detail: "Officine et hospitaliers" },
  { icon: "building", label: "Encadrement", detail: "Coordination et direction" },
];

export default function Hero() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Cabinet de recrutement spécialisé santé</p>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
              Le trait d&apos;union entre{" "}
              <span className="bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                talents médicaux
              </span>{" "}
              et établissements de santé
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Nous accompagnons les professionnels de santé dans leur carrière et
              les hôpitaux, cliniques, EHPAD et centres de santé dans leurs
              recrutements, partout en France.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/offres-emploi/" className="btn-primary">
                <Icon name="search" className="h-[18px] w-[18px]" />
                Voir les offres d&apos;emploi
              </Link>
              <Link href="#recruteurs" className="btn-secondary">
                <Icon name="building" className="h-[18px] w-[18px]" />
                Je recrute
              </Link>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-mute">
              <Icon name="clock" className="h-4 w-4" />
              Réponse garantie sous 24 heures, candidature confidentielle
            </p>
          </div>

          <div className="card">
            <p className="eyebrow">Les métiers que nous couvrons</p>
            <ul className="mt-5 space-y-4">
              {COVERED.map((item) => (
                <li key={item.label} className="flex items-start gap-3.5">
                  <span className="icon-pill-soft">
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{item.label}</span>
                    <span className="block text-sm text-ink-soft">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <Link
                href="/offres-emploi/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 hover:text-accent-800"
              >
                Parcourir les postes ouverts
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
