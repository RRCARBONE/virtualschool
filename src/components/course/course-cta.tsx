"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { progressStore } from "@/lib/progress/store";
import { useCourseProgress } from "@/lib/progress/use-progress";

export function CourseCTA({
  courseId,
  courseSlug,
  lessonIds,
}: {
  courseId: string;
  courseSlug: string;
  lessonIds: string[];
}) {
  const router = useRouter();
  const { percent, completed, total } = useCourseProgress(courseId, lessonIds);

  function handleClick() {
    progressStore.enrollCourse(courseId);
    const target = lessonIds.find((id) => !progressStore.isLessonCompleted(id)) ?? lessonIds[0];
    if (target) router.push(`/cursos/${courseSlug}/aulas/${target}`);
  }

  const label = completed === 0 ? "Começar curso" : completed === total ? "Revisar curso" : "Continuar curso";

  return (
    <div className="space-y-2">
      <Button size="lg" className="w-full" onClick={handleClick} disabled={lessonIds.length === 0}>
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
