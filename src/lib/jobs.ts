import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { metierBySlug, type Metier } from "@/lib/metiers";

const OFFERS_DIR = path.join(process.cwd(), "content", "offres");

/** Types de contrat autorisés. Fermé : une valeur libre casse les filtres. */
export const CONTRACTS = [
  "CDI",
  "CDD",
  "Praticien hospitalier",
  "Libéral",
  "Vacation",
] as const;
export type Contract = (typeof CONTRACTS)[number];

/** Régions servant au filtrage et à l'affichage. */
export const REGIONS = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Corse",
  "Grand Est",
  "Hauts-de-France",
  "Île-de-France",
  "Normandie",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur",
  "Outre-mer",
  "France entière",
] as const;
export type Region = (typeof REGIONS)[number];

export type OfferFrontmatter = {
  title: string;
  description: string;
  metier: string;
  region: Region;
  /** Libellé de localisation affiché. Peut être vague : « Plusieurs villes ». */
  ville?: string;
  /**
   * Commune précise, uniquement si le poste en a une.
   *
   * Séparé de `ville` parce que schema.org attend une localité réelle :
   * déclarer « Plusieurs départements » en addressLocality produit une donnée
   * structurée fausse, ce qui est pire que de l'omettre.
   */
  localite?: string;
  contrat: Contract;
  structure: string;
  temps: string;
  remuneration?: string;
  date: string;
  reference: string;
  /**
   * Recrutement récurrent plutôt que vacance ponctuelle. N'apparaît pas dans
   * l'interface : le champ ne sert qu'à calculer la durée de validité déclarée
   * en données structurées.
   */
  permanent?: boolean;
  draft?: boolean;
};

export type Offer = OfferFrontmatter & {
  slug: string;
  body: string;
  metierMeta: Metier;
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

let cache: Offer[] | null = null;

export function getOffers(): Offer[] {
  if (cache) return cache;
  if (!fs.existsSync(OFFERS_DIR)) return [];

  const today = todayIso();

  cache = fs
    .readdirSync(OFFERS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(OFFERS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const front = data as OfferFrontmatter;

      for (const field of ["title", "description", "metier", "region", "contrat", "date", "reference"] as const) {
        if (!front[field]) {
          throw new Error(`content/offres/${file} : champ "${field}" manquant.`);
        }
      }

      const metierMeta = metierBySlug.get(front.metier);
      if (!metierMeta) {
        throw new Error(
          `content/offres/${file} : métier inconnu "${front.metier}". ` +
            "Ajoutez-le à src/lib/metiers.ts ou corrigez le frontmatter.",
        );
      }

      return { ...front, slug, body: content, metierMeta };
    })
    .filter((offer) => !offer.draft && offer.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "fr"));

  return cache;
}

export function getOffer(slug: string): Offer | undefined {
  return getOffers().find((offer) => offer.slug === slug);
}

export function getOffersByMetier(metierSlug: string): Offer[] {
  return getOffers().filter((offer) => offer.metier === metierSlug);
}

/** Métiers ayant au moins une offre publiée, dans l'ordre de la taxonomie. */
export function getMetiersWithOffers(): { metier: Metier; count: number }[] {
  const offers = getOffers();
  return [...metierBySlug.values()]
    .map((metier) => ({
      metier,
      count: offers.filter((o) => o.metier === metier.slug).length,
    }))
    .filter((entry) => entry.count > 0);
}

/** Régions représentées parmi les offres publiées, par volume décroissant. */
export function getRegionsWithOffers(): { region: Region; count: number }[] {
  const counts = new Map<Region, number>();
  for (const offer of getOffers()) {
    counts.set(offer.region, (counts.get(offer.region) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count || a.region.localeCompare(b.region, "fr"));
}

/**
 * Date de fin de validité déclarée en données structurées.
 *
 * Google demande une offre à jour : une annonce sans échéance, ou dont
 * l'échéance est dépassée, sort des résultats. Six mois glissants pour un
 * recrutement récurrent, un an pour les autres.
 */
export function validThrough(offer: Offer): string {
  const from = new Date(`${offer.date}T00:00:00Z`);
  from.setUTCMonth(from.getUTCMonth() + (offer.permanent ? 6 : 12));
  return from.toISOString().slice(0, 10);
}

/**
 * Offres à mettre en avant au bas d'un article.
 *
 * Un article peut nommer des métiers en frontmatter ; sinon les annonces sont
 * distribuées à tour de rôle entre les articles plutôt que de mettre les trois
 * mêmes partout. Sans cette rotation, les dernières offres publiées
 * capteraient tous les liens internes et les autres n'en recevraient que deux,
 * ceux de la page liste et de la page métier.
 *
 * Le tour de rôle part du rang de l'article dans la liste, et non d'un hachage
 * de son slug : un hachage laisse des trous, c'est-à-dire des annonces qu'aucun
 * article ne cite. Le rang garantit une couverture régulière et reste stable
 * d'un build à l'autre tant que l'ordre de publication ne change pas.
 */
export function getOffersForPost(
  postIndex: number,
  metierSlugs?: string[],
): Offer[] {
  const all = getOffers();
  if (all.length === 0) return [];

  const ciblees = metierSlugs?.length
    ? all.filter((offer) => metierSlugs.includes(offer.metier))
    : [];
  if (ciblees.length > 0) return ciblees.slice(0, 3);

  const parArticle = Math.min(3, all.length);
  const debut = (postIndex * parArticle) % all.length;

  return Array.from(
    { length: parArticle },
    (_, i) => all[(debut + i) % all.length],
  );
}
