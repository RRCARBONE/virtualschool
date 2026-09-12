import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, CheckCircle2, ChevronRight, Clock, FileQuestion, Layers, PlayCircle } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { Badge } from "@/components/ui/card";
import { CourseCTA } from "@/components/course/course-cta";
import { formatMinutes, levelLabel } from "@/lib/utils";
import {
  getCourse,
  getModulesForCourse,
  getLessonsForModule,
  getAITeacher,
  getMaterialForCourse,
  findCareerPathForCourse,
  getFinalQuizForCourse,
} from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> {
  const { curso } = await params;
  const course = getCourse(curso);
  if (!course) return {};
  return { title: course.title, description: course.description };
}

export default async function CoursePage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const course = getCourse(curso);
  if (!course) notFound();

  const modules = getModulesForCourse(course.id);
  const teacher = getAITeacher(course.aiTeacherId);
  const material = getMaterialForCourse(course.id);
  const careerPath = findCareerPathForCourse(course.id);
  const finalQuiz = getFinalQuizForCourse(course.id);
  const totalLessons = modules.reduce((sum, m) => sum + getLessonsForModule(m.id).length, 0);

  return (
    <div className="container-app py-12">
      {careerPath && (
        <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link href={`/formacoes/${careerPath.slug}`} className="hover:text-foreground">
            {careerPath.title.replace("Formação — ", "")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{course.title}</span>
        </nav>
      )}

      <div className="mt-4 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">{levelLabel(course.level)}</Badge>
            {course.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{course.title}</h1>
          <p className="mt-3 text-lg text-muted">{course.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formatMinutes(course.durationMinutes)}</span>
            <span className="flex items-center gap-1.5"><Layers className="h-4 w-4" /> {modules.length} módulos</span>
            <span className="flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {totalLessons} aulas</span>
            {material && <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Apostila incluída</span>}
            {finalQuiz && <span className="flex items-center gap-1.5"><FileQuestion className="h-4 w-4" /> Avaliação final</span>}
          </div>

          {teacher && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface-muted p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-2xl">
                {teacher.avatar}
              </span>
              <div>
                <p className="text-sm font-semibold">Professor(a) {teacher.name}</p>
                <p className="text-xs text-muted">{teacher.title} · {teacher.specialty}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Cover gradient={course.cover} className="h-40 w-full" icon={false}>
            <PlayCircle className="h-12 w-12 text-white/90" strokeWidth={1.5} />
          </Cover>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
            <CourseCTA courseId={course.id} courseSlug={course.slug} />
            {material && (
              <Link
                href={`/cursos/${course.slug}/apostila`}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold hover:bg-surface-muted"
              >
                <BookOpen className="h-4 w-4" /> Ver apostila
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">Conteúdo do curso</h2>
        <div className="mt-5 space-y-4">
          {modules.map((mod, i) => {
            const lessons = getLessonsForModule(mod.id);
            return (
              <div key={mod.id} className="rounded-2xl border border-border bg-surface shadow-card">
                <div className="border-b border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">Módulo {i + 1}</p>
                  <h3 className="font-semibold">{mod.title}</h3>
                  <p className="mt-1 text-sm text-muted">{mod.summary}</p>
                </div>
                <ul className="divide-y divide-border">
                  {lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/cursos/${course.slug}/aulas/${lesson.id}`}
                        className="flex items-center justify-between gap-3 p-4 text-sm hover:bg-surface-muted"
                      >
                        <span className="flex items-center gap-2.5">
                          <PlayCircle className="h-4 w-4 shrink-0 text-muted" />
                          {lesson.title}
                        </span>
                        <span className="shrink-0 text-xs text-muted">{formatMinutes(lesson.durationMinutes)}</span>
                      </Link>
                    </li>
                  ))}
                  {mod.quizId && (
                    <li>
                      <Link
                        href={`/cursos/${course.slug}/quiz/${mod.quizId}`}
                        className="flex items-center justify-between gap-3 p-4 text-sm hover:bg-surface-muted"
                      >
                        <span className="flex items-center gap-2.5 font-medium">
                          <FileQuestion className="h-4 w-4 shrink-0 text-brand" /> Quiz do módulo
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
          {finalQuiz && (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-surface-muted p-4">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-accent" /> Avaliação final: {finalQuiz.title}
              </span>
              <Link href={`/cursos/${course.slug}/quiz/${finalQuiz.id}`} className="text-sm font-semibold text-brand hover:underline">
                Fazer avaliação
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
