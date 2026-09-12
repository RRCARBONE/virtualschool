import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, ChevronRight, ClipboardList, Lightbulb } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { getCourse, getMaterialForCourse, getActivityById } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> {
  const { curso } = await params;
  const course = getCourse(curso);
  return course ? { title: `Apostila — ${course.title}` } : {};
}

export default async function MaterialPage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const course = getCourse(curso);
  if (!course) notFound();

  const material = getMaterialForCourse(course.id);
  if (!material) notFound();

  return (
    <div className="container-app grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-24">
          <Link href={`/cursos/${course.slug}`} className="text-sm font-semibold text-brand hover:underline">
            ← {course.title}
          </Link>
          <p className="mt-4 px-1 text-xs font-semibold uppercase tracking-wide text-muted">Índice</p>
          <nav className="mt-2 space-y-1">
            {material.chapters.map((chapter, i) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-surface-muted"
              >
                <span className="text-xs text-muted">{i + 1}.</span> {chapter.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="order-1 lg:order-2">
        <div className="flex items-center gap-4">
          <Cover gradient={material.cover} className="h-20 w-20 shrink-0">
            <BookOpen className="h-8 w-8 text-white/90" strokeWidth={1.5} />
          </Cover>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand">Apostila</span>
            <h1 className="text-2xl font-extrabold sm:text-3xl">{material.title}</h1>
          </div>
        </div>

        <div className="mt-10 space-y-14">
          {material.chapters.map((chapter, i) => (
            <section key={chapter.id} id={chapter.id} className="scroll-mt-24">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Capítulo {i + 1} <ChevronRight className="h-3 w-3" />
              </div>
              <h2 className="mt-1 text-xl font-bold">{chapter.title}</h2>
              <p className="mt-4 leading-relaxed text-foreground/90">{chapter.content}</p>

              {chapter.examples && chapter.examples.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border bg-surface-muted p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Lightbulb className="h-4 w-4 text-warning" /> Exemplos
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted">
                    {chapter.examples.map((ex) => (
                      <li key={ex} className="font-mono text-[13px]">{ex}</li>
                    ))}
                  </ul>
                </div>
              )}

              {chapter.summary && (
                <div className="mt-5 rounded-2xl bg-brand-light p-4 text-sm font-medium text-brand-dark">
                  Resumo: {chapter.summary}
                </div>
              )}

              {chapter.exerciseIds.length > 0 && (
                <div className="mt-5">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <ClipboardList className="h-4 w-4 text-brand" /> Exercícios do capítulo
                  </p>
                  <div className="mt-2 space-y-2">
                    {chapter.exerciseIds.map((id) => {
                      const activity = getActivityById(id);
                      if (!activity) return null;
                      return (
                        <Link
                          key={id}
                          href={`/cursos/${course.slug}/atividades/${id}`}
                          className="block rounded-xl border border-border bg-surface p-3 text-sm hover:bg-surface-muted"
                        >
                          {activity.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
