import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "block w-full rounded-lg bg-bg px-3.5 py-2.5 text-ink ring-1 ring-line",
      "placeholder:text-ink-mute focus:ring-2 focus:ring-accent-600",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
