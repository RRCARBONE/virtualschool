// Questionário "Descobrir profissão". Cada opção contribui pontos para uma
// ou mais áreas — a IA (ver /api/ai/discover) usa essas respostas como
// contexto para gerar sugestões personalizadas; localmente, mantemos uma
// heurística simples como fallback sem depender de rede.

export interface DiscoveryQuestion {
  id: string;
  question: string;
  helper?: string;
  options: { id: string; label: string; areas: string[] }[];
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: "interesse",
    question: "O que mais desperta sua curiosidade?",
    options: [
      { id: "tecnologia", label: "Como as coisas funcionam por dentro (sistemas, aparelhos, códigos)", areas: ["tecnologia", "inteligencia-artificial", "engenharia"] },
      { id: "pessoas", label: "Entender e ajudar pessoas", areas: ["saude", "educacao", "administracao"] },
      { id: "criatividade", label: "Criar algo visual, artístico ou audiovisual", areas: ["design", "audiovisual", "fotografia", "games"] },
      { id: "negocios", label: "Negócios, números e estratégia", areas: ["financas", "administracao", "empreendedorismo", "vendas"] },
      { id: "mundo-fisico", label: "Construir, consertar ou cuidar de coisas concretas", areas: ["construcao", "mecanica", "eletrica", "agronegocio"] },
    ],
  },
  {
    id: "materia",
    question: "Qual matéria escolar mais fazia sentido para você?",
    options: [
      { id: "exatas", label: "Matemática e ciências exatas", areas: ["tecnologia", "engenharia", "financas", "ciencia"] },
      { id: "humanas", label: "Português, história e ciências humanas", areas: ["educacao", "idiomas", "audiovisual"] },
      { id: "artes", label: "Artes e educação visual", areas: ["design", "fotografia", "games"] },
      { id: "biologicas", label: "Biologia e ciências da natureza", areas: ["saude", "meio-ambiente", "agronegocio"] },
      { id: "empreendedora", label: "Nenhuma em especial — sempre gostei de projetos práticos", areas: ["empreendedorismo", "vendas", "gastronomia", "turismo"] },
    ],
  },
  {
    id: "atividade",
    question: "Em um projeto em grupo, qual papel você mais gosta de assumir?",
    options: [
      { id: "organizador", label: "Organizar tarefas e liderar o grupo", areas: ["administracao", "empreendedorismo", "vendas"] },
      { id: "criador", label: "Criar o conteúdo visual ou a comunicação", areas: ["design", "marketing", "audiovisual"] },
      { id: "resolvedor", label: "Resolver os problemas técnicos que aparecem", areas: ["tecnologia", "engenharia", "eletrica", "mecanica"] },
      { id: "cuidador", label: "Cuidar do bem-estar do grupo", areas: ["saude", "educacao", "esportes"] },
      { id: "analista", label: "Analisar dados e números do projeto", areas: ["financas", "inteligencia-artificial", "ciencia"] },
    ],
  },
  {
    id: "aprender",
    question: "Se pudesse aprender qualquer coisa nova agora, o que escolheria?",
    options: [
      { id: "programar", label: "Programar e criar sistemas", areas: ["tecnologia", "inteligencia-artificial", "games"] },
      { id: "comunicar", label: "Comunicação, marketing ou vendas", areas: ["marketing", "vendas", "empreendedorismo"] },
      { id: "cuidar", label: "Cuidados com saúde e bem-estar", areas: ["saude", "esportes", "beleza"] },
      { id: "idiomas", label: "Um novo idioma", areas: ["idiomas", "turismo"] },
      { id: "meio-ambiente", label: "Sustentabilidade e meio ambiente", areas: ["meio-ambiente", "agronegocio"] },
    ],
  },
  {
    id: "ambiente",
    question: "Qual ambiente de trabalho parece mais interessante para você?",
    options: [
      { id: "remoto", label: "Remoto, com flexibilidade de horário", areas: ["tecnologia", "marketing", "design", "idiomas"] },
      { id: "campo", label: "Ao ar livre ou em campo", areas: ["agronegocio", "construcao", "turismo", "meio-ambiente"] },
      { id: "atendimento", label: "Em contato direto com clientes ou pacientes", areas: ["saude", "vendas", "beleza", "gastronomia"] },
      { id: "laboratorio", label: "Laboratório, estúdio ou oficina", areas: ["ciencia", "fotografia", "audiovisual", "mecanica"] },
      { id: "escritorio", label: "Escritório, em times estruturados", areas: ["administracao", "financas", "engenharia"] },
    ],
  },
];

export interface DiscoverySuggestion {
  areaSlug: string;
  score: number;
}

export function scoreDiscoveryAnswers(selections: string[][]): DiscoverySuggestion[] {
  const scores = new Map<string, number>();

  for (const questionSelections of selections) {
    for (const optionId of questionSelections) {
      for (const question of discoveryQuestions) {
        const option = question.options.find((o) => o.id === optionId);
        if (!option) continue;
        for (const area of option.areas) {
          scores.set(area, (scores.get(area) ?? 0) + 1);
        }
      }
    }
  }

  return Array.from(scores.entries())
    .map(([areaSlug, score]) => ({ areaSlug, score }))
    .sort((a, b) => b.score - a.score);
}
