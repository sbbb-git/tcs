import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * Ce fichier ne décrit PAS à lui seul le robots.txt servi, tant que le
 * robots.txt managé de Cloudflare est actif : Cloudflare préfixe la réponse
 * d'un bloc « Managed content » qui bloque les robots d'entraînement et pose un
 * groupe `User-agent: *` assorti d'un Content-Signal. Ce que nous déclarons ici
 * vient après, dans le même fichier.
 *
 * La politique retenue distingue deux familles, et non « IA » contre « pas IA » :
 *
 *  - Les robots qui CITENT leur source, donc qui renvoient des visiteurs.
 *    Googlebot et Bingbot pour la recherche classique, OAI-SearchBot,
 *    PerplexityBot, Claude-SearchBot et Applebot pour la recherche assistée,
 *    GPTBot, ClaudeBot et Google-Extended pour l'ancrage des réponses
 *    génératives. Aucun n'est nommé ci-dessous parmi les interdictions : en
 *    robots.txt, un agent sans règle est autorisé.
 *
 *  - Les aspirateurs qui ne renvoient jamais rien. Ceux-là sont interdits
 *    explicitement, et c'est le seul rôle de ce fichier.
 *
 * Les interdictions ci-dessous reprennent à l'identique ce que Cloudflare
 * bloque déjà : deux groupes identiques pour un même agent sont redondants,
 * jamais contradictoires. C'est délibéré. Le jour où le robots.txt managé est
 * désactivé dans AI Crawl Control, ce fichier devient la seule source et la
 * politique reste la même, sans fenêtre pendant laquelle les aspirateurs
 * passeraient.
 *
 * Ne jamais autoriser explicitement ici un agent que Cloudflare bloque encore :
 * deux groupes contradictoires pour un même agent ont un comportement indéfini
 * selon le robot. C'est précisément pourquoi GPTBot, ClaudeBot et
 * Google-Extended sont absents plutôt qu'autorisés.
 *
 * Après tout changement, vérifier le fichier RÉELLEMENT SERVI :
 *   curl https://talentcaresante.fr/robots.txt
 */
export const dynamic = "force-static";

/*
 * Aspirateurs de contenu sans citation ni trafic de retour. Bytespider
 * (ByteDance), CCBot (Common Crawl), Amazonbot et meta-externalagent (Meta)
 * collectent pour des corpus qui ne renvoient pas vers la source.
 */
const scrapersSansCitation = [
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // Robots de recherche et de citation, nommés pour qu'un durcissement de
      // la politique managée ne les emporte pas silencieusement.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },

      ...scrapersSansCitation.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
