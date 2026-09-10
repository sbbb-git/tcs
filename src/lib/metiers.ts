import type { IconName } from "@/components/Icon";

/**
 * Taxonomie des métiers du jobboard.
 *
 * Volontairement courte. Une page métier n'existe que si l'on a de quoi y
 * écrire quelque chose de substantiel : trente pages quasi identiques
 * déclinant une même trame sont des pages satellites, que Google traite comme
 * telles. Mieux vaut huit pages qui répondent réellement à la question.
 *
 * Pour ajouter un métier : écrire son contenu éditorial ici, puis créer les
 * offres correspondantes dans content/offres.
 */
export type Metier = {
  slug: string;
  /** Libellé affiché, au singulier. */
  name: string;
  /** Libellé pluriel, pour les titres de page. */
  plural: string;
  icon: IconName;
  /** Balise title de la page métier, 60 caractères maximum. */
  title: string;
  /** Meta description, 110 à 160 caractères. */
  description: string;
  /** Chapeau affiché sous le H1. */
  intro: string;
  /** Corps éditorial de la page. C'est lui qui la rend indexable. */
  sections: { heading: string; paragraphs: string[] }[];
  /** Questions réellement posées, reprises en FAQPage. */
  faq: { question: string; answer: string }[];
  /** Article de blog approfondissant le sujet. */
  relatedPost?: string;
};

