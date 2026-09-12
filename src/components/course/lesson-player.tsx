"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight, Gauge, Play } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { progressStore } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/use-progress";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/lib/types";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export function LessonPlayer({
  lesson,
  courseCover,
  prevLessonId,
  nextLessonId,
  courseSlug,
}: {
  lesson: Lesson;
  courseCover: string;
  prevLessonId?: string;
  nextLessonId?: string;
  courseSlug: string;
}) {
  const state = useProgress();
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const isDone = state.completedLessons.includes(lesson.id);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <Cover gradient={courseCover} className="aspect-video w-full" icon={false}>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform hover:scale-105"
            aria-label={playing ? "Pausar" : "Reproduzir"}
          >
            <Play className={cn("h-7 w-7", playing && "opacity-50")} fill="white" />
          </button>
        </Cover>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white">
          <Gauge className="h-3.5 w-3.5" />
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={cn("rounded-full px-1.5 py-0.5", speed === s && "bg-white/30 font-semibold")}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="mt-1 text-sm text-muted">{lesson.durationMinutes} min de duração</p>
        </div>
        <Button
          variant={isDone ? "secondary" : "accent"}
          onClick={() => progressStore.completeLesson(lesson.id)}
          disabled={isDone}
        >
          <CheckCircle2 className="h-4 w-4" /> {isDone ? "Aula concluída" : "Marcar como concluída"}
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        {prevLessonId ? (
          <LinkButton href={`/cursos/${courseSlug}/aulas/${prevLessonId}`} variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" /> Aula anterior
          </LinkButton>
        ) : (
          <span />
        )}
        {nextLessonId ? (
          <Link
            href={`/cursos/${courseSlug}/aulas/${nextLessonId}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            Próxima aula <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="text-sm text-muted">Última aula do curso</span>
        )}
      </div>
    </div>
  );
}
