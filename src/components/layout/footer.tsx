"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { areas } from "@/lib/data/areas";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const highlightAreas = areas.slice(0, 6);

  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-app grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
              <GraduationCap className="h-4 w-4" />
            </span>
            Aprenda
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Escola digital com professores de inteligência artificial. Cursos, formações e
            acompanhamento personalizado por um preço acessível.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Áreas em destaque</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {highlightAreas.map((area) => (
              <li key={area.id}>
                <Link href={`/profissoes/${area.slug}`} className="hover:text-foreground">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Plataforma</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/descobrir" className="hover:text-foreground">Descobrir profissão</Link></li>
            <li><Link href="/planos" className="hover:text-foreground">Planos</Link></li>
            <li><Link href="/buscar" className="hover:text-foreground">Pesquisar</Link></li>
            <li><Link href="/dashboard" className="hover:text-foreground">Área do aluno</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Aprenda. Todos os direitos reservados.
      </div>
    </footer>
  );
}
