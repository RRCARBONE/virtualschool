import type { Profession } from "@/lib/types";

// Catálogo de profissões. A arquitetura (ver admin em /admin/profissoes)
// permite adicionar centenas de novas profissões sem alterar código —
// este arquivo representa o conteúdo inicial (seed) enquanto o Supabase
// não está conectado. `formationIds` só é preenchido para profissões que já
// possuem uma trilha completa publicada (ver career-paths.ts).
function profession(p: Omit<Profession, "id" | "formationIds"> & { formationIds?: string[] }): Profession {
  return { id: p.slug, formationIds: [], ...p };
}

export const professions: Profession[] = [
  // ---------------------------------------------------------------- Tecnologia
  profession({
    slug: "desenvolvedor-web",
    areaId: "tecnologia",
    name: "Desenvolvedor Web",
    summary: "Cria e mantém sites e aplicações que rodam no navegador.",
    dailyActivities: ["Construir interfaces com HTML, CSS e JavaScript", "Integrar aplicações a APIs e bancos de dados", "Corrigir bugs e revisar código de outros devs"],
    skills: ["HTML/CSS", "JavaScript", "Lógica de programação", "Controle de versão (Git)"],
    averageSalaryRange: "R$ 2.800 – R$ 9.000",
    workEnvironments: ["Empresas de tecnologia", "Remoto/freelancer"],
  }),
  profession({
    slug: "desenvolvedor-de-software",
    areaId: "tecnologia",
    name: "Desenvolvedor de Software",
    summary: "Projeta, constrói e mantém sistemas e aplicações completas.",
    dailyActivities: ["Planejar a arquitetura de um sistema", "Escrever e testar código", "Colaborar com times de produto e design"],
    skills: ["Lógica de programação", "Banco de dados", "Boas práticas de código", "Trabalho em equipe"],
    averageSalaryRange: "R$ 3.500 – R$ 14.000",
    workEnvironments: ["Empresas de tecnologia", "Consultorias", "Remoto"],
    formationIds: ["formacao-dev-software"],
  }),
  profession({
    slug: "desenvolvedor-de-aplicativos",
    areaId: "tecnologia",
    name: "Desenvolvedor de Aplicativos",
    summary: "Cria apps para celular com foco em experiência mobile.",
    dailyActivities: ["Desenvolver telas e fluxos de app", "Testar em diferentes dispositivos", "Publicar atualizações nas lojas"],
    skills: ["Programação mobile", "UI para telas pequenas", "APIs REST"],
    averageSalaryRange: "R$ 3.200 – R$ 12.000",
    workEnvironments: ["Startups", "Empresas de tecnologia"],
  }),
  profession({
    slug: "analista-de-dados",
    areaId: "tecnologia",
    name: "Analista de Dados",
    summary: "Transforma dados brutos em relatórios e decisões de negócio.",
    dailyActivities: ["Extrair e organizar dados", "Criar dashboards e relatórios", "Apresentar insights para times de negócio"],
    skills: ["SQL", "Planilhas avançadas", "Visualização de dados", "Raciocínio analítico"],
    averageSalaryRange: "R$ 3.000 – R$ 10.000",
    workEnvironments: ["Empresas de todos os setores", "Remoto"],
  }),
  profession({
    slug: "cientista-de-dados",
    areaId: "tecnologia",
    name: "Cientista de Dados",
    summary: "Usa estatística e modelos para prever cenários e otimizar decisões.",
    dailyActivities: ["Construir modelos preditivos", "Validar hipóteses com dados", "Traduzir resultados técnicos para o negócio"],
    skills: ["Estatística", "Python", "Machine learning", "Storytelling com dados"],
    averageSalaryRange: "R$ 6.000 – R$ 18.000",
    workEnvironments: ["Grandes empresas", "Startups de dados"],
  }),
  profession({
    slug: "especialista-em-ia",
    areaId: "tecnologia",
    name: "Especialista em IA",
    summary: "Projeta e implementa soluções baseadas em inteligência artificial.",
    dailyActivities: ["Selecionar e ajustar modelos de IA", "Integrar IA a produtos existentes", "Avaliar riscos e limitações dos modelos"],
    skills: ["Machine learning", "Engenharia de prompts", "Ética em IA", "Python"],
    averageSalaryRange: "R$ 7.000 – R$ 20.000",
    workEnvironments: ["Empresas de tecnologia", "Laboratórios de inovação"],
  }),
  profession({
    slug: "ciberseguranca",
    areaId: "tecnologia",
    name: "Especialista em Cibersegurança",
    summary: "Protege sistemas e dados contra ataques e vulnerabilidades.",
    dailyActivities: ["Monitorar ameaças", "Realizar testes de invasão controlados", "Definir políticas de segurança"],
    skills: ["Redes", "Segurança da informação", "Análise de vulnerabilidades"],
    averageSalaryRange: "R$ 5.000 – R$ 16.000",
    workEnvironments: ["Bancos", "Empresas de tecnologia", "Órgãos públicos"],
  }),
  profession({
    slug: "ux-ui-designer",
    areaId: "tecnologia",
    name: "UX/UI Designer",
    summary: "Desenha interfaces digitais fáceis, bonitas e centradas no usuário.",
    dailyActivities: ["Criar wireframes e protótipos", "Conduzir testes com usuários", "Definir componentes visuais"],
    skills: ["Prototipação", "Pesquisa com usuários", "Design de interfaces"],
    averageSalaryRange: "R$ 3.500 – R$ 12.000",
    workEnvironments: ["Empresas de produto digital", "Agências"],
  }),
  profession({
    slug: "suporte-de-ti",
    areaId: "tecnologia",
    name: "Suporte de TI",
    summary: "Resolve problemas técnicos do dia a dia de usuários e empresas.",
    dailyActivities: ["Atender chamados de suporte", "Configurar equipamentos e sistemas", "Documentar soluções"],
    skills: ["Redes básicas", "Sistemas operacionais", "Atendimento ao cliente"],
    averageSalaryRange: "R$ 1.800 – R$ 4.500",
    workEnvironments: ["Empresas de todos os setores"],
  }),
  profession({
    slug: "administrador-de-redes",
    areaId: "tecnologia",
    name: "Administrador de Redes",
    summary: "Planeja e mantém a infraestrutura de redes de uma organização.",
    dailyActivities: ["Configurar servidores e roteadores", "Monitorar desempenho da rede", "Garantir segurança e disponibilidade"],
    skills: ["Redes", "Servidores", "Segurança de infraestrutura"],
    averageSalaryRange: "R$ 3.000 – R$ 9.000",
    workEnvironments: ["Empresas de médio e grande porte", "Provedores de internet"],
  }),

  // -------------------------------------------------- Inteligência Artificial
  profession({ slug: "engenheiro-de-machine-learning", areaId: "inteligencia-artificial", name: "Engenheiro de Machine Learning", summary: "Coloca modelos de IA em produção de forma robusta e escalável.", dailyActivities: ["Treinar e ajustar modelos", "Criar pipelines de dados", "Monitorar performance em produção"], skills: ["Python", "MLOps", "Estatística"], workEnvironments: ["Empresas de tecnologia"] }),
  profession({ slug: "engenheiro-de-prompt", areaId: "inteligencia-artificial", name: "Engenheiro de Prompt", summary: "Projeta instruções eficazes para extrair o melhor de modelos de IA generativa.", dailyActivities: ["Escrever e testar prompts", "Avaliar qualidade das respostas", "Documentar boas práticas"], skills: ["Comunicação escrita", "Pensamento estruturado", "IA generativa"], workEnvironments: ["Empresas de produto digital", "Remoto"] }),
  profession({ slug: "analista-de-automacao-com-ia", areaId: "inteligencia-artificial", name: "Analista de Automação com IA", summary: "Automatiza processos de negócio usando ferramentas de inteligência artificial.", dailyActivities: ["Mapear processos manuais", "Configurar automações", "Medir ganhos de eficiência"], skills: ["Automação de processos", "Lógica", "Ferramentas de IA"], workEnvironments: ["Empresas de todos os setores"] }),
  profession({ slug: "consultor-de-etica-em-ia", areaId: "inteligencia-artificial", name: "Consultor de Ética e Governança em IA", summary: "Ajuda organizações a adotar IA de forma responsável e segura.", dailyActivities: ["Avaliar riscos de projetos de IA", "Criar políticas de uso responsável", "Treinar equipes"], skills: ["Governança de dados", "Pensamento crítico", "Comunicação"], workEnvironments: ["Consultorias", "Grandes empresas"] }),

  // ------------------------------------------------------------- Administração
  profession({ slug: "administrador-de-empresas", areaId: "administracao", name: "Administrador de Empresas", summary: "Planeja e organiza recursos para atingir os objetivos de uma organização.", dailyActivities: ["Definir metas e indicadores", "Coordenar equipes e processos", "Analisar resultados financeiros"], skills: ["Gestão de processos", "Liderança", "Planejamento estratégico"], workEnvironments: ["Empresas de todos os portes"] }),
  profession({ slug: "gestor-de-projetos", areaId: "administracao", name: "Gestor de Projetos", summary: "Garante que projetos entreguem valor no prazo e orçamento previstos.", dailyActivities: ["Planejar cronogramas", "Gerenciar riscos", "Alinhar expectativas com stakeholders"], skills: ["Gestão de projetos", "Comunicação", "Organização"], workEnvironments: ["Empresas de todos os setores"] }),
  profession({ slug: "analista-de-recursos-humanos", areaId: "administracao", name: "Analista de Recursos Humanos", summary: "Cuida da atração, desenvolvimento e bem-estar das pessoas na empresa.", dailyActivities: ["Conduzir processos seletivos", "Organizar treinamentos", "Apoiar clima organizacional"], skills: ["Comunicação interpessoal", "Recrutamento", "Legislação trabalhista básica"], workEnvironments: ["Empresas de todos os portes"] }),
  profession({ slug: "gestor-de-operacoes", areaId: "administracao", name: "Gestor de Operações", summary: "Garante que os processos do dia a dia funcionem com eficiência.", dailyActivities: ["Monitorar indicadores operacionais", "Otimizar processos", "Resolver gargalos"], skills: ["Processos", "Indicadores de desempenho", "Resolução de problemas"], workEnvironments: ["Indústrias", "Varejo", "Serviços"] }),

  // ------------------------------------------------------------------ Finanças
  profession({ slug: "analista-financeiro", areaId: "financas", name: "Analista Financeiro", summary: "Analisa números para apoiar decisões financeiras da empresa.", dailyActivities: ["Montar relatórios financeiros", "Projetar fluxo de caixa", "Analisar custos e investimentos"], skills: ["Excel avançado", "Análise financeira", "Contabilidade básica"], averageSalaryRange: "R$ 3.000 – R$ 9.000", workEnvironments: ["Empresas de todos os setores", "Bancos"], formationIds: ["formacao-gestao-financeira"] }),
  profession({ slug: "consultor-de-investimentos", areaId: "financas", name: "Consultor de Investimentos", summary: "Orienta pessoas e empresas na alocação consciente de recursos.", dailyActivities: ["Entender objetivos do cliente", "Explicar produtos financeiros", "Acompanhar carteiras"], skills: ["Educação financeira", "Comunicação", "Mercado financeiro"], workEnvironments: ["Bancos", "Corretoras", "Autônomo"] }),
  profession({ slug: "controller", areaId: "financas", name: "Controller Financeiro", summary: "Garante a saúde financeira e o controle contábil da organização.", dailyActivities: ["Consolidar demonstrações financeiras", "Definir controles internos", "Apoiar decisões da diretoria"], skills: ["Contabilidade", "Controladoria", "Análise de riscos"], workEnvironments: ["Empresas de médio e grande porte"] }),
  profession({ slug: "educador-financeiro", areaId: "financas", name: "Educador Financeiro", summary: "Ensina pessoas a organizar e planejar sua vida financeira.", dailyActivities: ["Criar conteúdo educativo", "Conduzir workshops", "Montar planos financeiros pessoais"], skills: ["Didática", "Finanças pessoais", "Comunicação"], workEnvironments: ["Autônomo", "Empresas de educação financeira"] }),

  // ----------------------------------------------------------------- Marketing
  profession({ slug: "analista-de-marketing-digital", areaId: "marketing", name: "Analista de Marketing Digital", summary: "Planeja e executa estratégias de marketing nos canais digitais.", dailyActivities: ["Criar campanhas em redes sociais", "Analisar métricas de desempenho", "Testar novos formatos de conteúdo"], skills: ["Redes sociais", "Análise de métricas", "Copywriting"], averageSalaryRange: "R$ 2.500 – R$ 8.000", workEnvironments: ["Agências", "Empresas de todos os setores", "Remoto"], formationIds: ["formacao-marketing-digital"] }),
  profession({ slug: "gestor-de-trafego-pago", areaId: "marketing", name: "Gestor de Tráfego Pago", summary: "Cria e otimiza campanhas de anúncios pagos para gerar resultados.", dailyActivities: ["Configurar campanhas de anúncios", "Testar públicos e criativos", "Otimizar orçamento por resultado"], skills: ["Anúncios online", "Análise de dados", "Otimização de conversão"], workEnvironments: ["Agências", "E-commerces", "Remoto"] }),
  profession({ slug: "social-media", areaId: "marketing", name: "Social Media", summary: "Planeja e produz conteúdo para redes sociais de marcas.", dailyActivities: ["Criar calendário de conteúdo", "Produzir posts e stories", "Interagir com a comunidade"], skills: ["Criação de conteúdo", "Redes sociais", "Storytelling"], workEnvironments: ["Agências", "Empresas de todos os portes"] }),
  profession({ slug: "especialista-em-branding", areaId: "marketing", name: "Especialista em Branding", summary: "Constrói e protege a identidade e reputação de marcas.", dailyActivities: ["Definir posicionamento de marca", "Criar diretrizes visuais e de voz", "Acompanhar percepção de marca"], skills: ["Estratégia de marca", "Comunicação", "Pesquisa de mercado"], workEnvironments: ["Agências", "Empresas de médio e grande porte"] }),

  // -------------------------------------------------------------------- Design
  profession({ slug: "designer-grafico", areaId: "design", name: "Designer Gráfico", summary: "Cria peças visuais para comunicação impressa e digital.", dailyActivities: ["Criar artes para campanhas", "Diagramar materiais", "Ajustar identidade visual"], skills: ["Composição visual", "Ferramentas de design", "Tipografia"], workEnvironments: ["Agências", "Autônomo"] }),
  profession({ slug: "designer-de-produto", areaId: "design", name: "Designer de Produto Digital", summary: "Desenha produtos digitais completos, do problema à solução.", dailyActivities: ["Pesquisar necessidades do usuário", "Prototipar soluções", "Colaborar com times de tecnologia"], skills: ["Pesquisa", "Prototipação", "Pensamento sistêmico"], workEnvironments: ["Empresas de produto"] }),
  profession({ slug: "ilustrador-digital", areaId: "design", name: "Ilustrador Digital", summary: "Cria ilustrações originais para diferentes formatos e mídias.", dailyActivities: ["Esboçar conceitos", "Finalizar ilustrações digitais", "Adaptar arte para diferentes formatos"], skills: ["Desenho", "Ferramentas digitais", "Criatividade"], workEnvironments: ["Autônomo", "Estúdios criativos"] }),
  profession({ slug: "motion-designer", areaId: "design", name: "Motion Designer", summary: "Dá vida a peças gráficas através de animação.", dailyActivities: ["Criar storyboards", "Animar elementos gráficos", "Ajustar timing e ritmo visual"], skills: ["Animação", "Design gráfico", "Edição de vídeo"], workEnvironments: ["Agências", "Produtoras"] }),

  // --------------------------------------------------------------------- Saúde
  profession({ slug: "tecnico-de-enfermagem", areaId: "saude", name: "Técnico de Enfermagem", summary: "Presta cuidados diretos a pacientes sob supervisão da equipe de saúde.", dailyActivities: ["Verificar sinais vitais", "Auxiliar em procedimentos", "Registrar evolução do paciente"], skills: ["Cuidado ao paciente", "Procedimentos básicos", "Ética profissional"], workEnvironments: ["Hospitais", "Clínicas", "Home care"] }),
  profession({ slug: "nutricionista", areaId: "saude", name: "Nutricionista", summary: "Orienta hábitos alimentares para saúde e qualidade de vida.", dailyActivities: ["Avaliar hábitos alimentares", "Montar planos nutricionais", "Acompanhar evolução dos pacientes"], skills: ["Ciência da nutrição", "Comunicação", "Empatia"], workEnvironments: ["Clínicas", "Consultório próprio", "Empresas"] }),
  profession({ slug: "personal-trainer-saude", areaId: "saude", name: "Educador Físico", summary: "Planeja treinos seguros e eficazes para diferentes objetivos.", dailyActivities: ["Avaliar condição física", "Montar programas de treino", "Acompanhar evolução"], skills: ["Fisiologia do exercício", "Didática", "Segurança no treino"], workEnvironments: ["Academias", "Autônomo"] }),
  profession({ slug: "gestor-hospitalar", areaId: "saude", name: "Gestor Hospitalar", summary: "Administra recursos e processos de unidades de saúde.", dailyActivities: ["Gerenciar equipes e recursos", "Garantir qualidade do atendimento", "Controlar indicadores"], skills: ["Gestão", "Processos de saúde", "Liderança"], workEnvironments: ["Hospitais", "Clínicas"] }),

  // --------------------------------------------------------------- Engenharia
  profession({ slug: "engenheiro-civil", areaId: "engenharia", name: "Engenheiro Civil", summary: "Projeta e acompanha a execução de obras e estruturas.", dailyActivities: ["Elaborar projetos estruturais", "Acompanhar obras", "Garantir normas técnicas"], skills: ["Cálculo estrutural", "Gestão de obras", "Normas técnicas"], workEnvironments: ["Construtoras", "Escritórios de engenharia"] }),
  profession({ slug: "engenheiro-de-producao", areaId: "engenharia", name: "Engenheiro de Produção", summary: "Otimiza processos produtivos para mais eficiência e qualidade.", dailyActivities: ["Mapear processos produtivos", "Reduzir desperdícios", "Implementar melhorias"], skills: ["Processos", "Qualidade", "Indicadores"], workEnvironments: ["Indústrias"] }),
  profession({ slug: "engenheiro-mecanico", areaId: "engenharia", name: "Engenheiro Mecânico", summary: "Projeta e mantém sistemas e equipamentos mecânicos.", dailyActivities: ["Projetar componentes mecânicos", "Analisar desempenho de máquinas", "Especificar materiais"], skills: ["Mecânica aplicada", "Desenho técnico", "Manutenção"], workEnvironments: ["Indústrias", "Escritórios técnicos"] }),
  profession({ slug: "engenheiro-eletricista", areaId: "engenharia", name: "Engenheiro Eletricista", summary: "Projeta sistemas elétricos e de automação industrial.", dailyActivities: ["Projetar instalações elétricas", "Especificar equipamentos", "Garantir segurança elétrica"], skills: ["Circuitos elétricos", "Automação", "Normas de segurança"], workEnvironments: ["Indústrias", "Construtoras"] }),

  // --------------------------------------------------------------- Construção
  profession({ slug: "mestre-de-obras", areaId: "construcao", name: "Mestre de Obras", summary: "Coordena equipes e etapas da execução de uma obra.", dailyActivities: ["Organizar a equipe do canteiro", "Acompanhar cronograma da obra", "Garantir qualidade da execução"], skills: ["Liderança de equipe", "Leitura de projetos", "Gestão de materiais"], workEnvironments: ["Construtoras", "Obras residenciais"] }),
  profession({ slug: "arquiteto", areaId: "construcao", name: "Arquiteto", summary: "Projeta espaços funcionais, seguros e esteticamente equilibrados.", dailyActivities: ["Criar projetos arquitetônicos", "Acompanhar aprovações legais", "Visitar obras"], skills: ["Projeto arquitetônico", "Normas urbanísticas", "Softwares de projeto"], workEnvironments: ["Escritórios de arquitetura", "Autônomo"] }),
  profession({ slug: "orcamentista-de-obras", areaId: "construcao", name: "Orçamentista de Obras", summary: "Calcula custos e viabilidade financeira de projetos de construção.", dailyActivities: ["Levantar quantitativos", "Cotar materiais e serviços", "Montar planilhas orçamentárias"], skills: ["Orçamento de obras", "Leitura de projetos", "Planilhas"], workEnvironments: ["Construtoras", "Consultorias"] }),

  // -------------------------------------------------------------- Gastronomia
  profession({ slug: "chef-de-cozinha", areaId: "gastronomia", name: "Chef de Cozinha", summary: "Lidera a cozinha e define a identidade gastronômica de um restaurante.", dailyActivities: ["Criar cardápios", "Coordenar a equipe de cozinha", "Garantir padrão de qualidade dos pratos"], skills: ["Técnicas culinárias", "Gestão de equipe", "Controle de custos"], workEnvironments: ["Restaurantes", "Hotéis"] }),
  profession({ slug: "confeiteiro", areaId: "gastronomia", name: "Confeiteiro", summary: "Produz doces e sobremesas com técnica e criatividade.", dailyActivities: ["Desenvolver receitas", "Produzir doces e bolos", "Cuidar da apresentação visual"], skills: ["Técnicas de confeitaria", "Criatividade", "Organização"], workEnvironments: ["Confeitarias", "Autônomo"] }),
  profession({ slug: "gestor-de-restaurante", areaId: "gastronomia", name: "Gestor de Restaurante", summary: "Administra a operação e os resultados de um restaurante.", dailyActivities: ["Controlar custos e estoque", "Gerenciar equipe de sala e cozinha", "Cuidar da experiência do cliente"], skills: ["Gestão de operações", "Atendimento", "Controle financeiro"], workEnvironments: ["Restaurantes", "Redes de alimentação"] }),

  // ------------------------------------------------------------------ Turismo
  profession({ slug: "guia-de-turismo", areaId: "turismo", name: "Guia de Turismo", summary: "Conduz e encanta viajantes com conhecimento sobre destinos.", dailyActivities: ["Planejar roteiros", "Conduzir grupos", "Compartilhar história e cultura local"], skills: ["Comunicação", "Idiomas", "Conhecimento cultural"], workEnvironments: ["Agências de turismo", "Autônomo"] }),
  profession({ slug: "agente-de-viagens", areaId: "turismo", name: "Agente de Viagens", summary: "Planeja e vende experiências de viagem personalizadas.", dailyActivities: ["Montar pacotes de viagem", "Negociar com fornecedores", "Atender clientes"], skills: ["Vendas", "Organização", "Conhecimento de destinos"], workEnvironments: ["Agências de viagem", "Remoto"] }),
  profession({ slug: "gestor-de-hotelaria", areaId: "turismo", name: "Gestor de Hotelaria", summary: "Administra a operação de hotéis e pousadas.", dailyActivities: ["Gerenciar reservas e ocupação", "Coordenar equipes", "Garantir experiência do hóspede"], skills: ["Gestão hoteleira", "Atendimento", "Liderança"], workEnvironments: ["Hotéis", "Pousadas", "Resorts"] }),

  // ----------------------------------------------------------------- Educação
  profession({ slug: "professor-de-educacao-basica", areaId: "educacao", name: "Professor da Educação Básica", summary: "Ensina e forma crianças e adolescentes em escolas.", dailyActivities: ["Planejar aulas", "Avaliar aprendizagem", "Acompanhar desenvolvimento dos alunos"], skills: ["Didática", "Planejamento pedagógico", "Comunicação"], workEnvironments: ["Escolas públicas e privadas"] }),
  profession({ slug: "designer-instrucional", areaId: "educacao", name: "Designer Instrucional", summary: "Planeja experiências de ensino eficazes, presenciais ou digitais.", dailyActivities: ["Estruturar cursos e trilhas", "Definir metodologias de ensino", "Avaliar resultados de aprendizagem"], skills: ["Metodologias ativas", "Design de cursos", "Avaliação educacional"], workEnvironments: ["Empresas de educação", "Remoto"] }),
  profession({ slug: "coordenador-pedagogico", areaId: "educacao", name: "Coordenador Pedagógico", summary: "Orienta professores e garante a qualidade do projeto pedagógico.", dailyActivities: ["Acompanhar planejamento dos professores", "Analisar indicadores de aprendizagem", "Mediar relações escolares"], skills: ["Gestão pedagógica", "Liderança", "Comunicação"], workEnvironments: ["Escolas"] }),

  // ------------------------------------------------------------------- Vendas
  profession({ slug: "consultor-de-vendas", areaId: "vendas", name: "Consultor de Vendas", summary: "Identifica necessidades do cliente e apresenta a melhor solução.", dailyActivities: ["Prospectar clientes", "Conduzir negociações", "Fechar contratos"], skills: ["Negociação", "Comunicação", "Conhecimento do produto"], workEnvironments: ["Empresas de todos os setores"] }),
  profession({ slug: "sdr-vendas", areaId: "vendas", name: "SDR — Pré-vendas", summary: "Qualifica leads antes de repassá-los ao time comercial.", dailyActivities: ["Fazer o primeiro contato com leads", "Qualificar oportunidades", "Agendar reuniões comerciais"], skills: ["Prospecção", "Comunicação", "Organização"], workEnvironments: ["Empresas de tecnologia", "Remoto"] }),
  profession({ slug: "gerente-comercial", areaId: "vendas", name: "Gerente Comercial", summary: "Lidera equipes e estratégias para atingir metas de vendas.", dailyActivities: ["Definir metas comerciais", "Treinar a equipe de vendas", "Acompanhar indicadores de resultado"], skills: ["Liderança", "Estratégia comercial", "Análise de indicadores"], workEnvironments: ["Empresas de todos os setores"] }),

  // ---------------------------------------------------------------- Logística
  profession({ slug: "analista-de-logistica", areaId: "logistica", name: "Analista de Logística", summary: "Planeja o fluxo de produtos do fornecedor até o cliente final.", dailyActivities: ["Planejar rotas de entrega", "Controlar estoques", "Monitorar prazos de entrega"], skills: ["Planejamento logístico", "Excel", "Gestão de estoque"], workEnvironments: ["Indústrias", "E-commerces"] }),
  profession({ slug: "gestor-de-supply-chain", areaId: "logistica", name: "Gestor de Supply Chain", summary: "Coordena toda a cadeia de suprimentos de uma empresa.", dailyActivities: ["Negociar com fornecedores", "Planejar demanda", "Reduzir custos da cadeia"], skills: ["Gestão de cadeia de suprimentos", "Negociação", "Planejamento"], workEnvironments: ["Indústrias", "Grandes varejistas"] }),
  profession({ slug: "operador-de-armazem", areaId: "logistica", name: "Operador de Armazém", summary: "Organiza a movimentação e o controle de mercadorias em um armazém.", dailyActivities: ["Receber e conferir mercadorias", "Organizar estoque", "Preparar pedidos para expedição"], skills: ["Organização", "Controle de estoque", "Atenção a detalhes"], workEnvironments: ["Centros de distribuição"] }),

  // -------------------------------------------------------------- Automóveis
  profession({ slug: "consultor-de-vendas-automotivas", areaId: "automoveis", name: "Consultor de Vendas Automotivas", summary: "Orienta clientes na escolha e compra de veículos.", dailyActivities: ["Apresentar veículos", "Negociar condições de compra", "Acompanhar pós-venda"], skills: ["Vendas", "Conhecimento automotivo", "Negociação"], workEnvironments: ["Concessionárias"] }),
  profession({ slug: "avaliador-de-veiculos", areaId: "automoveis", name: "Avaliador de Veículos", summary: "Avalia estado e valor de mercado de veículos usados.", dailyActivities: ["Inspecionar veículos", "Consultar tabelas de mercado", "Emitir laudos de avaliação"], skills: ["Conhecimento técnico automotivo", "Atenção a detalhes", "Precificação"], workEnvironments: ["Concessionárias", "Autônomo"] }),

  // --------------------------------------------------------------- Mecânica
  profession({ slug: "mecanico-automotivo", areaId: "mecanica", name: "Mecânico Automotivo", summary: "Diagnostica e conserta problemas mecânicos em veículos.", dailyActivities: ["Diagnosticar falhas", "Executar reparos mecânicos", "Realizar manutenção preventiva"], skills: ["Mecânica automotiva", "Diagnóstico técnico", "Uso de ferramentas"], workEnvironments: ["Oficinas", "Concessionárias"] }),
  profession({ slug: "tecnico-de-manutencao-industrial", areaId: "mecanica", name: "Técnico de Manutenção Industrial", summary: "Mantém máquinas industriais funcionando com segurança.", dailyActivities: ["Realizar manutenção preventiva", "Diagnosticar falhas em equipamentos", "Registrar ordens de serviço"], skills: ["Mecânica industrial", "Segurança do trabalho", "Leitura de manuais técnicos"], workEnvironments: ["Indústrias"] }),

  // ----------------------------------------------------------------- Elétrica
  profession({ slug: "eletricista-predial", areaId: "eletrica", name: "Eletricista Predial", summary: "Instala e mantém sistemas elétricos residenciais e comerciais.", dailyActivities: ["Instalar circuitos elétricos", "Identificar e corrigir falhas", "Seguir normas de segurança"], skills: ["Instalações elétricas", "Normas técnicas", "Segurança do trabalho"], workEnvironments: ["Obras", "Autônomo"] }),
  profession({ slug: "tecnico-em-automacao", areaId: "eletrica", name: "Técnico em Automação Industrial", summary: "Instala e programa sistemas automatizados em indústrias.", dailyActivities: ["Programar controladores industriais", "Instalar sensores e atuadores", "Realizar testes de sistemas"], skills: ["Automação", "Eletrônica", "Programação de CLPs"], workEnvironments: ["Indústrias"] }),

  // ------------------------------------------------------------- Fotografia
  profession({ slug: "fotografo-profissional", areaId: "fotografia", name: "Fotógrafo Profissional", summary: "Registra momentos e produtos com técnica e sensibilidade estética.", dailyActivities: ["Planejar ensaios fotográficos", "Operar equipamentos e iluminação", "Editar e tratar imagens"], skills: ["Técnica fotográfica", "Composição", "Edição de imagem"], workEnvironments: ["Autônomo", "Estúdios"] }),
  profession({ slug: "editor-de-imagem", areaId: "fotografia", name: "Editor de Imagem", summary: "Trata e aprimora fotografias para diferentes usos.", dailyActivities: ["Retocar imagens", "Ajustar cor e luz", "Preparar arquivos para diferentes mídias"], skills: ["Edição digital", "Sensibilidade visual", "Ferramentas de edição"], workEnvironments: ["Autônomo", "Agências"] }),

  // ---------------------------------------------------------------- Audiovisual
  profession({ slug: "editor-de-video", areaId: "audiovisual", name: "Editor de Vídeo", summary: "Monta e finaliza vídeos para diferentes plataformas.", dailyActivities: ["Selecionar e cortar cenas", "Adicionar trilha sonora e efeitos", "Ajustar ritmo narrativo"], skills: ["Edição de vídeo", "Storytelling", "Ferramentas de edição"], workEnvironments: ["Produtoras", "Autônomo", "Remoto"] }),
  profession({ slug: "roteirista", areaId: "audiovisual", name: "Roteirista", summary: "Cria histórias e roteiros para vídeo, cinema e séries.", dailyActivities: ["Desenvolver histórias e personagens", "Escrever roteiros", "Revisar estrutura narrativa"], skills: ["Escrita criativa", "Estrutura narrativa", "Pesquisa"], workEnvironments: ["Produtoras", "Autônomo"] }),
  profession({ slug: "produtor-audiovisual", areaId: "audiovisual", name: "Produtor Audiovisual", summary: "Coordena toda a produção de um projeto audiovisual.", dailyActivities: ["Planejar cronograma de produção", "Coordenar equipe técnica", "Gerenciar orçamento"], skills: ["Gestão de projetos", "Produção audiovisual", "Negociação"], workEnvironments: ["Produtoras", "Agências"] }),

  // --------------------------------------------------------------------- Games
  profession({ slug: "desenvolvedor-de-jogos", areaId: "games", name: "Desenvolvedor de Jogos", summary: "Programa a lógica e os sistemas que fazem um jogo funcionar.", dailyActivities: ["Programar mecânicas de jogo", "Testar e corrigir bugs", "Colaborar com design e arte"], skills: ["Programação", "Lógica de jogos", "Motores de jogo"], workEnvironments: ["Estúdios de jogos", "Indie/remoto"] }),
  profession({ slug: "game-designer", areaId: "games", name: "Game Designer", summary: "Projeta regras, desafios e a experiência de jogo.", dailyActivities: ["Desenhar mecânicas e níveis", "Balancear dificuldade", "Testar a experiência do jogador"], skills: ["Design de jogos", "Criatividade", "Prototipação"], workEnvironments: ["Estúdios de jogos"] }),
  profession({ slug: "artista-3d-games", areaId: "games", name: "Artista 3D para Games", summary: "Cria modelos e ambientes tridimensionais para jogos.", dailyActivities: ["Modelar personagens e cenários", "Aplicar texturas e materiais", "Otimizar modelos para o motor de jogo"], skills: ["Modelagem 3D", "Texturização", "Sensibilidade artística"], workEnvironments: ["Estúdios de jogos", "Freelancer"] }),

  // ------------------------------------------------------------------ Esportes
  profession({ slug: "personal-trainer", areaId: "esportes", name: "Personal Trainer", summary: "Planeja treinos individualizados para diferentes objetivos.", dailyActivities: ["Avaliar condicionamento físico", "Montar planos de treino", "Acompanhar evolução do aluno"], skills: ["Fisiologia do exercício", "Didática", "Motivação"], workEnvironments: ["Academias", "Autônomo"] }),
  profession({ slug: "gestor-esportivo", areaId: "esportes", name: "Gestor Esportivo", summary: "Administra clubes, eventos e projetos esportivos.", dailyActivities: ["Planejar eventos esportivos", "Gerenciar patrocínios", "Coordenar equipes"], skills: ["Gestão", "Negociação", "Organização de eventos"], workEnvironments: ["Clubes", "Federações", "Empresas de eventos"] }),

  // -------------------------------------------------------------------- Beleza
  profession({ slug: "cabeleireiro", areaId: "beleza", name: "Cabeleireiro(a)", summary: "Cria cortes, coloração e tratamentos capilares.", dailyActivities: ["Atender clientes", "Executar cortes e coloração", "Recomendar cuidados capilares"], skills: ["Técnicas capilares", "Atendimento", "Tendências de beleza"], workEnvironments: ["Salões de beleza", "Autônomo"] }),
  profession({ slug: "esteticista", areaId: "beleza", name: "Esteticista", summary: "Realiza procedimentos estéticos faciais e corporais.", dailyActivities: ["Avaliar necessidades da pele", "Executar procedimentos estéticos", "Orientar cuidados pós-procedimento"], skills: ["Técnicas estéticas", "Anatomia básica", "Atendimento"], workEnvironments: ["Clínicas de estética", "Autônomo"] }),

  // --------------------------------------------------------------- Agronegócio
  profession({ slug: "tecnico-agricola", areaId: "agronegocio", name: "Técnico Agrícola", summary: "Apoia o planejamento e a execução da produção agrícola.", dailyActivities: ["Monitorar plantio e colheita", "Orientar uso de insumos", "Controlar pragas e doenças"], skills: ["Agronomia básica", "Manejo de solo", "Sustentabilidade"], workEnvironments: ["Fazendas", "Cooperativas"] }),
  profession({ slug: "gestor-do-agronegocio", areaId: "agronegocio", name: "Gestor do Agronegócio", summary: "Administra a produção e os resultados de operações rurais.", dailyActivities: ["Planejar produção", "Controlar custos e resultados", "Negociar com fornecedores e compradores"], skills: ["Gestão rural", "Negociação", "Análise de mercado"], workEnvironments: ["Fazendas", "Cooperativas", "Agroindústrias"] }),

  // ---------------------------------------------------------- Empreendedorismo
  profession({ slug: "empreendedor-digital", areaId: "empreendedorismo", name: "Empreendedor Digital", summary: "Cria e escala negócios com base em produtos ou serviços digitais.", dailyActivities: ["Validar ideias de negócio", "Estruturar oferta e precificação", "Testar canais de aquisição"], skills: ["Validação de negócios", "Marketing digital", "Gestão financeira básica"], workEnvironments: ["Negócio próprio", "Remoto"] }),
  profession({ slug: "consultor-de-negocios", areaId: "empreendedorismo", name: "Consultor de Negócios", summary: "Ajuda empresas a crescer com mais eficiência e estratégia.", dailyActivities: ["Diagnosticar problemas de negócio", "Propor planos de ação", "Acompanhar implementação"], skills: ["Diagnóstico de negócios", "Estratégia", "Comunicação"], workEnvironments: ["Consultorias", "Autônomo"] }),

  // --------------------------------------------------------------------- Idiomas
  profession({ slug: "professor-de-ingles", areaId: "idiomas", name: "Professor de Inglês", summary: "Ensina inglês para diferentes níveis e objetivos.", dailyActivities: ["Planejar aulas", "Corrigir exercícios", "Avaliar fluência dos alunos"], skills: ["Fluência em inglês", "Didática", "Paciência"], workEnvironments: ["Escolas de idiomas", "Autônomo", "Remoto"] }),
  profession({ slug: "tradutor", areaId: "idiomas", name: "Tradutor(a)", summary: "Traduz textos preservando sentido e contexto original.", dailyActivities: ["Traduzir documentos e textos", "Revisar terminologia técnica", "Adaptar tom e contexto cultural"], skills: ["Domínio de idiomas", "Escrita", "Atenção a detalhes"], workEnvironments: ["Autônomo", "Agências de tradução"] }),

  // -------------------------------------------------------------------- Ciência
  profession({ slug: "pesquisador-cientifico", areaId: "ciencia", name: "Pesquisador Científico", summary: "Investiga fenômenos com método científico para gerar conhecimento novo.", dailyActivities: ["Planejar experimentos", "Analisar resultados", "Publicar descobertas"], skills: ["Método científico", "Análise de dados", "Escrita técnica"], workEnvironments: ["Universidades", "Institutos de pesquisa"] }),
  profession({ slug: "divulgador-cientifico", areaId: "ciencia", name: "Divulgador Científico", summary: "Traduz ciência complexa em conteúdo acessível ao público.", dailyActivities: ["Pesquisar temas científicos", "Produzir conteúdo educativo", "Simplificar conceitos complexos"], skills: ["Comunicação", "Curiosidade científica", "Criação de conteúdo"], workEnvironments: ["Mídia", "Autônomo", "Remoto"] }),

  // -------------------------------------------------------------- Meio Ambiente
  profession({ slug: "analista-ambiental", areaId: "meio-ambiente", name: "Analista Ambiental", summary: "Avalia impactos ambientais e propõe soluções sustentáveis.", dailyActivities: ["Realizar diagnósticos ambientais", "Elaborar planos de mitigação", "Acompanhar licenciamentos"], skills: ["Legislação ambiental", "Análise de impacto", "Sustentabilidade"], workEnvironments: ["Consultorias ambientais", "Indústrias", "Órgãos públicos"] }),
  profession({ slug: "gestor-de-sustentabilidade", areaId: "meio-ambiente", name: "Gestor de Sustentabilidade", summary: "Integra práticas sustentáveis à estratégia das organizações.", dailyActivities: ["Definir metas ESG", "Medir impacto socioambiental", "Engajar áreas internas"], skills: ["ESG", "Gestão de projetos", "Comunicação"], workEnvironments: ["Empresas de todos os portes"] }),
];

export function getProfessionBySlug(slug: string) {
  return professions.find((p) => p.slug === slug);
}

export function getProfessionsByArea(areaId: string) {
  return professions.filter((p) => p.areaId === areaId);
}
