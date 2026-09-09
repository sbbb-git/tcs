import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Grâce à TalentCare Santé, j'ai trouvé un poste qui correspond parfaitement à mes attentes. L'accompagnement personnalisé a fait toute la différence.",
    initials: "SL",
    name: "Dr. S. Lemoine",
    role: "Médecin généraliste",
  },
  {
    quote:
      "Une collaboration efficace et réactive. L'équipe a su identifier rapidement les profils dont nous avions besoin pour renforcer nos équipes.",
    initials: "CH",
    name: "Centre Hospitalier Régional",
    role: "Établissement public",
  },
  {
    quote:
      "Professionnalisme et discrétion exemplaires. Je recommande vivement TalentCare Santé à tous mes confrères en recherche de nouvelles opportunités.",
    initials: "AM",
    name: "Dr. A. Moreau",
    role: "Chirurgien",
  },
  {
    quote:
      "Leur connaissance du secteur et la qualité des candidats proposés sont remarquables. Un partenaire de confiance pour nos recrutements.",
    initials: "CP",
    name: "Clinique Privée du Parc",
    role: "Établissement privé",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="bg-secondary/50 px-4 py-20"
      aria-labelledby="temoignages-title"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Témoignages
          </p>
          <h2
            id="temoignages-title"
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Ils nous font confiance
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez les retours de nos clients, professionnels de santé et
            établissements qui ont choisi TalentCare Santé.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className="flex">
              <Card className="w-full border-none bg-card shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6">
                  <figure>
                    <blockquote className="mb-6 italic text-foreground">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="flex items-center gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                        aria-hidden="true"
                      >
                        {testimonial.initials}
                      </span>
                      <span>
                        <span className="block font-semibold text-foreground">
                          {testimonial.name}
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {testimonial.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
