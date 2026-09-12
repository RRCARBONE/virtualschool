"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, Search, X } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/profissoes", label: "Profissões" },
  { href: "/descobrir", label: "Descobrir profissão" },
  { href: "/planos", label: "Planos" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          Aprenda
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground",
                pathname?.startsWith(link.href) && "bg-surface-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/buscar"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-muted hover:text-foreground"
            aria-label="Pesquisar"
          >
            <Search className="h-5 w-5" />
          </Link>
          <LinkButton href="/login" variant="ghost" size="sm">
            Entrar
          </LinkButton>
          <LinkButton href="/cadastro" variant="primary" size="sm">
            Começar agora
          </LinkButton>
        </div>

        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-app flex flex-col gap-1 py-4">
            <Link href="/buscar" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-muted" onClick={() => setOpen(false)}>
              🔎 Pesquisar
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <LinkButton href="/login" variant="outline" onClick={() => setOpen(false)}>
                Entrar
              </LinkButton>
              <LinkButton href="/cadastro" variant="primary" onClick={() => setOpen(false)}>
                Começar agora
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
