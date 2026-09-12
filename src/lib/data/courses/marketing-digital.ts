import type { Activity, Course, CourseMaterial, CourseModule, Lesson, Quiz } from "@/lib/types";

// ============================================================================
// Formação — Marketing Digital
// ============================================================================

export const courses: Course[] = [
  { id: "curso-fundamentos-marketing-digital", slug: "fundamentos-de-marketing-digital", title: "Fundamentos de Marketing Digital", description: "Entenda os pilares do marketing digital e como ele se conecta à jornada do cliente.", cover: "rose", areaId: "marketing", aiTeacherId: "prof-ana", level: "iniciante", durationMinutes: 40, published: true, moduleIds: ["mod-fmd-1"], finalAssessmentId: "quiz-fmd-final", tags: ["marketing digital", "fundamentos"] },
  { id: "curso-redes-sociais-conteudo", slug: "redes-sociais-e-conteudo", title: "Redes Sociais e Conteúdo", description: "Planeje conteúdos que engajam e constroem audiência nas redes sociais.", cover: "violet", areaId: "marketing", aiTeacherId: "prof-ana", level: "iniciante", durationMinutes: 42, published: true, moduleIds: ["mod-rsc-1"], finalAssessmentId: "quiz-rsc-final", tags: ["redes sociais", "conteúdo"] },
  { id: "curso-trafego-pago-analytics", slug: "trafego-pago-e-analytics", title: "Tráfego Pago e Analytics", description: "Crie campanhas de anúncios e leia métricas para tomar decisões melhores.", cover: "sky", areaId: "marketing", aiTeacherId: "prof-ana", level: "intermediario", durationMinutes: 45, published: true, moduleIds: ["mod-tpa-1"], finalAssessmentId: "quiz-tpa-final", tags: ["tráfego pago", "métricas"] },
  { id: "curso-branding-posicionamento", slug: "branding-e-posicionamento", title: "Branding e Posicionamento", description: "Construa um posicionamento de marca claro e consistente.", cover: "amber", areaId: "marketing", aiTeacherId: "prof-ana", level: "intermediario", durationMinutes: 38, published: true, moduleIds: ["mod-bp-1"], finalAssessmentId: "quiz-bp-final", tags: ["branding", "posicionamento"] },
];

export const modules: CourseModule[] = [
  { id: "mod-fmd-1", courseId: "curso-fundamentos-marketing-digital", order: 1, title: "Pilares do marketing digital", summary: "Jornada do cliente e principais canais digitais.", lessonIds: ["aula-fmd-1", "aula-fmd-2"] },
  { id: "mod-rsc-1", courseId: "curso-redes-sociais-conteudo", order: 1, title: "Conteúdo que engaja", summary: "Planejamento editorial e formatos de conteúdo.", lessonIds: ["aula-rsc-1", "aula-rsc-2"] },
  { id: "mod-tpa-1", courseId: "curso-trafego-pago-analytics", order: 1, title: "Campanhas e métricas", summary: "Como estruturar campanhas pagas e interpretar resultados.", lessonIds: ["aula-tpa-1", "aula-tpa-2"] },
  { id: "mod-bp-1", courseId: "curso-branding-posicionamento", order: 1, title: "Construindo uma marca", summary: "Posicionamento, propósito e consistência de marca.", lessonIds: ["aula-bp-1", "aula-bp-2"] },
];

