import { ImageResponse } from "next/og";

import { getOffer, getOffers } from "@/lib/jobs";
import { OG_SIZE } from "@/lib/og";
import { site } from "@/lib/site";

/*
 * Carte de partage propre à chaque annonce.
 *
 * Sur un jobboard, le partage social est un canal réel : une offre relayée sur
 * LinkedIn ou en message privé sort avec son intitulé, sa spécialité et son
 * arrondissement composés dans l'image, au lieu du visuel générique du site.
 * C'est une composition typographique rendue par Satori, sans navigateur, sans
 * photographie et sans modèle génératif.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Offre d'emploi TalentCare Santé";

export function generateStaticParams() {
  return getOffers().map((offer) => ({ slug: offer.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = getOffer(slug);

  const lieu = offer ? (offer.ville ?? offer.region) : null;
  const faits = offer && lieu ? [lieu, offer.contrat, offer.structure] : [];

  /*
   * Le titre de l'annonce porte la mention « (H/F) » et répète le lieu, deux
   * informations que la carte donne déjà par ailleurs : le lieu en pastille,
   * et la mention légale n'a pas de sens sur une image de partage. Les retirer
   * laisse la place à l'intitulé lui-même, en grand.
   */
  let titre = offer?.title ?? "Recrutement médical à Paris";
  titre = titre.replace(/\s*\(H\/F\)/i, "");
  if (lieu && titre.endsWith(` - ${lieu}`)) {
    titre = titre.slice(0, -` - ${lieu}`.length);
  }
  titre = titre.trim();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0B2A3F 0%, #075882 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Occupe toute la hauteur libre et s'y centre : aligné en haut, le
            bloc laissait près de la moitié de la carte vide. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7DD0F5",
              fontWeight: 600,
            }}
          >
            Offre d&apos;emploi
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: titre.length > 34 ? 64 : 78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {titre}
          </div>

          {/* Les pastilles restent accrochées au titre : détachées en bas de
              carte, elles laissaient une bande vide au milieu. */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 40 }}>
            {faits.map((fait) => (
              <div
                key={fait}
                style={{
                  fontSize: 27,
                  padding: "12px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                {fait}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <div style={{ fontWeight: 700 }}>{site.name}</div>
          <div style={{ color: "#A9D8EF" }}>talentcaresante.fr</div>
        </div>
      </div>
    ),
    size,
  );
}
