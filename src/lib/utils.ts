import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "2026-05-12" -> "12 mai 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T12:00:00Z`));
}
