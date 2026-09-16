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
        /*
         * Bleu du logo, repris tel quel du fichier source : #2E5FBF atteint
         * 5,99:1 sur blanc et satisfait donc le niveau AA pour du texte
         * courant, sans qu'il faille l'assombrir. La variante claire sert sur
         * le fond sombre du pied de page, où elle monte à 6,18:1.
         */
        brand: {
          DEFAULT: "#2E5FBF",
          light: "#7FA8F0",
        },
        /* Toutes les bordures et anneaux. Un bleu pâle, pas un gris. */
        line: "#DDE9F1",
        /*
         * L'échelle d'accent est construite autour du bleu du logo, qui occupe
         * le rang 500. Contrastes mesurés : 500 atteint 5,99:1 sur blanc et
         * porte donc du texte courant, 600 monte à 7,03:1 et 700 à 8,68:1 pour
         * les fonds de bouton en blanc. Le rang 300 sert sur le fond sombre du
         * pied de page, où il donne 7,45:1. Le rang 400 ne sert qu'aux anneaux
         * de focus : 3,07:1 sur blanc, au-dessus du seuil non textuel de 3:1.
         */
        accent: {
          50: "#F1F5FE",
          100: "#E1EAFC",
          200: "#C3D5F8",
          300: "#9CB8F2",
          400: "#6A92E4",
          500: "#2E5FBF",
          600: "#2A55AB",
          700: "#254892",
          800: "#1E3B77",
          900: "#193159",
          950: "#111F39",
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
