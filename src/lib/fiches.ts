import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { metierBySlug, type Metier } from "@/lib/metiers";

const FICHES_DIR = path.join(process.cwd(), "content", "fiches");

/**
 * Fiches métiers.
 *
 * Ce type de contenu est distinct des pages d'offres, et la distinction est la
 * raison d'être du dossier. Deux pages traitant du même métier se
 * cannibaliseraient si elles visaient la même intention de recherche :
 *
 *  - `/offres-emploi/metier/<slug>/` répond à « emploi médecin généraliste ».
 *    Intention transactionnelle : le lecteur cherche un poste maintenant. La
 *    page liste des annonces et parle conditions d'exercice.
 *
 *  - `/fiches-metiers/<slug>/` répond à « fiche métier médecin généraliste »,
 *    « comment devenir », « salaire ». Intention informationnelle : le lecteur
 *    se renseigne sur la profession, souvent des années avant de postuler. La
 *    page décrit le métier, sa formation et ses perspectives.
 *
 * Les deux se citent l'une l'autre, avec un rôle explicite. Si une fiche se
 * met à parler d'offres ou une page d'offres à décrire la formation, il faut
 * corriger : c'est le début de la cannibalisation.
 */
export type FicheFrontmatter = {
  title: string;
  description: string;
  /** Slug d'un métier de la taxonomie : fait le lien avec les offres. */
  metier: string;
  /** Intitulé pour la balise title, plus court que le h1 si besoin. */
  metaTitle?: string;
  date: string;
  updated?: string;
  /** Diplôme ou voie d'accès, affiché en résumé. */
  diplome: string;
  /** Durée totale des études, affichée en résumé. */
  duree: string;
  /** Cadres d'exercice les plus fréquents, affichés en résumé. */
  exercice: string;
  /** Ordre professionnel, quand il existe. */
  ordre?: string;
  draft?: boolean;
};

export type Fiche = FicheFrontmatter & {
  slug: string;
  body: string;
  metierMeta: Metier;
  wordCount: number;
};

let cache: Fiche[] | null = null;

export function getFiches(): Fiche[] {
  if (cache) return cache;
  if (!fs.existsSync(FICHES_DIR)) return [];

  cache = fs
    .readdirSync(FICHES_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(FICHES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const front = data as FicheFrontmatter;

      for (const field of [
        "title",
        "description",
        "metier",
        "date",
        "diplome",
        "duree",
        "exercice",
      ] as const) {
        if (!front[field]) {
          throw new Error(`content/fiches/${file} : champ "${field}" manquant.`);
        }
      }

      const metierMeta = metierBySlug.get(front.metier);
      if (!metierMeta) {
        throw new Error(
          `content/fiches/${file} : métier inconnu "${front.metier}". ` +
            "Ajoutez-le à src/lib/metiers.ts ou corrigez le frontmatter.",
        );
      }

      return {
        ...front,
        slug,
        body: content,
        metierMeta,
        wordCount: content.split(/\s+/).filter(Boolean).length,
      };
    })
    .filter((fiche) => !fiche.draft)
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));

  return cache;
}

export function getFiche(slug: string): Fiche | undefined {
  return getFiches().find((fiche) => fiche.slug === slug);
}

/** Fiche correspondant à un métier, pour le lien depuis la page d'offres. */
export function getFicheByMetier(metierSlug: string): Fiche | undefined {
  return getFiches().find((fiche) => fiche.metier === metierSlug);
}
