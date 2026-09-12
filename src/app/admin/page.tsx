import Link from "next/link";
import { BookOpen, Bot, Briefcase, Layers, Users } from "lucide-react";
import { areas, professions, careerPaths, allCourses, aiTeachers } from "@/lib/data";

const stats = [
  { label: "Áreas", value: areas.length, icon: Layers, href: "/profissoes" },
  { label: "Profissões", value: professions.length, icon: Briefcase, href: "/admin/profissoes" },
  { label: "Formações", value: careerPaths.length, icon: Layers, href: "/admin/formacoes" },
  { label: "Cursos", value: allCourses.length, icon: BookOpen, href: "/admin/cursos" },
  { label: "Professores IA", value: aiTeachers.length, icon: Bot, href: "/admin/professores-ia" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Visão geral</h1>
      <p className="mt-1 text-muted">Acompanhe o catálogo da plataforma e gerencie o conteúdo.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-border bg-surface p-5 shadow-card hover:bg-surface-muted"
          >
            <stat.icon className="h-5 w-5 text-brand" />
            <p className="mt-3 text-2xl font-extrabold">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="flex items-center gap-2 font-semibold">
          <Users className="h-5 w-5 text-brand" /> Escalabilidade da plataforma
        </h2>
        <p className="mt-2 text-sm text-muted">
          A estrutura de dados (áreas → profissões → formações → cursos → módulos → aulas) foi desenhada para
          suportar centenas de profissões e milhares de cursos sem alterações de código. Use os menus ao lado
          para adicionar profissões, formações, cursos e professores de IA.
        </p>
      </div>
    </div>
  );
}
