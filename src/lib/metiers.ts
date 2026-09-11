import type { IconName } from "@/components/Icon";

/**
 * Spécialités couvertes par le jobboard.
 *
 * Le périmètre est volontairement étroit : médecins et sages-femmes, sur Paris.
 * Une taxonomie large produirait des pages sans offres derrière, et des pages
 * quasi identiques déclinant une même trame, que Google traite comme des pages
 * satellites.
 *
 * Pour ajouter une spécialité : écrire son contenu ici, puis créer les offres
 * correspondantes dans content/offres.
 */
export type Metier = {
  slug: string;
  name: string;
  plural: string;
  icon: IconName;
  /** Balise title, 60 caractères maximum. */
  title: string;
  /** Meta description, 110 à 160 caractères. */
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
  relatedPost?: string;
  /**
   * Illustration propre à la spécialité, quand il en existe une qui montre
   * réellement de quoi le métier est fait. Absente par défaut : une photo
   * générique posée sur les sept pages n'apprendrait rien et se verrait.
   */
  image?: { src: string; alt: string; width: number; height: number };
};

export const metiers: Metier[] = [
  {
    slug: "medecin-generaliste",
    name: "Médecin généraliste",
    plural: "Médecins généralistes",
    icon: "stethoscope",
    image: {
      src: "/images/metier-generaliste.webp",
      alt: "Auscultation d'un patient au stéthoscope lors d'une consultation",
      width: 1400,
      height: 460,
    },
    title: "Emploi médecin généraliste à Paris | TalentCare",
    description:
      "Postes de médecin généraliste à Paris : centre de santé, cabinet de groupe, salariat ou libéral. Patientèle constituée, pas de gestion administrative.",
    intro:
      "À Paris, le médecin généraliste choisit surtout entre deux modèles : le salariat en centre de santé, sans gestion de cabinet, et l'installation en cabinet de groupe. Les deux recrutent.",
    sections: [
      {
        heading: "Salariat ou installation",
        paragraphs: [
          "Le salariat en centre de santé supprime la gestion de cabinet, l'investissement de départ et les charges professionnelles. Le revenu est prévisible dès le premier mois. L'organisation est collective, donc moins souple qu'en libéral.",
          "L'installation en cabinet de groupe garde l'indépendance du libéral. À Paris, le frein n'est pas la patientèle, elle existe, mais le loyer et le coût d'installation.",
          "L'exercice mixte, une part salariée et une part libérale, reste possible et fréquent.",
        ],
      },
      {
        heading: "Ce qui se vérifie avant d'accepter",
        paragraphs: [
          "Le nombre de praticiens de la structure et leur ancienneté. Une équipe qui tourne beaucoup signale un problème d'organisation.",
          "La durée de consultation retenue et le nombre de patients attendus par demi-journée. C'est ce qui détermine le rythme réel du poste.",
          "Le secrétariat, la coordination et les outils. À charge égale, ils font la différence entre une journée tenable et une journée subie.",
        ],
      },
    ],
    faq: [
      {
        question: "Peut-on exercer en salariat comme généraliste à Paris ?",
        answer:
          "Oui. Les centres de santé parisiens salarient leurs médecins : pas de gestion de cabinet, pas de charges professionnelles, couverture sociale du salariat et revenu connu à l'avance.",
      },
      {
        question: "Faut-il racheter une patientèle à Paris ?",
        answer:
          "Pas en centre de santé, où la patientèle est celle de la structure. En installation libérale, la reprise d'un cabinet existant reste une option, mais elle n'est pas la seule : la demande parisienne permet aussi de constituer une patientèle.",
      },
    ],
    relatedPost: "exercice-coordonne-msp-centre-de-sante-cpts",
  },
  {
    slug: "radiologue",
    name: "Radiologue",
    plural: "Radiologues",
    icon: "scan",
    image: {
      src: "/images/imagerie.webp",
      alt: "Console d'interprétation d'imagerie médicale, coupe et outils de lecture",
      width: 1600,
      height: 700,
    },
    title: "Emploi radiologue à Paris | TalentCare Santé",
    description:
      "Postes de radiologue à Paris en centre d'imagerie et en établissement. Plateau technique, part de téléradiologie et organisation des vacations.",
    intro:
      "L'imagerie parisienne est dense mais les postes restent difficiles à pourvoir. Ce qui distingue deux offres tient au plateau, à la part de téléradiologie et au rythme des vacations.",
    sections: [
      {
        heading: "Le plateau détermine le poste",
        paragraphs: [
          "Équipements disponibles, âge du parc, délais de rendez-vous, part de scanner et d'IRM par rapport à la radiologie conventionnelle et à l'échographie. Un radiologue évalue d'abord cela.",
          "Les autorisations d'équipement lourd relèvent de l'Agence régionale de santé. Un centre qui attend une autorisation et un centre qui l'a obtenue ne proposent pas la même activité.",
        ],
      },
      {
        heading: "Téléradiologie et organisation",
        paragraphs: [
          "La part d'interprétation à distance varie fortement d'une structure à l'autre. Elle peut être un atout, elle peut aussi vider le poste de sa dimension clinique. La proportion doit être annoncée.",
          "Le rythme des vacations, la participation à la permanence des soins et l'existence d'une équipe de manipulateurs stable complètent la description.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle est la part de téléradiologie dans un poste ?",
        answer:
          "Elle dépend entièrement de la structure, de quasi nulle à majoritaire. C'est une question à poser avant tout entretien : elle change la nature du travail et le rapport au patient.",
      },
      {
        question: "Faut-il un DES pour exercer en imagerie ?",
        answer:
          "L'exercice de la radiologie et de l'imagerie médicale suppose le diplôme d'études spécialisées correspondant. Certaines activités d'échographie sont accessibles à d'autres praticiens titulaires d'une formation dédiée.",
      },
    ],
  },
  {
    slug: "orl",
    name: "ORL",
    plural: "ORL",
    icon: "ear",
    image: {
      src: "/images/metier-orl.webp",
      alt: "Examen du conduit auditif à l'otoscope",
      width: 1400,
      height: 460,
    },
    title: "Emploi ORL à Paris | TalentCare Santé",
    description:
      "Postes d'oto-rhino-laryngologiste à Paris, en cabinet de groupe comme en établissement. Part de consultation, d'exploration et de chirurgie.",
    intro:
      "L'ORL couvre un éventail large, de la consultation simple à la chirurgie cervico-faciale. Le contenu d'un poste dépend de ce que la structure permet réellement.",
    sections: [
      {
        heading: "Trois activités très différentes",
        paragraphs: [
          "La consultation, avec sa part d'audiologie et de vertiges. L'exploration fonctionnelle, qui suppose un équipement dédié. La chirurgie, qui suppose un accès au bloc.",
          "Un poste décrit comme « ORL » sans plus de précision peut recouvrir l'une ou l'ensemble de ces activités. C'est la première chose à clarifier.",
        ],
      },
      {
        heading: "Ce que la structure doit préciser",
        paragraphs: [
          "L'équipement disponible en consultation : audiométrie, vidéonystagmographie, fibroscopie, matériel d'exploration.",
          "L'accès au bloc s'il y a une activité chirurgicale : nombre de vacations, spécialités partagées, personnel de bloc.",
          "L'articulation avec les audioprothésistes et les orthophonistes du secteur.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il un plateau d'exploration pour exercer l'ORL en ville ?",
        answer:
          "Une part de l'activité s'exerce sans équipement lourd, mais l'audiométrie et la fibroscopie changent ce qu'il est possible de faire en consultation. Un cabinet qui en dispose et un cabinet qui adresse systématiquement ne proposent pas le même exercice.",
      },
      {
        question: "Un poste d'ORL inclut-il forcément de la chirurgie ?",
        answer:
          "Non. Beaucoup de postes parisiens sont exclusivement en consultation et exploration. À l'inverse, un praticien qui souhaite maintenir une activité chirurgicale doit vérifier l'accès effectif au bloc et le nombre de vacations.",
      },
    ],
  },
  {
    slug: "medecin-esthetique",
    name: "Médecin esthétique",
    plural: "Médecins esthétiques",
    icon: "sparkles",
    image: {
      src: "/images/metier-esthetique.webp",
      alt: "Geste de médecine esthétique sur le visage d'une patiente",
      width: 1400,
      height: 460,
    },
    title: "Emploi médecin esthétique à Paris | TalentCare",
    description:
      "Postes de médecin esthétique à Paris en centre et en cabinet. Formation requise, cadre déontologique de la publicité et organisation de l'activité.",
    intro:
      "La médecine esthétique n'est pas une spécialité au sens du diplôme d'études spécialisées. Elle s'exerce sur la base d'une formation complémentaire, dans un cadre déontologique strict.",
    sections: [
      {
        heading: "Un exercice encadré",
        paragraphs: [
          "Il n'existe pas de DES de médecine esthétique. L'activité est exercée par des praticiens de différentes origines, sur la base de diplômes universitaires ou interuniversitaires dédiés.",
          "Les règles déontologiques de la profession médicale s'appliquent intégralement, en particulier sur la communication et l'information du patient. Elles sont consultables auprès du Conseil national de l'Ordre des médecins.",
        ],
      },
      {
        heading: "Ce qui distingue deux postes",
        paragraphs: [
          "Les actes réellement pratiqués et le matériel disponible : injections, lasers, appareils dédiés. Un centre équipé et un cabinet sans plateau ne proposent pas la même activité.",
          "Le mode de rémunération, qui varie sensiblement selon les structures, et la part de consultation initiale par rapport aux actes.",
          "La provenance de la patientèle et la façon dont la structure la constitue.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle formation pour exercer la médecine esthétique ?",
        answer:
          "Il n'existe pas de diplôme d'études spécialisées correspondant. L'exercice repose sur des diplômes universitaires ou interuniversitaires, et sur la formation continue. Les conditions se vérifient auprès du conseil départemental de l'Ordre.",
      },
      {
        question: "La publicité est-elle autorisée en médecine esthétique ?",
        answer:
          "La communication des médecins est encadrée par le code de déontologie. Les possibilités ont évolué ces dernières années, mais restent bornées. C'est un point à vérifier auprès de l'Ordre plutôt qu'à supposer.",
      },
    ],
  },
  {
    slug: "sage-femme",
    name: "Sage-femme",
    plural: "Sages-femmes",
    icon: "baby",
    title: "Emploi sage-femme à Paris | TalentCare Santé",
    description:
      "Postes de sage-femme à Paris en maternité, cabinet et centre de santé. Profession médicale, suivi gynécologique de prévention et contraception.",
    intro:
      "La sage-femme est une profession médicale, avec un champ de compétences plus large que ce que l'on suppose souvent : suivi de grossesse, accouchement, suites de couches, mais aussi suivi gynécologique de prévention et contraception.",
    sections: [
      {
        heading: "Des cadres d'exercice distincts",
        paragraphs: [
          "En maternité, l'activité s'organise autour de la salle de naissance, des consultations et des suites de couches. Le niveau de la maternité et son volume d'accouchements déterminent le rythme.",
          "En libéral ou en centre de santé, l'activité penche vers le suivi de grossesse, la préparation à la naissance, la rééducation périnéale et le suivi gynécologique de prévention.",
        ],
      },
      {
        heading: "Ce qui se vérifie",
        paragraphs: [
          "L'inscription au tableau de l'Ordre des sages-femmes est obligatoire pour exercer.",
          "En structure, l'effectif réel en salle de naissance et le ratio par rapport au nombre d'accouchements. C'est le premier facteur de tension du métier.",
        ],
      },
    ],
    faq: [
      {
        question: "Une sage-femme peut-elle assurer un suivi gynécologique ?",
        answer:
          "Oui. Le champ de compétences des sages-femmes comprend le suivi gynécologique de prévention et la prescription de contraception pour les femmes en bonne santé. Le détail figure au code de la santé publique.",
      },
      {
        question: "Faut-il être inscrite à l'Ordre pour exercer ?",
        answer:
          "Oui, l'inscription au tableau de l'Ordre des sages-femmes conditionne l'exercice, quel que soit le mode d'activité.",
      },
    ],
  },
  {
    slug: "sage-femme-echographiste",
    name: "Sage-femme échographiste",
    plural: "Sages-femmes échographistes",
    icon: "activity",
    image: {
      src: "/images/metier-echo-obstetrique.webp",
      alt: "Échographie obstétricale, image fœtale à l'écran",
      width: 1400,
      height: 460,
    },
    title: "Emploi sage-femme échographiste à Paris | TalentCare",
    description:
      "Postes de sage-femme échographiste à Paris. Diplôme d'échographie requis, échographies de dépistage, organisation des vacations et matériel.",
    intro:
      "L'échographie obstétricale exercée par une sage-femme suppose une formation dédiée en plus du diplôme d'État. Les structures parisiennes recrutent sur ce profil, en maternité comme en centre.",
    sections: [
      {
        heading: "La formation conditionne le poste",
        paragraphs: [
          "L'exercice de l'échographie obstétricale suppose un diplôme interuniversitaire d'échographie, distinct du diplôme d'État de sage-femme.",
          "Selon la formation et l'organisation de la structure, l'activité couvre les échographies de dépistage des trois trimestres, et parfois une part de suivi.",
        ],
      },
      {
        heading: "Ce qui distingue deux structures",
        paragraphs: [
          "Le matériel : génération des appareils, sondes disponibles, logiciel de compte rendu.",
          "L'organisation des vacations et le temps alloué par examen. C'est ce qui détermine la qualité possible de l'examen autant que le confort de travail.",
          "L'articulation avec les médecins échographistes de la structure et le recours en cas d'anomalie dépistée.",
        ],
      },
    ],
    faq: [
      {
        question: "Une sage-femme échographiste travaille-t-elle seule ?",
        answer:
          "Non, et c'est un point à vérifier. L'organisation doit prévoir un recours vers un médecin échographiste en cas d'anomalie dépistée. Une structure qui ne l'a pas prévu fait porter au praticien une responsabilité qui ne devrait pas être la sienne seule.",
      },
      {
        question: "Quelle formation pour pratiquer l'échographie comme sage-femme ?",
        answer:
          "Un diplôme interuniversitaire d'échographie, suivi en complément du diplôme d'État de sage-femme. Les conditions d'accès et le contenu varient selon les universités.",
      },
    ],
  },
  {
    slug: "medecin-echographiste",
    name: "Médecin échographiste",
    plural: "Médecins échographistes",
    icon: "target",
    image: {
      src: "/images/metier-echographie.webp",
      alt: "Console d'échographie pendant un examen",
      width: 1400,
      height: 460,
    },
    title: "Emploi médecin échographiste à Paris | TalentCare",
    description:
      "Postes de médecin échographiste à Paris en centre d'imagerie et en cabinet. Échographie générale, gynécologique et obstétricale, matériel et vacations.",
    intro:
      "L'échographie est pratiquée par des praticiens d'origines variées, titulaires d'une formation dédiée. Les centres parisiens recrutent sur ce profil, en complément ou en dehors de la radiologie.",
    sections: [
      {
        heading: "Un exercice ouvert à plusieurs parcours",
        paragraphs: [
          "L'échographie n'est pas réservée à une spécialité unique. Elle est pratiquée par des radiologues, des gynécologues et d'autres praticiens titulaires d'un diplôme interuniversitaire d'échographie.",
          "Le champ couvert dépend de la formation suivie : échographie générale, gynécologique et obstétricale, ou domaines plus spécifiques.",
        ],
      },
      {
        heading: "Ce qui compte dans un poste",
        paragraphs: [
          "Le matériel disponible et son renouvellement. En échographie, la qualité de l'appareil conditionne directement celle de l'examen.",
          "Le temps alloué par examen et le nombre de vacations. Un rythme trop serré dégrade l'examen avant de dégrader le praticien.",
          "L'organisation du compte rendu et le circuit prévu en cas de doute.",
        ],
      },
    ],
    faq: [
      {
        question: "L'échographie est-elle réservée aux radiologues ?",
        answer:
          "Non. Elle est pratiquée par des praticiens de plusieurs origines dès lors qu'ils justifient d'une formation dédiée. C'est ce qui explique la variété des profils recrutés sur ces postes.",
      },
      {
        question: "Quelle formation pour pratiquer l'échographie ?",
        answer:
          "En dehors du diplôme d'études spécialisées de radiologie, l'exercice repose sur un diplôme interuniversitaire d'échographie, dont le champ dépend de la formation suivie.",
      },
    ],
  },
];

export const metierBySlug = new Map(metiers.map((m) => [m.slug, m]));
