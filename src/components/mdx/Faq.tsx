import type { Post } from "@/lib/blog";

/**
 * Bloc questions-réponses de fin d'article. Le balisage FAQPage associé est
 * émis par la page : les deux décrivent donc toujours le même contenu, ce que
 * Google exige — une FAQ déclarée mais invisible est une infraction.
 */
export function Faq({ items }: { items: NonNullable<Post["faq"]> }) {
  return (
    <section className="mt-14" aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-6 text-2xl font-bold text-foreground">
        Questions fréquentes
      </h2>
      <dl className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-lg border border-border bg-card p-6"
          >
            <dt className="mb-2 font-semibold text-foreground">{item.question}</dt>
            <dd className="leading-relaxed text-muted-foreground">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
