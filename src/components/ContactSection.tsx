"use client";

import { useEffect, useState } from "react";

import { Icon, type IconName } from "@/components/Icon";
import Section, { SectionHeader } from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/** Ce qu'il faut d'une offre pour composer le message pré-rempli. */
export type OfferRef = {
  slug: string;
  title: string;
  lieu: string;
  reference: string;
};

const SOCIALS: { key: IconName; label: string; href: string }[] = [
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
  { key: "facebook", label: "Facebook", href: site.socials.facebook },
  { key: "instagram", label: "Instagram", href: site.socials.instagram },
];

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function ContactSection({ offers = [] }: { offers?: OfferRef[] }) {
  const [audience, setAudience] = useState("medecin");
  const [status, setStatus] = useState<Status>("idle");
  const [prefill, setPrefill] = useState("");

  /*
   * Le bouton « Postuler » d'une annonce renvoie ici avec le slug de l'offre en
   * paramètre. Le message est alors composé d'avance : sans cela, le candidat
   * arrive sur un formulaire vide et l'équipe reçoit une demande sans savoir
   * quel poste elle concerne.
   *
   * La lecture se fait après montage plutôt qu'au rendu : le site est exporté
   * en statique, la page est donc identique pour tous et ne peut pas connaître
   * le paramètre à la construction.
   */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("offre");
    if (!slug) return;
    const offer = offers.find((o) => o.slug === slug);
    if (!offer) return;
    setAudience("medecin");
    setPrefill(
      `Bonjour,\n\nJe souhaite candidater à l'offre « ${offer.title} » ` +
        `(${offer.lieu}, réf. ${offer.reference}).\n\n`,
    );
  }, [offers]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const data = new FormData(form);
    data.append("type", audience === "medecin" ? "Professionnel de santé" : "Recruteur");

    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <Section id="contact" tone="soft" width="full" labelledBy="contact-title">
      <SectionHeader
        eyebrow="Contact"
        title="Dites-nous ce que vous cherchez"
        intro="Praticien en recherche ou structure qui recrute, écrivez-nous. Le premier échange est confidentiel et sans engagement."
        id="contact-title"
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl bg-ink p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Nos coordonnées
          </p>

          <ul className="mt-6 space-y-5">
            <li className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon name="phone" className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-medium">Téléphone</span>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="text-sm text-accent-100/80 transition hover:text-white"
                >
                  {site.phone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon name="mail" className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-medium">Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-accent-100/80 transition hover:text-white"
                >
                  {site.email}
                </a>
              </span>
            </li>
          </ul>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="text-sm font-medium">Suivez-nous</p>
            <ul className="mt-3 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
                  >
                    <Icon name={s.key} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-7 inline-flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-accent-100/80">
            <Icon name="shield" className="h-4 w-4" />
            Échange confidentiel, sans engagement
          </p>
        </div>

        <div className="card">
          <Tabs value={audience} onValueChange={setAudience}>
            <TabsList className="w-full">
              <TabsTrigger value="medecin">
                <Icon name="stethoscope" className="h-4 w-4" />
                Professionnel de santé
              </TabsTrigger>
              <TabsTrigger value="recruteur">
                <Icon name="building" className="h-4 w-4" />
                Recruteur
              </TabsTrigger>
            </TabsList>

            <TabsContent value="medecin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="nom-medecin" label="Nom complet *">
                    <Input id="nom-medecin" name="nom" autoComplete="name" placeholder="Dr. Jean Dupont" required />
                  </Field>
                  <Field id="email-medecin" label="Email *">
                    <Input id="email-medecin" name="email" type="email" autoComplete="email" placeholder="jean.dupont@email.fr" required />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="tel-medecin" label="Téléphone *">
                    <Input id="tel-medecin" name="telephone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" required />
                  </Field>
                  <Field id="specialite" label="Spécialité ou métier">
                    <Input id="specialite" name="specialite" placeholder="Médecin généraliste, IDE..." />
                  </Field>
                </div>
                <Field id="message-medecin" label="Parlez-nous de votre recherche">
                  <Textarea
                    id="message-medecin"
                    name="message"
                    rows={prefill ? 6 : 4}
                    defaultValue={prefill}
                    key={prefill}
                    placeholder="Type de poste recherché, localisation souhaitée, disponibilité..."
                  />
                </Field>
                <button type="submit" className="btn-primary w-full" disabled={sending}>
                  {sending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Icon name="send" className="h-[18px] w-[18px]" />
                      Envoyer ma candidature
                    </>
                  )}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="recruteur">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="nom-recruteur" label="Nom complet *">
                    <Input id="nom-recruteur" name="nom" autoComplete="name" placeholder="Marie Martin" required />
                  </Field>
                  <Field id="email-recruteur" label="Email *">
                    <Input id="email-recruteur" name="email" type="email" autoComplete="email" placeholder="marie.martin@etablissement.fr" required />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="tel-recruteur" label="Téléphone *">
                    <Input id="tel-recruteur" name="telephone" type="tel" autoComplete="tel" placeholder="01 23 45 67 89" required />
                  </Field>
                  <Field id="etablissement" label="Établissement">
                    <Input id="etablissement" name="etablissement" autoComplete="organization" placeholder="Nom de votre structure" />
                  </Field>
                </div>
                <Field id="message-recruteur" label="Décrivez votre besoin">
                  <Textarea id="message-recruteur" name="message" rows={4} placeholder="Profil recherché, type de contrat, urgence du recrutement..." />
                </Field>
                <button type="submit" className="btn-primary w-full" disabled={sending}>
                  {sending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Icon name="send" className="h-[18px] w-[18px]" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Confirmation en ligne : elle reste visible, contrairement à une notification éphémère. */}
          <p role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm">
            {status === "sent" && (
              <span className="inline-flex items-center gap-2 font-medium text-accent-700">
                <Icon name="check" className="h-4 w-4" />
                Message bien reçu. On revient vers vous rapidement.
              </span>
            )}
            {status === "error" && (
              <span className="font-medium text-ink">
                L&apos;envoi a échoué. Réessayez, ou écrivez-nous à {site.email}.
              </span>
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}
