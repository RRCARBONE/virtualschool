/**
 * Popula as tabelas do Supabase com o conteúdo seed local (o mesmo que
 * alimenta o modo demonstração em src/lib/data), para que o site passe a
 * ler dados reais do banco.
 *
 * Uso:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run db:seed
 *
 * A SUPABASE_SERVICE_ROLE_KEY só é usada aqui (nunca no app) porque as
 * políticas de RLS restringem escrita nas tabelas de conteúdo a usuários
 * admin — a service role ignora RLS para permitir este carregamento
 * inicial em lote. Pegue-a em Project Settings → API → service_role.
 *
 * O script é idempotente (usa upsert), então pode ser rodado de novo com
 * segurança após alterar o conteúdo local.
 */
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

import { areas } from "../src/lib/data/areas";
import { professions } from "../src/lib/data/professions";
import { aiTeachers } from "../src/lib/data/ai-teachers";
import { careerPaths } from "../src/lib/data/career-paths";
import * as devSoftware from "../src/lib/data/courses/dev-software";
import * as marketingDigital from "../src/lib/data/courses/marketing-digital";
import * as gestaoFinanceira from "../src/lib/data/courses/gestao-financeira";

const courses = [...devSoftware.courses, ...marketingDigital.courses, ...gestaoFinanceira.courses];
const modules = [...devSoftware.modules, ...marketingDigital.modules, ...gestaoFinanceira.modules];
const lessons = [...devSoftware.lessons, ...marketingDigital.lessons, ...gestaoFinanceira.lessons];
const materials = [...devSoftware.materials, ...marketingDigital.materials, ...gestaoFinanceira.materials];
const activities = [...devSoftware.activities, ...marketingDigital.activities, ...gestaoFinanceira.activities];
const quizzes = [...devSoftware.quizzes, ...marketingDigital.quizzes, ...gestaoFinanceira.quizzes];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (Project Settings → API) antes de rodar o seed."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Mapeia os ids legíveis usados no seed local (ex: "curso-introducao-programacao")
// para uuids reais, já que as tabelas do Supabase usam `uuid` como chave
// primária. Composite keys evitam colisão entre ids reaproveitados em
// contextos diferentes (ex: toda questão de quiz usa "q1", "q2"...).
const idMap = new Map<string, string>();
function uuidFor(key: string) {
  if (!idMap.has(key)) idMap.set(key, randomUUID());
  return idMap.get(key)!;
}

async function upsert(table: string, rows: Record<string, unknown>[], onConflict?: string, chunkSize = 200) {
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from(table).upsert(chunk, onConflict ? { onConflict } : undefined);
    if (error) throw new Error(`Falha ao gravar em "${table}": ${error.message}`);
  }
  console.log(`✓ ${table}: ${rows.length} linha(s)`);
}

