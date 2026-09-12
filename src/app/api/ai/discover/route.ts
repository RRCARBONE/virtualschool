import { NextResponse } from "next/server";
import { askClaude, isAIConfigured } from "@/lib/ai/client";
import { discoveryQuestions, scoreDiscoveryAnswers } from "@/lib/data/discovery";
import { areas, getProfessionsForArea } from "@/lib/data";

interface DiscoverBody {
  selections: string[][]; // uma lista de option ids selecionadas por pergunta
}

function fallbackSuggestions(selections: string[][]) {
  const ranked = scoreDiscoveryAnswers(selections).slice(0, 3);
  return ranked.map((r) => {
    const area = areas.find((a) => a.slug === r.areaSlug);
    const professions = area ? getProfessionsForArea(area.id).slice(0, 3) : [];
    return {
      areaSlug: r.areaSlug,
      areaName: area?.name ?? r.areaSlug,
      reason: `Suas respostas indicam afinidade com ${area?.name ?? "esta área"}.`,
      professions: professions.map((p) => ({ slug: p.slug, name: p.name })),
    };
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as DiscoverBody;
  const selections = body.selections ?? [];

  const heuristic = fallbackSuggestions(selections);

  if (!isAIConfigured) {
    return NextResponse.json({ source: "heuristica", suggestions: heuristic });
  }

  try {
    const answersSummary = discoveryQuestions
      .map((q, i) => {
        const chosen = (selections[i] ?? [])
          .map((id) => q.options.find((o) => o.id === id)?.label)
          .filter(Boolean);
        return `- ${q.question}\n  Resposta: ${chosen.join("; ") || "não respondida"}`;
      })
      .join("\n");

    const areasList = areas.map((a) => `${a.slug}: ${a.name} — ${a.description}`).join("\n");

    const text = await askClaude({
      system:
        "Você ajuda estudantes a explorar possíveis áreas e profissões, nunca afirmando existir uma escolha " +
        "perfeita — apenas sugestões para exploração. Responda SOMENTE em JSON válido, no formato: " +
        '{"suggestions":[{"areaSlug":"...","reason":"..."}]}. Escolha até 3 áreas da lista fornecida, ' +
        "usando exatamente os slugs informados. Escreva 'reason' em português do Brasil, em 1 frase curta, " +
        "conectando as respostas do aluno à área sugerida.",
      messages: [
        {
          role: "user",
          content: `Áreas disponíveis:\n${areasList}\n\nRespostas do aluno ao questionário "Descobrir profissão":\n${answersSummary}\n\nSugira até 3 áreas.`,
        },
      ],
      maxTokens: 500,
    });

    if (!text) return NextResponse.json({ source: "heuristica", suggestions: heuristic });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    const aiSuggestions: { areaSlug: string; reason: string }[] = parsed?.suggestions ?? [];

    const suggestions = aiSuggestions
      .map((s) => {
        const area = areas.find((a) => a.slug === s.areaSlug);
        if (!area) return null;
        const professions = getProfessionsForArea(area.id).slice(0, 3);
        return {
          areaSlug: area.slug,
          areaName: area.name,
          reason: s.reason,
          professions: professions.map((p) => ({ slug: p.slug, name: p.name })),
        };
      })
      .filter(Boolean);

    if (suggestions.length === 0) {
      return NextResponse.json({ source: "heuristica", suggestions: heuristic });
    }

    return NextResponse.json({ source: "ia", suggestions });
  } catch {
    return NextResponse.json({ source: "heuristica", suggestions: heuristic });
  }
}
