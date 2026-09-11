"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/offres-emploi/", label: "Offres d'emploi" },
  { href: "/#medecins", label: "Professionnels de santé" },
  { href: "/#recruteurs", label: "Recruteurs" },
  { href: "/fiches-metiers/", label: "Fiches métiers" },
  { href: "/blog/", label: "Blog" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="icon-pill h-9 w-9 rounded-lg">
        <Icon name="heart" className="h-[18px] w-[18px]" />
      </span>
      <span className="text-lg font-bold tracking-tight">
        TalentCare <span className="text-accent-600">Santé</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="text-ink">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition hover:text-accent-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn-primary btn-sm hidden sm:inline-flex">
            Nous contacter
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink ring-1 ring-line transition hover:bg-soft lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        className={cn("border-t border-line bg-bg lg:hidden", open ? "block" : "hidden")}
      >
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-lg px-2 py-3 font-medium text-ink-soft transition hover:bg-soft hover:text-accent-700"
              >
                {item.label}
                <Icon name="chevronRight" className="h-4 w-4 text-ink-mute" />
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/#contact" className="btn-primary w-full">
              Nous contacter
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
