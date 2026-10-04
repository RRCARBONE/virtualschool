# Aprenda — plataforma de educação online com IA

Escola digital acessível (mensalidade a partir de R$ 19,90–29,90) onde cada
formação combina professor virtual de IA, videoaulas, apostila, atividades,
quizzes, avaliações e certificado — construída para escalar a centenas de
profissões e milhares de cursos.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth) — schema completo em `supabase/migrations/0001_init.sql`
- **Anthropic API** para os professores de IA (chat) e o quiz "Descobrir profissão", chamada apenas no servidor

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. **A plataforma funciona imediatamente sem
nenhuma configuração**: sem Supabase e sem chave de IA configurados, ela
roda em **modo demonstração**:

- o catálogo (áreas, profissões, formações, cursos, aulas, apostilas,
  atividades, quizzes, professores de IA) vem do seed em `src/lib/data`;
- o progresso do aluno (aulas concluídas, quizzes, certificados) é salvo no
  `localStorage` do navegador (`src/lib/progress`);
- login/cadastro simulam a sessão sem persistência real;
- o chat com o professor IA e o quiz vocacional respondem com um fallback
  local explicando o modo demonstração.

Para ligar os dados e a IA de verdade, copie `.env.example` para `.env.local`
e preencha:

```bash
cp .env.example .env.local
```

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Autenticação real e catálogo público lido do banco |
| `SUPABASE_SERVICE_ROLE_KEY` | Só para `npm run db:seed` (nunca usada pelo app) |
| `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL` opcional) | Professores de IA respondendo de verdade e recomendação de profissões |

A chave de IA **nunca** é usada no navegador — só em `src/lib/ai/client.ts`
e nas rotas `src/app/api/ai/*`, que rodam no servidor.

### Conectando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode a migração `supabase/migrations/0001_init.sql` (SQL editor do
   Supabase ou `supabase db push` com a CLI).
3. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (localmente em `.env.local`, e nas variáveis de ambiente do seu deploy).
4. Popule o banco com o conteúdo seed (áreas, profissões, formações,
   cursos, aulas, apostilas, atividades, quizzes, professores de IA):
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=<service_role> npm run db:seed
   ```
   A chave `service_role` (Project Settings → API) só é usada por esse
   script, para contornar as políticas de RLS neste carregamento em lote —
   o app em si nunca a utiliza. O script é idempotente: pode ser rodado de
   novo após editar o conteúdo em `src/lib/data`.
5. Cadastre um usuário pelo `/cadastro` e promova-o a admin:
   ```sql
   update profiles set role = 'admin' where id = '<uuid do usuário>';
   ```

O schema já inclui Row Level Security: conteúdo publicado é público para
leitura, escrita restrita a admins, e dados do aluno (progresso,
matrículas, certificados, chat) protegidos por `auth.uid()`.

**O que já lê do Supabase quando configurado:** todo o catálogo público —
home, áreas, profissões, formações, cursos, aulas, apostilas, atividades e
quizzes (`src/lib/data/index.ts`, com fallback automático para o seed local
se o Supabase não tiver dados ou não estiver configurado).

**O que ainda é local/demonstração mesmo com o Supabase conectado:**
o painel `/admin` (cria/edita no `localStorage` do navegador, não no
banco — ver `src/lib/admin`) e o progresso do aluno (`src/lib/progress`,
também local). Ver "Próximos passos" abaixo.

## Arquitetura

```
src/
  app/                      rotas (App Router)
    page.tsx                home
    profissoes/[area]/[profissao]      área → profissão → formação
    descobrir/              quiz vocacional (IA)
    formacoes/[formacao]/   jornada da formação completa
    cursos/[curso]/         visão geral do curso
      aulas/[aula]/         player de videoaula + chat IA
      apostila/             material didático
      atividades/[id]/      atividades por aula
      quiz/[id]/            quiz de módulo / avaliação final
    dashboard/              área do aluno
    certificados/[id]/      certificado digital
    planos/                 gratuito x premium
    login | cadastro | recuperar-senha
    admin/                  painel administrativo (profissões, formações,
                             cursos, professores de IA, usuários)
    api/ai/chat, api/ai/discover      rotas server-side de IA
  components/               UI, catálogo, curso, admin, auth (reutilizáveis)
  lib/
    types.ts                modelo de domínio (espelha o schema SQL)
    data/
      index.ts               repositório async: Supabase primeiro, fallback para o seed local
      catalog.ts              versões síncronas (só local) usadas por client components
      areas.ts, professions.ts, career-paths.ts, ai-teachers.ts, courses/*.ts   seed local
    supabase/
      server.ts, client.ts    clientes Supabase (Server Components / navegador)
      mappers.ts               converte linhas do Supabase (snake_case) para os tipos do app
    ai/client.ts             chamada à API da Anthropic (server-only)
    progress/                progresso do aluno (local, ver "Próximos passos")
    admin/                   estado do painel admin (local, ver "Próximos passos")
scripts/seed-supabase.ts      popula as tabelas do Supabase a partir do seed local
supabase/migrations/0001_init.sql   schema relacional completo + RLS
```

### Modelo de dados

`Users → Categories (áreas) → Professions → CareerPaths (formações) →
Courses → Modules → Lessons → Materials/Activities/Quizzes`, mais
`Enrollments`, `Progress`, `Certificates`, `Subscriptions`, `Reviews` e
`AITeachers`. Ver `supabase/migrations/0001_init.sql` para o schema
relacional completo com RLS, e `src/lib/types.ts` para os tipos usados em
todo o app — os dois espelham exatamente a mesma forma, então trocar o
seed local pelo Supabase é uma troca de camada de dados, não de modelo.

### Conteúdo incluído no seed

- 27 áreas e ~60 profissões distribuídas entre elas
- 3 formações completas: **Desenvolvedor de Software** (7 cursos, do
  "O que é programar" ao projeto final), **Marketing Digital** (4 cursos) e
  **Gestão Financeira** (3 cursos) — cada curso com módulos, aulas,
  apostila, atividades e avaliação final
- 6 professores de IA com personalidade e especialidade próprias

Esse seed vira a fonte real de conteúdo assim que você roda `npm run
db:seed` contra o seu projeto Supabase — editar os arquivos em
`src/lib/data` e rodar o seed de novo é, hoje, a forma de adicionar
conteúdo novo (o CRUD do `/admin` ainda não escreve no banco — ver acima).

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # ESLint
npm run db:seed  # popula o Supabase com o conteúdo de src/lib/data (requer SUPABASE_SERVICE_ROLE_KEY)
```

## Segurança

- Chaves de IA e segredos ficam só em variáveis de ambiente do servidor —
  nunca em código enviado ao navegador.
- RLS no Supabase separa conteúdo público (leitura livre) de dados do
  aluno (protegidos por `auth.uid()`) e de escrita administrativa
  (restrita a `role = 'admin'`).
- Todo o conteúdo do seed (apostilas, aulas, exercícios) foi escrito
  originalmente para esta plataforma.

## Próximos passos sugeridos

- **Painel `/admin` escrevendo no Supabase**: hoje ele lê o catálogo local
  (`src/lib/data`) e salva criações/edições no `localStorage` do navegador
  (`src/lib/admin`) — como o usuário logado já tem `role = 'admin'`, dá
  para trocar essas chamadas por `insert`/`update`/`delete` via
  `src/lib/supabase/client.ts` (as policies de RLS já permitem).
- **Progresso do aluno no Supabase**: aulas concluídas, matrículas,
  tentativas de quiz e certificados (`src/lib/progress`) ainda vivem no
  `localStorage` — as tabelas `enrollments`, `lesson_progress`,
  `quiz_attempts` e `certificates` já existem no schema para receber isso.
- Integração de pagamento (Stripe/Mercado Pago/Pix) para os planos
- Upload e hospedagem de vídeo real (Mux/YouTube/Vimeo) — os campos
  `videoUrl`/`videoProvider` já existem no modelo
- Geração de quizzes por IA a partir do conteúdo da aula
