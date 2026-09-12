import Link from "next/link";
import {
  BookOpen, Bot, Briefcase, GraduationCap, LayoutDashboard, Layers, Users,
} from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const navItems = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/profissoes", label: "Profissões", icon: Briefcase },
  { href: "/admin/formacoes", label: "Formações", icon: Layers },
  { href: "/admin/cursos", label: "Cursos", icon: BookOpen },
  { href: "/admin/professores-ia", label: "Professores IA", icon: Bot },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-muted">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface p-5 lg:flex">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          Aprenda <span className="font-normal text-muted">/ admin</span>
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard" className="mt-auto text-sm font-medium text-brand hover:underline">
          ← Voltar à plataforma
        </Link>
      </aside>

      <div className="flex-1">
        {!isSupabaseConfigured && (
          <div className="border-b border-warning/30 bg-warning/10 px-6 py-2.5 text-center text-xs font-medium text-warning">
            Modo demonstração: alterações feitas aqui ficam salvas apenas neste navegador. Conecte um projeto
            Supabase (ver README) para persistir os dados de verdade.
          </div>
        )}
        <div className="mx-auto max-w-6xl p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
