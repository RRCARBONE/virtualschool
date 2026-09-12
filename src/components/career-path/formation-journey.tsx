"use client";

import { CheckCircle2, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/types";
import { useCareerPathProgress, useCourseProgress } from "@/lib/progress/use-progress";
import { progressStore } from "@/lib/progress/store";
import { Button, LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Cover } from "@/components/ui/cover";
import { formatMinutes, levelLabel } from "@/lib/utils";
import { getAllLessonsForCourse } from "@/lib/data";

export function FormationHeaderProgress({ pathId, pathSlug }: { pathId: string; pathSlug: string }) {
  const { percent, completed, total } = useCareerPathProgress(pathSlug);
  const started = completed > 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Seu progresso na formação</span>
        <span className="font-semibold text-accent-dark">{percent}%</span>
      </div>
      <ProgressBar percent={percent} className="mt-3" />
      <p className="mt-2 text-xs text-muted">{completed} de {total} aulas concluídas</p>
      <Button className="mt-4 w-full" onClick={() => progressStore.enrollPath(pathId)}>
        {started ? "Continuar formação" : "Começar formação"}
      </Button>
    </div>
  );
}

export function CourseJourneyItem({ course, index }: { course: Course; index: number }) {
  const { percent, completed, total } = useCourseProgress(course.id);
  const lessons = getAllLessonsForCourse(course.id);
  const firstLessonId = lessons[0]?.lesson.id;
  const isComplete = total > 0 && completed === total;

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isComplete ? "bg-accent text-white" : "bg-brand-light text-brand-dark"
          }`}
        >
          {isComplete ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
        </span>
        <span className="mt-1 w-px flex-1 bg-border" />
      </div>
      <div className="flex flex-1 flex-col gap-3 pb-2 sm:flex-row sm:items-center">
        <Cover gradient={course.cover} className="hidden h-16 w-16 shrink-0 sm:flex" icon={false}>
          <PlayCircle className="h-6 w-6 text-white/90" />
        </Cover>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Curso {index + 1}</p>
          <h3 className="font-semibold">{course.title}</h3>
          <p className="mt-1 text-sm text-muted">{course.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>{levelLabel(course.level)}</span>
            <span>{formatMinutes(course.durationMinutes)}</span>
            <span>{total} aulas</span>
          </div>
          {completed > 0 && <ProgressBar percent={percent} size="sm" className="mt-2 max-w-xs" />}
        </div>
        <LinkButton
          href={firstLessonId ? `/cursos/${course.slug}/aulas/${firstLessonId}` : `/cursos/${course.slug}`}
          variant={isComplete ? "secondary" : "primary"}
          size="sm"
        >
          {isComplete ? "Revisar" : completed > 0 ? "Continuar" : "Começar"}
        </LinkButton>
      </div>
    </div>
  );
}
