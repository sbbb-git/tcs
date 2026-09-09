import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * Ce fichier ne décrit PAS à lui seul le robots.txt servi.
 *
 * Cloudflare préfixe la réponse d'un bloc « Managed content » qui bloque les
 * robots d'entraînement (Amazonbot, Applebot-Extended, Bytespider, CCBot,
 * ClaudeBot, Google-Extended, GPTBot, meta-externalagent) et pose un groupe
 * `User-agent: *` assorti d'un Content-Signal. Ce que nous déclarons ici vient
 * après, dans le même fichier.
 *
 * Deux règles en découlent :
 *
 *  1. Ne jamais redéclarer un agent que Cloudflare bloque. Deux groupes
 *     contradictoires pour un même agent ont un comportement indéfini selon le
 *     robot — c'est le cas qu'on veut éviter, pas une subtilité théorique.
 *  2. Ne pas reposer un groupe `User-agent: *` : celui de Cloudflare suffit, et
 *     un doublon n'apporte rien.
 *
 * Les agents listés ci-dessous sont uniquement des robots de recherche et de
 * citation : ils construisent l'index dont les réponses citent la source et
 * envoient donc des visiteurs. Aucun n'est bloqué par Cloudflare, il n'y a donc
 * pas de conflit — ils sont nommés pour qu'une évolution de la politique
 * managée ne les emporte pas silencieusement.
 *
 * Pour autoriser l'entraînement des modèles, la bascule est côté Cloudflare
 * (AI Crawl Control), pas ici.
 *
 * Après tout changement, vérifier le fichier RÉELLEMENT SERVI :
 *   curl https://talentcaresante.fr/robots.txt
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
