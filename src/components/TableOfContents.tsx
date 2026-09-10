import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Sommaire construit à partir des titres de l'article. Il fournit les ancres
 * que Google utilise pour proposer un accès direct à une section.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-labelledby="sommaire-title"
      className="not-prose mb-10 rounded-xl bg-soft p-6 ring-1 ring-line"
    >
      <p id="sommaire-title" className="eyebrow">
        Sommaire
      </p>
      <ol className="mt-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
            <a
              href={`#${heading.id}`}
              className="text-ink-soft transition hover:text-accent-700"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
