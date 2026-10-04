import { areas, getAreaBySlug } from "./areas";
import { professions, getProfessionBySlug, getProfessionById as localGetProfessionById, getProfessionsByArea } from "./professions";
import { aiTeachers, getAITeacherById } from "./ai-teachers";
import { careerPaths, getCareerPathBySlug } from "./career-paths";
import { allCourses, allModules, allLessons, allMaterials, allActivities, allQuizzes } from "./catalog";
import { reviews, getReviewsFor, averageRating } from "./reviews";
import type { Activity, Area, CareerPath, Course, CourseMaterial, CourseModule, Lesson, Profession, Quiz } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import {
  mapActivityRow,
  mapAITeacherRow,
  mapCareerPathRow,
  mapCategoryToArea,
  mapChapterRow,
  mapCourseRow,
  mapLessonRow,
  mapMaterialRow,
  mapModuleRow,
  mapProfessionRow,
  mapQuizRow,
} from "@/lib/supabase/mappers";

// ============================================================================
// Repositório de conteúdo da plataforma.
//
// Cada função de consulta abaixo tenta o Supabase primeiro (quando
// configurado) e cai para o seed local em src/lib/data/*.ts quando o
// Supabase não está configurado, a consulta falha, ou não encontra nada —
// assim a plataforma sempre funciona, com ou sem banco conectado. Rode
// `npm run db:seed` para popular as tabelas a partir deste mesmo seed local
// (ver scripts/seed-supabase.ts).
//
// Profissões, formações, professores de IA e o painel administrativo
// (src/lib/admin) ainda operam sobre os arrays locais — ver README para o
// que falta migrar.
// ============================================================================

// Reexporta o conteúdo local mesclado (ver ./catalog) — como se fosse o
// resultado de "SELECT * FROM courses" etc. no Supabase, para uso como
// fallback de demonstração e nos usos síncronos (admin, seed script).
export { allCourses, allModules, allLessons, allMaterials, allActivities, allQuizzes };
export { areas, professions, aiTeachers, careerPaths, reviews, getReviewsFor, averageRating };

async function getSupabase() {
  return createClient();
}

// ---------------------------------------------------------------------------
// Áreas
// ---------------------------------------------------------------------------
export async function getAreas(): Promise<Area[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("categories").select("*").order("order_index");
    if (!error && data && data.length > 0) return data.map(mapCategoryToArea);
  }
  return areas;
}

export async function getArea(slug: string): Promise<Area | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) return mapCategoryToArea(data);
  }
  return getAreaBySlug(slug);
}

// ---------------------------------------------------------------------------
// Profissões
// ---------------------------------------------------------------------------
export async function getProfession(slug: string): Promise<Profession | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("professions")
      .select("*, career_paths(id)")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return mapProfessionRow(data);
  }
  return getProfessionBySlug(slug);
}

export async function getProfessionById(id: string): Promise<Profession | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("professions")
      .select("*, career_paths(id)")
      .eq("id", id)
      .maybeSingle();
    if (!error && data) return mapProfessionRow(data);
  }
  return localGetProfessionById(id);
}

export async function getProfessionsForArea(areaId: string): Promise<Profession[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("professions")
      .select("*, career_paths(id)")
      .eq("category_id", areaId);
    if (!error && data) return data.map(mapProfessionRow);
  }
  return getProfessionsByArea(areaId);
}

// ---------------------------------------------------------------------------
// Professores de IA
// ---------------------------------------------------------------------------
export async function getAITeacher(id: string) {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("ai_teachers").select("*").eq("id", id).maybeSingle();
    if (!error && data) return mapAITeacherRow(data);
  }
  return getAITeacherById(id);
}

// ---------------------------------------------------------------------------
// Formações (career paths)
// ---------------------------------------------------------------------------
const CAREER_PATH_SELECT = "*, career_path_courses(course_id, order_index)";

export async function getCareerPaths(): Promise<CareerPath[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("career_paths").select(CAREER_PATH_SELECT);
    if (!error && data && data.length > 0) return data.map(mapCareerPathRow);
  }
  return careerPaths;
}

export async function getCareerPath(slug: string): Promise<CareerPath | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("career_paths")
      .select(CAREER_PATH_SELECT)
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return mapCareerPathRow(data);
  }
  return getCareerPathBySlug(slug);
}

