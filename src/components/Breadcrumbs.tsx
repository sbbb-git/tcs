import Link from "next/link";

import { Icon } from "@/components/Icon";

export type Crumb = { name: string; path: string };

/**
 * Fil d'Ariane visible. Le balisage BreadcrumbList correspondant est émis par la
 * page elle-même, de sorte que les deux décrivent toujours le même chemin.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-mute">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition hover:text-accent-700">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
