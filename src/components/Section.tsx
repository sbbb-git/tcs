import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Fond alterné. Une page est une pile de bandes alternant deux fonds. */
  tone?: "white" | "soft" | "ink";
  /** Trois largeurs, et pas une de plus. */
  width?: "prose" | "wide" | "full";
  className?: string;
  labelledBy?: string;
};

const TONES = {
  white: "bg-bg border-b border-line",
  soft: "bg-soft border-b border-line",
  ink: "bg-ink text-white",
} as const;

const WIDTHS = {
  prose: "max-w-3xl", // texte long, environ 75 signes
  wide: "max-w-5xl", // grilles de cartes
  full: "max-w-6xl", // en-têtes, pieds, grilles larges
} as const;

/**
 * Bande pleine largeur, séparée par un filet.
 *
 * Le padding horizontal est toujours le même, et le vertical n'a que trois
 * valeurs possibles : au-delà, l'irrégularité se voit sans qu'on sache la
 * nommer.
 */
export default function Section({
  children,
  id,
  tone = "white",
  width = "wide",
  className,
  labelledBy,
}: SectionProps) {
  return (
    <section id={id} className={cn(TONES[tone], className)} aria-labelledby={labelledBy}>
      <div className={cn("mx-auto px-4 py-14 sm:px-6 lg:px-8", WIDTHS[width])}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  tone = "light",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "mx-auto max-w-2xl text-center",
      )}
    >
      <p className={cn("eyebrow", tone === "dark" && "text-accent-300")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-2 text-2xl font-bold tracking-tight md:text-3xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-3 leading-relaxed",
            tone === "dark" ? "text-accent-100" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
