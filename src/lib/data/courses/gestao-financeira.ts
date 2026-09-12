import type { Activity, Course, CourseMaterial, CourseModule, Lesson, Quiz } from "@/lib/types";

// ============================================================================
// Formação — Gestão Financeira
// ============================================================================

export const courses: Course[] = [
  { id: "curso-fundamentos-financas", slug: "fundamentos-de-financas", title: "Fundamentos de Finanças", description: "Compreenda os conceitos essenciais para organizar a vida financeira pessoal ou de um negócio.", cover: "emerald", areaId: "financas", aiTeacherId: "prof-rafael", level: "iniciante", durationMinutes: 36, published: true, moduleIds: ["mod-ff-1"], finalAssessmentId: "quiz-ff-final", tags: ["finanças", "fundamentos"] },
  { id: "curso-planejamento-fluxo-de-caixa", slug: "planejamento-e-fluxo-de-caixa", title: "Planejamento e Fluxo de Caixa", description: "Aprenda a projetar entradas e saídas para tomar decisões financeiras mais seguras.", cover: "sky", areaId: "financas", aiTeacherId: "prof-rafael", level: "iniciante", durationMinutes: 38, published: true, moduleIds: ["mod-pfc-1"], finalAssessmentId: "quiz-pfc-final", tags: ["fluxo de caixa", "planejamento"] },
  { id: "curso-analise-de-investimentos", slug: "analise-de-investimentos", title: "Análise de Investimentos", description: "Entenda os principais conceitos para avaliar oportunidades de investimento com mais segurança.", cover: "indigo", areaId: "financas", aiTeacherId: "prof-rafael", level: "intermediario", durationMinutes: 40, published: true, moduleIds: ["mod-ai-1"], finalAssessmentId: "quiz-ai-final", tags: ["investimentos", "análise financeira"] },
];

export const modules: CourseModule[] = [
  { id: "mod-ff-1", courseId: "curso-fundamentos-financas", order: 1, title: "Organizando as finanças", summary: "Receitas, despesas e o conceito de reserva financeira.", lessonIds: ["aula-ff-1", "aula-ff-2"] },
  { id: "mod-pfc-1", courseId: "curso-planejamento-fluxo-de-caixa", order: 1, title: "Projetando o fluxo de caixa", summary: "Como projetar e acompanhar entradas e saídas.", lessonIds: ["aula-pfc-1", "aula-pfc-2"] },
  { id: "mod-ai-1", courseId: "curso-analise-de-investimentos", order: 1, title: "Avaliando investimentos", summary: "Risco, retorno e liquidez na análise de investimentos.", lessonIds: ["aula-ai-1", "aula-ai-2"] },
];

