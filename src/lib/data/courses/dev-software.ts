import type { Activity, Course, CourseMaterial, CourseModule, Lesson, Quiz } from "@/lib/types";

// ============================================================================
// Formação — Desenvolvedor de Software (curso "flagship" da plataforma).
// 7 cursos, cada um com módulos, aulas, apostila, atividades e avaliação
// final — conteúdo original, escrito para esta plataforma.
// ============================================================================

export const courses: Course[] = [
  {
    id: "curso-introducao-programacao",
    slug: "introducao-a-programacao",
    title: "Introdução à Programação",
    description: "Entenda o que é programar, como o computador pensa e dê os primeiros passos com lógica de programação.",
    cover: "violet",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "iniciante",
    durationMinutes: 55,
    published: true,
    moduleIds: ["mod-ip-1", "mod-ip-2"],
    finalAssessmentId: "quiz-ip-final",
    tags: ["programação", "lógica", "fundamentos"],
  },
  {
    id: "curso-logica-de-programacao",
    slug: "logica-de-programacao",
    title: "Lógica de Programação",
    description: "Desenvolva raciocínio lógico com algoritmos, fluxogramas, estruturas de decisão e repetição.",
    cover: "indigo",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "iniciante",
    durationMinutes: 60,
    published: true,
    moduleIds: ["mod-lp-1"],
    finalAssessmentId: "quiz-lp-final",
    tags: ["lógica", "algoritmos"],
  },
  {
    id: "curso-html-css",
    slug: "html-e-css",
    title: "HTML e CSS",
    description: "Construa e estilize páginas web do zero com HTML semântico e CSS moderno.",
    cover: "sky",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "iniciante",
    durationMinutes: 65,
    published: true,
    moduleIds: ["mod-hc-1"],
    finalAssessmentId: "quiz-hc-final",
    tags: ["html", "css", "web"],
  },
  {
    id: "curso-javascript",
    slug: "javascript",
    title: "JavaScript",
    description: "Dê vida às páginas web com lógica, manipulação do DOM e interatividade em JavaScript.",
    cover: "amber",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "intermediario",
    durationMinutes: 70,
    published: true,
    moduleIds: ["mod-js-1"],
    finalAssessmentId: "quiz-js-final",
    tags: ["javascript", "web", "interatividade"],
  },
  {
    id: "curso-banco-de-dados",
    slug: "banco-de-dados",
    title: "Banco de Dados",
    description: "Aprenda a modelar dados e escrever consultas SQL para armazenar e buscar informações.",
    cover: "emerald",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "intermediario",
    durationMinutes: 60,
    published: true,
    moduleIds: ["mod-bd-1"],
    finalAssessmentId: "quiz-bd-final",
    tags: ["sql", "banco de dados", "modelagem"],
  },
  {
    id: "curso-desenvolvimento-de-aplicacoes",
    slug: "desenvolvimento-de-aplicacoes",
    title: "Desenvolvimento de Aplicações",
    description: "Una front-end, back-end e banco de dados para construir aplicações web completas.",
    cover: "rose",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "intermediario",
    durationMinutes: 65,
    published: true,
    moduleIds: ["mod-da-1"],
    finalAssessmentId: "quiz-da-final",
    tags: ["arquitetura", "apis", "segurança"],
  },
  {
    id: "curso-projeto-final-dev",
    slug: "projeto-final-desenvolvedor-de-software",
    title: "Projeto Final — Desenvolvedor de Software",
    description: "Aplique tudo o que aprendeu construindo e apresentando um projeto real de software.",
    cover: "orange",
    areaId: "tecnologia",
    aiTeacherId: "prof-lucas",
    level: "intermediario",
    durationMinutes: 40,
    published: true,
    moduleIds: ["mod-pf-1"],
    finalAssessmentId: "quiz-pf-final",
    tags: ["projeto final", "portfólio"],
  },
];

export const modules: CourseModule[] = [
  { id: "mod-ip-1", courseId: "curso-introducao-programacao", order: 1, title: "Primeiros passos na programação", summary: "O universo da programação e como o computador executa instruções.", lessonIds: ["aula-ip-1", "aula-ip-2"], quizId: "quiz-ip-1" },
  { id: "mod-ip-2", courseId: "curso-introducao-programacao", order: 2, title: "Pensando como um programador", summary: "Variáveis, decisões e repetições: os blocos de construção de todo programa.", lessonIds: ["aula-ip-3", "aula-ip-4"], quizId: "quiz-ip-2" },

  { id: "mod-lp-1", courseId: "curso-logica-de-programacao", order: 1, title: "Algoritmos no dia a dia", summary: "Fluxogramas, decisões e repetições aplicadas a problemas reais.", lessonIds: ["aula-lp-1", "aula-lp-2", "aula-lp-3"] },

  { id: "mod-hc-1", courseId: "curso-html-css", order: 1, title: "Estrutura e estilo da web", summary: "HTML semântico, CSS e layouts responsivos.", lessonIds: ["aula-hc-1", "aula-hc-2", "aula-hc-3"] },

  { id: "mod-js-1", courseId: "curso-javascript", order: 1, title: "Programando o navegador", summary: "Fundamentos, DOM e eventos para criar páginas interativas.", lessonIds: ["aula-js-1", "aula-js-2", "aula-js-3"] },

  { id: "mod-bd-1", courseId: "curso-banco-de-dados", order: 1, title: "Do modelo ao SQL", summary: "Modelagem de dados, consultas e relacionamentos entre tabelas.", lessonIds: ["aula-bd-1", "aula-bd-2", "aula-bd-3"] },

  { id: "mod-da-1", courseId: "curso-desenvolvimento-de-aplicacoes", order: 1, title: "Construindo aplicações completas", summary: "Arquitetura, integração com APIs e segurança básica.", lessonIds: ["aula-da-1", "aula-da-2", "aula-da-3"] },

  { id: "mod-pf-1", courseId: "curso-projeto-final-dev", order: 1, title: "Do planejamento à entrega", summary: "Planeje, construa e apresente seu projeto final.", lessonIds: ["aula-pf-1", "aula-pf-2"] },
];

