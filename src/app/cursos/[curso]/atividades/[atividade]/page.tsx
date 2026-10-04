import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ActivityView } from "@/components/course/activity-view";
import { getCourse, getActivityById, findCourseByLessonId } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ curso: string; atividade: string }>;
}): Promise<Metadata> {
  const { atividade } = await params;
  const activity = await getActivityById(atividade);
  return activity ? { title: activity.title } : {};
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ curso: string; atividade: string }>;
}) {
  const { curso, atividade } = await params;
  const [course, activity] = await Promise.all([getCourse(curso), getActivityById(atividade)]);
  if (!course || !activity) notFound();

  const owningCourse = activity.lessonId ? await findCourseByLessonId(activity.lessonId) : undefined;
  if (owningCourse && owningCourse.id !== course.id) notFound();

  return (
    <div className="container-app max-w-2xl py-10">
      <Link
        href={activity.lessonId ? `/cursos/${course.slug}/aulas/${activity.lessonId}` : `/cursos/${course.slug}`}
        className="text-sm font-semibold text-brand hover:underline"
      >
        ← Voltar para a aula
      </Link>
      <div className="mt-5">
        <ActivityView activity={activity} />
      </div>
    </div>
  );
}
