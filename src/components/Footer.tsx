import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Header";
import { regionPages } from "@/lib/regions";
import { partner, site } from "@/lib/site";

/*
 * Aucun lien vers le site partenaire ici.
 *
 * Un lien en pied de page apparaît sur chaque page : il y en avait 55, soit
 * un par page du site, tous vers la même page d'accueil. Entre deux sites
 * appartenant aux mêmes personnes, c'est le motif type que Google traite
 * comme un échange de liens destiné à manipuler le classement, et non comme
 * une recommandation éditoriale.
 *
 * Les liens vers le partenaire subsistent là où ils veulent dire quelque
 * chose : la bande partenaire de l'accueil et les articles qui traitent
 * réellement du sujet.
 */
const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Offres d'emploi",
    links: [
      { href: "/offres-emploi/", label: "Toutes les offres" },
      /*
       * Les régions plutôt qu'une sélection de métiers. Trois spécialités
       * choisies à la main captaient à elles seules un lien depuis chaque page
       * du site, pendant que les huit autres en recevaient deux. Les régions
       * sont peu nombreuses, stables, et c'est le maillage qui manquait.
       */
      ...regionPages.map((page) => ({
        href: `/offres-emploi/region/${page.slug}/`,
        label: page.region,
      })),
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
      { href: "/recruter/", label: "Recruter un praticien" },
      { href: "/fiches-metiers/", label: "Fiches métiers" },
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
              Cabinet de recrutement médical en France. Médecins, spécialistes
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
          </div>
        </div>
      </div>
    </footer>
  );
}
