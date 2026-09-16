import { cn } from "@/lib/utils";

/**
 * Marque TalentCare Santé.
 *
 * Posée en SVG inline plutôt qu'en `<img>` : c'est l'élément le plus visible
 * de chaque page, et une requête réseau supplémentaire y produirait un
 * clignotement au chargement. Le tracé pèse moins d'un kilo-octet.
 *
 * Deux tonalités, parce qu'un bleu marine disparaît sur le fond sombre du pied
 * de page. Le vert des feuilles et le turquoise du pavillon restent
 * identiques : ils sont décoratifs et ne portent aucun texte, donc aucune
 * exigence de contraste ne s'y applique.
 */
export function LogoMark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const tube = tone === "light" ? ["#FFFFFF", "#D6E7F2"] : ["#1B3A63", "#2E6491"];
  const embout = tone === "light" ? "#FFFFFF" : "#1B3A63";
  const id = tone === "light" ? "l" : "d";

  return (
    <svg
      viewBox="15 13 96 96"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`tube-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tube[0]} />
          <stop offset="1" stopColor={tube[1]} />
        </linearGradient>
        <linearGradient id={`leafA-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2E9E7E" />
          <stop offset="1" stopColor="#6FC44A" />
        </linearGradient>
        <linearGradient id={`leafB-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#5BB733" />
          <stop offset="1" stopColor="#8ED04F" />
        </linearGradient>
      </defs>

      <path d="M55 72 C38 69 32 56 35 43 C49 46 56 58 55 72 Z" fill={`url(#leafA-${id})`} />
      <path d="M58 74 C58 53 68 40 83 36 C85 55 75 70 58 74 Z" fill={`url(#leafB-${id})`} />
      <path d="M55 72 C48 62 43 55 37 47" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M58 74 C64 61 71 50 81 40" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <path
        d="M26 26 C18 52 24 76 44 86 C58 93 72 88 79 78"
        stroke={`url(#tube-${id})`}
        strokeWidth="9.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M90 26 C97 46 96 62 90 72"
        stroke={`url(#tube-${id})`}
        strokeWidth="9.5"
        fill="none"
        strokeLinecap="round"
      />

      <circle cx="26" cy="24" r="6.8" fill={embout} />
      <circle cx="90" cy="24" r="6.8" fill={embout} />

      <circle cx="90" cy="88" r="15.5" fill={embout} />
      <circle cx="90" cy="88" r="11.2" fill={tone === "light" ? "#0B2A3F" : "#fff"} />
      <circle cx="90" cy="88" r="8.2" fill="#22B59B" />
    </svg>
  );
}
