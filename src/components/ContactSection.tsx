"use client";

import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const socialIcons = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
} as const;

export default function ContactSection() {
  const [audience, setAudience] = useState("medecin");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const data = new FormData(form);
    data.append(
      "type",
      audience === "medecin" ? "Professionnel de santé" : "Recruteur",
    );

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
    <section
      id="contact"
      className="bg-secondary/50 px-4 py-20"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Contact
          </p>
          <h2
            id="contact-title"
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Parlons de votre projet
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Que vous soyez professionnel de santé ou recruteur, notre équipe est
            à votre écoute.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="border-none bg-primary text-primary-foreground shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle as="h3" className="text-xl">
                Nos coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">Email</p>
                  {/*
                    data-cfemail-skip / the cf_email markers matter on Cloudflare:
                    its email obfuscation rewrites mailto: links into a technical
                    URL that answers 404 to crawlers. Keep the option disabled.
                  */}
                  <a
                    href={`mailto:${site.email}`}
                    className="__cf_email__-skip text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    Envoyez-nous un message
                  </a>
                </div>
              </div>

              <div className="border-t border-primary-foreground/20 pt-6">
                <p className="mb-3 font-medium">Suivez-nous</p>
                <ul className="flex gap-3">
                  {(
                    Object.entries(site.socials) as [
                      keyof typeof socialIcons,
                      string,
                    ][]
                  ).map(([key, href]) => {
                    const Icon = socialIcons[key];
                    const label = key[0].toUpperCase() + key.slice(1);
                    return (
                      <li key={key}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-primary-foreground/20 pt-6">
                <p className="text-sm text-primary-foreground/80">
                  <Clock className="mr-2 inline h-4 w-4" aria-hidden="true" />
                  Réponse garantie sous 24h
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-card shadow-lg lg:col-span-2">
            <CardContent className="p-6">
              <Tabs value={audience} onValueChange={setAudience}>
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="medecin" className="gap-2">
                    <Stethoscope className="h-4 w-4" aria-hidden="true" />
                    Professionnel de santé
                  </TabsTrigger>
                  <TabsTrigger value="recruteur" className="gap-2">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    Recruteur
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="medecin">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nom-medecin">Nom complet *</Label>
                        <Input
                          id="nom-medecin"
                          name="nom"
                          autoComplete="name"
                          placeholder="Dr. Jean Dupont"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-medecin">Email *</Label>
                        <Input
                          id="email-medecin"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jean.dupont@email.fr"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tel-medecin">Téléphone *</Label>
                        <Input
                          id="tel-medecin"
                          name="telephone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="06 12 34 56 78"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialite">Spécialité / Métier</Label>
                        <Input
                          id="specialite"
                          name="specialite"
                          placeholder="Ex: Médecin généraliste, IDE…"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-medecin">
                        Parlez-nous de votre recherche
                      </Label>
                      <Textarea
                        id="message-medecin"
                        name="message"
                        rows={4}
                        placeholder="Type de poste recherché, localisation souhaitée, disponibilité…"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={sending}
                    >
                      {sending ? (
                        "Envoi en cours…"
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          Envoyer ma candidature
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="recruteur">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nom-recruteur">Nom complet *</Label>
                        <Input
                          id="nom-recruteur"
                          name="nom"
                          autoComplete="name"
                          placeholder="Marie Martin"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-recruteur">Email *</Label>
                        <Input
                          id="email-recruteur"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="marie.martin@etablissement.fr"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tel-recruteur">Téléphone *</Label>
                        <Input
                          id="tel-recruteur"
                          name="telephone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="01 23 45 67 89"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="etablissement">Établissement</Label>
                        <Input
                          id="etablissement"
                          name="etablissement"
                          autoComplete="organization"
                          placeholder="Nom de votre structure"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-recruteur">
                        Décrivez votre besoin
                      </Label>
                      <Textarea
                        id="message-recruteur"
                        name="message"
                        rows={4}
                        placeholder="Profil recherché, type de contrat, urgence du recrutement…"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={sending}
                    >
                      {sending ? (
                        "Envoi en cours…"
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Inline confirmation: stays on screen, unlike a toast. */}
              <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-[1.5rem] text-sm"
              >
                {status === "sent" && (
                  <span className="inline-flex items-center gap-2 font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Message envoyé. Notre équipe vous recontacte sous 24h.
                  </span>
                )}
                {status === "error" && (
                  <span className="font-medium text-destructive">
                    L&apos;envoi a échoué. Réessayez, ou écrivez-nous à{" "}
                    {site.email}.
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
