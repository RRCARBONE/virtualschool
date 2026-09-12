import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planos",
  description: "Conheça os planos Gratuito e Premium da plataforma Aprenda.",
};

const freeFeatures = [
  { label: "Acesso a aulas de introdução de cada curso", included: true },
  { label: "1 curso completo por vez", included: true },
  { label: "Quizzes de módulo", included: true },
  { label: "Formações completas", included: false },
  { label: "Apostilas completas", included: false },
  { label: "Professores de IA sem limite", included: false },
  { label: "Certificados", included: false },
];

const premiumFeatures = [
  "Todas as formações e cursos, sem limite",
  "Videoaulas completas de todos os módulos",
  "Apostilas completas de cada curso",
  "Atividades, quizzes e avaliações finais",
  "Professores de IA disponíveis 24h por dia",
  "Acompanhamento completo de progresso",
  "Certificados digitais verificáveis",
];

export default function PlanosPage() {
  return (
    <div className="container-app py-14">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Planos simples, para todo mundo aprender</h1>
        <p className="mt-3 text-muted">
          Comece de graça e evolua quando quiser. Sem contratos longos, cancele quando precisar.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-card">
          <h2 className="text-lg font-semibold">Gratuito</h2>
          <p className="mt-1 text-sm text-muted">Para experimentar a plataforma</p>
          <p className="mt-6 text-4xl font-extrabold">R$ 0</p>
          <p className="text-sm text-muted">para sempre</p>
          <LinkButton href="/cadastro" variant="outline" className="mt-6 w-full">
            Começar grátis
          </LinkButton>
          <ul className="mt-8 space-y-3 text-sm">
            {freeFeatures.map((f) => (
              <li key={f.label} className={cn("flex items-start gap-2.5", !f.included && "text-muted")}>
                {f.included ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-border" />
                )}
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-3xl border-2 border-brand bg-surface p-8 shadow-soft">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            Mais popular
          </span>
          <h2 className="text-lg font-semibold">Premium</h2>
          <p className="mt-1 text-sm text-muted">Acesso completo à plataforma</p>
          <p className="mt-6 text-4xl font-extrabold">
            R$ 29,90<span className="text-base font-medium text-muted">/mês</span>
          </p>
          <p className="text-sm text-muted">cancele quando quiser</p>
          <LinkButton href="/cadastro" className="mt-6 w-full">
            Assinar Premium
          </LinkButton>
          <ul className="mt-8 space-y-3 text-sm">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-lg text-center text-xs text-muted">
        Em breve: planos anuais com desconto e o plano de entrada por R$ 19,90/mês. A plataforma já está
        preparada para integração com meios de pagamento (Stripe, Mercado Pago e Pix).
      </p>
    </div>
  );
}
