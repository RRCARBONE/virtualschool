import Link from "next/link";
import { ArrowRight, Bot, Compass, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { AreaCard } from "@/components/catalog/area-card";
import { CareerPathCard } from "@/components/catalog/career-path-card";
import { LinkButton } from "@/components/ui/button";
import { RatingStars } from "@/components/rating-stars";
import { areas, careerPaths, reviews, averageRating } from "@/lib/data";

export default function Home() {
  const featuredAreas = areas.slice(0, 12);
  const overallRating = averageRating(reviews);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-light/60 to-background">
        <div className="container-app grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Ensino com professores de IA
            </span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Aprenda. Desenvolva habilidades.
              <br />
              Construa seu futuro.
            </h1>
            <p className="mt-4 max-w-lg text-balance text-lg text-muted">
              Cursos, formações e professores de IA por um preço acessível.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/cadastro" size="lg">
                Começar agora <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/profissoes" variant="outline" size="lg">
                Explorar profissões
              </LinkButton>
            </div>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/20 to-accent/20 blur-2xl" />
            <div className="relative flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-3 rounded-2xl bg-surface-muted p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-xl text-white">
                  👨‍💻
                </span>
                <div>
                  <p className="text-sm font-semibold">Professor Lucas</p>
                  <p className="text-xs text-muted">Professor de Programação</p>
                </div>
              </div>
              <div className="rounded-2xl bg-brand-light p-4 text-sm">
                Aluno: <span className="text-muted">&quot;Não entendi por que preciso de um loop aqui...&quot;</span>
              </div>
              <div className="rounded-2xl bg-surface-muted p-4 text-sm">
                <span className="font-semibold">Lucas: </span>
                Vamos com calma! Um loop serve para repetir uma tarefa sem copiar o mesmo código várias vezes. Quer ver um exemplo com a sua lista de tarefas?
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Aula 3 de 7 · Introdução à Programação</span>
                <span className="font-semibold text-accent">62% concluído</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorar por área */}
      <section className="container-app py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Explore por área</h2>
            <p className="mt-1 text-muted">Centenas de profissões organizadas para você descobrir o próximo passo.</p>
          </div>
          <Link href="/profissoes" className="hidden shrink-0 text-sm font-semibold text-brand hover:underline sm:block">
            Ver todas as áreas
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredAreas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
        <Link href="/profissoes" className="mt-6 block text-center text-sm font-semibold text-brand hover:underline sm:hidden">
          Ver todas as áreas
        </Link>
      </section>

      {/* Descobrir profissão */}
      <section className="border-y border-border bg-surface-muted">
        <div className="container-app flex flex-col items-center gap-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white">
            <Compass className="h-7 w-7" />
          </span>
          <h2 className="max-w-xl text-balance text-2xl font-bold sm:text-3xl">Não sabe qual profissão escolher?</h2>
          <p className="max-w-lg text-muted">
            Responda algumas perguntas rápidas sobre seus interesses e descubra áreas e profissões para explorar.
          </p>
          <LinkButton href="/descobrir" size="lg" variant="accent">
            Descobrir minha profissão <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </section>

      {/* Formações completas */}
      <section className="container-app py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Formações completas</h2>
            <p className="mt-1 text-muted">Trilhas de ponta a ponta para se tornar um profissional em uma área.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careerPaths.map((path) => (
            <CareerPathCard key={path.id} path={path} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-border bg-surface-muted">
        <div className="container-app py-16">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Uma escola digital completa</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Compass, title: "1. Descubra", text: "Explore áreas e profissões ou descubra novas possibilidades com nosso quiz vocacional." },
              { icon: Bot, title: "2. Aprenda com IA", text: "Videoaulas, apostilas, atividades e um professor de IA disponível para tirar dúvidas a qualquer momento." },
              { icon: Sparkles, title: "3. Conquiste", text: "Acompanhe seu progresso, conclua formações e receba certificados digitais verificáveis." },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface p-6 text-center shadow-card">
                <step.icon className="mx-auto h-8 w-8 text-brand" />
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="container-app py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <RatingStars rating={overallRating} className="scale-125" />
          <p className="text-sm text-muted">Avaliação média dos nossos alunos</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <RatingStars rating={review.rating} />
              <p className="mt-3 text-sm text-muted">&quot;{review.comment}&quot;</p>
              <p className="mt-3 text-sm font-semibold">{review.userName}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final / planos */}
      <section className="border-t border-border bg-gradient-to-br from-brand to-accent">
        <div className="container-app flex flex-col items-center gap-4 py-16 text-center text-white">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">
            Menos de R$ 1 por dia para aprender sem limites
          </h2>
          <p className="max-w-lg text-white/90">
            Acesso a formações completas, professores de IA e certificados por a partir de R$ 19,90/mês.
          </p>
          <LinkButton href="/planos" size="lg" variant="secondary" className="!text-brand-dark">
            Ver planos <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
