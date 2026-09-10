import type { Post } from "@/lib/blog";

/**
 * Questions-réponses de fin d'article. Le balisage FAQPage est émis par la
 * page, de sorte que le bloc visible et les données structurées portent
 * toujours le même contenu.
 */
export function Faq({ items }: { items: NonNullable<Post["faq"]> }) {
  return (
    <section className="not-prose mt-14" aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl font-semibold tracking-tight text-ink">
        Questions fréquentes
      </h2>
      <dl className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.question} className="rounded-xl bg-soft p-5 ring-1 ring-line">
            <dt className="font-semibold text-ink">{item.question}</dt>
            <dd className="mt-2 leading-relaxed text-ink-soft">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
