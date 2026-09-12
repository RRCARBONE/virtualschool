"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Activity } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  multipla_escolha: "Múltipla escolha",
  verdadeiro_falso: "Verdadeiro ou falso",
  aberta: "Pergunta aberta",
  pratica: "Exercício prático",
  desafio: "Desafio",
  estudo_de_caso: "Estudo de caso",
};

export function ActivityView({ activity }: { activity: Activity }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hasOptions = Boolean(activity.options && activity.options.length > 0);
  const correctOption = activity.options?.find((o) => o.correct);
  const isCorrect = hasOptions ? selected === correctOption?.id : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand">
        {TYPE_LABELS[activity.type] ?? activity.type}
      </span>
      <h1 className="mt-1 text-xl font-bold">{activity.title}</h1>
      <p className="mt-3 leading-relaxed">{activity.prompt}</p>

      {hasOptions ? (
        <div className="mt-5 space-y-2.5">
          {activity.options!.map((option) => {
            const isSelected = selected === option.id;
            const showState = submitted && (isSelected || option.correct);
            return (
              <button
                key={option.id}
                disabled={submitted}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default",
                  isSelected && !submitted && "border-brand bg-brand-light",
                  !isSelected && !submitted && "border-border hover:bg-surface-muted",
                  showState && option.correct && "border-accent bg-accent-light",
                  showState && isSelected && !option.correct && "border-danger bg-danger/10"
                )}
              >
                {option.text}
                {showState && option.correct && <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-dark" />}
                {showState && isSelected && !option.correct && <XCircle className="h-4 w-4 shrink-0 text-danger" />}
              </button>
            );
          })}
        </div>
      ) : (
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          disabled={submitted}
          rows={5}
          placeholder="Escreva sua resposta..."
          className="mt-5 w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-brand disabled:opacity-70"
        />
      )}

      {!submitted ? (
        <Button
          className="mt-5"
          onClick={() => setSubmitted(true)}
          disabled={hasOptions ? !selected : answerText.trim().length === 0}
        >
          Enviar resposta
        </Button>
      ) : (
        <div className="mt-5 space-y-3">
          {hasOptions && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold",
                isCorrect ? "bg-accent-light text-accent-dark" : "bg-danger/10 text-danger"
              )}
            >
              {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {isCorrect ? "Resposta correta!" : "Não foi dessa vez."}
            </div>
          )}
          {activity.correctExplanation && (
            <div className="rounded-xl bg-surface-muted p-4 text-sm text-muted">{activity.correctExplanation}</div>
          )}
          {activity.expectedPoints && activity.expectedPoints.length > 0 && (
            <div className="rounded-xl bg-surface-muted p-4 text-sm">
              <p className="font-semibold">Pontos esperados na resposta:</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
                {activity.expectedPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          )}
          <Button variant="ghost" onClick={() => { setSubmitted(false); setSelected(null); setAnswerText(""); }}>
            Tentar novamente
          </Button>
        </div>
      )}
    </div>
  );
}
