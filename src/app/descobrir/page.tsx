import type { Metadata } from "next";
import { DiscoveryQuiz } from "./discovery-quiz";

export const metadata: Metadata = {
  title: "Descobrir profissão",
  description: "Responda algumas perguntas e descubra áreas e profissões para explorar.",
};

export default function DescobrirPage() {
  return (
    <div className="container-app max-w-3xl py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Não sabe o que quer fazer?</h1>
        <p className="mt-3 text-muted">
          Responda com sinceridade. Não existe resposta certa — o objetivo é te mostrar caminhos
          possíveis para explorar, não uma profissão &quot;perfeita&quot;.
        </p>
      </div>
      <div className="mt-10">
        <DiscoveryQuiz />
      </div>
    </div>
  );
}
