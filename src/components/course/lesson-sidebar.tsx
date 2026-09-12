"use client";

import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress/use-progress";
import { getModulesForCourse, getLessonsForModule } from "@/lib/data";

export function LessonSidebar({ courseId, courseSlug, currentLessonId }: { courseId: string; courseSlug: string; currentLessonId: string }) {
  const state = useProgress();
  const modules = getModulesForCourse(courseId);

  return (
    <nav className="space-y-4">
      {modules.map((mod, i) => {
        const lessons = getLessonsForModule(mod.id);
        return (
          <div key={mod.id}>
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Módulo {i + 1} · {mod.title}
            </p>
            <ul className="mt-2 space-y-1">
              {lessons.map((lesson) => {
                const isCurrent = lesson.id === currentLessonId;
                const isDone = state.completedLessons.includes(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/cursos/${courseSlug}/aulas/${lesson.id}`}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        isCurrent ? "bg-brand-light font-semibold text-brand-dark" : "hover:bg-surface-muted"
                      )}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      ) : isCurrent ? (
                        <PlayCircle className="h-4 w-4 shrink-0 text-brand" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-border" />
                      )}
                      <span className="line-clamp-1">{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
