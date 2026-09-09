/**
 * Single source of truth for everything that shows up in metadata, structured
 * data, the sitemap and the RSS feed. Change a value here and it propagates.
 */
export const site = {
  name: "TalentCare Santé",
  shortName: "TalentCare Santé",
  url: "https://talentcaresante.fr",
  locale: "fr_FR",
  lang: "fr",
  title: "TalentCare Santé — Cabinet de recrutement médical et paramédical",
  description:
    "Cabinet de recrutement spécialisé santé. Nous accompagnons les professionnels de santé dans leur carrière et les hôpitaux, cliniques et EHPAD dans leurs recrutements.",
  tagline: "Le trait d'union entre talents médicaux et établissements de santé",
  email: "talentcaresante@gmail.com",
  phone: "07 56 86 94 41",
  phoneE164: "+33756869441",
  whatsapp: "https://wa.me/message/5WUDBKZN7KFPN1",
  formEndpoint: "https://formspree.io/f/xeeeppez",
  foundingYear: 2026,
  socials: {
    linkedin: "https://www.linkedin.com/in/talentcare-sant%C3%A9-a305873a7/",
    facebook: "https://www.facebook.com/profile.php?id=61586657291461",
    instagram: "https://www.instagram.com/talentcare_sante/",
  },
  areaServed: "France",
} as const;

/**
 * Opti-CDS accompagne les centres de santé (création, dossier ARS, subventions,
 * organisation). Son offre est complémentaire de la nôtre : nous plaçons les
 * praticiens, Opti-CDS structure la structure qui les accueille. Les liens sont
 * éditoriaux et suivis — c'est un partenaire réel, pas un échange payé.
 */
export const partner = {
  name: "Opti-CDS",
  url: "https://opti-cds.fr",
  description:
    "Accompagnement des centres de santé : création, dossier ARS, subventions, organisation et gestion.",
  links: {
    home: "https://opti-cds.fr",
    centresDeSante: "https://opti-cds.fr/centres-de-sante",
    creation: "https://opti-cds.fr/services/creation-centre-de-sante",
    dossierArs: "https://opti-cds.fr/services/dossier-ars",
    subventions: "https://opti-cds.fr/services/subventions-et-financements",
    recrutement: "https://opti-cds.fr/services/recrutement-de-medecins",
    organisation: "https://opti-cds.fr/services/conseil-en-organisation",
    lexique: "https://opti-cds.fr/lexique",
  },
} as const;

export const socialLinks = [
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
  { key: "facebook", label: "Facebook", href: site.socials.facebook },
  { key: "instagram", label: "Instagram", href: site.socials.instagram },
] as const;

/** Absolute URL for a site-relative path — required by OG tags and sitemaps. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
