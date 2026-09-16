import { cn } from "@/lib/utils";

/**
 * Marque TalentCare Santé.
 *
 * Posée en SVG inline plutôt qu'en `<img>` : c'est l'élément le plus visible
 * de chaque page, et une requête réseau supplémentaire y produirait un
 * clignotement au chargement. Le tracé pèse moins d'un kilo-octet.
 *
 * Deux tonalités, parce qu'un bleu marine disparaît sur le fond sombre du pied
 * de page. Les deux tonalités reprennent les bleus du
 * logo : marine pour le tracé, bleu roi pour les embouts, le pavillon et la
 * feuille de droite.
 */
export function LogoMark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const tube = tone === "light" ? ["#FFFFFF", "#B9D4FB"] : ["#17305C", "#3A72DC"];
  const embout = tone === "light" ? "#FFFFFF" : "#3A72DC";
  const pavillon = tone === "light" ? "#FFFFFF" : "#17305C";
  const feuilleA = tone === "light" ? ["#5E93E8", "#89B4F5"] : ["#14294F", "#23477F"];
  const feuilleB = tone === "light" ? ["#7FB0F2", "#A9CBFA"] : ["#2456B0", "#4A85E8"];
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
          <stop offset="0" stopColor={feuilleA[0]} />
          <stop offset="1" stopColor={feuilleA[1]} />
        </linearGradient>
        <linearGradient id={`leafB-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={feuilleB[0]} />
          <stop offset="1" stopColor={feuilleB[1]} />
        </linearGradient>
      </defs>

      <path d="M55 72 C38 69 32 56 35 43 C49 46 56 58 55 72 Z" fill={`url(#leafA-${id})`} />
      <path d="M58 74 C58 53 68 40 83 36 C85 55 75 70 58 74 Z" fill={`url(#leafB-${id})`} />
      <path d="M55 72 C48 62 43 55 37 47" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M58 74 C64 61 71 50 81 40" stroke="#fff" strokeOpacity=".4" strokeWidth="1.5" fill="none" strokeLinecap="round" />

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

      <circle cx="90" cy="88" r="15.5" fill={pavillon} />
      <circle cx="90" cy="88" r="11.2" fill={tone === "light" ? "#0B2A3F" : "#fff"} />
      <circle cx="90" cy="88" r="8.2" fill="#2E6BD6" />
    </svg>
  );
}
