import Link from "next/link";

import { Icon } from "@/components/Icon";

export const metadata = {
  title: "Page introuvable, TalentCare Santé",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Cette page n&apos;existe pas
      </h1>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
        Le lien est peut-être obsolète. Vous trouverez sans doute ce que vous
        cherchez parmi les offres d&apos;emploi ou dans le blog.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/offres-emploi/" className="btn-primary">
          <Icon name="search" className="h-[18px] w-[18px]" />
          Voir les offres
        </Link>
        <Link href="/blog/" className="btn-secondary">
          Lire le blog
        </Link>
      </div>
    </div>
  );
}
