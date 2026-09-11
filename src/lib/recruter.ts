import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { metierBySlug, type Metier } from "@/lib/metiers";

const RECRUTER_DIR = path.join(process.cwd(), "content", "recruter");

/**
 * Pages « recruter un <métier> », côté employeur.
 *
 * Troisième intention couverte par le site, et la seule qui s'adresse aux
 * clients plutôt qu'aux candidats. Le découpage est le suivant :
 *
 *  - `/offres-emploi/metier/<slug>/` : un praticien cherche un poste.
 *  - `/fiches-metiers/<slug>/` : quelqu'un se renseigne sur la profession.
 *  - `/recruter/<slug>/` : un employeur cherche à pourvoir un poste.
 *
 * Les trois pages parlent du même métier sans se concurrencer, parce qu'elles
 * répondent à trois questions différentes. La règle de non-cannibalisation est
 * la même que pour les fiches : si cette page se met à décrire la formation ou
 * à lister des annonces, il faut corriger.
 *
 * Le contenu s'adresse à un directeur de structure, pas à un praticien. Le
 * vocabulaire, les exemples et les objections traitées en découlent.
 */
export type RecruterFrontmatter = {
  title: string;
  metaTitle?: string;
  description: string;
  metier: string;
  date: string;
  updated?: string;
  /** Délai réaliste entre le lancement et la prise de poste. */
  delai: string;
  /** Ce qui bloque le plus souvent sur cette spécialité. */
  frein: string;
  /** Levier qui change le plus les choses, en quelques mots. */
  levier: string;
  draft?: boolean;
};

export type RecruterPage = RecruterFrontmatter & {
  slug: string;
  body: string;
  metierMeta: Metier;
  wordCount: number;
};

let cache: RecruterPage[] | null = null;

export function getRecruterPages(): RecruterPage[] {
  if (cache) return cache;
  if (!fs.existsSync(RECRUTER_DIR)) return [];

  cache = fs
    .readdirSync(RECRUTER_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(RECRUTER_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const front = data as RecruterFrontmatter;

      for (const field of [
        "title",
        "description",
        "metier",
        "date",
        "delai",
        "frein",
        "levier",
      ] as const) {
        if (!front[field]) {
          throw new Error(`content/recruter/${file} : champ "${field}" manquant.`);
        }
      }

      const metierMeta = metierBySlug.get(front.metier);
      if (!metierMeta) {
        throw new Error(
          `content/recruter/${file} : métier inconnu "${front.metier}".`,
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
    .filter((page) => !page.draft)
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));

  return cache;
}

export function getRecruterPage(slug: string): RecruterPage | undefined {
  return getRecruterPages().find((page) => page.slug === slug);
}

export function getRecruterPageByMetier(metierSlug: string): RecruterPage | undefined {
  return getRecruterPages().find((page) => page.metier === metierSlug);
}