export const metiers: Metier[] = [
  {
    slug: "medecin-generaliste",
    name: "Médecin généraliste",
    plural: "Médecins généralistes",
    icon: "stethoscope",
    title: "Emploi médecin généraliste | TalentCare Santé",
    description:
      "Postes de médecin généraliste en centre de santé, maison de santé, clinique ou établissement public. Salariat ou libéral, partout en France.",
    intro:
      "Le médecin généraliste est le profil le plus recherché du secteur, et celui pour lequel les modes d'exercice se sont le plus diversifiés. Salariat en centre de santé, installation en maison de santé, exercice mixte : les options sont plus nombreuses qu'il y a dix ans.",
    sections: [
      {
        heading: "Les modes d'exercice possibles",
        paragraphs: [
          "Le salariat en centre de santé a changé la donne pour beaucoup de praticiens. Il supprime la gestion de cabinet, l'investissement initial et l'incertitude du revenu des premières années. En contrepartie, l'organisation est collective et l'autonomie moindre qu'en libéral.",
          "L'installation en maison de santé pluriprofessionnelle conserve l'indépendance du libéral tout en supprimant l'isolement. Chacun garde sa patientèle et ses honoraires ; les locaux, une partie des moyens et les protocoles de coordination sont mis en commun.",
          "L'exercice mixte, combinant une part salariée et une part libérale, ou une part présentielle et une part en téléconsultation, correspond à une demande croissante. Un établissement qui refuse cette souplesse écarte mécaniquement une partie des candidats.",
        ],
      },
      {
        heading: "Ce qui pèse dans une décision d'installation",
        paragraphs: [
          "La rémunération compte, mais elle arrive rarement en tête des motifs cités. La prévisibilité du planning, la présence d'un relais en cas d'absence, la taille de l'équipe et l'accès aux avis spécialisés pèsent davantage.",
          "Le cadre de vie est déterminant hors des grandes métropoles : accessibilité, logement, emploi du conjoint, scolarisation des enfants. Les territoires qui traitent ces sujets avec un interlocuteur unique recrutent mieux que ceux qui se contentent d'annoncer une aide financière.",
          "Le classement du territoire en zone sous-dotée ouvre par ailleurs droit à des dispositifs d'accompagnement à l'installation, dont le détail se vérifie auprès de l'Agence régionale de santé et de l'Assurance Maladie.",
        ],
      },
    ],
    faq: [
      {
        question: "Peut-on exercer en salariat comme médecin généraliste ?",
        answer:
          "Oui, notamment en centre de santé, en établissement de santé ou en service de santé au travail. Le praticien est alors salarié de la structure, sans gestion de cabinet ni charges professionnelles, avec la couverture sociale du salariat.",
      },
      {
        question: "Faut-il s'installer en zone sous-dotée pour trouver un poste ?",
        answer:
          "Non. La demande existe sur tout le territoire, y compris en zone dense. Les zones sous-dotées offrent en revanche des dispositifs d'aide à l'installation et une patientèle immédiatement constituée, ce qui raccourcit la montée en charge.",
      },
    ],
    relatedPost: "exercice-coordonne-msp-centre-de-sante-cpts",
  },
  {
    slug: "medecin-coordonnateur",
    name: "Médecin coordonnateur",
    plural: "Médecins coordonnateurs",
    icon: "fileCheck",
    title: "Emploi médecin coordonnateur EHPAD | TalentCare",
    description:
      "Postes de médecin coordonnateur en EHPAD : missions réglementées, temps partiel ou mutualisé entre structures, qualifications admises.",
    intro:
      "Le poste de médecin coordonnateur figure parmi les plus durablement vacants du secteur médico-social. La fonction est pourtant accessible à des profils variés, à condition d'en comprendre le périmètre réel.",
    sections: [
      {
        heading: "Une fonction de coordination, pas de suivi médical",
        paragraphs: [
          "C'est la confusion la plus répandue, et celle qui écarte le plus de candidats. Le médecin coordonnateur n'assure pas le suivi médical courant des résidents, qui reste celui de leur médecin traitant. Il élabore le projet de soins, donne un avis sur les admissions, anime la commission de coordination gériatrique et fait le lien avec les praticiens du territoire.",
          "Ses missions et les qualifications requises sont fixées par le code de l'action sociale et des familles. Elles ne se négocient pas d'un établissement à l'autre.",
        ],
      },
      {
        heading: "Un temps de travail souvent partiel",
        paragraphs: [
          "Le temps de présence exigé est proportionnel à la capacité d'accueil de l'établissement, ce qui fait que la plupart des postes ne sont pas des temps pleins. C'est la principale difficulté de recrutement, et la principale marge de manœuvre.",
          "Beaucoup de praticiens construisent un temps plein en cumulant plusieurs structures d'un même territoire, ou en conservant une activité clinique par ailleurs. Un établissement qui propose explicitement cette organisation élargit nettement son vivier.",
        ],
      },
      {
        heading: "Plusieurs voies d'accès à la fonction",
        paragraphs: [
          "La réglementation admet le diplôme d'études spécialisées de gériatrie, la capacité de gérontologie, un diplôme universitaire de médecin coordonnateur, ou une formation continue attestée. Le vivier ne se limite donc pas aux gériatres.",
          "Un médecin généraliste expérimenté peut accéder à la fonction moyennant une formation, que certains établissements financent dans le cadre du recrutement. C'est un argument rarement mis en avant et souvent décisif.",
        ],
      },
    ],
    faq: [
      {
        question: "Un généraliste peut-il devenir médecin coordonnateur ?",
        answer:
          "Oui. Outre le diplôme d'études spécialisées de gériatrie et la capacité de gérontologie, la réglementation admet le diplôme universitaire de médecin coordonnateur d'EHPAD et une formation continue attestée. Certains établissements financent ce parcours.",
      },
      {
        question: "Peut-on coordonner plusieurs EHPAD ?",
        answer:
          "Oui, et c'est fréquent. Le temps de coordination exigé étant proportionnel à la capacité de l'établissement, un praticien construit souvent son activité en cumulant plusieurs structures.",
      },
    ],
    relatedPost: "recruter-medecin-coordonnateur-ehpad",
  },
  {
    slug: "infirmier",
    name: "Infirmier",
    plural: "Infirmiers",
    icon: "heart",
    title: "Emploi infirmier IDE | TalentCare Santé",
    description:
      "Postes d'infirmier diplômé d'État en hôpital, clinique, EHPAD et centre de santé. Fonction publique, salariat privé ou exercice libéral.",
    intro:
      "Le métier d'infirmier recouvre des réalités très différentes selon le service, la structure et le statut. Ce qui distingue deux postes tient rarement à la rémunération, largement contrainte, et presque toujours à l'organisation du travail.",
    sections: [
      {
        heading: "Les cadres d'exercice",
        paragraphs: [
          "En fonction publique hospitalière, l'infirmier relève d'une grille indiciaire nationale, sur un poste titulaire ou contractuel. Dans le secteur privé, la convention collective applicable à la structure fixe le cadre de la rémunération.",
          "L'exercice libéral suppose une durée d'expérience préalable en structure de soins avant conventionnement, ce qui fait des premières années de salariat un passage obligé pour les jeunes diplômés.",
        ],
      },
      {
        heading: "Ce qu'un candidat regarde vraiment",
        paragraphs: [
          "L'effectif réel du service, et non l'effectif théorique. La stabilité du planning et le nombre de rappels sur repos. La qualité de la collaboration avec l'équipe médicale. La relation avec l'encadrement de proximité.",
          "Les perspectives comptent aussi : accès aux spécialisations, à la formation continue, à la pratique avancée. Un poste présenté comme un point d'arrivée attire moins qu'un poste présenté comme une étape.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il être inscrit à l'Ordre pour exercer ?",
        answer:
          "Oui, l'inscription au tableau de l'Ordre national des infirmiers est obligatoire pour exercer, quel que soit le mode d'exercice. Elle emporte l'attribution d'un identifiant au répertoire partagé des professionnels de santé.",
      },
      {
        question: "Un infirmier diplômé à l'étranger peut-il exercer en France ?",
        answer:
          "Cela dépend du lieu d'obtention du diplôme. Un diplôme délivré dans l'Union européenne relève de la reconnaissance des qualifications professionnelles ; un diplôme obtenu hors de cette zone suppose une procédure d'autorisation d'exercice distincte.",
      },
    ],
    relatedPost: "recruter-infirmier-etablissement-sante",
  },
  {
    slug: "infirmier-anesthesiste",
    name: "Infirmier anesthésiste",
    plural: "Infirmiers anesthésistes",
    icon: "shield",
    title: "Emploi infirmier anesthésiste IADE | TalentCare",
    description:
      "Postes d'infirmier anesthésiste diplômé d'État en bloc opératoire, réanimation et SMUR. Un marché en tension structurelle sur tout le territoire.",
    intro:
      "L'infirmier anesthésiste exerce au bloc, en réanimation ou en structure mobile d'urgence après une formation complémentaire de deux ans. Le vivier est restreint et la tension structurelle : un poste vacant se pourvoit rarement rapidement.",
    sections: [
      {
        heading: "Un marché distinct de celui des infirmiers en soins généraux",
        paragraphs: [
          "La spécialisation crée un marché à part, avec ses propres candidats et ses propres attentes. Diffuser une annonce générique d'infirmier pour un poste d'anesthésiste ne produit rien : les professionnels concernés ne s'y reconnaissent pas.",
          "Sur ces postes, l'approche directe remplace la publication d'offres. Les praticiens visés sont en poste et ne consultent pas les annonces.",
        ],
      },
      {
        heading: "Ce qui fait la différence entre deux blocs",
        paragraphs: [
          "Le nombre de salles, la nature des interventions, l'organisation des gardes et astreintes, l'effectif qui les couvre. Un poste avec une permanence des soins lourde et une équipe incomplète reste vacant quel que soit le niveau de rémunération.",
          "L'accès à la formation continue et la possibilité d'intervenir sur plusieurs secteurs, bloc et réanimation par exemple, comptent également dans la décision.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle formation pour devenir infirmier anesthésiste ?",
        answer:
          "Le diplôme d'État d'infirmier anesthésiste s'obtient après une formation complémentaire de deux ans, accessible aux infirmiers justifiant d'une expérience professionnelle préalable. Il confère des compétences propres au bloc opératoire et à la réanimation.",
      },
    ],
    relatedPost: "recruter-infirmier-etablissement-sante",
  },
  {
    slug: "aide-soignant",
    name: "Aide-soignant",
    plural: "Aides-soignants",
    icon: "users",
    title: "Emploi aide-soignant | TalentCare Santé",
    description:
      "Postes d'aide-soignant diplômé d'État en hôpital, EHPAD et service de soins à domicile. Diplôme requis, passerelles et conditions d'exercice.",
    intro:
      "Le métier d'aide-soignant concentre les tensions du secteur. C'est aussi celui où l'écart entre les établissements qui recrutent et ceux qui ne recrutent pas s'explique le plus directement par les conditions de travail.",
    sections: [
      {
        heading: "Le diplôme et le périmètre d'exercice",
        paragraphs: [
          "L'exercice suppose le diplôme d'État d'aide-soignant, accessible par la formation initiale, l'apprentissage ou la validation des acquis de l'expérience. Cette dernière voie reste largement sous-utilisée alors qu'elle permet de qualifier des agents déjà en poste.",
          "L'aide-soignant exerce en collaboration avec l'infirmier et sous sa responsabilité, dans un périmètre défini. Faire glisser vers un agent non diplômé des tâches relevant de cette qualification expose l'établissement et met l'agent en difficulté.",
        ],
      },
      {
        heading: "Recruter et garder",
        paragraphs: [
          "Le taux de départ se joue sur l'effectif réel, la stabilité du planning, la qualité du binôme avec l'infirmier et la relation avec le cadre de santé. Ces quatre points reviennent dans presque tous les motifs de départ exprimés.",
          "Les perspectives pèsent aussi : accompagner un projet de passerelle vers la formation infirmière fidélise fortement, y compris lorsque l'agent quitte ensuite son poste pour revenir comme infirmier.",
        ],
      },
    ],
    faq: [
      {
        question: "Peut-on exercer sans le diplôme d'État d'aide-soignant ?",
        answer:
          "Non. Le diplôme est requis pour exercer comme aide-soignant. Un agent sans ce diplôme peut occuper d'autres fonctions, mais il ne relève ni du même périmètre d'intervention ni de la même qualification.",
      },
      {
        question: "Un aide-soignant peut-il devenir infirmier ?",
        answer:
          "Oui, des passerelles existent vers la formation en soins infirmiers, avec des modalités d'accès aménagées pour les professionnels en exercice.",
      },
    ],
    relatedPost: "recruter-aide-soignant-fideliser",
  },
  {
    slug: "pharmacien",
    name: "Pharmacien",
    plural: "Pharmaciens",
    icon: "briefcase",
    title: "Emploi pharmacien officine et hôpital | TalentCare",
    description:
      "Postes de pharmacien en officine, en pharmacie à usage intérieur et en établissement de santé. Inscription ordinale par section et statuts applicables.",
    intro:
      "Le recrutement pharmaceutique recouvre des métiers si différents que parler d'un marché unique n'a pas de sens. Officine, pharmacie à usage intérieur, biologie médicale et industrie relèvent de logiques distinctes.",
    sections: [
      {
        heading: "L'inscription ordinale se fait par section",
        paragraphs: [
          "Particularité de la profession : l'inscription à l'Ordre national des pharmaciens se fait par section, selon l'activité exercée. Un changement d'activité peut donc supposer un changement de section, à vérifier au moment de la promesse d'embauche.",
        ],
      },
      {
        heading: "En établissement, le pharmacien relève des statuts médicaux",
        paragraphs: [
          "C'est une source de confusion fréquente dans les services de ressources humaines. En établissement public, le pharmacien relève des statuts de personnel médical, avec les procédures correspondantes, et non des statuts de la fonction publique hospitalière non médicale. Un dossier instruit dans le mauvais circuit fait perdre plusieurs semaines.",
          "Ses missions dépassent largement la dispensation : pharmacie clinique, stérilisation, préparations, dispositifs médicaux, participation aux commissions de l'établissement.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle différence entre pharmacien et préparateur en pharmacie ?",
        answer:
          "Deux professions distinctes, avec des diplômes et des responsabilités différentes. Le préparateur en pharmacie hospitalière dispose de son propre diplôme et exerce sous la responsabilité du pharmacien.",
      },
    ],
    relatedPost: "recruter-pharmacien-officine-hopital",
  },
];

export const metierBySlug = new Map(metiers.map((m) => [m.slug, m]));
