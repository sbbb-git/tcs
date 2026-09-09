import { Info, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "warning";
  title?: string;
  children: React.ReactNode;
};

/** Highlights a practical caveat inside an article without breaking the page rhythm. */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = type === "warning" ? TriangleAlert : Info;

  return (
    <aside
      className={cn(
        "mb-6 rounded-lg border-l-4 bg-card p-5 shadow-sm",
        type === "warning" ? "border-destructive" : "border-primary",
      )}
    >
      <p
        className={cn(
          "mb-2 inline-flex items-center gap-2 font-semibold",
          type === "warning" ? "text-destructive" : "text-primary",
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {title ?? (type === "warning" ? "À noter" : "Bon à savoir")}
      </p>
      <div className="[&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
