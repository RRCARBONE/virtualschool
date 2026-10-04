import { NextResponse } from "next/server";
import { askClaude, isAIConfigured } from "@/lib/ai/client";
import { getAITeacher, getCourseById, getLessonById } from "@/lib/data";

interface ChatBody {
  courseId: string;
  lessonId?: string;
  messages: { role: "user" | "assistant"; content: string }[];
}

function localFallbackReply(teacherName: string) {
  return (
    `Oi! Sou ${teacherName}. No momento estou em modo demonstração (sem conexão com a IA configurada), ` +
    "mas normalmente eu explicaria esse conteúdo com exemplos práticos, tiraria suas dúvidas e criaria " +
    "exercícios extras com base na aula atual. Configure a variável ANTHROPIC_API_KEY para ativar as respostas reais."
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatBody;
  const course = await getCourseById(body.courseId);
  const [teacher, lesson] = await Promise.all([
    course ? getAITeacher(course.aiTeacherId) : undefined,
    body.lessonId ? getLessonById(body.lessonId) : undefined,
  ]);

  if (!teacher || !course) {
    return NextResponse.json({ reply: "Não foi possível identificar o curso ou o professor para esta conversa." }, { status: 400 });
  }

  if (!isAIConfigured) {
    return NextResponse.json({ reply: localFallbackReply(teacher.name), source: "demo" });
  }

  const context = [
    `Curso atual: ${course.title} — ${course.description}`,
    lesson ? `Aula atual: ${lesson.title}. Objetivos: ${lesson.objectives.join("; ")}.` : null,
    lesson?.transcript ? `Resumo do conteúdo da aula: ${lesson.transcript}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const reply = await askClaude({
      system: `${teacher.systemPrompt}\n\nContexto atual do aluno:\n${context}`,
      messages: body.messages.slice(-12),
      maxTokens: 600,
    });

    return NextResponse.json({ reply: reply ?? localFallbackReply(teacher.name), source: "ia" });
  } catch {
    return NextResponse.json({ reply: localFallbackReply(teacher.name), source: "erro" });
  }
}
