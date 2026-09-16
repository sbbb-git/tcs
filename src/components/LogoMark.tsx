import { cn } from "@/lib/utils";

/**
 * Marque TalentCare Santé.
 *
 * Tracé repris du fichier source fourni, sans redessin. Seuls le cadrage et
 * les couleurs varient ici.
 *
 * Posée en SVG inline plutôt qu'en balise image : c'est l'élément le plus
 * visible de chaque page, et une requête réseau y produirait un clignotement
 * au chargement.
 *
 * Le cadre est celui de la marque seule, mesuré contours compris, soit un
 * rapport d'environ 1,17. Il n'est pas forcé au carré : la dimension se règle
 * en hauteur et la largeur suit, ce qui évite toute déformation.
 *
 * Deux tonalités, parce que le bleu marine disparaît sur le fond sombre du
 * pied de page.
 */
export function LogoMark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const encre = tone === "light" ? "#FFFFFF" : "#122542";
  const bleu = tone === "light" ? "#7FA8F0" : "#2E5FBF";

  return (
    <svg
      viewBox="56 49 442 378"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke={encre}
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M67 75 H104 Q132 75 132 105 V153 C132 235 191 292 257 314 C323 292 382 235 382 153 V105 Q382 75 410 75 H447" />
        <path d="M257 314 V353 C257 388 286 414 322 414 H344 C380 414 409 388 409 353" />
        <circle cx="447" cy="353" r="39" strokeWidth="15" />
      </g>

      <circle cx="104" cy="75" r="15" fill={encre} />
      <circle cx="410" cy="75" r="15" fill={encre} />
      <circle cx="447" cy="353" r="19" fill={bleu} />

      <path
        d="M243 285 C190 255 158 208 159 164 C209 160 253 184 269 226 C275 247 265 270 243 285 Z"
        fill={bleu}
      />
      <path
        d="M271 285 C266 229 291 183 348 164 C359 215 332 262 271 285 Z"
        fill={encre}
      />

      {/*
        Nervures. Blanches dans la version claire du logo, elles disparaîtraient
        sur les feuilles devenues claires en tonalité inversée : elles y passent
        donc au bleu du fond du pied de page.
      */}
      <path
        d="M184 190 C211 211 235 239 250 271"
        fill="none"
        stroke={tone === "light" ? "#0B2A3F" : "#FFFFFF"}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M328 190 C307 218 289 246 276 272"
        fill="none"
        stroke={tone === "light" ? "#0B2A3F" : "#FFFFFF"}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