async function getCareerPathById(id: string): Promise<CareerPath | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("career_paths").select(CAREER_PATH_SELECT).eq("id", id).maybeSingle();
    if (!error && data) return mapCareerPathRow(data);
  }
  return careerPaths.find((cp) => cp.id === id);
}

export async function getCoursesForCareerPath(slug: string): Promise<Course[]> {
  const path = await getCareerPath(slug);
  if (!path) return [];

  const supabase = await getSupabase();
  if (supabase && path.courseIds.length > 0) {
    const { data, error } = await supabase.from("courses").select(COURSE_SELECT).in("id", path.courseIds);
    if (!error && data) {
      const byId = new Map(data.map((row) => [row.id, mapCourseRow(row)]));
      const ordered = path.courseIds.map((id) => byId.get(id)).filter((c): c is Course => Boolean(c));
      if (ordered.length > 0) return ordered;
    }
  }

  return path.courseIds.map((id) => allCourses.find((c) => c.id === id)).filter((c): c is Course => Boolean(c));
}

// ---------------------------------------------------------------------------
// Cursos
// ---------------------------------------------------------------------------
const COURSE_SELECT = "*, modules(id, order_index), quizzes(id, kind)";

export async function getCourse(slug: string): Promise<Course | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("courses").select(COURSE_SELECT).eq("slug", slug).maybeSingle();
    if (!error && data) return mapCourseRow(data);
  }
  return allCourses.find((c) => c.slug === slug);
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("courses").select(COURSE_SELECT).eq("id", id).maybeSingle();
    if (!error && data) return mapCourseRow(data);
  }
  return allCourses.find((c) => c.id === id);
}

// ---------------------------------------------------------------------------
// Módulos
// ---------------------------------------------------------------------------
const MODULE_SELECT = "*, lessons(id, order_index), quizzes(id, kind)";

export async function getModulesForCourse(courseId: string): Promise<CourseModule[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("modules")
      .select(MODULE_SELECT)
      .eq("course_id", courseId)
      .order("order_index");
    if (!error && data && data.length > 0) return data.map(mapModuleRow);
  }
  return allModules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
}

export async function getModuleById(id: string): Promise<CourseModule | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("modules").select(MODULE_SELECT).eq("id", id).maybeSingle();
    if (!error && data) return mapModuleRow(data);
  }
  return allModules.find((m) => m.id === id);
}

// ---------------------------------------------------------------------------
// Aulas
// ---------------------------------------------------------------------------
const LESSON_SELECT = "*, activities(id)";

export async function getLessonsForModule(moduleId: string): Promise<Lesson[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("lessons")
      .select(LESSON_SELECT)
      .eq("module_id", moduleId)
      .order("order_index");
    if (!error && data && data.length > 0) return data.map(mapLessonRow);
  }
  return allLessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("lessons").select(LESSON_SELECT).eq("id", id).maybeSingle();
    if (!error && data) return mapLessonRow(data);
  }
  return allLessons.find((l) => l.id === id);
}

export async function getAllLessonsForCourse(courseId: string): Promise<{ lesson: Lesson; module: CourseModule }[]> {
  const modules = await getModulesForCourse(courseId);
  const pairs = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await getLessonsForModule(mod.id);
      return lessons.map((lesson) => ({ lesson, module: mod }));
    })
  );
  return pairs.flat();
}

// ---------------------------------------------------------------------------
// Apostilas
// ---------------------------------------------------------------------------
export async function getMaterialForCourse(courseId: string): Promise<CourseMaterial | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("course_materials")
      .select("*, material_chapters(*, activities(id))")
      .eq("course_id", courseId)
      .maybeSingle();
    if (!error && data) return mapMaterialRow(data);
  }
  return allMaterials.find((m) => m.courseId === courseId);
}

export async function getChapterById(materialId: string, chapterId: string) {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("material_chapters")
      .select("*, activities(id)")
      .eq("id", chapterId)
      .maybeSingle();
    if (!error && data) return mapChapterRow(data);
  }
  const material = allMaterials.find((m) => m.id === materialId);
  return material?.chapters.find((c) => c.id === chapterId);
}

