import Link from "next/link";
import { ArrowRight, Building2, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-4 pb-20 pt-32">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
          <span
            className="h-2 w-2 animate-pulse rounded-full bg-primary"
            aria-hidden="true"
          />
          Cabinet de recrutement spécialisé santé
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl">
          Le trait d&apos;union entre{" "}
          <span className="text-primary">talents médicaux</span> et{" "}
          <span className="text-primary">établissements de santé</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
          TalentCare Santé accompagne les professionnels de santé dans leur
          carrière et les établissements dans leurs recrutements.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="#medecins">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
              Je suis professionnel de santé
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="#recruteurs">
              <Building2 className="h-5 w-5" aria-hidden="true" />
              Je recrute
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
