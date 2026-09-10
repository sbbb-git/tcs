import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Header";
import { partner, site } from "@/lib/site";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Offres d'emploi",
    links: [
      { href: "/offres-emploi/", label: "Toutes les offres" },
      { href: "/offres-emploi/metier/medecin-generaliste/", label: "Médecin généraliste" },
      { href: "/offres-emploi/metier/radiologue/", label: "Radiologue" },
      { href: "/offres-emploi/metier/sage-femme/", label: "Sage-femme" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/blog/", label: "Tous les articles" },
      { href: "/blog/categorie/recrutement-medical/", label: "Recrutement médical" },
      { href: "/blog/categorie/remuneration-et-statuts/", label: "Rémunération et statuts" },
      { href: "/blog/categorie/demographie-medicale/", label: "Démographie médicale" },
    ],
  },
  {
    title: "Le cabinet",
    links: [
      { href: "/#medecins", label: "Professionnels de santé" },
      { href: "/#recruteurs", label: "Recruteurs" },
      { href: "/#contact", label: "Contact" },
      { href: "/mentions-legales/", label: "Mentions légales" },
    ],
  },
];

const SOCIALS: { key: IconName; label: string; href: string }[] = [
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
  { key: "facebook", label: "Facebook", href: site.socials.facebook },
  { key: "instagram", label: "Instagram", href: site.socials.instagram },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="text-white">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-accent-100/80">
              Cabinet de recrutement médical à Paris. Médecins, sages-femmes
              et échographistes, pour les cabinets, centres d&apos;imagerie et
              maternités parisiens.
            </p>
            <ul className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
                  >
                    <Icon name={s.key} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-accent-100/80 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-accent-100/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.foundingYear} {site.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/confidentialite/" className="transition hover:text-white">
              Confidentialité
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Icon name="phone" className="h-3.5 w-3.5" />
              {site.phone}
            </a>
            <a
              href={partner.links.home}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              Partenaire {partner.name}
              <Icon name="externalLink" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
