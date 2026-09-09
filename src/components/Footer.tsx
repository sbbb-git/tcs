import Link from "next/link";
import { Heart } from "lucide-react";

import { partner, site } from "@/lib/site";

const primaryLinks = [
  { href: "/#medecins", label: "Professionnels de santé" },
  { href: "/#recruteurs", label: "Recruteurs" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales/", label: "Mentions légales" },
  { href: "/confidentialite/", label: "Confidentialité" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground px-4 py-12 text-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold">
              TalentCare <span className="text-primary">Santé</span>
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 text-sm" aria-label="Pied de page">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-background/70 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-background/50">
            © {site.foundingYear} {site.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-sm md:flex-row">
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Informations légales">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-background/50 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-background/50">
            Cabinet de recrutement spécialisé santé — {site.areaServed} · Partenaire{" "}
            <a
              href={partner.links.home}
              className="text-background/70 transition-colors hover:text-primary"
            >
              {partner.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
