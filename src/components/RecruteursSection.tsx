import FeatureSection, { type Feature } from "@/components/FeatureSection";

const features: Feature[] = [
  {
    icon: "users",
    title: "Vivier de talents qualifiés",
    description:
      "Accédez à notre base de professionnels de santé pré-qualifiés.",
  },
  {
    icon: "target",
    title: "Matching précis",
    description:
      "Nous identifions les profils correspondant exactement à vos besoins.",
  },
  {
    icon: "zap",
    title: "Réactivité",
    description: "Une équipe mobilisée pour répondre rapidement à vos besoins.",
  },
  {
    icon: "globe",
    title: "Engagement pour la continuité des soins",
    description:
      "Nous contribuons à assurer la présence médicale là où les besoins sont réels, au service des patients et des territoires.",
  },
];

export default function RecruteursSection() {
  return (
    <FeatureSection
      id="recruteurs"
      tone="soft"
      eyebrow="Établissements & Recruteurs"
      title="Recrutez les meilleurs talents de santé"
      intro="Hôpitaux, cliniques, EHPAD, cabinets… Nous comprenons vos enjeux et trouvons les profils adaptés."
      features={features}
      cta={{ href: "#contact", label: "Confier un recrutement" }}
    />
  );
}
