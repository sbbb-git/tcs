import Section from "@/components/Section";
import { Icon } from "@/components/Icon";

/*
 * Un échange réel, publié par le cabinet sur son propre compte. C'est la seule
 * parole du site qui ne soit pas une formule de présentation, et elle dit la
 * méthode mieux que n'importe quelle liste d'arguments : on part du projet du
 * praticien, pas du catalogue de postes.
 *
 * Aucun visage ne l'accompagne, et c'est délibéré : associer un portrait à une
 * phrase revient à faire dire cette phrase à la personne photographiée.
 */
export default function QuoteSection() {
  return (
    <Section tone="soft" width="wide" labelledBy="parole-title">
      <h2 id="parole-title" className="sr-only">
        Notre façon de travailler
      </h2>

      <figure className="mx-auto max-w-3xl text-center">
        <Icon name="message" className="mx-auto h-7 w-7 text-accent-600" />

        <blockquote className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft md:text-xl">
          <p>
            Ce matin, un médecin m&apos;appelle, un peu hésitant. Plusieurs
            opportunités sur la table, mais aucune qui lui ressemble vraiment.
          </p>
          <p>
            On a pris le temps d&apos;échanger : son rythme idéal, le type de
            structure qu&apos;il cherchait, libéral ou salariat et pourquoi.
          </p>
          <p className="font-medium text-ink">
            En clarifiant tout ça, les choses se sont débloquées. Pas besoin de
            multiplier les candidatures quand le projet est clair.
          </p>
        </blockquote>

        <figcaption className="mt-8 text-sm font-medium text-ink-mute">
          Marion, TalentCare Santé
        </figcaption>
      </figure>
    </Section>
  );
}
