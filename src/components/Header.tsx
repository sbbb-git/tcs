"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#medecins", label: "Professionnels de santé" },
  { href: "/#recruteurs", label: "Recruteurs" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer on navigation, otherwise it survives the route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold text-foreground">
            TalentCare <span className="text-primary">Santé</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/#contact">Nous contacter</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navigation mobile"
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="container mx-auto flex flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-2 py-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild className="w-full">
              <Link href="/#contact">Nous contacter</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
