import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page introuvable — TalentCare Santé",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="px-4 pb-20 pt-32">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Erreur 404
        </p>
        <h1 className="mb-4 mt-2 text-4xl font-bold text-foreground md:text-5xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mb-10 text-lg text-muted-foreground">
          Le lien est peut-être obsolète. Vous trouverez sans doute ce que vous
          cherchez sur la page d&apos;accueil ou dans le blog.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/blog/">Voir le blog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
