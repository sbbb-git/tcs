import type { ReactNode } from "react";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "warning";
  title?: string;
  children: ReactNode;
};

/**
 * Encart secondaire, posé là où la question se pose dans la lecture.
 *
 * Son registre visuel reste volontairement en dessous de celui de l'appel au
 * contact : un encart qui crie aussi fort lui prend ses clics. `not-prose`
 * empêche les règles du texte long de s'appliquer à l'intérieur.
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const warning = type === "warning";

  return (
    <aside
      className={cn(
        "not-prose my-8 rounded-xl p-5 ring-1",
        warning ? "bg-soft ring-accent-200" : "bg-soft ring-line",
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-accent-700">
        <Icon name={warning ? "alert" : "info"} className="h-4 w-4" />
        {title ?? (warning ? "À noter" : "Bon à savoir")}
      </p>
      <div className="mt-2.5 space-y-3 leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-accent-700 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </aside>
  );
}
