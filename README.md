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
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Autenticação real e persistência do progresso/certificados/assinaturas |
| `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL` opcional) | Professores de IA respondendo de verdade e recomendação de profissões |

A chave de IA **nunca** é usada no navegador — só em `src/lib/ai/client.ts`
e nas rotas `src/app/api/ai/*`, que rodam no servidor.

### Conectando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode a migração `supabase/migrations/0001_init.sql` (SQL editor do
   Supabase ou `supabase db push` com a CLI).
3. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Cadastre um usuário e promova-o a admin: `update profiles set role =
   'admin' where id = '<uuid do usuário>';`

O schema já inclui Row Level Security: conteúdo publicado é público para
leitura, escrita restrita a admins, e dados do aluno (progresso,
matrículas, certificados, chat) protegidos por `auth.uid()`.

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
    data/                    repositório de conteúdo (seed + queries)
    supabase/                clientes browser/server + variáveis de ambiente
    ai/client.ts             chamada à API da Anthropic (server-only)
    progress/                progresso do aluno (local em demo, Supabase em produção)
    admin/                   estado do painel admin (local em demo)
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

Novas profissões, formações e professores podem ser adicionados pelo
`/admin` (persistem no Supabase quando configurado) sem alterar código.

## Scripts

```bash
npm run dev     # ambiente de desenvolvimento
npm run build   # build de produção
npm run start   # servidor de produção
npm run lint    # ESLint
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

- Integração de pagamento (Stripe/Mercado Pago/Pix) para os planos
- Upload e hospedagem de vídeo real (Mux/YouTube/Vimeo) — os campos
  `videoUrl`/`videoProvider` já existem no modelo
- Geração de quizzes por IA a partir do conteúdo da aula
- CRUD administrativo completo de módulos/aulas contra o Supabase (hoje o
  admin já gerencia profissões, formações, professores de IA e
  publicação de cursos)
