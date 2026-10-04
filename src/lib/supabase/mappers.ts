import "server-only";
import type {
  ActivityOption,
  Activity,
  AITeacher,
  Area,
  CareerPath,
  Course,
  CourseMaterial,
  CourseModule,
  Lesson,
  MaterialChapter,
  Profession,
  Quiz,
  QuizQuestion,
} from "@/lib/types";

// ============================================================================
// Converte as linhas do Supabase (snake_case, como definidas em
// supabase/migrations/0001_init.sql) para os tipos de domínio usados no
// front-end (camelCase, em src/lib/types.ts). Mantém a camada de dados
// (src/lib/data) livre de detalhes de schema SQL.
// ============================================================================

// As linhas chegam tipadas como `any` vindas do supabase-js (sem geração de
// tipos do schema); os mapeadores abaixo são o único lugar que lida com isso.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export function mapCategoryToArea(row: Row): Area {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    icon: row.icon ?? "Sparkles",
    colorFrom: row.color_from ?? "#5b3df0",
    colorTo: row.color_to ?? "#16c793",
  };
}

export function mapProfessionRow(row: Row): Profession {
  return {
    id: row.id,
    slug: row.slug,
    areaId: row.category_id,
    name: row.name,
    summary: row.summary ?? "",
    dailyActivities: row.daily_activities ?? [],
    skills: row.skills ?? [],
    averageSalaryRange: row.average_salary_range ?? undefined,
    workEnvironments: row.work_environments ?? [],
    formationIds: (row.career_paths ?? []).map((cp: Row) => cp.id),
  };
}

export function mapAITeacherRow(row: Row): AITeacher {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    avatar: row.avatar ?? "🤖",
    title: row.title,
    specialty: row.specialty,
    personality: row.personality ?? "",
    explanationStyle: row.explanation_style ?? "",
    systemPrompt: row.system_prompt ?? "",
  };
}

export function mapCareerPathRow(row: Row): CareerPath {
  const courseLinks: Row[] = row.career_path_courses ?? [];
  const courseIds = [...courseLinks]
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
    .map((link) => link.course_id);

  return {
    id: row.id,
    slug: row.slug,
    professionId: row.profession_id,
    title: row.title,
    description: row.description ?? "",
    coverImage: row.cover_image ?? "violet",
    totalHours: Number(row.total_hours ?? 0),
    courseIds,
  };
}

export function mapCourseRow(row: Row): Course {
  const modules: Row[] = row.modules ?? [];
  const finalQuiz: Row[] = row.quizzes ?? [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    cover: row.cover ?? "violet",
    areaId: row.category_id,
    aiTeacherId: row.ai_teacher_id,
    level: row.level,
    durationMinutes: row.duration_minutes ?? 0,
    published: row.published ?? false,
    moduleIds: [...modules].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)).map((m) => m.id),
    finalAssessmentId: finalQuiz.find((q) => q.kind === "avaliacao_final")?.id,
    tags: row.tags ?? [],
  };
}

export function mapModuleRow(row: Row): CourseModule {
  const lessons: Row[] = row.lessons ?? [];
  const quizzes: Row[] = row.quizzes ?? [];

  return {
    id: row.id,
    courseId: row.course_id,
    order: row.order_index ?? 0,
    title: row.title,
    summary: row.summary ?? "",
    lessonIds: [...lessons].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)).map((l) => l.id),
    quizId: quizzes.find((q) => q.kind === "modulo")?.id,
  };
}

export function mapLessonRow(row: Row): Lesson {
  const activities: Row[] = row.activities ?? [];

  return {
    id: row.id,
    moduleId: row.module_id,
    order: row.order_index ?? 0,
    title: row.title,
    durationMinutes: row.duration_minutes ?? 0,
    videoUrl: row.video_url ?? undefined,
    videoProvider: row.video_provider ?? "placeholder",
    transcript: row.transcript ?? undefined,
    objectives: row.objectives ?? [],
    chapterRef: row.chapter_ref ?? undefined,
    activityIds: activities.map((a) => a.id),
  };
}

export function mapMaterialRow(row: Row): CourseMaterial {
  const chapters: Row[] = row.material_chapters ?? [];
  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    cover: row.cover ?? "violet",
    chapters: [...chapters].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)).map(mapChapterRow),
  };
}

export function mapChapterRow(row: Row): MaterialChapter {
  const activities: Row[] = row.activities ?? [];
  return {
    id: row.id,
    order: row.order_index ?? 0,
    title: row.title,
    content: row.content ?? "",
    examples: row.examples ?? [],
    summary: row.summary ?? undefined,
    exerciseIds: activities.map((a) => a.id),
  };
}

export function mapActivityRow(row: Row): Activity {
  return {
    id: row.id,
    lessonId: row.lesson_id ?? undefined,
    title: row.title,
    type: row.type,
    prompt: row.prompt,
    options: (row.options ?? []) as ActivityOption[],
    correctExplanation: row.correct_explanation ?? undefined,
    expectedPoints: row.expected_points ?? [],
  };
}

export function mapQuizRow(row: Row): Quiz {
  const questions: Row[] = row.questions ?? [];
  return {
    id: row.id,
    moduleId: row.module_id ?? undefined,
    courseId: row.course_id ?? undefined,
    title: row.title,
    kind: row.kind,
    passingScore: row.passing_score ?? 70,
    questions: [...questions]
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map(mapQuestionRow),
  };
}

function mapQuestionRow(row: Row): QuizQuestion {
  const answers: Row[] = row.answers ?? [];
  return {
    id: row.id,
    prompt: row.prompt,
    explanation: row.explanation ?? "",
    options: [...answers]
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map((a) => ({ id: a.id, text: a.text, correct: a.correct })),
  };
}