export const lessons: Lesson[] = [
  { id: "aula-fmd-1", moduleId: "mod-fmd-1", order: 1, title: "A jornada do cliente digital", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Entender as etapas da jornada do cliente", "Reconhecer canais digitais em cada etapa"], transcript: "A jornada do cliente vai da descoberta de um problema até a decisão de compra e fidelização. Cada etapa pede uma abordagem diferente: conteúdo educativo no início, prova social e oferta no fim.", chapterRef: "cap-fmd-1", activityIds: ["ativ-fmd-1"] },
  { id: "aula-fmd-2", moduleId: "mod-fmd-1", order: 2, title: "Principais canais digitais", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Conhecer redes sociais, e-mail, SEO e anúncios pagos", "Escolher canais de acordo com o objetivo"], transcript: "Redes sociais constroem relacionamento, SEO atrai tráfego de forma orgânica e contínua, e-mail nutre quem já conhece a marca, e anúncios pagos aceleram resultados de curto prazo.", chapterRef: "cap-fmd-2", activityIds: ["ativ-fmd-2"] },

  { id: "aula-rsc-1", moduleId: "mod-rsc-1", order: 1, title: "Planejamento editorial", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Criar um calendário de conteúdo", "Definir pilares de conteúdo"], transcript: "Pilares de conteúdo são os grandes temas que a marca vai abordar de forma consistente. Um calendário editorial organiza o que publicar, quando e em qual formato.", chapterRef: "cap-rsc-1", activityIds: ["ativ-rsc-1"] },
  { id: "aula-rsc-2", moduleId: "mod-rsc-1", order: 2, title: "Formatos que engajam", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Comparar formatos de conteúdo", "Adaptar conteúdo para cada rede social"], transcript: "Vídeos curtos, carrosséis e enquetes tendem a gerar mais interação. O formato ideal muda de acordo com a rede social e com o objetivo da publicação — alcance, engajamento ou conversão.", chapterRef: "cap-rsc-2", activityIds: ["ativ-rsc-2"] },

  { id: "aula-tpa-1", moduleId: "mod-tpa-1", order: 1, title: "Estruturando uma campanha", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Definir objetivo de campanha", "Escolher público e orçamento"], transcript: "Toda campanha paga começa por um objetivo claro: alcance, tráfego, conversão. O objetivo direciona a escolha de público, formato de anúncio e orçamento investido.", chapterRef: "cap-tpa-1", activityIds: ["ativ-tpa-1"] },
  { id: "aula-tpa-2", moduleId: "mod-tpa-1", order: 2, title: "Lendo métricas de resultado", durationMinutes: 23, videoProvider: "placeholder", objectives: ["Interpretar CTR, CPC e conversão", "Otimizar campanhas com base em dados"], transcript: "CTR mede o quanto o anúncio desperta interesse; CPC mostra o custo de cada clique; a taxa de conversão revela se o clique virou resultado real. Juntas, essas métricas guiam otimizações.", chapterRef: "cap-tpa-2", activityIds: ["ativ-tpa-2"] },

  { id: "aula-bp-1", moduleId: "mod-bp-1", order: 1, title: "Propósito e posicionamento", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Definir o propósito de uma marca", "Diferenciar posicionamento da concorrência"], transcript: "Posicionamento é o espaço que a marca ocupa na mente do cliente em relação à concorrência. Ele nasce de um propósito claro e de escolhas consistentes ao longo do tempo.", chapterRef: "cap-bp-1", activityIds: ["ativ-bp-1"] },
  { id: "aula-bp-2", moduleId: "mod-bp-1", order: 2, title: "Consistência de marca", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Aplicar identidade de marca em diferentes pontos de contato", "Manter consistência de tom de voz"], transcript: "Uma marca forte se repete: mesma paleta de cores, mesmo tom de voz, mesma promessa, em todos os pontos de contato com o cliente — do site ao atendimento.", chapterRef: "cap-bp-2", activityIds: ["ativ-bp-2"] },
];

export const materials: CourseMaterial[] = [
  { id: "material-fmd", courseId: "curso-fundamentos-marketing-digital", title: "Apostila — Fundamentos de Marketing Digital", cover: "rose", chapters: [
    { id: "cap-fmd-1", order: 1, title: "Jornada do cliente", content: "A jornada do cliente descreve o caminho entre descobrir um problema e se tornar cliente fiel de uma marca. Mapear essa jornada ajuda a criar conteúdo certo, no momento certo.", examples: ["Descoberta → Consideração → Decisão → Fidelização"], summary: "Cada etapa da jornada pede uma comunicação diferente.", exerciseIds: ["ativ-fmd-1"] },
    { id: "cap-fmd-2", order: 2, title: "Canais digitais", content: "Cada canal digital cumpre um papel: redes sociais para relacionamento, SEO para tráfego orgânico, e-mail para nutrição, anúncios pagos para resultados rápidos.", examples: ["Uma marca nova pode priorizar redes sociais e anúncios para ganhar visibilidade inicial."], summary: "Escolher canais certos depende do objetivo e da maturidade da marca.", exerciseIds: ["ativ-fmd-2"] },
  ]},
  { id: "material-rsc", courseId: "curso-redes-sociais-conteudo", title: "Apostila — Redes Sociais e Conteúdo", cover: "violet", chapters: [
    { id: "cap-rsc-1", order: 1, title: "Planejamento editorial", content: "Pilares de conteúdo organizam os temas centrais da marca. Um calendário editorial evita improviso e garante consistência de publicação.", examples: ["Pilares: bastidores, educação, prova social, promoção."], summary: "Planejar antes de publicar melhora consistência e resultado.", exerciseIds: ["ativ-rsc-1"] },
    { id: "cap-rsc-2", order: 2, title: "Formatos de conteúdo", content: "Vídeos curtos favorecem alcance; carrosséis favorecem tempo de visualização; enquetes favorecem interação direta. Testar formatos ajuda a entender o que funciona para cada audiência.", examples: ["Um carrossel educativo pode gerar mais salvamentos que um vídeo curto."], summary: "O melhor formato depende do objetivo da publicação.", exerciseIds: ["ativ-rsc-2"] },
  ]},
  { id: "material-tpa", courseId: "curso-trafego-pago-analytics", title: "Apostila — Tráfego Pago e Analytics", cover: "sky", chapters: [
    { id: "cap-tpa-1", order: 1, title: "Estrutura de campanha", content: "Uma campanha bem estruturada define objetivo, público e orçamento antes de qualquer criativo. Isso evita gastar verba testando direções sem foco.", examples: ["Objetivo: gerar cadastros. Público: interessados em educação online. Orçamento: R$ 20/dia."], summary: "Objetivo claro orienta todas as demais decisões da campanha.", exerciseIds: ["ativ-tpa-1"] },
    { id: "cap-tpa-2", order: 2, title: "Métricas essenciais", content: "CTR (taxa de cliques), CPC (custo por clique) e taxa de conversão formam o tripé básico de análise de campanhas pagas.", examples: ["CTR baixo pode indicar criativo pouco atrativo; conversão baixa pode indicar página de destino fraca."], summary: "Métricas guiam decisões de otimização, não apenas relatórios.", exerciseIds: ["ativ-tpa-2"] },
  ]},
  { id: "material-bp", courseId: "curso-branding-posicionamento", title: "Apostila — Branding e Posicionamento", cover: "amber", chapters: [
    { id: "cap-bp-1", order: 1, title: "Propósito e posicionamento", content: "Posicionamento é a percepção que o cliente tem da marca em relação à concorrência. Ele deve nascer de um propósito autêntico, não apenas de um slogan.", examples: ["Uma marca pode se posicionar por preço, por qualidade ou por experiência — raramente pelos três ao mesmo tempo."], summary: "Posicionamento claro facilita todas as decisões de comunicação.", exerciseIds: ["ativ-bp-1"] },
    { id: "cap-bp-2", order: 2, title: "Consistência de marca", content: "Consistência visual e de tom de voz em todos os pontos de contato reforça a identidade da marca e gera confiança ao longo do tempo.", examples: ["Mesma paleta de cores no site, redes sociais e embalagens."], summary: "Marcas consistentes são lembradas com mais facilidade.", exerciseIds: ["ativ-bp-2"] },
  ]},
];

function mc(id: string, text: string, correct = false) {
  return { id, text, correct };
}

export const activities: Activity[] = [
  { id: "ativ-fmd-1", lessonId: "aula-fmd-1", title: "Mapeando a jornada", type: "aberta", prompt: "Escolha um produto ou serviço e descreva as 4 etapas da jornada de um cliente até comprá-lo.", expectedPoints: ["Descoberta", "Consideração", "Decisão", "Fidelização"] },
  { id: "ativ-fmd-2", lessonId: "aula-fmd-2", title: "Escolhendo canais", type: "multipla_escolha", prompt: "Qual canal é mais indicado para gerar tráfego orgânico e contínuo ao longo do tempo?", options: [mc("a", "Anúncios pagos"), mc("b", "SEO", true), mc("c", "E-mail marketing"), mc("d", "Nenhum dos anteriores")], correctExplanation: "SEO gera tráfego orgânico de forma contínua, mesmo sem investimento direto em cada visita." },
  { id: "ativ-rsc-1", lessonId: "aula-rsc-1", title: "Definindo pilares", type: "aberta", prompt: "Defina 3 pilares de conteúdo para uma marca fictícia de sua escolha.", expectedPoints: ["3 pilares coerentes com o público-alvo da marca escolhida"] },
  { id: "ativ-rsc-2", lessonId: "aula-rsc-2", title: "Formato certo para o objetivo", type: "multipla_escolha", prompt: "Para gerar o maior alcance possível em pouco tempo, qual formato costuma performar melhor?", options: [mc("a", "Vídeo curto", true), mc("b", "Texto longo sem imagem"), mc("c", "PDF"), mc("d", "E-mail")], correctExplanation: "Vídeos curtos tendem a ser favorecidos pelos algoritmos das redes sociais para alcance." },
  { id: "ativ-tpa-1", lessonId: "aula-tpa-1", title: "Definindo uma campanha", type: "estudo_de_caso", prompt: "Uma loja online quer aumentar cadastros na newsletter com R$30/dia de orçamento. Defina o objetivo, público e formato de anúncio.", expectedPoints: ["Objetivo: geração de cadastros", "Público relevante ao produto da loja", "Formato adequado ao objetivo (ex: anúncio de conversão)"] },
  { id: "ativ-tpa-2", lessonId: "aula-tpa-2", title: "Interpretando métricas", type: "multipla_escolha", prompt: "Uma campanha tem CTR alto mas conversão muito baixa. O que provavelmente precisa ser revisado?", options: [mc("a", "O criativo do anúncio"), mc("b", "A página de destino (landing page)", true), mc("c", "O nome da campanha"), mc("d", "Nada, está tudo certo")], correctExplanation: "CTR alto com conversão baixa costuma indicar problema na página de destino, não no anúncio." },
  { id: "ativ-bp-1", lessonId: "aula-bp-1", title: "Escrevendo um posicionamento", type: "aberta", prompt: "Escreva uma frase de posicionamento para uma marca fictícia, explicando para quem ela é e o que a diferencia.", expectedPoints: ["Público-alvo definido", "Diferencial claro em relação à concorrência"] },
  { id: "ativ-bp-2", lessonId: "aula-bp-2", title: "Checklist de consistência", type: "pratica", prompt: "Liste 4 pontos de contato de uma marca (ex: site, redes sociais) onde a consistência visual deve ser garantida.", expectedPoints: ["4 pontos de contato coerentes e relevantes"] },
];

function qq(id: string, prompt: string, options: { id: string; text: string; correct?: boolean }[], explanation: string) {
  return { id, prompt, options, explanation };
}

export const quizzes: Quiz[] = [
  { id: "quiz-fmd-final", courseId: "curso-fundamentos-marketing-digital", title: "Avaliação final — Fundamentos de Marketing Digital", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "A jornada do cliente termina em qual etapa?", [mc("a", "Descoberta"), mc("b", "Fidelização", true), mc("c", "Consideração"), mc("d", "Nenhuma")], "A jornada se completa com a fidelização do cliente."),
    qq("q2", "SEO é um canal voltado principalmente para:", [mc("a", "Tráfego orgânico de longo prazo", true), mc("b", "Resultados imediatos pagos"), mc("c", "Atendimento ao cliente"), mc("d", "Gestão de estoque")], "SEO constrói tráfego orgânico de forma contínua ao longo do tempo."),
  ]},
  { id: "quiz-rsc-final", courseId: "curso-redes-sociais-conteudo", title: "Avaliação final — Redes Sociais e Conteúdo", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Pilares de conteúdo servem para:", [mc("a", "Aumentar o preço do produto"), mc("b", "Organizar os temas centrais da comunicação da marca", true), mc("c", "Substituir o calendário editorial"), mc("d", "Reduzir o número de seguidores")], "Pilares organizam os grandes temas que a marca vai comunicar."),
    qq("q2", "Um calendário editorial ajuda principalmente a:", [mc("a", "Improvisar publicações"), mc("b", "Manter consistência de publicação", true), mc("c", "Aumentar o orçamento de anúncios"), mc("d", "Eliminar a necessidade de conteúdo")], "O calendário editorial garante consistência e planejamento na publicação."),
  ]},
  { id: "quiz-tpa-final", courseId: "curso-trafego-pago-analytics", title: "Avaliação final — Tráfego Pago e Analytics", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "CPC significa:", [mc("a", "Custo por clique", true), mc("b", "Conteúdo por campanha"), mc("c", "Conversão por clique"), mc("d", "Canal principal de contato")], "CPC é o custo pago por cada clique recebido no anúncio."),
    qq("q2", "O primeiro passo ao estruturar uma campanha paga é:", [mc("a", "Escolher a cor do anúncio"), mc("b", "Definir o objetivo da campanha", true), mc("c", "Publicar sem planejamento"), mc("d", "Aumentar o orçamento ao máximo")], "O objetivo direciona todas as demais decisões da campanha."),
  ]},
  { id: "quiz-bp-final", courseId: "curso-branding-posicionamento", title: "Avaliação final — Branding e Posicionamento", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Posicionamento de marca é definido, principalmente, por:", [mc("a", "O tamanho do logotipo"), mc("b", "A percepção do cliente em relação à concorrência", true), mc("c", "O número de funcionários"), mc("d", "O preço mais baixo do mercado, sempre")], "Posicionamento é sobre como a marca é percebida frente à concorrência."),
    qq("q2", "Consistência de marca envolve:", [mc("a", "Mudar o tom de voz a cada publicação"), mc("b", "Manter identidade visual e tom de voz coerentes em todos os canais", true), mc("c", "Usar cores diferentes em cada rede social"), mc("d", "Ignorar a experiência do cliente")], "Consistência reforça a identidade da marca em todos os pontos de contato."),
  ]},
];
