"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, LogOut, PlayCircle, Sparkles } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button, LinkButton } from "@/components/ui/button";
import { useProgress } from "@/lib/progress/use-progress";
import { progressStore } from "@/lib/progress/store";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { formatMinutes } from "@/lib/utils";
import type { CareerPath, Course } from "@/lib/types";

export function DashboardClient({
  courses,
  careerPaths,
  lessonIdsByCourse,
}: {
  courses: Course[];
  careerPaths: CareerPath[];
  lessonIdsByCourse: Record<string, string[]>;
}) {
  const router = useRouter();
  const state = useProgress();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(state.studentName);

  const enrolledCourses = courses.filter((c) => state.enrolledCourses.includes(c.id));
  const enrolledPaths = careerPaths.filter((p) => state.enrolledPaths.includes(p.id));

  const courseProgress = (courseId: string) => {
    const lessonIds = lessonIdsByCourse[courseId] ?? [];
    const completed = lessonIds.filter((id) => state.completedLessons.includes(id)).length;
    return { completed, total: lessonIds.length, percent: lessonIds.length ? Math.round((completed / lessonIds.length) * 100) : 0 };
  };

  const pathProgress = (path: CareerPath) => {
    let total = 0;
    let completed = 0;
    for (const courseId of path.courseIds) {
      const { completed: cc, total: ct } = courseProgress(courseId);
      completed += cc;
      total += ct;
    }
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  };

  const inProgressCourses = enrolledCourses.filter((c) => {
    const p = courseProgress(c.id);
    return p.completed > 0 && p.completed < p.total;
  });
  const completedCourses = enrolledCourses.filter((c) => {
    const p = courseProgress(c.id);
    return p.total > 0 && p.completed === p.total;
  });

  const overallTotalLessons = enrolledCourses.reduce((sum, c) => sum + courseProgress(c.id).total, 0);
  const overallCompleted = enrolledCourses.reduce((sum, c) => sum + courseProgress(c.id).completed, 0);
  const overallPercent = overallTotalLessons ? Math.round((overallCompleted / overallTotalLessons) * 100) : 0;

  async function handleLogout() {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      await supabase?.auth.signOut();
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="container-app py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {editingName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                progressStore.setStudentName(name || "Aluno");
                setEditingName(false);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-2xl font-extrabold outline-none focus:border-brand"
              />
              <Button type="submit" size="sm">Salvar</Button>
            </form>
          ) : (
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Olá, {state.studentName}!{" "}
              <button onClick={() => setEditingName(true)} className="text-sm font-normal text-brand hover:underline">
                editar nome
              </button>
            </h1>
          )}
          <p className="mt-1 text-muted">Continue de onde parou e avance na sua jornada.</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">Seu progresso geral</span>
          <span className="font-semibold text-accent-dark">{overallPercent}%</span>
        </div>
        <ProgressBar percent={overallPercent} className="mt-3" />
        <p className="mt-2 text-xs text-muted">
          {overallCompleted} de {overallTotalLessons} aulas concluídas em {enrolledCourses.length} cursos
        </p>
      </div>

      {enrolledCourses.length === 0 && enrolledPaths.length === 0 && (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center">
          <Sparkles className="h-8 w-8 text-brand" />
          <p className="max-w-sm text-muted">
            Você ainda não começou nenhum curso. Explore profissões ou formações completas para dar o primeiro passo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="/profissoes">Explorar profissões</LinkButton>
            <LinkButton href="/descobrir" variant="outline">Descobrir profissão</LinkButton>
          </div>
        </div>
      )}

      {inProgressCourses.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">Continue estudando</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((course) => {
              const p = courseProgress(course.id);
              const lessonIds = lessonIdsByCourse[course.id] ?? [];
              const nextLessonId = lessonIds.find((id) => !state.completedLessons.includes(id)) ?? lessonIds[0];
              return (
                <Link
                  key={course.id}
                  href={`/cursos/${course.slug}/aulas/${nextLessonId}`}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card hover:bg-surface-muted"
                >
                  <Cover gradient={course.cover} className="h-24 w-full" icon={false}>
                    <PlayCircle className="h-8 w-8 text-white/90" />
                  </Cover>
                  <h3 className="font-semibold leading-snug">{course.title}</h3>
                  <ProgressBar percent={p.percent} size="sm" />
                  <p className="text-xs text-muted">{p.percent}% concluído</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {enrolledPaths.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">Minhas formações</h2>
          <div className="mt-4 space-y-3">
            {enrolledPaths.map((path) => {
              const p = pathProgress(path);
              return (
                <Link
                  key={path.id}
                  href={`/formacoes/${path.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card hover:bg-surface-muted"
                >
                  <Cover gradient={path.coverImage} className="h-14 w-14 shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{path.title.replace("Formação — ", "")}</h3>
                    <ProgressBar percent={p.percent} size="sm" className="mt-1.5 max-w-xs" />
                  </div>
                  <span className="shrink-0 font-semibold text-accent-dark">{p.percent}%</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {completedCourses.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">Cursos concluídos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card">
                <Cover gradient={course.cover} className="h-12 w-12 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{course.title}</p>
                  <p className="text-xs text-muted">{formatMinutes(course.durationMinutes)} concluídas</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Award className="h-5 w-5 text-brand" /> Certificados
        </h2>
        {state.certificates.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Conclua um curso e passe na avaliação final para desbloquear seu primeiro certificado.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.certificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificados/${cert.id}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card hover:bg-surface-muted"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{cert.title}</p>
                  <p className="text-xs text-muted">Emitido em {new Date(cert.issuedAt).toLocaleDateString("pt-BR")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
