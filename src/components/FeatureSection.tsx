import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Feature = {
  icon: LucideIcon;
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
  /** The page alternates plain and tinted bands, as on the original site. */
  tinted?: boolean;
};

/**
 * The "Professionnels de santé" and "Recruteurs" bands are the same layout with
 * different copy, so they share one component instead of being duplicated.
 */
export default function FeatureSection({
  id,
  eyebrow,
  title,
  intro,
  features,
  cta,
  tinted = false,
}: FeatureSectionProps) {
  return (
    <section
      id={id}
      className={cn("px-4 py-20", tinted && "bg-secondary/50")}
      aria-labelledby={`${id}-title`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </div>

        <ul className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title: featureTitle, description }) => (
            <li key={featureTitle} className="flex">
              <Card className="w-full border-none bg-card shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {featureTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
