import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuizView } from "@/components/course/quiz-view";
import { getCourse, getQuizById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ curso: string; quiz: string }>;
}): Promise<Metadata> {
  const { quiz: quizId } = await params;
  const quiz = getQuizById(quizId);
  return quiz ? { title: quiz.title } : {};
}

export default async function QuizPage({ params }: { params: Promise<{ curso: string; quiz: string }> }) {
  const { curso, quiz: quizId } = await params;
  const course = getCourse(curso);
  const quiz = getQuizById(quizId);
  if (!course || !quiz) notFound();

  const isFinal = quiz.kind === "avaliacao_final" && quiz.courseId === course.id;

  return (
    <div className="container-app max-w-2xl py-10">
      <Link href={`/cursos/${course.slug}`} className="text-sm font-semibold text-brand hover:underline">
        ← {course.title}
      </Link>
      <h1 className="mt-4 text-2xl font-extrabold">{quiz.title}</h1>
      <p className="mt-1 text-sm text-muted">
        Nota mínima para aprovação: {quiz.passingScore}% · {quiz.questions.length} questões
      </p>
      <div className="mt-6">
        <QuizView
          quiz={quiz}
          isFinal={isFinal}
          courseId={isFinal ? course.id : undefined}
          courseTitle={course.title}
          courseDurationMinutes={course.durationMinutes}
        />
      </div>
    </div>
  );
}
