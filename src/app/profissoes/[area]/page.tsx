import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, GraduationCap } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Badge } from "@/components/ui/card";
import { getArea, getProfessionsForArea } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = await getArea(areaSlug);
  if (!area) return {};
  return { title: area.name, description: area.description };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = await getArea(areaSlug);
  if (!area) notFound();

  const professions = await getProfessionsForArea(area.id);

  return (
    <div className="container-app py-12">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/profissoes" className="hover:text-foreground">Profissões</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{area.name}</span>
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${area.colorFrom}, ${area.colorTo})` }}
        >
          <DynamicIcon name={area.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{area.name}</h1>
          <p className="mt-1 max-w-xl text-muted">{area.description}</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">
        {professions.length} profissões em {area.name}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {professions.map((profession) => (
          <Link
            key={profession.id}
            href={`/profissoes/${area.slug}/${profession.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug">{profession.name}</h3>
              {profession.formationIds.length > 0 && (
                <Badge variant="accent" className="shrink-0">
                  <GraduationCap className="h-3 w-3" /> Formação
                </Badge>
              )}
            </div>
            <p className="line-clamp-2 text-sm text-muted">{profession.summary}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {profession.skills.slice(0, 3).map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