export const lessons: Lesson[] = [
  // ---- Introdução à Programação
  { id: "aula-ip-1", moduleId: "mod-ip-1", order: 1, title: "O que é programar", durationMinutes: 12, videoProvider: "placeholder", objectives: ["Entender o que significa programar", "Reconhecer programas no dia a dia"], transcript: "Programar é dar instruções precisas para que um computador execute uma tarefa. Cada aplicativo, site ou jogo que você usa é, no fundo, uma sequência de instruções escritas por alguém.", chapterRef: "cap-ip-1", activityIds: ["ativ-ip-1"] },
  { id: "aula-ip-2", moduleId: "mod-ip-1", order: 2, title: "Como o computador executa instruções", durationMinutes: 14, videoProvider: "placeholder", objectives: ["Entender o papel do processador e da memória", "Compreender o que é um algoritmo"], transcript: "O computador não entende português nem inglês: ele entende instruções muito simples, executadas em sequência e em alta velocidade. Um algoritmo é a receita, em passos claros, que descreve como resolver um problema antes de virar código.", chapterRef: "cap-ip-2", activityIds: ["ativ-ip-2"] },
  { id: "aula-ip-3", moduleId: "mod-ip-2", order: 1, title: "Variáveis e tipos de dados", durationMinutes: 15, videoProvider: "placeholder", objectives: ["Entender o que é uma variável", "Reconhecer os tipos de dados mais comuns"], transcript: "Uma variável é um espaço nomeado na memória que guarda um valor: um número, um texto, um verdadeiro/falso. Escolher o tipo certo de dado é o primeiro passo para organizar a informação em um programa.", chapterRef: "cap-ip-3", activityIds: ["ativ-ip-3"] },
  { id: "aula-ip-4", moduleId: "mod-ip-2", order: 2, title: "Tomando decisões e repetindo tarefas", durationMinutes: 14, videoProvider: "placeholder", objectives: ["Usar estruturas condicionais (se/então)", "Usar estruturas de repetição (loops)"], transcript: "Programas reais precisam tomar decisões (\"se o carrinho estiver vazio, mostre uma mensagem\") e repetir tarefas (\"para cada item da lista, calcule o total\"). Condicionais e loops são os blocos que dão esse poder ao código.", chapterRef: "cap-ip-4", activityIds: ["ativ-ip-4"] },

  // ---- Lógica de Programação
  { id: "aula-lp-1", moduleId: "mod-lp-1", order: 1, title: "Algoritmos e fluxogramas", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Representar um processo com fluxograma", "Quebrar um problema em passos simples"], transcript: "Antes de escrever código, um bom programador desenha o raciocínio. Fluxogramas usam formas simples — início, decisão, processo, fim — para representar visualmente a lógica de um algoritmo.", chapterRef: "cap-lp-1", activityIds: ["ativ-lp-1"] },
  { id: "aula-lp-2", moduleId: "mod-lp-1", order: 2, title: "Estruturas de decisão", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Aplicar condicionais em problemas do dia a dia", "Combinar múltiplas condições"], transcript: "Estruturas de decisão permitem que um algoritmo escolha caminhos diferentes dependendo de uma condição. Podemos combinar condições com 'e' e 'ou' para representar regras mais complexas.", chapterRef: "cap-lp-2", activityIds: ["ativ-lp-2"] },
  { id: "aula-lp-3", moduleId: "mod-lp-1", order: 3, title: "Estruturas de repetição e vetores", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Usar loops para repetir tarefas", "Organizar múltiplos valores em um vetor"], transcript: "Loops evitam repetir código manualmente. Quando precisamos guardar vários valores relacionados — como as notas de uma turma — usamos um vetor (ou lista), percorrido justamente com um loop.", chapterRef: "cap-lp-3", activityIds: ["ativ-lp-3"] },

  // ---- HTML e CSS
  { id: "aula-hc-1", moduleId: "mod-hc-1", order: 1, title: "Estruturando páginas com HTML", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Entender tags e elementos HTML", "Estruturar uma página com HTML semântico"], transcript: "HTML organiza o conteúdo de uma página em elementos: títulos, parágrafos, listas, imagens e links. Usar tags semânticas (como header, main e footer) deixa a página mais clara para pessoas e para mecanismos de busca.", chapterRef: "cap-hc-1", activityIds: ["ativ-hc-1"] },
  { id: "aula-hc-2", moduleId: "mod-hc-1", order: 2, title: "Estilizando com CSS", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Aplicar seletores e propriedades CSS", "Entender a cascata e a especificidade"], transcript: "CSS define a aparência dos elementos HTML: cores, espaçamentos, fontes e posicionamento. O nome 'cascata' vem da forma como regras se combinam e se sobrepõem conforme sua especificidade.", chapterRef: "cap-hc-2", activityIds: ["ativ-hc-2"] },
  { id: "aula-hc-3", moduleId: "mod-hc-1", order: 3, title: "Layout responsivo com Flexbox", durationMinutes: 23, videoProvider: "placeholder", objectives: ["Criar layouts flexíveis com Flexbox", "Adaptar uma página para diferentes telas"], transcript: "Flexbox organiza elementos em linha ou coluna de forma flexível, distribuindo espaço automaticamente. Combinado a media queries, permite criar páginas que se adaptam do celular ao desktop.", chapterRef: "cap-hc-3", activityIds: ["ativ-hc-3"] },

  // ---- JavaScript
  { id: "aula-js-1", moduleId: "mod-js-1", order: 1, title: "Fundamentos do JavaScript", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Declarar variáveis e funções", "Entender tipos e operadores em JavaScript"], transcript: "JavaScript é a linguagem que roda no navegador e permite criar comportamento dinâmico. Variáveis, funções e operadores são a base para qualquer lógica que você queira construir na página.", chapterRef: "cap-js-1", activityIds: ["ativ-js-1"] },
  { id: "aula-js-2", moduleId: "mod-js-1", order: 2, title: "Manipulando a página com o DOM", durationMinutes: 24, videoProvider: "placeholder", objectives: ["Selecionar elementos da página", "Alterar conteúdo e estilo via JavaScript"], transcript: "O DOM é a representação da página em forma de árvore de elementos. Com JavaScript, podemos selecionar qualquer elemento e alterar seu conteúdo, estilo ou estrutura em tempo real.", chapterRef: "cap-js-2", activityIds: ["ativ-js-2"] },
  { id: "aula-js-3", moduleId: "mod-js-1", order: 3, title: "Eventos e interatividade", durationMinutes: 24, videoProvider: "placeholder", objectives: ["Reagir a cliques e outras interações", "Validar dados de um formulário"], transcript: "Eventos conectam a ação do usuário — um clique, uma tecla, um envio de formulário — à lógica do seu código. É assim que uma página deixa de ser estática e passa a responder a quem a usa.", chapterRef: "cap-js-3", activityIds: ["ativ-js-3"] },

  // ---- Banco de Dados
  { id: "aula-bd-1", moduleId: "mod-bd-1", order: 1, title: "Modelagem de dados", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Identificar entidades e atributos", "Desenhar um modelo simples de dados"], transcript: "Modelar dados é decidir quais 'coisas' (entidades) o sistema precisa lembrar e quais informações (atributos) descrevem cada uma. Um bom modelo evita duplicidade e facilita consultas futuras.", chapterRef: "cap-bd-1", activityIds: ["ativ-bd-1"] },
  { id: "aula-bd-2", moduleId: "mod-bd-1", order: 2, title: "Consultas com SQL", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Escrever consultas SELECT básicas", "Filtrar e ordenar resultados"], transcript: "SQL é a linguagem usada para conversar com bancos de dados relacionais. Com poucos comandos — SELECT, WHERE, ORDER BY — já é possível buscar exatamente a informação que você precisa.", chapterRef: "cap-bd-2", activityIds: ["ativ-bd-2"] },
  { id: "aula-bd-3", moduleId: "mod-bd-1", order: 3, title: "Relacionamentos entre tabelas", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Entender chaves primárias e estrangeiras", "Combinar tabelas com JOIN"], transcript: "Relacionamentos conectam tabelas diferentes através de chaves. Uma chave estrangeira aponta para a chave primária de outra tabela, e o comando JOIN permite combinar essas informações em uma única consulta.", chapterRef: "cap-bd-3", activityIds: ["ativ-bd-3"] },

  // ---- Desenvolvimento de Aplicações
  { id: "aula-da-1", moduleId: "mod-da-1", order: 1, title: "Arquitetura de uma aplicação web", durationMinutes: 20, videoProvider: "placeholder", objectives: ["Entender front-end, back-end e banco de dados", "Reconhecer o papel de uma API"], transcript: "Uma aplicação web moderna normalmente separa três camadas: a interface (front-end), a lógica de negócio (back-end) e o armazenamento (banco de dados). Elas se comunicam através de APIs.", chapterRef: "cap-da-1", activityIds: ["ativ-da-1"] },
  { id: "aula-da-2", moduleId: "mod-da-1", order: 2, title: "Consumindo APIs", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Entender requisições e respostas HTTP", "Consumir uma API REST simples"], transcript: "Consumir uma API significa enviar uma requisição HTTP e tratar a resposta recebida, geralmente em formato JSON. Entender os verbos GET, POST, PUT e DELETE é essencial para trabalhar com qualquer API REST.", chapterRef: "cap-da-2", activityIds: ["ativ-da-2"] },
  { id: "aula-da-3", moduleId: "mod-da-1", order: 3, title: "Autenticação e segurança básica", durationMinutes: 23, videoProvider: "placeholder", objectives: ["Entender autenticação e autorização", "Reconhecer boas práticas básicas de segurança"], transcript: "Autenticação confirma quem é o usuário; autorização define o que ele pode fazer. Nunca armazene senhas em texto puro nem exponha chaves secretas no código do front-end — sempre trate esses dados no servidor.", chapterRef: "cap-da-3", activityIds: ["ativ-da-3"] },

  // ---- Projeto Final
  { id: "aula-pf-1", moduleId: "mod-pf-1", order: 1, title: "Planejando seu projeto", durationMinutes: 18, videoProvider: "placeholder", objectives: ["Definir o escopo do projeto final", "Planejar as etapas de desenvolvimento"], transcript: "Um bom projeto começa com um escopo claro: qual problema ele resolve, quem é o usuário e quais funcionalidades são essenciais para a primeira versão. Planeje em etapas pequenas e testáveis.", chapterRef: "cap-pf-1", activityIds: ["ativ-pf-1"] },
  { id: "aula-pf-2", moduleId: "mod-pf-1", order: 2, title: "Construindo e apresentando seu projeto", durationMinutes: 22, videoProvider: "placeholder", objectives: ["Aplicar os conhecimentos da formação no projeto", "Preparar uma apresentação do resultado"], transcript: "Chegou a hora de unir tudo o que você aprendeu: lógica, front-end, back-end e banco de dados. Ao final, prepare uma breve apresentação explicando o problema resolvido e as decisões técnicas tomadas.", chapterRef: "cap-pf-2", activityIds: ["ativ-pf-2"] },
];

export const materials: CourseMaterial[] = [
  {
    id: "material-ip", courseId: "curso-introducao-programacao", title: "Apostila — Introdução à Programação", cover: "violet",
    chapters: [
      { id: "cap-ip-1", order: 1, title: "O que é programar", content: "Programar é escrever instruções que um computador consegue executar, em uma sequência lógica e sem ambiguidade. Diferente de uma conversa humana, o computador precisa que cada passo seja detalhado.", examples: ["Uma receita de bolo é um algoritmo: uma sequência de passos para chegar a um resultado.", "Um semáforo segue uma lógica programada: verde, amarelo, vermelho, em ciclos."], summary: "Programar = escrever instruções precisas para o computador executar uma tarefa.", exerciseIds: ["ativ-ip-1"] },
      { id: "cap-ip-2", order: 2, title: "Como o computador executa instruções", content: "O processador executa instruções muito simples (somar, comparar, mover dados) em altíssima velocidade. Um algoritmo organiza essas instruções simples em uma sequência que resolve um problema maior.", examples: ["Somar 2 números é uma instrução simples; calcular a média de uma turma é um algoritmo com várias instruções simples encadeadas."], summary: "Algoritmos combinam instruções simples para resolver problemas complexos.", exerciseIds: ["ativ-ip-2"] },
      { id: "cap-ip-3", order: 3, title: "Variáveis e tipos de dados", content: "Variáveis guardam valores durante a execução de um programa. Os tipos mais comuns são números (inteiros e decimais), texto (strings) e valores lógicos (verdadeiro/falso).", examples: ["idade = 25 (número)", "nome = \"Maria\" (texto)", "ativo = verdadeiro (lógico)"], summary: "Escolher o tipo certo de variável organiza e protege os dados do seu programa.", exerciseIds: ["ativ-ip-3"] },
      { id: "cap-ip-4", order: 4, title: "Decisões e repetições", content: "Estruturas condicionais (se/então/senão) permitem que o programa escolha um caminho. Estruturas de repetição (enquanto, para cada) evitam repetir código manualmente para tarefas semelhantes.", examples: ["Se a nota for maior ou igual a 7, aprovado. Senão, em recuperação.", "Para cada aluno da lista, imprimir o nome."], summary: "Condicionais decidem; repetições automatizam tarefas semelhantes.", exerciseIds: ["ativ-ip-4"] },
    ],
  },
  {
    id: "material-lp", courseId: "curso-logica-de-programacao", title: "Apostila — Lógica de Programação", cover: "indigo",
    chapters: [
      { id: "cap-lp-1", order: 1, title: "Algoritmos e fluxogramas", content: "Um fluxograma representa visualmente um algoritmo usando formas padronizadas: óvalos para início/fim, losangos para decisões e retângulos para processos.", examples: ["Fluxograma para decidir se um número é par ou ímpar."], summary: "Fluxogramas ajudam a planejar a lógica antes de escrever código.", exerciseIds: ["ativ-lp-1"] },
      { id: "cap-lp-2", order: 2, title: "Estruturas de decisão", content: "Condicionais combinadas com operadores lógicos (e, ou, não) permitem representar regras complexas de forma organizada.", examples: ["Se idade >= 18 E possui carteira, então pode dirigir."], summary: "Operadores lógicos combinam condições para decisões mais precisas.", exerciseIds: ["ativ-lp-2"] },
      { id: "cap-lp-3", order: 3, title: "Repetições e vetores", content: "Vetores armazenam vários valores sob um único nome, acessados por posição (índice). Loops percorrem esses valores um a um.", examples: ["notas = [8, 7, 9, 6] — notas[0] é o primeiro valor da lista."], summary: "Vetores + loops processam coleções de dados de forma eficiente.", exerciseIds: ["ativ-lp-3"] },
    ],
  },
  {
    id: "material-hc", courseId: "curso-html-css", title: "Apostila — HTML e CSS", cover: "sky",
    chapters: [
      { id: "cap-hc-1", order: 1, title: "Estrutura com HTML", content: "HTML organiza o conteúdo em elementos aninhados. Tags semânticas como <header>, <main>, <section> e <footer> descrevem o papel de cada parte da página.", examples: ["<h1>Título</h1><p>Parágrafo de texto.</p>"], summary: "HTML semântico deixa a página mais acessível e organizada.", exerciseIds: ["ativ-hc-1"] },
      { id: "cap-hc-2", order: 2, title: "Estilo com CSS", content: "Seletores CSS escolhem quais elementos estilizar; propriedades definem cor, tamanho, espaçamento. Regras mais específicas ou declaradas depois vencem na cascata.", examples: ["p { color: #333; font-size: 16px; }"], summary: "CSS separa conteúdo (HTML) de apresentação (estilo).", exerciseIds: ["ativ-hc-2"] },
      { id: "cap-hc-3", order: 3, title: "Layout com Flexbox", content: "display: flex transforma um elemento em um contêiner flexível, distribuindo seus filhos em linha ou coluna com controle de alinhamento e espaçamento.", examples: [".menu { display: flex; justify-content: space-between; }"], summary: "Flexbox simplifica a criação de layouts responsivos.", exerciseIds: ["ativ-hc-3"] },
    ],
  },
  {
    id: "material-js", courseId: "curso-javascript", title: "Apostila — JavaScript", cover: "amber",
    chapters: [
      { id: "cap-js-1", order: 1, title: "Fundamentos do JavaScript", content: "Variáveis (let, const), funções e operadores formam a base da linguagem. Funções agrupam lógica que pode ser reutilizada em vários pontos do código.", examples: ["const soma = (a, b) => a + b;"], summary: "Funções e variáveis bem nomeadas tornam o código mais legível.", exerciseIds: ["ativ-js-1"] },
      { id: "cap-js-2", order: 2, title: "O DOM", content: "document.querySelector e métodos semelhantes selecionam elementos HTML para que o JavaScript possa ler ou alterar seu conteúdo e estilo.", examples: ["document.querySelector('h1').textContent = 'Olá!';"], summary: "O DOM é a ponte entre o JavaScript e a página visível.", exerciseIds: ["ativ-js-2"] },
      { id: "cap-js-3", order: 3, title: "Eventos", content: "addEventListener conecta uma função a um evento, como um clique. Isso permite que a página reaja a ações do usuário em tempo real.", examples: ["botao.addEventListener('click', () => alert('Clicado!'));"], summary: "Eventos tornam a página interativa e responsiva ao usuário.", exerciseIds: ["ativ-js-3"] },
    ],
  },
  {
    id: "material-bd", courseId: "curso-banco-de-dados", title: "Apostila — Banco de Dados", cover: "emerald",
    chapters: [
      { id: "cap-bd-1", order: 1, title: "Modelagem de dados", content: "Entidades representam 'coisas' do mundo real (aluno, curso); atributos descrevem cada entidade. Um bom modelo evita repetir a mesma informação em vários lugares.", examples: ["Entidade Aluno: id, nome, e-mail."], summary: "Modelar bem economiza retrabalho e evita inconsistências.", exerciseIds: ["ativ-bd-1"] },
      { id: "cap-bd-2", order: 2, title: "Consultas com SQL", content: "SELECT busca dados; WHERE filtra; ORDER BY ordena o resultado. Esses três comandos resolvem a maioria das consultas do dia a dia.", examples: ["SELECT nome FROM alunos WHERE ativo = true ORDER BY nome;"], summary: "SQL permite buscar exatamente o dado necessário, sem processar tudo manualmente.", exerciseIds: ["ativ-bd-2"] },
      { id: "cap-bd-3", order: 3, title: "Relacionamentos", content: "Uma chave estrangeira em uma tabela aponta para a chave primária de outra. JOIN combina os dados das duas tabelas em uma única consulta.", examples: ["SELECT a.nome, c.titulo FROM matriculas m JOIN alunos a ON a.id = m.aluno_id JOIN cursos c ON c.id = m.curso_id;"], summary: "Relacionamentos evitam duplicar dados entre tabelas diferentes.", exerciseIds: ["ativ-bd-3"] },
    ],
  },
  {
    id: "material-da", courseId: "curso-desenvolvimento-de-aplicacoes", title: "Apostila — Desenvolvimento de Aplicações", cover: "rose",
    chapters: [
      { id: "cap-da-1", order: 1, title: "Arquitetura de uma aplicação", content: "Separar front-end, back-end e banco de dados facilita manutenção e escala. Cada camada tem uma responsabilidade clara e se comunica através de contratos bem definidos (APIs).", examples: ["Front-end pede dados; back-end processa regras de negócio; banco de dados armazena tudo."], summary: "Separação de camadas torna sistemas mais fáceis de manter e evoluir.", exerciseIds: ["ativ-da-1"] },
      { id: "cap-da-2", order: 2, title: "Consumindo APIs", content: "GET busca dados, POST cria, PUT/PATCH atualiza, DELETE remove. A resposta de uma API geralmente vem em JSON, um formato de texto fácil de ler por máquinas e por pessoas.", examples: ["fetch('/api/cursos').then(r => r.json())"], summary: "Entender os verbos HTTP é a base para consumir qualquer API REST.", exerciseIds: ["ativ-da-2"] },
      { id: "cap-da-3", order: 3, title: "Segurança básica", content: "Chaves de API e segredos nunca devem aparecer no código do navegador — sempre no servidor. Senhas devem ser armazenadas com hash, nunca em texto puro.", examples: ["Uma variável de ambiente no servidor guarda a chave da API de IA usada pelos professores virtuais."], summary: "Segurança começa por nunca expor segredos no front-end.", exerciseIds: ["ativ-da-3"] },
    ],
  },
  {
    id: "material-pf", courseId: "curso-projeto-final-dev", title: "Apostila — Projeto Final", cover: "orange",
    chapters: [
      { id: "cap-pf-1", order: 1, title: "Planejando o projeto", content: "Escreva em uma frase o problema que seu projeto resolve e para quem. Liste as 3 a 5 funcionalidades essenciais da primeira versão — o resto pode esperar.", examples: ["Problema: organizar tarefas pessoais. Funcionalidades essenciais: criar, concluir e listar tarefas."], summary: "Escopo pequeno e claro aumenta a chance de terminar o projeto.", exerciseIds: ["ativ-pf-1"] },
      { id: "cap-pf-2", order: 2, title: "Construindo e apresentando", content: "Construa por etapas testáveis: primeiro a estrutura de dados, depois a lógica, depois a interface. Ao apresentar, explique o problema, as decisões tomadas e o que aprenderia se fizesse de novo.", examples: ["Roteiro de apresentação: problema → solução → demonstração → aprendizados."], summary: "Um projeto bem apresentado vale tanto quanto um projeto bem construído.", exerciseIds: ["ativ-pf-2"] },
    ],
  },
];

function mc(id: string, text: string, correct = false) {
  return { id, text, correct };
}

export const activities: Activity[] = [
  { id: "ativ-ip-1", lessonId: "aula-ip-1", title: "O que é um programa?", type: "multipla_escolha", prompt: "Qual das opções abaixo melhor descreve o que é um programa de computador?", options: [mc("a", "Uma sequência de instruções que o computador executa"), mc("b", "Um documento de texto qualquer"), mc("c", "Um tipo de computador mais rápido"), mc("d", "Um cabo de conexão")], correctExplanation: "Um programa é justamente uma sequência de instruções organizadas para o computador executar." },
  { id: "ativ-ip-2", lessonId: "aula-ip-2", title: "Algoritmo x instrução", type: "verdadeiro_falso", prompt: "Um algoritmo é uma única instrução isolada executada pelo processador.", options: [mc("v", "Verdadeiro"), mc("f", "Falso", true)], correctExplanation: "Um algoritmo é uma sequência organizada de instruções simples, não uma instrução isolada." },
  { id: "ativ-ip-3", lessonId: "aula-ip-3", title: "Identificando tipos de dados", type: "pratica", prompt: "Para cada valor abaixo, identifique o tipo de dado (número, texto ou lógico): 'João', 27, verdadeiro, 'São Paulo', 3.5.", expectedPoints: ["João → texto", "27 → número inteiro", "verdadeiro → lógico", "São Paulo → texto", "3.5 → número decimal"] },
  { id: "ativ-ip-4", lessonId: "aula-ip-4", title: "Quando usar condicional ou repetição?", type: "aberta", prompt: "Descreva uma situação do seu dia a dia que poderia ser resolvida com uma estrutura condicional e outra que poderia ser resolvida com uma repetição.", expectedPoints: ["Reconhece um cenário de decisão binária ou múltipla para a condicional", "Reconhece uma tarefa repetitiva aplicada a vários itens para o loop"] },

  { id: "ativ-lp-1", lessonId: "aula-lp-1", title: "Montando um fluxograma", type: "pratica", prompt: "Descreva, em passos, o fluxograma para decidir se um número informado é positivo, negativo ou zero.", expectedPoints: ["Início", "Ler o número", "Decisão: número > 0? Se sim, positivo", "Senão, número < 0? Se sim, negativo", "Senão, é zero", "Fim"] },
  { id: "ativ-lp-2", lessonId: "aula-lp-2", title: "Combinando condições", type: "multipla_escolha", prompt: "Para liberar um desconto, o cliente precisa ser cadastrado E ter mais de R$100 em compras. Qual operador lógico representa essa regra?", options: [mc("a", "OU"), mc("b", "E", true), mc("c", "NÃO"), mc("d", "Nenhum operador é necessário")], correctExplanation: "Como as duas condições precisam ser verdadeiras ao mesmo tempo, o operador correto é 'E'." },
  { id: "ativ-lp-3", lessonId: "aula-lp-3", title: "Percorrendo uma lista", type: "aberta", prompt: "Explique, em suas palavras, por que usamos um loop para calcular a soma de todos os valores de uma lista em vez de somar cada valor manualmente.", expectedPoints: ["Reconhece que o loop evita repetição manual de código", "Reconhece que o loop funciona para listas de qualquer tamanho"] },

  { id: "ativ-hc-1", lessonId: "aula-hc-1", title: "Tags semânticas", type: "verdadeiro_falso", prompt: "Usar <div> para tudo tem o mesmo benefício de acessibilidade que usar tags semânticas como <header> e <main>.", options: [mc("v", "Verdadeiro"), mc("f", "Falso", true)], correctExplanation: "Tags semânticas comunicam significado para leitores de tela e mecanismos de busca, o que <div> sozinha não faz." },
  { id: "ativ-hc-2", lessonId: "aula-hc-2", title: "A cascata do CSS", type: "multipla_escolha", prompt: "Se duas regras CSS têm a mesma especificidade e afetam o mesmo elemento, qual delas prevalece?", options: [mc("a", "A primeira declarada"), mc("b", "A última declarada", true), mc("c", "Nenhuma é aplicada"), mc("d", "Depende do navegador")], correctExplanation: "Em caso de empate de especificidade, a regra declarada por último vence — daí o nome 'cascata'." },
  { id: "ativ-hc-3", lessonId: "aula-hc-3", title: "Layout com Flexbox", type: "pratica", prompt: "Escreva o CSS para um contêiner .menu que distribua seus itens em linha, com espaço igual entre eles.", expectedPoints: [".menu { display: flex; justify-content: space-between; }"] },

  { id: "ativ-js-1", lessonId: "aula-js-1", title: "Declarando uma função", type: "pratica", prompt: "Escreva uma função em JavaScript chamada dobro que recebe um número e retorna o dobro dele.", expectedPoints: ["function dobro(n) { return n * 2; }", "ou usando arrow function: const dobro = (n) => n * 2;"] },
  { id: "ativ-js-2", lessonId: "aula-js-2", title: "Selecionando elementos", type: "multipla_escolha", prompt: "Qual comando seleciona o primeiro elemento com a classe 'titulo' na página?", options: [mc("a", "document.querySelector('.titulo')", true), mc("b", "document.getElementByClass('titulo')"), mc("c", "document.class('titulo')"), mc("d", "document.selectAll('.titulo')")], correctExplanation: "querySelector aceita seletores CSS, incluindo classes com o prefixo ponto." },
  { id: "ativ-js-3", lessonId: "aula-js-3", title: "Reagindo a um clique", type: "estudo_de_caso", prompt: "Um formulário de cadastro precisa mostrar uma mensagem de erro se o campo e-mail estiver vazio ao clicar em 'Enviar'. Descreva, em passos, como você resolveria isso com eventos em JavaScript.", expectedPoints: ["Adicionar um listener de clique/submit no botão ou formulário", "Verificar se o campo e-mail está vazio", "Exibir mensagem de erro condicionalmente", "Impedir o envio caso inválido"] },

  { id: "ativ-bd-1", lessonId: "aula-bd-1", title: "Identificando entidades", type: "aberta", prompt: "Para um sistema de biblioteca, quais entidades e atributos você modelaria?", expectedPoints: ["Entidade Livro (título, autor, ISBN)", "Entidade Usuário (nome, e-mail)", "Entidade Empréstimo (data, devolução)"] },
  { id: "ativ-bd-2", lessonId: "aula-bd-2", title: "Escrevendo um SELECT", type: "pratica", prompt: "Escreva uma consulta SQL que retorne o nome de todos os cursos com duração maior que 60 minutos, ordenados pelo nome.", expectedPoints: ["SELECT nome FROM cursos WHERE duracao > 60 ORDER BY nome;"] },
  { id: "ativ-bd-3", lessonId: "aula-bd-3", title: "Chaves e relacionamentos", type: "verdadeiro_falso", prompt: "Uma chave estrangeira sempre aponta para a chave primária de outra tabela.", options: [mc("v", "Verdadeiro", true), mc("f", "Falso")], correctExplanation: "Essa é justamente a definição de chave estrangeira: uma referência à chave primária de outra tabela." },

  { id: "ativ-da-1", lessonId: "aula-da-1", title: "Separando responsabilidades", type: "estudo_de_caso", prompt: "Um app de delivery mostra o cardápio, calcula o valor do pedido e salva o histórico de compras. Separe essas responsabilidades entre front-end, back-end e banco de dados.", expectedPoints: ["Front-end: exibir cardápio e capturar o pedido", "Back-end: calcular valores e aplicar regras de negócio", "Banco de dados: armazenar cardápio, pedidos e histórico"] },
  { id: "ativ-da-2", lessonId: "aula-da-2", title: "Verbos HTTP", type: "multipla_escolha", prompt: "Qual verbo HTTP é o mais adequado para criar um novo registro em uma API?", options: [mc("a", "GET"), mc("b", "POST", true), mc("c", "DELETE"), mc("d", "OPTIONS")], correctExplanation: "POST é o verbo convencional para criação de novos recursos em uma API REST." },
  { id: "ativ-da-3", lessonId: "aula-da-3", title: "Onde guardar uma chave secreta?", type: "multipla_escolha", prompt: "Onde uma chave de API sensível deve ser armazenada em uma aplicação web?", options: [mc("a", "Em uma variável no código do front-end"), mc("b", "Em uma variável de ambiente usada apenas no servidor", true), mc("c", "Em um comentário no HTML"), mc("d", "Em um arquivo público de configuração")], correctExplanation: "Chaves sensíveis nunca devem chegar ao navegador do usuário — apenas ao servidor, via variáveis de ambiente." },

  { id: "ativ-pf-1", lessonId: "aula-pf-1", title: "Definindo o escopo", type: "aberta", prompt: "Escreva o problema que seu projeto final vai resolver, quem é o usuário e liste de 3 a 5 funcionalidades essenciais.", expectedPoints: ["Problema claro e específico", "Usuário-alvo identificado", "Lista enxuta de funcionalidades essenciais"] },
  { id: "ativ-pf-2", lessonId: "aula-pf-2", title: "Roteiro de apresentação", type: "desafio", prompt: "Monte um roteiro de apresentação de 2 minutos para o seu projeto final, cobrindo problema, solução, demonstração e aprendizados.", expectedPoints: ["Problema", "Solução construída", "Demonstração", "Principais aprendizados"] },
];

function qq(id: string, prompt: string, options: { id: string; text: string; correct?: boolean }[], explanation: string) {
  return { id, prompt, options, explanation };
}

export const quizzes: Quiz[] = [
  {
    id: "quiz-ip-1", moduleId: "mod-ip-1", title: "Quiz — Primeiros passos na programação", kind: "modulo", passingScore: 70,
    questions: [
      qq("q1", "O que é um algoritmo?", [mc("a", "Um tipo de computador"), mc("b", "Uma sequência organizada de passos para resolver um problema", true), mc("c", "Um erro de programação"), mc("d", "Um arquivo de imagem")], "Algoritmo é uma sequência de passos organizados para resolver um problema."),
      qq("q2", "O processador do computador executa instruções...", [mc("a", "Complexas e ambíguas"), mc("b", "Simples e em alta velocidade", true), mc("c", "Aleatórias"), mc("d", "Somente em português")], "O processador executa instruções muito simples, em grande volume e velocidade."),
    ],
  },
  {
    id: "quiz-ip-2", moduleId: "mod-ip-2", title: "Quiz — Pensando como um programador", kind: "modulo", passingScore: 70,
    questions: [
      qq("q1", "Uma variável do tipo texto pode ser chamada de:", [mc("a", "Boolean"), mc("b", "String", true), mc("c", "Integer"), mc("d", "Array")], "Valores de texto são chamados de 'string' na maioria das linguagens."),
      qq("q2", "Para repetir uma tarefa várias vezes, usamos:", [mc("a", "Uma variável"), mc("b", "Um loop (repetição)", true), mc("c", "Um comentário"), mc("d", "Uma tag HTML")], "Loops (estruturas de repetição) são usados para repetir tarefas."),
    ],
  },
  {
    id: "quiz-ip-final", courseId: "curso-introducao-programacao", title: "Avaliação final — Introdução à Programação", kind: "avaliacao_final", passingScore: 70,
    questions: [
      qq("q1", "Programar significa, essencialmente:", [mc("a", "Desenhar telas bonitas"), mc("b", "Escrever instruções precisas para o computador executar", true), mc("c", "Configurar redes"), mc("d", "Editar vídeos")], "Programar é escrever instruções que o computador consegue seguir."),
      qq("q2", "Qual estrutura permite que um programa escolha entre dois caminhos diferentes?", [mc("a", "Variável"), mc("b", "Condicional (se/então)", true), mc("c", "Comentário"), mc("d", "Vetor")], "Condicionais permitem decisões no fluxo do programa."),
      qq("q3", "Um vetor (ou lista) serve para:", [mc("a", "Guardar um único valor"), mc("b", "Guardar vários valores relacionados", true), mc("c", "Executar o programa mais rápido"), mc("d", "Estilizar uma página")], "Vetores armazenam coleções de valores relacionados."),
    ],
  },

  { id: "quiz-lp-final", courseId: "curso-logica-de-programacao", title: "Avaliação final — Lógica de Programação", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Fluxogramas usam losangos para representar:", [mc("a", "Início e fim"), mc("b", "Decisões", true), mc("c", "Processos simples"), mc("d", "Comentários")], "Losangos representam pontos de decisão em um fluxograma."),
    qq("q2", "O operador lógico 'E' exige que:", [mc("a", "Apenas uma condição seja verdadeira"), mc("b", "Todas as condições envolvidas sejam verdadeiras", true), mc("c", "Nenhuma condição seja verdadeira"), mc("d", "As condições sejam números")], "O 'E' lógico só é verdadeiro quando todas as condições são verdadeiras."),
  ]},
  { id: "quiz-hc-final", courseId: "curso-html-css", title: "Avaliação final — HTML e CSS", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "Qual tag é semanticamente mais adequada para o rodapé de uma página?", [mc("a", "<div>"), mc("b", "<footer>", true), mc("c", "<span>"), mc("d", "<b>")], "footer é a tag semântica indicada para rodapés."),
    qq("q2", "display: flex é usado para:", [mc("a", "Criar animações"), mc("b", "Organizar elementos em um layout flexível", true), mc("c", "Adicionar imagens"), mc("d", "Validar formulários")], "Flexbox organiza elementos em linha ou coluna de forma flexível."),
  ]},
  { id: "quiz-js-final", courseId: "curso-javascript", title: "Avaliação final — JavaScript", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "addEventListener é usado para:", [mc("a", "Estilizar um elemento"), mc("b", "Reagir a eventos como cliques", true), mc("c", "Criar uma tabela no banco"), mc("d", "Declarar uma variável")], "addEventListener conecta uma função a um evento como clique ou envio de formulário."),
    qq("q2", "document.querySelector retorna:", [mc("a", "Um número aleatório"), mc("b", "O primeiro elemento que casa com o seletor CSS informado", true), mc("c", "Todos os elementos da página"), mc("d", "Um arquivo CSS")], "querySelector retorna o primeiro elemento correspondente ao seletor informado."),
  ]},
  { id: "quiz-bd-final", courseId: "curso-banco-de-dados", title: "Avaliação final — Banco de Dados", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "O comando SQL para buscar dados é:", [mc("a", "SELECT", true), mc("b", "FETCH"), mc("c", "GET"), mc("d", "OPEN")], "SELECT é o comando padrão para consultar dados em SQL."),
    qq("q2", "JOIN é usado para:", [mc("a", "Apagar uma tabela"), mc("b", "Combinar dados de tabelas diferentes", true), mc("c", "Criar uma variável"), mc("d", "Formatar um texto")], "JOIN combina linhas de duas ou mais tabelas relacionadas."),
  ]},
  { id: "quiz-da-final", courseId: "curso-desenvolvimento-de-aplicacoes", title: "Avaliação final — Desenvolvimento de Aplicações", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "APIs servem para:", [mc("a", "Estilizar páginas"), mc("b", "Permitir a comunicação entre sistemas diferentes", true), mc("c", "Armazenar senhas em texto puro"), mc("d", "Substituir o banco de dados")], "APIs definem contratos de comunicação entre sistemas."),
    qq("q2", "Uma chave de API sensível deve ficar:", [mc("a", "No código do navegador"), mc("b", "Em variável de ambiente no servidor", true), mc("c", "Em um comentário público"), mc("d", "No HTML da página")], "Segredos nunca devem ser expostos no front-end."),
  ]},
  { id: "quiz-pf-final", courseId: "curso-projeto-final-dev", title: "Avaliação final — Projeto Final", kind: "avaliacao_final", passingScore: 70, questions: [
    qq("q1", "O primeiro passo ao planejar um projeto é:", [mc("a", "Escrever o máximo de código possível"), mc("b", "Definir claramente o problema e o escopo essencial", true), mc("c", "Escolher a cor do botão"), mc("d", "Publicar o projeto")], "Escopo claro evita retrabalho e aumenta a chance de concluir o projeto."),
    qq("q2", "Uma boa apresentação de projeto deve incluir:", [mc("a", "Somente o código-fonte"), mc("b", "Problema, solução, demonstração e aprendizados", true), mc("c", "Apenas a tela de login"), mc("d", "Uma lista de erros encontrados")], "Uma apresentação completa cobre problema, solução, demonstração e aprendizados."),
  ]},
];
