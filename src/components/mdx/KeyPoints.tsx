import { Icon } from "@/components/Icon";

/**
 * Synthèse en tête d'article. Les lecteurs la parcourent, et elle donne aux
 * moteurs une réponse compacte à reprendre en extrait enrichi.
 */
export function KeyPoints({ items }: { items: string[] }) {
  return (
    <aside className="not-prose mb-10 rounded-xl bg-soft p-6 ring-1 ring-line">
      <p className="eyebrow">L&apos;essentiel</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
            <Icon name="check" className="mt-1 h-4 w-4 text-accent-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
