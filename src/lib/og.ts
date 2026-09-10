/**
 * Cartes de partage social.
 *
 * Les images sont composées par Satori, via la convention `opengraph-image`
 * de Next : chaque annonce rend la sienne au moment du build, avec son
 * intitulé, sa spécialité et son lieu. Sur un jobboard, une offre relayée sur
 * un réseau ou en message privé porte ainsi son propre contenu au lieu du
 * visuel générique du site. Aucune photographie, aucune banque d'images,
 * aucun modèle génératif : une composition typographique rendue sans
 * navigateur.
 *
 * La taille vit ici et non dans le composant image, pour que la balise
 * `og:image:width` et le fichier réellement produit ne puissent pas diverger.
 * Le contrôle SEO refuse le déploiement s'ils divergent quand même.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Chemin de la carte propre à une annonce. Sans extension, par convention Next. */
export function offerOgImagePath(slug: string): string {
  return `/offres-emploi/${slug}/opengraph-image`;
}
