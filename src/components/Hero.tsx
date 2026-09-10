import Link from "next/link";

import { Icon } from "@/components/Icon";

export default function Hero() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Cabinet de recrutement médical · Paris</p>

            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Recrutement de médecins et de sages-femmes.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Vous cherchez un poste, ou vous cherchez un praticien. Dans les
              deux cas on vous répond sous 24 heures, y compris pour dire que
              nous ne sommes pas les bons.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/offres-emploi/" className="btn-primary">
                Voir les postes ouverts
                <Icon name="arrowRight" className="h-[18px] w-[18px]" />
              </Link>
              <Link href="#recruteurs" className="btn-secondary">
                Nous confier un recrutement
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-soft p-6 ring-1 ring-line lg:p-7">
            <p className="text-sm leading-relaxed text-ink-soft">
              Un poste vacant, ce n&apos;est pas une ligne dans un tableau de
              bord. C&apos;est une file active qui se ferme, des délais de
              rendez-vous qui s&apos;allongent et une équipe qui absorbe la
              charge en attendant.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              C&apos;est pour ça qu&apos;on préfère refuser une mission
              qu&apos;on ne sait pas mener plutôt que de vous faire perdre trois
              mois.
            </p>
            <p className="mt-6 border-t border-line pt-5 text-sm font-semibold text-ink">
              Généraliste, radiologue, ORL, médecine esthétique, sage-femme,
              échographie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
