import { ImageResponse } from "next/og";

import { getOffer, getOffers } from "@/lib/jobs";
import { OG_SIZE } from "@/lib/og";
import { site } from "@/lib/site";

/*
 * Carte de partage propre à chaque annonce.
 *
 * Sur un jobboard, le partage est un canal réel : une offre relayée sort avec
 * son intitulé, son lieu et son contrat plutôt qu'avec le visuel générique du
 * site. Composition typographique rendue par Satori, sans navigateur, sans
 * photographie et sans modèle génératif.
 *
 * Le parti pris est celui d'une annonce imprimée : fond clair, un seul aplat
 * de couleur qui tient la composition, une hiérarchie portée par la taille du
 * texte et non par des cadres. Pas de dégradé, pas de pastilles arrondies :
 * c'est ce vocabulaire-là qui fait « gabarit » au premier coup d'œil.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Offre d'emploi TalentCare Santé";

const INK = "#0B2A3F";
const INK_SOFT = "#2B4E68";
const ACCENT = "#0284C5";
const ACCENT_DARK = "#075882";
const LINE = "#DDE9F1";

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

  /*
   * Le titre porte « (H/F) » et répète le lieu, deux informations que la carte
   * donne déjà ailleurs. Les retirer laisse la place à l'intitulé lui-même.
   */
  let titre = offer?.title ?? "Recrutement médical à Paris";
  titre = titre.replace(/\s*\(H\/F\)/i, "");
  if (lieu && titre.endsWith(` - ${lieu}`)) {
    titre = titre.slice(0, -` - ${lieu}`.length);
  }
  titre = titre.trim();

  const conditions = offer ? [offer.contrat, offer.structure] : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* L'aplat vertical tient toute la composition, à la place d'un cadre. */}
        <div style={{ width: 22, background: ACCENT, display: "flex" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "68px 72px 0 72px",
          }}
        >
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
                display: "flex",
                fontSize: 25,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT_DARK,
                fontWeight: 700,
              }}
            >
              {lieu ? `Offre d'emploi · ${lieu}` : "Offre d'emploi"}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: titre.length > 34 ? 66 : 80,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: INK,
              }}
            >
              {titre}
            </div>

            {conditions.length > 0 && (
              <div
                style={{
                  display: "flex",
                  marginTop: 30,
                  fontSize: 30,
                  color: INK_SOFT,
                }}
              >
                {conditions.join("  ·  ")}
              </div>
            )}
          </div>

          {/* Le bandeau inversé ferme la carte et porte la signature. */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: -72,
              marginRight: -72,
              padding: "30px 72px",
              background: INK,
              color: "#FFFFFF",
              fontSize: 27,
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", fontWeight: 700 }}>{site.name}</div>
            <div style={{ display: "flex", color: "#A9D8EF" }}>
              talentcaresante.fr
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
