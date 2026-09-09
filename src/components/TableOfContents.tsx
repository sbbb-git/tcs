import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Static table of contents built from the article's own headings. It gives
 * long-form pages a set of in-page anchors, which is what Google uses to offer
 * "jump to section" links in a result.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-labelledby="sommaire-title"
      className="mb-10 rounded-lg border border-border bg-card p-6"
    >
      <p
        id="sommaire-title"
        className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
      >
        Sommaire
      </p>
      <ol className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(heading.level === 3 && "pl-4")}
          >
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
