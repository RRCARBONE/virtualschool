import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, ClipboardList, Target } from "lucide-react";
import { LessonSidebar, type LessonSidebarModule } from "@/components/course/lesson-sidebar";
import { LessonPlayer } from "@/components/course/lesson-player";
import { AITeacherChat } from "@/components/course/ai-teacher-chat";
import {
  getCourse,
  getLessonById,
  getModuleById,
  getAllLessonsForCourse,
  getActivitiesForLesson,
  getAITeacher,
} from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ curso: string; aula: string }>;
}): Promise<Metadata> {
  const { aula } = await params;
  const lesson = await getLessonById(aula);
  return lesson ? { title: lesson.title } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ curso: string; aula: string }> }) {
  const { curso, aula } = await params;
  const [course, lesson] = await Promise.all([getCourse(curso), getLessonById(aula)]);
  if (!course || !lesson) notFound();

  const mod = await getModuleById(lesson.moduleId);
  if (!mod || mod.courseId !== course.id) notFound();

  const [teacher, lessonPairs, activities] = await Promise.all([
    getAITeacher(course.aiTeacherId),
    getAllLessonsForCourse(course.id),
    getActivitiesForLesson(lesson.id),
  ]);

  const orderedLessons = lessonPairs.map((l) => l.lesson);
  const currentIndex = orderedLessons.findIndex((l) => l.id === lesson.id);
  const prevLessonId = currentIndex > 0 ? orderedLessons[currentIndex - 1].id : undefined;
  const nextLessonId = currentIndex < orderedLessons.length - 1 ? orderedLessons[currentIndex + 1].id : undefined;

  const sidebarModules: LessonSidebarModule[] = [];
  const moduleIndexById = new Map<string, number>();
  for (const pair of lessonPairs) {
    let index = moduleIndexById.get(pair.module.id);
    if (index === undefined) {
      index = sidebarModules.length;
      moduleIndexById.set(pair.module.id, index);
      sidebarModules.push({ id: pair.module.id, title: pair.module.title, lessons: [] });
    }
    sidebarModules[index].lessons.push({ id: pair.lesson.id, title: pair.lesson.title });
  }

  return (
    <div className="container-app grid gap-8 py-8 lg:grid-cols-[280px_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-24">
          <Link href={`/cursos/${course.slug}`} className="text-sm font-semibold text-brand hover:underline">
            ← {course.title}
          </Link>
          <div className="mt-4">
            <LessonSidebar courseSlug={course.slug} currentLessonId={lesson.id} modules={sidebarModules} />
          </div>
        </div>
      </aside>

      <div className="order-1 lg:order-2">
        <LessonPlayer
          lesson={lesson}
          courseCover={course.cover}
          prevLessonId={prevLessonId}
          nextLessonId={nextLessonId}
          courseSlug={course.slug}
        />

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Target className="h-5 w-5 text-brand" /> Objetivos da aula
              </h2>
              <ul className="mt-3 space-y-2">
                {lesson.objectives.map((obj) => (
                  <li key={obj} className="rounded-xl bg-surface-muted px-4 py-2.5 text-sm">{obj}</li>
                ))}
              </ul>
            </section>

            {lesson.transcript && (
              <section>
                <h2 className="text-lg font-semibold">Resumo da aula</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lesson.transcript}</p>
              </section>
            )}

            {activities.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <ClipboardList className="h-5 w-5 text-brand" /> Atividades desta aula
                </h2>
                <div className="mt-3 space-y-2">
                  {activities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/cursos/${course.slug}/atividades/${activity.id}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 text-sm shadow-card hover:bg-surface-muted"
                    >
                      <span className="font-medium">{activity.title}</span>
                      <span className="text-xs text-muted">Responder →</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {lesson.chapterRef && (
              <Link
                href={`/cursos/${course.slug}/apostila#${lesson.chapterRef}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card hover:bg-surface-muted"
              >
                <BookOpen className="h-6 w-6 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-semibold">Ler na apostila</p>
                  <p className="text-xs text-muted">Aprofunde-se no capítulo desta aula</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {teacher && <AITeacherChat teacher={teacher} courseId={course.id} lessonId={lesson.id} />}
    </div>
  );
}