async function main() {
  await upsert(
    "categories",
    areas.map((area, index) => ({
      id: uuidFor(area.id),
      slug: area.slug,
      name: area.name,
      description: area.description,
      icon: area.icon,
      color_from: area.colorFrom,
      color_to: area.colorTo,
      order_index: index,
    }))
  );

  await upsert(
    "ai_teachers",
    aiTeachers.map((t) => ({
      id: uuidFor(t.id),
      slug: t.slug,
      name: t.name,
      avatar: t.avatar,
      title: t.title,
      specialty: t.specialty,
      personality: t.personality,
      explanation_style: t.explanationStyle,
      system_prompt: t.systemPrompt,
    }))
  );

  await upsert(
    "professions",
    professions.map((p) => ({
      id: uuidFor(p.id),
      slug: p.slug,
      category_id: uuidFor(p.areaId),
      name: p.name,
      summary: p.summary,
      daily_activities: p.dailyActivities,
      skills: p.skills,
      average_salary_range: p.averageSalaryRange ?? null,
      work_environments: p.workEnvironments,
    }))
  );

  await upsert(
    "career_paths",
    careerPaths.map((cp) => ({
      id: uuidFor(cp.id),
      slug: cp.slug,
      profession_id: uuidFor(cp.professionId),
      title: cp.title,
      description: cp.description,
      cover_image: cp.coverImage,
      total_hours: cp.totalHours,
      published: true,
    }))
  );

  await upsert(
    "courses",
    courses.map((c) => ({
      id: uuidFor(c.id),
      slug: c.slug,
      category_id: uuidFor(c.areaId),
      ai_teacher_id: uuidFor(c.aiTeacherId),
      title: c.title,
      description: c.description,
      cover: c.cover,
      level: c.level,
      duration_minutes: c.durationMinutes,
      published: c.published,
      tags: c.tags,
    }))
  );

  const careerPathCourseRows = careerPaths.flatMap((cp) =>
    cp.courseIds.map((courseId, index) => ({
      career_path_id: uuidFor(cp.id),
      course_id: uuidFor(courseId),
      order_index: index,
    }))
  );
  await upsert("career_path_courses", careerPathCourseRows, "career_path_id,course_id");

  await upsert(
    "modules",
    modules.map((m) => ({
      id: uuidFor(m.id),
      course_id: uuidFor(m.courseId),
      order_index: m.order,
      title: m.title,
      summary: m.summary,
    }))
  );

  await upsert(
    "course_materials",
    materials.map((mat) => ({
      id: uuidFor(mat.id),
      course_id: uuidFor(mat.courseId),
      title: mat.title,
      cover: mat.cover,
    }))
  );

  const chapterRows = materials.flatMap((mat) =>
    mat.chapters.map((ch) => ({
      id: uuidFor(ch.id),
      material_id: uuidFor(mat.id),
      order_index: ch.order,
      title: ch.title,
      content: ch.content,
      examples: ch.examples ?? [],
      summary: ch.summary ?? null,
    }))
  );
  await upsert("material_chapters", chapterRows);

  // As aulas referenciam capítulos da apostila (chapter_ref) — os capítulos
  // já foram gravados acima, então os uuids já existem no mapa.
  await upsert(
    "lessons",
    lessons.map((l) => ({
      id: uuidFor(l.id),
      module_id: uuidFor(l.moduleId),
      order_index: l.order,
      title: l.title,
      duration_minutes: l.durationMinutes,
      video_url: l.videoUrl ?? null,
      video_provider: l.videoProvider ?? "placeholder",
      transcript: l.transcript ?? null,
      objectives: l.objectives,
      chapter_ref: l.chapterRef ? uuidFor(l.chapterRef) : null,
    }))
  );

  await upsert(
    "activities",
    activities.map((a) => ({
      id: uuidFor(a.id),
      lesson_id: a.lessonId ? uuidFor(a.lessonId) : null,
      title: a.title,
      type: a.type,
      prompt: a.prompt,
      options: a.options ?? [],
      correct_explanation: a.correctExplanation ?? null,
      expected_points: a.expectedPoints ?? [],
    }))
  );

  await upsert(
    "quizzes",
    quizzes.map((q) => ({
      id: uuidFor(q.id),
      module_id: q.moduleId ? uuidFor(q.moduleId) : null,
      course_id: q.courseId ? uuidFor(q.courseId) : null,
      title: q.title,
      kind: q.kind,
      passing_score: q.passingScore,
    }))
  );

  const questionRows: Record<string, unknown>[] = [];
  const answerRows: Record<string, unknown>[] = [];
  for (const quiz of quizzes) {
    quiz.questions.forEach((question, qi) => {
      const questionKey = `${quiz.id}::${question.id}`;
      questionRows.push({
        id: uuidFor(questionKey),
        quiz_id: uuidFor(quiz.id),
        order_index: qi,
        prompt: question.prompt,
        explanation: question.explanation,
      });
      question.options.forEach((option, oi) => {
        answerRows.push({
          id: uuidFor(`${questionKey}::${option.id}`),
          question_id: uuidFor(questionKey),
          order_index: oi,
          text: option.text,
          correct: Boolean(option.correct),
        });
      });
    });
  }
  await upsert("questions", questionRows);
  await upsert("answers", answerRows);

  console.log("\nSeed concluído com sucesso.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
