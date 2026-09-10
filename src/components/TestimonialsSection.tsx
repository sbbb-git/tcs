import { Icon, type IconName } from "@/components/Icon";
import Section, { SectionHeader } from "@/components/Section";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /*
   * Une icône de rôle, jamais les initiales du nom : une grille de pastilles
   * « SL CH AM CP » ressemble à des avatars par défaut, pas à un pictogramme.
   */
  icon: IconName;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Grâce à TalentCare Santé, j'ai trouvé un poste qui correspond parfaitement à mes attentes. L'accompagnement personnalisé a fait toute la différence.",
    name: "Dr. S. Lemoine",
    role: "Médecin généraliste",
    icon: "stethoscope",
  },
  {
    quote:
      "Une collaboration efficace et réactive. L'équipe a su identifier rapidement les profils dont nous avions besoin pour renforcer nos équipes.",
    name: "Centre Hospitalier Régional",
    role: "Établissement public",
    icon: "building",
  },
  {
    quote:
      "Professionnalisme et discrétion exemplaires. Je recommande vivement TalentCare Santé à tous mes confrères en recherche de nouvelles opportunités.",
    name: "Dr. A. Moreau",
    role: "Chirurgien",
    icon: "shield",
  },
  {
    quote:
      "Leur connaissance du secteur et la qualité des candidats proposés sont remarquables. Un partenaire de confiance pour nos recrutements.",
    name: "Clinique Privée du Parc",
    role: "Établissement privé",
    icon: "handshake",
  },
];

export default function TestimonialsSection() {
  return (
    <Section id="temoignages" tone="soft" labelledBy="temoignages-title">
      <SectionHeader
        eyebrow="Témoignages"
        title="Ils nous font confiance"
        intro="Les retours des professionnels de santé et des établissements que nous avons accompagnés."
        id="temoignages-title"
      />

      <ul className="grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <li key={item.name}>
            <figure className="card h-full">
              <Icon name="message" className="h-6 w-6 text-accent-300" />
              <blockquote className="mt-4 leading-relaxed text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                <span className="icon-pill-soft h-10 w-10">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.name}</span>
                  <span className="block text-xs text-ink-mute">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
