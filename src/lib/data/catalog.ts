// Conteúdo local de cursos (mesclado das 3 formações seed) + pequenos
// helpers síncronos. Este módulo NÃO importa nada server-only — é seguro
// de usar em Client Components (ex: admin, progresso do aluno) quando o
// dado não depende de sessão/Supabase. A camada assíncrona equivalente,
// consultada pelas páginas públicas (Server Components), vive em
// src/lib/data/index.ts.
import type { Activity, Course, CourseMaterial, CourseModule, Lesson } from "@/lib/types";
import { careerPaths } from "./career-paths";
import * as devSoftware from "./courses/dev-software";
import * as marketingDigital from "./courses/marketing-digital";
import * as gestaoFinanceira from "./courses/gestao-financeira";

export const allCourses: Course[] = [...devSoftware.courses, ...marketingDigital.courses, ...gestaoFinanceira.courses];
export const allModules: CourseModule[] = [...devSoftware.modules, ...marketingDigital.modules, ...gestaoFinanceira.modules];
export const allLessons: Lesson[] = [...devSoftware.lessons, ...marketingDigital.lessons, ...gestaoFinanceira.lessons];
export const allMaterials: CourseMaterial[] = [...devSoftware.materials, ...marketingDigital.materials, ...gestaoFinanceira.materials];
export const allActivities: Activity[] = [...devSoftware.activities, ...marketingDigital.activities, ...gestaoFinanceira.activities];
export const allQuizzes = [...devSoftware.quizzes, ...marketingDigital.quizzes, ...gestaoFinanceira.quizzes];

export function getCourseByIdLocal(id: string) {
  return allCourses.find((c) => c.id === id);
}

export function getModulesForCourseLocal(courseId: string) {
  return allModules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getLessonsForModuleLocal(moduleId: string) {
  return allLessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function getAllLessonsForCourseLocal(courseId: string) {
  const mods = getModulesForCourseLocal(courseId);
  return mods.flatMap((m) => getLessonsForModuleLocal(m.id).map((lesson) => ({ lesson, module: m })));
}

export function getCoursesForCareerPathLocal(slug: string) {
  const path = careerPaths.find((cp) => cp.slug === slug);
  if (!path) return [];
  return path.courseIds.map((id) => getCourseByIdLocal(id)).filter((c): c is Course => Boolean(c));
}
