"use client";

import { useSyncExternalStore } from "react";
import { progressStore } from "./store";

export function useProgress() {
  return useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot
  );
}

/**
 * Calcula o progresso de um curso a partir da lista de ids de aula já
 * resolvida pelo Server Component (ver src/lib/data — local em modo
 * demonstração, Supabase quando configurado). Os hooks em si não acessam a
 * camada de dados diretamente: ids de aula variam entre os dois modos
 * (slugs locais x uuids do banco), então quem sabe a lista correta é
 * sempre quem buscou o conteúdo da página.
 */
export function useCourseProgress(courseId: string, lessonIds: string[]) {
  const state = useProgress();
  const total = lessonIds.length;
  const completed = lessonIds.filter((id) => state.completedLessons.includes(id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent, isEnrolled: state.enrolledCourses.includes(courseId) };
}

export function useCareerPathProgress(courses: { lessonIds: string[] }[]) {
  const state = useProgress();
  let total = 0;
  let completed = 0;
  for (const { lessonIds } of courses) {
    total += lessonIds.length;
    completed += lessonIds.filter((id) => state.completedLessons.includes(id)).length;
  }
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent };
}
