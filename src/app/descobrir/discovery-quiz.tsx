"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Loader2, RotateCcw } from "lucide-react";
import { discoveryQuestions } from "@/lib/data/discovery";
import { Button, LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface Suggestion {
  areaSlug: string;
  areaName: string;
  reason: string;
  professions: { slug: string; name: string }[];
}

export function DiscoveryQuiz() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[][]>(discoveryQuestions.map(() => []));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Suggestion[] | null>(null);

  const question = discoveryQuestions[step];
  const isLast = step === discoveryQuestions.length - 1;

  function toggleOption(optionId: string) {
    setSelections((prev) => {
      const next = [...prev];
      const current = next[step];
      next[step] = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return next;
    });
  }

  async function handleFinish() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
      });
      const data = await res.json();
      setResults(data.suggestions ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  if (results) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface-muted p-5 text-center">
          <Compass className="mx-auto h-8 w-8 text-brand" />
          <p className="mt-2 text-sm text-muted">
            Estas são sugestões para você explorar — não uma resposta definitiva. Sinta-se livre para
            navegar por outras áreas também.
          </p>
        </div>
        {results.length === 0 && (
          <p className="text-center text-muted">Não conseguimos gerar sugestões agora. Tente novamente em instantes.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          {results.map((s) => (
            <div key={s.areaSlug} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card">
              <h3 className="font-semibold">{s.areaName}</h3>
              <p className="text-sm text-muted">{s.reason}</p>
              <ul className="mt-1 space-y-1 text-sm">
                {s.professions.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/profissoes/${s.areaSlug}/${p.slug}`} className="text-brand hover:underline">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <LinkButton href={`/profissoes/${s.areaSlug}`} variant="outline" size="sm" className="mt-auto">
                Explorar {s.areaName}
              </LinkButton>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              setResults(null);
              setStep(0);
              setSelections(discoveryQuestions.map(() => []));
            }}
          >
            <RotateCcw className="h-4 w-4" /> Refazer o questionário
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProgressBar percent={((step + 1) / discoveryQuestions.length) * 100} />
      <p className="text-center text-xs font-medium text-muted">
        Pergunta {step + 1} de {discoveryQuestions.length}
      </p>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="text-lg font-semibold">{question.question}</h2>
        <p className="mt-1 text-xs text-muted">Você pode marcar mais de uma opção.</p>
        <div className="mt-5 grid gap-2.5">
          {question.options.map((option) => {
            const selected = selections[step].includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-brand bg-brand-light font-medium text-brand-dark"
                    : "border-border hover:bg-surface-muted"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        {isLast ? (
          <Button onClick={handleFinish} disabled={loading || selections[step].length === 0}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Ver sugestões
          </Button>
        ) : (
          <Button onClick={() => setStep((s) => s + 1)} disabled={selections[step].length === 0}>
            Próxima <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
