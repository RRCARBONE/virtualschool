"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, CheckCircle2, XCircle } from "lucide-react";
import type { Quiz } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn, formatMinutes } from "@/lib/utils";
import { progressStore } from "@/lib/progress/store";

export function QuizView({
  quiz,
  isFinal,
  courseId,
  courseTitle,
  courseDurationMinutes,
}: {
  quiz: Quiz;
  isFinal: boolean;
  courseId?: string;
  courseTitle?: string;
  courseDurationMinutes?: number;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === quiz.questions.length;

  const correctCount = quiz.questions.filter((q) => {
    const correct = q.options.find((o) => o.correct);
    return correct && answers[q.id] === correct.id;
  }).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  function handleSubmit() {
    setSubmitted(true);
    progressStore.recordQuizAttempt(quiz.id, score, passed);
  }

  function handleIssueCertificate() {
    if (!courseId || !courseTitle) return;
    setIssuing(true);
    const cert = progressStore.issueCertificate({
      courseId,
      title: courseTitle,
      hours: Math.max(1, Math.round((courseDurationMinutes ?? 60) / 60)),
    });
    router.push(`/certificados/${cert.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{quiz.title}</span>
          <span className="text-muted">{answeredCount}/{quiz.questions.length} respondidas</span>
        </div>
        <ProgressBar percent={(answeredCount / quiz.questions.length) * 100} className="mt-3" />
      </div>

      {quiz.questions.map((question, qi) => {
        const selected = answers[question.id];
        const correctOption = question.options.find((o) => o.correct);

        return (
          <div key={question.id} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Questão {qi + 1}</p>
            <p className="mt-1 font-medium">{question.prompt}</p>
            <div className="mt-4 space-y-2">
              {question.options.map((option) => {
                const isSelected = selected === option.id;
                const showState = submitted && (isSelected || option.id === correctOption?.id);
                return (
                  <button
                    key={option.id}
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                      isSelected && !submitted && "border-brand bg-brand-light",
                      !isSelected && !submitted && "border-border hover:bg-surface-muted",
                      showState && option.id === correctOption?.id && "border-accent bg-accent-light",
                      showState && isSelected && option.id !== correctOption?.id && "border-danger bg-danger/10"
                    )}
                  >
                    {option.text}
                    {showState && option.id === correctOption?.id && <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-dark" />}
                    {showState && isSelected && option.id !== correctOption?.id && <XCircle className="h-4 w-4 shrink-0 text-danger" />}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 rounded-xl bg-surface-muted p-3 text-sm text-muted">{question.explanation}</p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <Button size="lg" className="w-full" disabled={!allAnswered} onClick={handleSubmit}>
          Enviar respostas
        </Button>
      ) : (
        <div
          className={cn(
            "rounded-2xl p-6 text-center",
            passed ? "bg-accent-light text-accent-dark" : "bg-danger/10 text-danger"
          )}
        >
          <p className="text-3xl font-extrabold">{score}%</p>
          <p className="mt-1 font-medium">
            {passed ? "Parabéns, você foi aprovado!" : `Você precisa de ${quiz.passingScore}% para ser aprovado.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {!passed && (
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
              >
                Tentar novamente
              </Button>
            )}
            {passed && isFinal && courseId && (
              <Button variant="accent" onClick={handleIssueCertificate} disabled={issuing}>
                <Award className="h-4 w-4" /> Emitir certificado do curso
              </Button>
            )}
          </div>
        </div>
      )}
      {courseDurationMinutes !== undefined && isFinal && (
        <p className="text-center text-xs text-muted">Carga horária deste curso: {formatMinutes(courseDurationMinutes)}</p>
      )}
    </div>
  );
}
