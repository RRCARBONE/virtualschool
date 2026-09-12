import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  { id: "rev-1", userId: "demo-1", userName: "Camila R.", careerPathId: "formacao-dev-software", rating: 5, comment: "Consegui entender lógica de programação pela primeira vez. O professor IA explica de um jeito bem simples.", createdAt: "2026-02-10" },
  { id: "rev-2", userId: "demo-2", userName: "Thiago M.", careerPathId: "formacao-dev-software", rating: 5, comment: "Formação bem estruturada, do zero até um projeto de verdade. Recomendo demais.", createdAt: "2026-03-02" },
  { id: "rev-3", userId: "demo-3", userName: "Juliana P.", careerPathId: "formacao-marketing-digital", rating: 4, comment: "Ótimo panorama de marketing digital, senti falta de mais exemplos de campanhas reais.", createdAt: "2026-01-22" },
  { id: "rev-4", userId: "demo-4", userName: "Fernando A.", careerPathId: "formacao-gestao-financeira", rating: 5, comment: "Finalmente entendi a diferença entre fluxo de caixa e lucro. Muito prático.", createdAt: "2026-03-18" },
  { id: "rev-5", userId: "demo-5", userName: "Larissa S.", courseId: "curso-introducao-programacao", rating: 5, comment: "Curso curto mas muito claro. Ótimo primeiro passo antes da formação completa.", createdAt: "2026-02-27" },
];

export function getReviewsFor(target: { courseId?: string; careerPathId?: string }) {
  return reviews.filter(
    (r) =>
      (target.courseId && r.courseId === target.courseId) ||
      (target.careerPathId && r.careerPathId === target.careerPathId)
  );
}

export function averageRating(list: Review[]) {
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}
