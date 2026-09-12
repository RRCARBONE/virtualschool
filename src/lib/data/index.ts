import { areas, getAreaBySlug } from "./areas";
import { professions, getProfessionBySlug, getProfessionsByArea } from "./professions";
import { aiTeachers, getAITeacherById } from "./ai-teachers";
import { careerPaths, getCareerPathBySlug } from "./career-paths";
import * as devSoftware from "./courses/dev-software";
import * as marketingDigital from "./courses/marketing-digital";
import * as gestaoFinanceira from "./courses/gestao-financeira";
import { reviews, getReviewsFor, averageRating } from "./reviews";
import type { Activity, Course, CourseMaterial, CourseModule, Lesson, Quiz } from "@/lib/types";

// Junta o conteúdo de todas as formações em coleções únicas — como se fosse
// o resultado de "SELECT * FROM courses" etc. no Supabase.
export const allCourses: Course[] = [...devSoftware.courses, ...marketingDigital.courses, ...gestaoFinanceira.courses];
export const allModules: CourseModule[] = [...devSoftware.modules, ...marketingDigital.modules, ...gestaoFinanceira.modules];
export const allLessons: Lesson[] = [...devSoftware.lessons, ...marketingDigital.lessons, ...gestaoFinanceira.lessons];
export const allMaterials: CourseMaterial[] = [...devSoftware.materials, ...marketingDigital.materials, ...gestaoFinanceira.materials];
export const allActivities: Activity[] = [...devSoftware.activities, ...marketingDigital.activities, ...gestaoFinanceira.activities];
export const allQuizzes: Quiz[] = [...devSoftware.quizzes, ...marketingDigital.quizzes, ...gestaoFinanceira.quizzes];

export { areas, professions, aiTeachers, careerPaths, reviews, getReviewsFor, averageRating };

export function getArea(slug: string) {
  return getAreaBySlug(slug);
}

export function getProfession(slug: string) {
  return getProfessionBySlug(slug);
}

export function getProfessionsForArea(areaId: string) {
  return getProfessionsByArea(areaId);
}

export function getAITeacher(id: string) {
  return getAITeacherById(id);
}

export function getCareerPath(slug: string) {
  return getCareerPathBySlug(slug);
}

export function getCoursesForCareerPath(slug: string) {
  const path = getCareerPathBySlug(slug);
  if (!path) return [];
  return path.courseIds
    .map((id) => allCourses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));
}

export function getCourse(slug: string) {
  return allCourses.find((c) => c.slug === slug);
}

export function getCourseById(id: string) {
  return allCourses.find((c) => c.id === id);
}

export function getModulesForCourse(courseId: string) {
  return allModules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getModuleById(id: string) {
  return allModules.find((m) => m.id === id);
}

export function getLessonsForModule(moduleId: string) {
  return allLessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string) {
  return allLessons.find((l) => l.id === id);
}

export function getAllLessonsForCourse(courseId: string) {
  const mods = getModulesForCourse(courseId);
  return mods.flatMap((m) => getLessonsForModule(m.id).map((lesson) => ({ lesson, module: m })));
}

export function getMaterialForCourse(courseId: string) {
  return allMaterials.find((m) => m.courseId === courseId);
}

export function getChapterById(materialId: string, chapterId: string) {
  const material = allMaterials.find((m) => m.id === materialId);
  return material?.chapters.find((c) => c.id === chapterId);
}

export function getActivityById(id: string) {
  return allActivities.find((a) => a.id === id);
}

export function getActivitiesForLesson(lessonId: string) {
  return allActivities.filter((a) => a.lessonId === lessonId);
}

export function getQuizById(id: string) {
  return allQuizzes.find((q) => q.id === id);
}

export function getQuizForModule(moduleId: string) {
  return allQuizzes.find((q) => q.moduleId === moduleId);
}

export function getFinalQuizForCourse(courseId: string) {
  return allQuizzes.find((q) => q.courseId === courseId && q.kind === "avaliacao_final");
}

export function findCourseByLessonId(lessonId: string) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return undefined;
  const mod = getModuleById(lesson.moduleId);
  if (!mod) return undefined;
  return getCourseById(mod.courseId);
}

export function findCareerPathForCourse(courseId: string) {
  return careerPaths.find((cp) => cp.courseIds.includes(courseId));
}

// ---------------------------------------------------------------------------
// Busca global
// ---------------------------------------------------------------------------
export interface SearchResult {
  type: "area" | "profissao" | "curso" | "formacao";
  title: string;
  description: string;
  href: string;
}

export function globalSearch(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  for (const area of areas) {
    if (area.name.toLowerCase().includes(q) || area.description.toLowerCase().includes(q)) {
      results.push({ type: "area", title: area.name, description: area.description, href: `/profissoes/${area.slug}` });
    }
  }

  for (const profession of professions) {
    if (
      profession.name.toLowerCase().includes(q) ||
      profession.summary.toLowerCase().includes(q) ||
      profession.skills.some((s) => s.toLowerCase().includes(q))
    ) {
      const area = areas.find((a) => a.id === profession.areaId);
      results.push({
        type: "profissao",
        title: profession.name,
        description: profession.summary,
        href: `/profissoes/${area?.slug ?? profession.areaId}/${profession.slug}`,
      });
    }
  }

  for (const course of allCourses) {
    if (
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ type: "curso", title: course.title, description: course.description, href: `/cursos/${course.slug}` });
    }
  }

  for (const path of careerPaths) {
    if (path.title.toLowerCase().includes(q) || path.description.toLowerCase().includes(q)) {
      results.push({ type: "formacao", title: path.title, description: path.description, href: `/formacoes/${path.slug}` });
    }
  }

  return results.slice(0, 30);
}