export const lessons: Lesson[] = [
  { id: "aula-ff-1", moduleId: "mod-ff-1", order: 1, title: "Receitas, despesas e saldo", durationMinutes: 16, videoProvider: "placeholder", objectives: ["Diferenciar receitas de despesas", "Calcular o saldo do período"], transcript: "Receita é tudo o que entra; despesa é tudo o que sai. O saldo — receita menos despesa — mostra se você está no azul ou no vermelho em determinado período.", chapterRef: "cap-ff-1", activityIds: ["ativ-ff-1"] },
  { id: "aula-ff-2", moduleId: "mod-ff-1", order: 2, title: "Construindo uma reserva financeira", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Entender a importância da reserva de emergência", "Definir uma meta de reserva"], transcript: "Uma reserva financeira cobre imprevistos sem precisar recorrer a dívidas. Uma referência comum é guardar de 3 a 6 meses de despesas essenciais.", chapterRef: "cap-ff-2", activityIds: ["ativ-ff-2"] },

  { id: "aula-pfc-1", moduleId: "mod-pfc-1", order: 1, title: "O que é fluxo de caixa", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Entender o conceito de fluxo de caixa", "Diferenciar fluxo de caixa de lucro"], transcript: "Fluxo de caixa mostra o momento em que o dinheiro entra e sai, o que pode ser diferente do lucro contábil. É possível ter lucro no papel e faltar dinheiro em caixa no curto prazo.", chapterRef: "cap-pfc-1", activityIds: ["ativ-pfc-1"] },
  { id: "aula-pfc-2", moduleId: "mod-pfc-1", order: 2, title: "Projetando cenários futuros", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Projetar entradas e saídas futuras", "Antecipar meses de caixa apertado"], transcript: "Projetar o fluxo de caixa para os próximos meses ajuda a antecipar períodos difíceis e tomar decisões — como adiar uma despesa — antes que o problema aconteça.", chapterRef: "cap-pfc-2", activityIds: ["ativ-pfc-2"] },

  { id: "aula-ai-1", moduleId: "mod-ai-1", order: 1, title: "Risco, retorno e liquidez", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Entender a relação entre risco e retorno", "Entender o conceito de liquidez"], transcript: "Em geral, quanto maior o retorno esperado de um investimento, maior o risco envolvido. Liquidez é a facilidade de transformar o investimento em dinheiro disponível.", chapterRef: "cap-ai-1", activityIds: ["ativ-ai-1"] },
  { id: "aula-ai-2", moduleId: "mod-ai-1", order: 2, title: "Diversificação de investimentos", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Entender por que diversificar reduz risco", "Reconhecer diferentes classes de investimento"], transcript: "Diversificar significa não concentrar todos os recursos em um único investimento, reduzindo o impacto de um resultado ruim isolado sobre o total da carteira.", chapterRef: "cap-ai-2", activityIds: ["ativ-ai-2"] },
];

export const materials: CourseMaterial[] = [
  { id: "material-ff", courseId: "curso-fundamentos-financas", title: "Apostila — Fundamentos de Finanças", cover: "emerald", chapters: [
    { id: "cap-ff-1", order: 1, title: "Receitas e despesas", content: "Organizar receitas e despesas em categorias facilita entender para onde o dinheiro está indo e onde é possível ajustar.", examples: ["Receita: salário, vendas. Despesa: aluguel, alimentação, transporte."], summary: "Saldo positivo = receitas maiores que despesas no período.", exerciseIds: ["ativ-ff-1"] },
    { id: "cap-ff-2", order: 2, title: "Reserva de emergência", content: "A reserva financeira é um valor guardado especificamente para imprevistos, mantido em um investimento de alta liquidez e baixo risco.", examples: ["Reserva de 4 meses de despesas essenciais guardada em investimento de liquidez diária."], summary: "Reserva bem dimensionada evita dívidas em momentos de imprevisto.", exerciseIds: ["ativ-ff-2"] },
  ]},
  { id: "material-pfc", courseId: "curso-planejamento-fluxo-de-caixa", title: "Apostila — Planejamento e Fluxo de Caixa", cover: "sky", chapters: [
    { id: "cap-pfc-1", order: 1, title: "Fluxo de caixa x lucro", content: "O lucro é um resultado contábil; o fluxo de caixa mostra a movimentação real de dinheiro. Uma empresa pode ser lucrativa e ainda enfrentar dificuldade de caixa no curto prazo.", examples: ["Uma venda a prazo gera lucro imediato no papel, mas o dinheiro só entra no caixa depois."], summary: "Acompanhar caixa e lucro juntos evita surpresas financeiras.", exerciseIds: ["ativ-pfc-1"] },
    { id: "cap-pfc-2", order: 2, title: "Projeção de cenários", content: "Projetar entradas e saídas para os próximos meses revela, com antecedência, períodos em que o caixa pode ficar apertado — permitindo agir antes do problema.", examples: ["Projeção de 3 meses aponta um mês com despesas maiores que receitas previstas."], summary: "Projeções antecipam decisões em vez de reagir a problemas.", exerciseIds: ["ativ-pfc-2"] },
  ]},
  { id: "material-ai", courseId: "curso-analise-de-investimentos", title: "Apostila — Análise de Investimentos", cover: "indigo", chapters: [
    { id: "cap-ai-1", order: 1, title: "Risco, retorno e liquidez", content: "Todo investimento equilibra três fatores: retorno esperado, risco assumido e liquidez (facilidade de resgate). Entender esse tripé ajuda a comparar opções de forma mais consciente.", examples: ["Um investimento de liquidez diária tende a oferecer retorno menor que um de prazo mais longo."], summary: "Não existe investimento perfeito nos três fatores ao mesmo tempo.", exerciseIds: ["ativ-ai-1"] },
    { id: "cap-ai-2", order: 2, title: "Diversificação", content: "Diversificar reduz a dependência de um único resultado, distribuindo recursos entre diferentes tipos de investimento.", examples: ["Dividir recursos entre renda fixa e renda variável, em vez de concentrar tudo em uma única aplicação."], summary: "Diversificação é uma forma prática de administrar risco.", exerciseIds: ["ativ-ai-2"] },
  ]},
];

function mc(id: string, text: string, correct = false) {
  return { id, text, correct };
}

export const activities: Activity[] = [
  { id: "ativ-ff-1", lessonId: "aula-ff-1", title: "Calculando o saldo", type: "pratica", prompt: "Se a receita do mês foi R$ 3.200 e as despesas somaram R$ 2.750, qual foi o saldo do período?", expectedPoints: ["Saldo = R$ 450 (3.200 - 2.750)"] },
  { id: "ativ-ff-2", lessonId: "aula-ff-2", title: "Dimensionando a reserva", type: "pratica", prompt: "Se as despesas essenciais mensais são R$ 2.000, qual seria o valor de uma reserva equivalente a 4 meses?", expectedPoints: ["R$ 8.000 (2.000 x 4)"] },
  { id: "ativ-pfc-1", lessonId: "aula-pfc-1", title: "Caixa x lucro", type: "verdadeiro_falso", prompt: "É possível uma empresa ter lucro no papel e ainda assim faltar dinheiro em caixa no curto prazo.", options: [mc("v", "Verdadeiro", true), mc("f", "Falso")], correctExplanation: "Vendas a prazo, por exemplo, geram lucro contábil antes de o dinheiro efetivamente entrar no caixa." },
  { id: "ativ-pfc-2", lessonId: "aula-pfc-2", title: "Projetando o próximo trimestre", type: "aberta", prompt: "Descreva como você usaria uma projeção de fluxo de caixa de 3 meses para decidir se pode fazer um novo investimento no negócio.", expectedPoints: ["Reconhece a antecipação de meses críticos", "Relaciona a decisão de investir à sobra de caixa projetada"] },
  { id: "ativ-ai-1", lessonId: "aula-ai-1", title: "Risco x retorno", type: "multipla_escolha", prompt: "Em geral, investimentos com potencial de retorno mais alto tendem a apresentar:", options: [mc("a", "Menor risco"), mc("b", "Maior risco", true), mc("c", "Nenhum risco"), mc("d", "Liquidez imediata sempre")], correctExplanation: "A relação entre risco e retorno costuma ser proporcional: mais retorno potencial, mais risco." },
  { id: "ativ-ai-2", lessonId: "aula-ai-2", title: "Por que diversificar?", type: "aberta", prompt: "Explique com suas palavras por que diversificar investimentos pode reduzir o risco de uma carteira.", expectedPoints: ["Reconhece que perdas em um investimento podem ser compensadas por outros", "Reconhece a redução da dependência de um único resultado"] },
];

function qq(id: string, prompt: string, options: { id: string; text: string; correct?: boolean }[], explanation: string) {
  return { id, prompt, options, explanation };
}

export const quizzes: Quiz[] = [
  { id: "quiz-ff-final", courseId: "curso-fundamentos-financas", title: "Avaliação final — Fundamentos de Finanças", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "O saldo do período é calculado por:", [mc("a", "Receita + despesa"), mc("b", "Receita - despesa", true), mc("c", "Despesa - receita"), mc("d", "Receita x despesa")], "Saldo = receitas menos despesas do período."),
    qq("q2", "A reserva de emergência deve priorizar, principalmente:", [mc("a", "Alto risco e alto retorno"), mc("b", "Liquidez e segurança", true), mc("c", "Baixa liquidez"), mc("d", "Investimento em um único ativo de risco")], "A reserva de emergência prioriza acesso rápido e segurança, não retorno máximo."),
  ]},
  { id: "quiz-pfc-final", courseId: "curso-planejamento-fluxo-de-caixa", title: "Avaliação final — Planejamento e Fluxo de Caixa", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Fluxo de caixa é diferente de lucro porque:", [mc("a", "São exatamente a mesma coisa"), mc("b", "O fluxo de caixa mostra o momento real da movimentação de dinheiro", true), mc("c", "O lucro não existe na prática"), mc("d", "O fluxo de caixa ignora despesas")], "O fluxo de caixa reflete quando o dinheiro efetivamente entra e sai."),
    qq("q2", "Projetar cenários futuros de caixa serve principalmente para:", [mc("a", "Aumentar despesas sem controle"), mc("b", "Antecipar períodos de caixa apertado", true), mc("c", "Eliminar a necessidade de planejamento"), mc("d", "Substituir o balanço contábil")], "Projeções ajudam a agir antes que um problema de caixa aconteça."),
  ]},
  { id: "quiz-ai-final", courseId: "curso-analise-de-investimentos", title: "Avaliação final — Análise de Investimentos", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Liquidez de um investimento se refere a:", [mc("a", "O quanto ele rende ao ano"), mc("b", "A facilidade de transformá-lo em dinheiro disponível", true), mc("c", "O risco de perda total"), mc("d", "O prazo mínimo de aplicação apenas")], "Liquidez é sobre a facilidade e velocidade de resgatar o investimento."),
    qq("q2", "Diversificar uma carteira de investimentos ajuda a:", [mc("a", "Aumentar o risco total"), mc("b", "Reduzir a dependência de um único resultado", true), mc("c", "Garantir lucro certo"), mc("d", "Eliminar totalmente o risco")], "Diversificação reduz risco ao não concentrar tudo em um único investimento."),
  ]},
];
