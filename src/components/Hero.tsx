import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";

/*
 * Les six spécialités couvertes, avec leur pictogramme. C'est le seul visuel du
 * héros et il est informatif : il dit en un coup d'œil le périmètre du cabinet,
 * là où une photo d'illustration ne dirait rien.
 */
const specialites: { label: string; icon: IconName; href: string }[] = [
  { label: "Médecine générale", icon: "stethoscope", href: "/offres-emploi/metier/medecin-generaliste/" },
  { label: "Radiologie", icon: "scan", href: "/offres-emploi/metier/radiologue/" },
  { label: "ORL", icon: "ear", href: "/offres-emploi/metier/orl/" },
  { label: "Médecine esthétique", icon: "sparkles", href: "/offres-emploi/metier/medecin-esthetique/" },
  { label: "Sages-femmes", icon: "baby", href: "/offres-emploi/metier/sage-femme/" },
  { label: "Échographie", icon: "activity", href: "/offres-emploi/metier/medecin-echographiste/" },
];

export default function Hero() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow">Cabinet de recrutement médical · Paris</p>

            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">
              On accompagne les médecins dans leurs décisions, pas seulement
              dans leur recherche.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Un médecin peut être compétent sans être heureux au mauvais
              endroit. Une structure peut être attractive sans convenir à tous
              les profils. C&apos;est là-dessus qu&apos;on travaille.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/offres-emploi/" className="btn-primary">
                Voir les postes
                <Icon name="arrowRight" className="h-[18px] w-[18px]" />
              </Link>
              <Link href="#recruteurs" className="btn-secondary">
                Nous confier un recrutement
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {specialites.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:border-accent-300 hover:text-accent-800"
                  >
                    <Icon name={item.icon} className="h-4 w-4 text-accent-600" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-2xl bg-soft p-7 ring-1 ring-line lg:p-8">
            <Icon name="message" className="h-6 w-6 text-accent-600" />
            <blockquote className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Ce matin, un médecin m&apos;appelle, un peu hésitant. Plusieurs
                opportunités sur la table, mais aucune qui lui ressemble
                vraiment.
              </p>
              <p>
                On a pris le temps d&apos;échanger : son rythme idéal, le type
                de structure qu&apos;il cherchait, libéral ou salariat et
                pourquoi.
              </p>
              <p className="font-medium text-ink">
                En clarifiant tout ça, les choses se sont débloquées. Pas besoin
                de multiplier les candidatures quand le projet est clair.
              </p>
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-5 text-sm text-ink-mute">
              Marion, TalentCare Santé
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
