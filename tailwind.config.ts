import type { Config } from "tailwindcss";

/*
 * Une seule source de vérité pour la couleur, l'espacement et les rayons.
 * Aucune valeur en dur dans un composant : c'est ce qui permet de rebrander le
 * site en changeant les dix valeurs de `accent`.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        /* Fond des bandes alternées. */
        soft: "#F2F8FC",
        /* Trois niveaux d'encre, pas quatre. Un quatrième devient vite un gris arbitraire. */
        ink: {
          DEFAULT: "#0B2A3F", // titres
          soft: "#2B4E68", // corps de texte : jamais du noir pur
          mute: "#64879F", // métadonnées uniquement, contraste 3.8:1
        },
        /* Toutes les bordures et anneaux. Un bleu pâle, pas un gris. */
        line: "#DDE9F1",
        /*
         * Une seule teinte d'accent, échelle complète. Le bleu de la marque
         * (#0284C5) occupe le rang 500 : il échoue AA sur blanc en texte, donc
         * il sert aux aplats et au logo, tandis que 600 et 700 portent le texte
         * et les fonds de bouton. Contrastes vérifiés avant écriture des pages.
         */
        accent: {
          50: "#EFF7FD",
          100: "#D8ECFA",
          200: "#B2DBF4",
          300: "#79C1EA",
          400: "#2FA4DC",
          500: "#0284C5",
          600: "#046FA6",
          700: "#075882",
          800: "#0C4967",
          900: "#103D55",
          950: "#0A2739",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
