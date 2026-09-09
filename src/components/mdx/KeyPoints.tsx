import { Check } from "lucide-react";

/**
 * A short summary block at the top of long articles. Readers skim it, and it
 * gives search engines a compact answer to lift into a featured snippet.
 */
export function KeyPoints({ items }: { items: string[] }) {
  return (
    <aside className="mb-8 rounded-lg border border-border bg-card p-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
        L&apos;essentiel
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <Check
              className="mt-1 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
