/**
 * Legal identity of the publisher.
 *
 * Fill every field marked TODO before going live: French law (LCEN, art. 6)
 * requires the publisher's identity, contact details and the host's identity to
 * be reachable from the site. `npm run seo:check` reports any TODO left here.
 *
 * Nothing in this file may be invented, an approximate SIRET or a made-up
 * address is worse than an empty one.
 */
export const legal = {
  /** Raison sociale, e.g. "TalentCare Santé SAS". */
  companyName: "TODO, raison sociale",
  /** Forme juridique, SAS, SASU, EI, micro-entreprise… */
  legalForm: "TODO, forme juridique",
  /** Capital social, when the form requires one. Leave empty otherwise. */
  shareCapital: "",
  /** Adresse du siège social. */
  address: "TODO, adresse du siège social",
  /** SIREN (9 chiffres) et SIRET (14 chiffres). */
  siren: "TODO, SIREN",
  siret: "TODO, SIRET",
  /** Numéro de TVA intracommunautaire, si assujetti. */
  vatNumber: "",
  /** RCS + ville d'immatriculation. */
  rcs: "",
  /** Directeur de la publication (personne physique). */
  publicationDirector: "TODO, directeur de la publication",

  /** Hébergeur, Cloudflare, Inc. pour un site servi par Cloudflare Pages. */
  host: {
    name: "Cloudflare, Inc.",
    address: "101 Townsend St, San Francisco, CA 94107, États-Unis",
    url: "https://www.cloudflare.com",
  },
} as const;

/** True when a field still carries its placeholder. */
export function isTodo(value: string): boolean {
  return value.startsWith("TODO");
}
