import type { Region } from "@/lib/jobs";

/**
 * Pages régionales du jobboard.
 *
 * Une page par région administrative serait tentante pour le référencement et
 * serait une faute : treize pages déclinant la même trame, dont la plupart sans
 * offre derrière, sont des pages satellites, et Google les traite comme telles.
 *
 * On n'écrit donc une page que pour une région où deux conditions sont
 * réunies : des offres réelles, et quelque chose de vrai à dire sur l'exercice
 * qui ne soit pas transposable ailleurs. Démographie médicale, zonage,
 * attractivité, structures dominantes : ce qui distingue réellement l'exercice
 * d'une région à l'autre.
 *
 * Aucun chiffre n'est avancé sans source. Les constats qualitatifs ci-dessous
 * sont établis et vérifiables, les classements et les densités changent d'une
 * publication à l'autre et n'ont pas leur place ici.
 *
 * Pour ajouter une région : écrire son contenu, puis créer les offres.
 * L'ordre inverse produit une page vide.
 */
export type RegionPage = {
  slug: string;
  /** Doit correspondre exactement à une valeur de REGIONS. */
  region: Region;
  /** Balise title, 60 caractères maximum. */
  title: string;
  /** Meta description, 110 à 160 caractères. */
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
};

export const regionPages: RegionPage[] = [
  {
    slug: "ile-de-france",
    region: "Île-de-France",
    title: "Emploi médecin en Île-de-France | TalentCare",
    description:
      "Postes de médecin et de praticien en Île-de-France : Paris, petite et grande couronne. Salariat en centre de santé, cabinet de groupe, centre d'imagerie.",
    intro:
      "L'Île-de-France concentre la plus forte densité de praticiens du pays et, dans le même temps, certains des territoires les plus sous-dotés. Le département où l'on exerce change tout, bien plus que la région.",
    sections: [
      {
        heading: "Une région, des situations opposées",
        paragraphs: [
          "Paris intra-muros et les Hauts-de-Seine n'ont pas le même profil que la Seine-Saint-Denis ou une partie de la grande couronne, où l'accès aux soins est durablement tendu et où les structures peinent à recruter.",
          "Pour un praticien, cela se traduit concrètement : dans les territoires tendus, les conditions se négocient davantage, la patientèle est immédiate et les structures acceptent plus souvent les organisations sur mesure.",
          "Dans Paris, la difficulté n'est pas la patientèle mais le coût de l'installation. C'est ce qui explique le poids du salariat en centre de santé et des cabinets de groupe, où les charges se partagent.",
        ],
      },
      {
        heading: "Ce qui pèse dans le choix d'un poste",
        paragraphs: [
          "Le temps de trajet domicile-travail compte ici plus qu'ailleurs. Un poste attractif à quarante-cinq minutes de transport de plus finit par être refusé, ou quitté.",
          "Le coût du logement pèse sur la décision au même titre que la rémunération, en particulier pour un praticien qui vient d'une autre région.",
          "Les centres de santé, les centres d'imagerie et les cabinets de groupe sont les structures qui recrutent le plus, et ce sont trois modes d'exercice très différents.",
        ],
      },
    ],
    faq: [
      {
        question: "Y a-t-il des zones sous-dotées en Île-de-France ?",
        answer:
          "Oui, et cela surprend souvent. Plusieurs territoires franciliens sont classés en zone d'intervention prioritaire ou d'action complémentaire, ouvrant droit à des aides conventionnelles. Le zonage se vérifie commune par commune auprès de l'Agence régionale de santé.",
      },
      {
        question: "Salariat ou installation à Paris ?",
        answer:
          "Le frein parisien n'est pas la patientèle, qui existe, mais le loyer et le coût d'installation. C'est ce qui rend le salariat en centre de santé et le cabinet de groupe plus courants ici qu'ailleurs.",
      },
    ],
  },
  {
    slug: "auvergne-rhone-alpes",
    region: "Auvergne-Rhône-Alpes",
    title: "Emploi médecin en Auvergne-Rhône-Alpes | TalentCare",
    description:
      "Postes de médecin et de praticien en Auvergne-Rhône-Alpes : Lyon, Grenoble, Saint-Étienne, Clermont-Ferrand et zones de montagne.",
    intro:
      "La région juxtapose des métropoles universitaires très attractives et des territoires de montagne durablement sous-dotés. Entre les deux, l'écart de conditions proposées est considérable.",
    sections: [
      {
        heading: "Métropoles et montagne",
        paragraphs: [
          "Lyon, Grenoble et Clermont-Ferrand forment des pôles hospitalo-universitaires qui retiennent les praticiens formés sur place et attirent au-delà de la région. Les postes y sont plus disputés, et les conditions moins négociables.",
          "Les vallées alpines et le Massif central présentent la situation inverse : peu de candidats, une demande forte, et des structures prêtes à construire un poste sur mesure.",
          "Les zones touristiques ajoutent une saisonnalité réelle, avec des pics d'activité marqués. C'est un élément à faire préciser : il change la charge de travail plusieurs mois par an.",
        ],
      },
      {
        heading: "Ce qui se négocie en zone tendue",
        paragraphs: [
          "Le temps de travail et sa répartition. Un exercice à quatre jours, ou partagé entre deux sites, est plus souvent accepté là où la structure n'a pas d'alternative.",
          "L'accompagnement de l'installation, y compris pour le conjoint et la scolarisation des enfants. Sur une mobilité régionale, c'est ce qui décide souvent de l'acceptation.",
          "Les dispositifs d'aide, qui dépendent du zonage exact de la commune. Ils se vérifient auprès de l'Agence régionale de santé, jamais sur la foi d'une annonce.",
        ],
      },
    ],
    faq: [
      {
        question: "L'exercice en station de montagne est-il saisonnier ?",
        answer:
          "L'activité l'est, pas le poste. Les structures des vallées touristiques connaissent des pics marqués en saison, avec une traumatologie importante. C'est une information à obtenir avant de signer, car elle change la charge de travail plusieurs mois par an.",
      },
      {
        question: "Faut-il être formé dans la région pour y être recruté ?",
        answer:
          "Non. Les métropoles recrutent beaucoup de praticiens formés sur place, mais les territoires tendus recrutent partout en France et accompagnent la mobilité.",
      },
    ],
  },
  {
    slug: "provence-alpes-cote-d-azur",
    region: "Provence-Alpes-Côte d'Azur",
    title: "Emploi médecin en PACA | TalentCare Santé",
    description:
      "Postes de médecin et de praticien en Provence-Alpes-Côte d'Azur : Marseille, Nice, Toulon, Aix-en-Provence et arrière-pays.",
    intro:
      "L'attractivité du littoral ne se traduit pas par une facilité de recrutement. La région compte une proportion importante de praticiens proches de la fin d'activité, et les départs ne sont pas tous remplacés.",
    sections: [
      {
        heading: "Le littoral n'est pas l'arrière-pays",
        paragraphs: [
          "Marseille, Nice et Aix-en-Provence attirent des candidatures spontanées, mais la demande de soins y est également forte, et certains quartiers restent difficiles à pourvoir.",
          "L'arrière-pays varois, les Alpes-de-Haute-Provence et les Hautes-Alpes présentent une tout autre situation : peu de praticiens, des distances importantes et des structures qui cherchent avant tout de la stabilité.",
          "Le renouvellement générationnel est le point commun aux deux : une part notable des praticiens en exercice approche de la fin de carrière, ce qui ouvre des reprises de patientèle et des successions.",
        ],
      },
      {
        heading: "Reprise, association ou salariat",
        paragraphs: [
          "La reprise d'une patientèle existante est plus fréquente ici qu'ailleurs, du fait de la pyramide des âges. Elle suppose de regarder l'état réel du cabinet, du fichier patients et du bail.",
          "L'association avec un praticien proche du départ est une voie intermédiaire : elle permet une transition progressive et limite le risque des premiers mois.",
          "Le salariat en centre de santé et en clinique reste l'option la plus simple pour un praticien qui arrive de l'extérieur et ne connaît pas le secteur.",
        ],
      },
    ],
    faq: [
      {
        question: "Est-il plus difficile de trouver un poste sur le littoral ?",
        answer:
          "Les postes littoraux reçoivent plus de candidatures, mais la demande de soins y est forte et les besoins réels. La difficulté porte moins sur l'existence des postes que sur leurs conditions, plus rarement négociables qu'en zone tendue.",
      },
      {
        question: "Comment se passe une reprise de patientèle ?",
        answer:
          "Elle se prépare. L'état du fichier patients, l'ancienneté du bail, l'équipement et le calendrier de transition avec le praticien sortant déterminent la valeur réelle de la reprise, bien plus que le prix affiché.",
      },
    ],
  },
  {
    slug: "hauts-de-france",
    region: "Hauts-de-France",
    title: "Emploi médecin en Hauts-de-France | TalentCare",
    description:
      "Postes de médecin et de praticien en Hauts-de-France : Lille, Amiens, Roubaix, Valenciennes. Densité médicale faible et besoins de recrutement élevés.",
    intro:
      "Les Hauts-de-France comptent parmi les régions où la densité de praticiens est la plus faible et où les indicateurs de santé sont les plus dégradés. Les besoins de recrutement y sont, mécaniquement, parmi les plus élevés du pays.",
    sections: [
      {
        heading: "Une région où les postes ne manquent pas",
        paragraphs: [
          "La métropole lilloise dispose d'un centre hospitalier universitaire et d'une offre privée développée, mais le reste de la région reste très en tension, notamment dans l'ancien bassin minier et en Picardie.",
          "Pour un praticien, cela signifie un choix réel entre plusieurs postes, et une capacité de négociation que peu de régions offrent.",
          "Les structures d'exercice coordonné, maisons et centres de santé, s'y sont développées fortement, portées par les collectivités et l'Agence régionale de santé.",
        ],
      },
      {
        heading: "Ce que les structures peuvent proposer",
        paragraphs: [
          "Des aides à l'installation lorsque la commune est classée en zone d'intervention prioritaire, ainsi que des dispositifs portés par les collectivités locales, distincts des aides conventionnelles.",
          "Un exercice coordonné déjà organisé, avec d'autres professionnels sur place, ce qui change radicalement la charge par rapport à un cabinet isolé.",
          "Un coût de l'immobilier sans commune mesure avec les grandes métropoles du Sud et de l'Ouest, élément qui pèse davantage sur le niveau de vie réel que la rémunération affichée.",
        ],
      },
    ],
    faq: [
      {
        question: "Les aides à l'installation sont-elles cumulables ?",
        answer:
          "Les aides conventionnelles de l'assurance maladie et les dispositifs portés par les collectivités relèvent de logiques différentes et peuvent parfois se cumuler. Les conditions se vérifient au cas par cas auprès de l'Agence régionale de santé et de la caisse d'assurance maladie du secteur.",
      },
      {
        question: "Un praticien d'une autre région peut-il s'y installer facilement ?",
        answer:
          "Oui, et c'est fréquent. Les structures de la région accompagnent activement la mobilité, précisément parce que les candidats formés sur place ne suffisent pas à couvrir les besoins.",
      },
    ],
  },
  {
    slug: "nouvelle-aquitaine",
    region: "Nouvelle-Aquitaine",
    title: "Emploi médecin en Nouvelle-Aquitaine | TalentCare",
    description:
      "Postes de médecin et de praticien en Nouvelle-Aquitaine : Bordeaux, Limoges, Poitiers, La Rochelle, Pau et zones rurales.",
    intro:
      "C'est la plus vaste région de France métropolitaine, et l'écart y est maximal entre une métropole bordelaise très demandée et des départements ruraux parmi les plus sous-dotés du pays.",
    sections: [
      {
        heading: "Bordeaux d'un côté, le rural de l'autre",
        paragraphs: [
          "Bordeaux et le bassin d'Arcachon reçoivent des candidatures de toute la France. Les postes y sont disputés et les conditions s'alignent sur celles des autres grandes métropoles attractives.",
          "L'ancien Limousin, une partie de la Charente et du Lot-et-Garonne connaissent la situation inverse, avec un vieillissement marqué de la population et des praticiens.",
          "Entre les deux, les villes moyennes, Poitiers, Angoulême, Pau, Niort, offrent souvent le meilleur compromis : une activité soutenue, un exercice coordonné organisé et un coût de la vie mesuré.",
        ],
      },
      {
        heading: "La distance est un paramètre du poste",
        paragraphs: [
          "Sur un territoire de cette étendue, le secteur d'attraction d'une structure peut couvrir plusieurs dizaines de kilomètres. Cela concerne la patientèle, mais aussi l'organisation des gardes.",
          "Les postes partagés entre deux sites sont fréquents et ne sont pas toujours annoncés comme tels. C'est une question à poser explicitement.",
          "Pour les plateaux techniques, l'imagerie notamment, la distance au site de recours détermine la nature réelle de l'activité.",
        ],
      },
    ],
    faq: [
      {
        question: "Les postes en ville moyenne sont-ils moins intéressants ?",
        answer:
          "Rarement, en pratique. L'activité y est soutenue, l'exercice souvent mieux organisé qu'en zone très rurale, et le coût de la vie sans rapport avec celui de Bordeaux. C'est le segment que beaucoup de praticiens négligent à tort.",
      },
      {
        question: "Faut-il s'attendre à un exercice sur plusieurs sites ?",
        answer:
          "C'est fréquent sur une région aussi étendue, et ce n'est pas toujours annoncé. Nous demandons systématiquement si le poste est mono-site avant de le présenter.",
      },
    ],
  },
  {
    slug: "occitanie",
    region: "Occitanie",
    title: "Emploi médecin en Occitanie | TalentCare Santé",
    description:
      "Postes de médecin et de praticien en Occitanie : Toulouse, Montpellier, Nîmes, Perpignan et arrière-pays. Croissance démographique et besoins de soins.",
    intro:
      "L'Occitanie est l'une des régions où la population croît le plus vite, portée par des arrivées venues d'autres régions. La demande de soins augmente en conséquence, sans que l'offre suive au même rythme.",
    sections: [
      {
        heading: "Une demande qui augmente plus vite que l'offre",
        paragraphs: [
          "Toulouse et Montpellier concentrent l'attractivité et les centres hospitalo-universitaires. Leur croissance démographique crée pourtant des besoins que l'offre existante ne couvre pas, y compris en cœur de métropole.",
          "Le littoral languedocien et le Gard connaissent une dynamique comparable, avec une population qui vieillit et une demande de suivi chronique en hausse.",
          "L'arrière-pays, Lozère, Aveyron, Ariège, reste parmi les territoires les plus difficiles à pourvoir de France métropolitaine.",
        ],
      },
      {
        heading: "Ce que cherchent les structures",
        paragraphs: [
          "De la stabilité avant tout. Un praticien qui s'installe durablement vaut mieux, pour une structure, qu'une succession de remplacements, et cela se traduit dans ce qu'elle est prête à concéder.",
          "Des profils capables de travailler en coordination. Les maisons de santé pluriprofessionnelles se sont largement déployées dans la région, et le mode d'exercice y est collectif.",
          "Une part croissante des recrutements concerne le suivi de patients chroniques et la prévention, davantage que les soins aigus.",
        ],
      },
    ],
    faq: [
      {
        question: "L'attractivité de la région rend-elle les postes plus difficiles à obtenir ?",
        answer:
          "Pour les postes en cœur de Toulouse ou de Montpellier, la concurrence est réelle. Mais la croissance démographique crée des besoins que ces seules métropoles ne couvrent pas : les couronnes et les villes moyennes recrutent activement.",
      },
      {
        question: "Qu'est-ce qu'une maison de santé pluriprofessionnelle ?",
        answer:
          "Une structure qui réunit plusieurs professionnels de santé autour d'un projet de santé commun, avec des locaux et des charges partagés. L'exercice reste libéral, mais l'organisation est collective, ce qui supprime l'isolement du cabinet individuel.",
      },
    ],
  },
  {
    slug: "normandie",
    region: "Normandie",
    title: "Emploi médecin en Normandie | TalentCare Santé",
    description:
      "Postes de médecin et de praticien en Normandie : Rouen, Caen, Le Havre et zones rurales. Densité faible, aides à l'installation et exercice coordonné.",
    intro:
      "La Normandie fait partie des régions où la densité de praticiens est la plus faible. Une part importante de son territoire est classée en zone sous-dotée, ce qui ouvre des dispositifs d'aide et une vraie marge de négociation.",
    sections: [
      {
        heading: "Un territoire largement sous-doté",
        paragraphs: [
          "Rouen, Caen et Le Havre disposent d'une offre hospitalière structurée, mais le reste de la région, en particulier l'Orne et une partie de la Manche, manque durablement de praticiens.",
          "Pour un praticien qui s'installe, cela signifie une patientèle immédiate et aucune montée en charge à construire. C'est un avantage réel, qui a pour contrepartie une charge d'emblée soutenue.",
          "Les collectivités locales se sont largement impliquées dans la création de maisons de santé, souvent en portant elles-mêmes les locaux.",
        ],
      },
      {
        heading: "Installation : ce qui décide de la réussite",
        paragraphs: [
          "Ce n'est pas le montant des aides. C'est l'organisation : la présence d'autres professionnels sur place, la répartition des gardes et ce qui est prévu pour vos absences.",
          "Une installation isolée en zone sous-dotée expose à une charge continue et à des difficultés pour se faire remplacer. Une maison de santé change complètement cette équation.",
          "Les aides conventionnelles dépendent du zonage exact de la commune, pas du département. Elles se vérifient auprès de l'Agence régionale de santé avant tout engagement.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelles aides pour une installation en zone sous-dotée ?",
        answer:
          "Les dispositifs conventionnels de l'assurance maladie et les aides portées par les collectivités coexistent. Leurs montants et conditions évoluent, et dépendent du classement précis de la commune : ils se vérifient auprès de l'Agence régionale de santé et de la caisse d'assurance maladie du secteur.",
      },
      {
        question: "Peut-on exercer en Normandie sans s'installer en libéral ?",
        answer:
          "Oui. Les centres de santé, les établissements hospitaliers et les cliniques de la région salarient des praticiens, sans investissement de départ ni gestion de cabinet.",
      },
    ],
  },
];

export const regionPageBySlug = new Map(regionPages.map((r) => [r.slug, r]));
export const regionPageByName = new Map(regionPages.map((r) => [r.region, r]));
