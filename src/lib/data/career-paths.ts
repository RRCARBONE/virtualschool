import type { CareerPath } from "@/lib/types";

export const careerPaths: CareerPath[] = [
  {
    id: "formacao-dev-software",
    slug: "desenvolvedor-de-software",
    title: "Formação — Desenvolvedor de Software",
    professionId: "desenvolvedor-de-software",
    description:
      "Uma jornada completa da lógica de programação ao seu primeiro projeto de software, passando por front-end, banco de dados e boas práticas de desenvolvimento.",
    coverImage: "violet",
    totalHours: 6,
    courseIds: [
      "curso-introducao-programacao",
      "curso-logica-de-programacao",
      "curso-html-css",
      "curso-javascript",
      "curso-banco-de-dados",
      "curso-desenvolvimento-de-aplicacoes",
      "curso-projeto-final-dev",
    ],
  },
  {
    id: "formacao-marketing-digital",
    slug: "marketing-digital",
    title: "Formação — Marketing Digital",
    professionId: "analista-de-marketing-digital",
    description:
      "Aprenda a planejar, produzir e analisar estratégias de marketing digital, da jornada do cliente ao branding.",
    coverImage: "rose",
    totalHours: 3,
    courseIds: [
      "curso-fundamentos-marketing-digital",
      "curso-redes-sociais-conteudo",
      "curso-trafego-pago-analytics",
      "curso-branding-posicionamento",
    ],
  },
  {
    id: "formacao-gestao-financeira",
    slug: "gestao-financeira",
    title: "Formação — Gestão Financeira",
    professionId: "analista-financeiro",
    description:
      "Domine os fundamentos de finanças, planejamento de caixa e análise de investimentos para tomar decisões mais seguras.",
    coverImage: "emerald",
    totalHours: 2,
    courseIds: [
      "curso-fundamentos-financas",
      "curso-planejamento-fluxo-de-caixa",
      "curso-analise-de-investimentos",
    ],
  },
];

export function getCareerPathBySlug(slug: string) {
  return careerPaths.find((c) => c.slug === slug);
}
