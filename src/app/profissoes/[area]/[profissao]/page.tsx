import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Briefcase, CheckCircle2, ChevronRight, MapPin, Wallet } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { CareerPathCard } from "@/components/catalog/career-path-card";
import { getArea, getProfession, careerPaths } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; profissao: string }>;
}): Promise<Metadata> {
  const { profissao } = await params;
  const profession = getProfession(profissao);
  if (!profession) return {};
  return { title: profession.name, description: profession.summary };
}

export default async function ProfessionPage({
  params,
}: {
  params: Promise<{ area: string; profissao: string }>;
}) {
  const { area: areaSlug, profissao } = await params;
  const area = getArea(areaSlug);
  const profession = getProfession(profissao);
  if (!area || !profession || profession.areaId !== area.id) notFound();

  const formations = careerPaths.filter((cp) => profession.formationIds.includes(cp.id));

  return (
    <div className="container-app py-12">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/profissoes" className="hover:text-foreground">Profissões</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/profissoes/${area.slug}`} className="hover:text-foreground">{area.name}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{profession.name}</span>
      </nav>

      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{profession.name}</h1>
        <p className="mt-3 text-lg text-muted">{profession.summary}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {profession.averageSalaryRange && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <Wallet className="h-5 w-5 text-brand" />
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">Faixa salarial de referência</p>
            <p className="mt-1 font-semibold">{profession.averageSalaryRange}</p>
          </div>
        )}
        <div className="rounded-2xl border border-border bg-surface p-4">
          <MapPin className="h-5 w-5 text-brand" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">Onde atuar</p>
          <p className="mt-1 font-semibold">{profession.workEnvironments.join(", ")}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <Briefcase className="h-5 w-5 text-brand" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">Área</p>
          <p className="mt-1 font-semibold">{area.name}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">O que faz no dia a dia</h2>
          <ul className="mt-3 space-y-2">
            {profession.dailyActivities.map((activity) => (
              <li key={activity} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {activity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Habilidades desenvolvidas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profession.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold">Formação para se tornar {profession.name}</h2>
        {formations.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {formations.map((path) => (
              <CareerPathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border bg-surface-muted p-6">
            <p className="text-muted">
              A formação completa para {profession.name} está em produção pela nossa equipe pedagógica e
              pelos professores de IA. Enquanto isso, descubra profissões relacionadas ou explore formações
              já disponíveis.
            </p>
            <LinkButton href="/profissoes" variant="outline">
              Explorar outras profissões
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}
