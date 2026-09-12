"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { progressStore } from "@/lib/progress/store";
import { useCourseProgress } from "@/lib/progress/use-progress";
import { getAllLessonsForCourse } from "@/lib/data";

export function CourseCTA({ courseId, courseSlug }: { courseId: string; courseSlug: string }) {
  const router = useRouter();
  const { percent, completed, total } = useCourseProgress(courseId);
  const lessons = getAllLessonsForCourse(courseId);

  function handleClick() {
    progressStore.enrollCourse(courseId);
    const target = lessons.find(({ lesson }) => !progressStore.isLessonCompleted(lesson.id)) ?? lessons[0];
    if (target) router.push(`/cursos/${courseSlug}/aulas/${target.lesson.id}`);
  }

  const label = completed === 0 ? "Começar curso" : completed === total ? "Revisar curso" : "Continuar curso";

  return (
    <div className="space-y-2">
      <Button size="lg" className="w-full" onClick={handleClick}>
        {label}
      </Button>
      {completed > 0 && (
        <p className="text-center text-xs text-muted">
          {percent}% concluído · {completed} de {total} aulas
        </p>
      )}
    </div>
  );
}