// ---------------------------------------------------------------------------
// Atividades
// ---------------------------------------------------------------------------
export async function getActivityById(id: string): Promise<Activity | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("activities").select("*").eq("id", id).maybeSingle();
    if (!error && data) return mapActivityRow(data);
  }
  return allActivities.find((a) => a.id === id);
}

export async function getActivitiesForLesson(lessonId: string): Promise<Activity[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("activities").select("*").eq("lesson_id", lessonId);
    if (!error && data && data.length > 0) return data.map(mapActivityRow);
  }
  return allActivities.filter((a) => a.lessonId === lessonId);
}

// ---------------------------------------------------------------------------
// Quizzes
// ---------------------------------------------------------------------------
const QUIZ_SELECT = "*, questions(*, answers(*))";

export async function getQuizById(id: string): Promise<Quiz | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("quizzes").select(QUIZ_SELECT).eq("id", id).maybeSingle();
    if (!error && data) return mapQuizRow(data);
  }
  return allQuizzes.find((q) => q.id === id);
}

export async function getQuizForModule(moduleId: string): Promise<Quiz | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("quizzes").select(QUIZ_SELECT).eq("module_id", moduleId).maybeSingle();
    if (!error && data) return mapQuizRow(data);
  }
  return allQuizzes.find((q) => q.moduleId === moduleId);
}

export async function getFinalQuizForCourse(courseId: string): Promise<Quiz | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("quizzes")
      .select(QUIZ_SELECT)
      .eq("course_id", courseId)
      .eq("kind", "avaliacao_final")
      .maybeSingle();
    if (!error && data) return mapQuizRow(data);
  }
  return allQuizzes.find((q) => q.courseId === courseId && q.kind === "avaliacao_final");
}

// ---------------------------------------------------------------------------
// Relações reversas
// ---------------------------------------------------------------------------
export async function findCourseByLessonId(lessonId: string): Promise<Course | undefined> {
  const lesson = await getLessonById(lessonId);
  if (!lesson) return undefined;
  const mod = await getModuleById(lesson.moduleId);
  if (!mod) return undefined;
  return getCourseById(mod.courseId);
}

export async function findCareerPathForCourse(courseId: string): Promise<CareerPath | undefined> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("career_path_courses")
      .select("career_path_id")
      .eq("course_id", courseId)
      .maybeSingle();
    if (!error && data) return getCareerPathById(data.career_path_id);
  }
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

export async function globalSearch(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const [allAreas, allProfessions, courses, paths] = await Promise.all([
    getAreas(),
    getProfessions(),
    getCourses(),
    getCareerPaths(),
  ]);

  const results: SearchResult[] = [];

  for (const area of allAreas) {
    if (area.name.toLowerCase().includes(q) || area.description.toLowerCase().includes(q)) {
      results.push({ type: "area", title: area.name, description: area.description, href: `/profissoes/${area.slug}` });
    }
  }

  for (const profession of allProfessions) {
    if (
      profession.name.toLowerCase().includes(q) ||
      profession.summary.toLowerCase().includes(q) ||
      profession.skills.some((s) => s.toLowerCase().includes(q))
    ) {
      const area = allAreas.find((a) => a.id === profession.areaId);
      results.push({
        type: "profissao",
        title: profession.name,
        description: profession.summary,
        href: `/profissoes/${area?.slug ?? profession.areaId}/${profession.slug}`,
      });
    }
  }

  for (const course of courses) {
    if (
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ type: "curso", title: course.title, description: course.description, href: `/cursos/${course.slug}` });
    }
  }

  for (const path of paths) {
    if (path.title.toLowerCase().includes(q) || path.description.toLowerCase().includes(q)) {
      results.push({ type: "formacao", title: path.title, description: path.description, href: `/formacoes/${path.slug}` });
    }
  }

  return results.slice(0, 30);
}

export async function getProfessions(): Promise<Profession[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("professions").select("*, career_paths(id)");
    if (!error && data && data.length > 0) return data.map(mapProfessionRow);
  }
  return professions;
}

export async function getCourses(): Promise<Course[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("courses").select(COURSE_SELECT);
    if (!error && data && data.length > 0) return data.map(mapCourseRow);
  }
  return allCourses;
}
