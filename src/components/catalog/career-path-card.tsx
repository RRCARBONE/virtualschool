import Link from "next/link";
import { Layers } from "lucide-react";
import type { CareerPath } from "@/lib/types";
import { Cover } from "@/components/ui/cover";
import { getCoursesForCareerPath, getProfessionById } from "@/lib/data";

export async function CareerPathCard({ path }: { path: CareerPath }) {
  const [courses, profession] = await Promise.all([
    getCoursesForCareerPath(path.slug),
    getProfessionById(path.professionId),
  ]);

  return (
    <Link
      href={`/formacoes/${path.slug}`}
      className="group flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft sm:p-5"
    >
      <Cover gradient={path.coverImage} className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
        <Layers className="h-8 w-8 text-white/90" strokeWidth={1.5} />
      </Cover>
      <div className="flex flex-col justify-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">Formação completa</span>
        <h3 className="font-semibold leading-snug">{path.title.replace("Formação — ", "")}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{path.description}</p>
        <span className="mt-2 text-xs text-muted">
          {courses.length} cursos · {path.totalHours}h · {profession?.name}
        </span>
      </div>
    </Link>
  );
}
