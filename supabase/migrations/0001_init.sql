-- ============================================================================
-- Aprenda — schema inicial da plataforma
-- Escola digital com professores de IA: profissões, formações, cursos,
-- aulas, apostilas, atividades, quizzes, certificados e assinaturas.
--
-- Convenções:
--   * chaves primárias em uuid (default gen_random_uuid())
--   * slugs únicos para URLs amigáveis (/profissoes/[area]/[profissao] etc.)
--   * "order_index" define a ordem de exibição dentro do pai (módulo, curso...)
--   * RLS habilitado em todas as tabelas; conteúdo publicado é público para
--     leitura, escrita restrita a admins; dados do próprio aluno protegidos
--     por auth.uid().
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Perfis e papéis
-- ---------------------------------------------------------------------------
create type user_role as enum ('aluno', 'admin');
create type plan_tier as enum ('gratuito', 'premium');
create type subscription_status as enum ('ativa', 'cancelada', 'trial');
create type enrollment_status as enum ('em_andamento', 'concluido', 'trancado');
create type activity_type as enum (
  'multipla_escolha', 'verdadeiro_falso', 'aberta', 'pratica', 'desafio', 'estudo_de_caso'
);
create type quiz_kind as enum ('modulo', 'avaliacao_final');
create type level_kind as enum ('iniciante', 'intermediario', 'avancado');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  avatar_url text,
  role user_role not null default 'aluno',
  plan plan_tier not null default 'gratuito',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Taxonomia: áreas -> profissões -> formações (trilhas) -> cursos
-- ---------------------------------------------------------------------------
create table categories ( -- "áreas" (Tecnologia, Saúde, Marketing...)
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  icon text not null default 'sparkles',
  color_from text not null default '#5b3df0',
  color_to text not null default '#16c793',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table professions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id uuid not null references categories (id) on delete cascade,
  name text not null,
  summary text not null default '',
  daily_activities jsonb not null default '[]',
  skills jsonb not null default '[]',
  average_salary_range text,
  work_environments jsonb not null default '[]',
  created_at timestamptz not null default now()
);
create index professions_category_idx on professions (category_id);

create table career_paths ( -- "formações": trilha completa para uma profissão
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  profession_id uuid not null references professions (id) on delete cascade,
  title text not null,
  description text not null default '',
  cover_image text,
  total_hours numeric not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create index career_paths_profession_idx on career_paths (profession_id);

-- ---------------------------------------------------------------------------
-- Professores de IA
-- ---------------------------------------------------------------------------
create table ai_teachers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  avatar text not null default '🤖',
  title text not null,
  specialty text not null,
  personality text not null default '',
  explanation_style text not null default '',
  system_prompt text not null default '', -- nunca exposto ao cliente
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Cursos, módulos e aulas
-- ---------------------------------------------------------------------------
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id uuid not null references categories (id) on delete restrict,
  ai_teacher_id uuid references ai_teachers (id) on delete set null,
  title text not null,
  description text not null default '',
  cover text,
  level level_kind not null default 'iniciante',
  duration_minutes int not null default 0,
  published boolean not null default false,
  tags jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index courses_category_idx on courses (category_id);

-- N:N entre formação e cursos, preservando a ordem da jornada
create table career_path_courses (
  career_path_id uuid not null references career_paths (id) on delete cascade,
  course_id uuid not null references courses (id) on delete cascade,
  order_index int not null default 0,
  primary key (career_path_id, course_id)
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  order_index int not null default 0,
  title text not null,
  summary text not null default '',
  created_at timestamptz not null default now()
);
create index modules_course_idx on modules (course_id);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules (id) on delete cascade,
  order_index int not null default 0,
  title text not null,
  duration_minutes int not null default 0,
  video_url text,
  video_provider text default 'placeholder', -- mux | youtube | vimeo | placeholder
  transcript text,
  objectives jsonb not null default '[]',
  chapter_ref uuid, -- referência opcional a material_chapters(id)
  created_at timestamptz not null default now()
);
create index lessons_module_idx on lessons (module_id);

-- ---------------------------------------------------------------------------
-- Apostilas (material didático por curso)
-- ---------------------------------------------------------------------------
create table course_materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  title text not null,
  cover text,
  created_at timestamptz not null default now()
);

create table material_chapters (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references course_materials (id) on delete cascade,
  order_index int not null default 0,
  title text not null,
  content text not null default '',
  examples jsonb not null default '[]',
  summary text,
  created_at timestamptz not null default now()
);
create index material_chapters_material_idx on material_chapters (material_id);

alter table lessons
  add constraint lessons_chapter_ref_fkey
  foreign key (chapter_ref) references material_chapters (id) on delete set null;

-- ---------------------------------------------------------------------------
-- Atividades, quizzes e questões
-- ---------------------------------------------------------------------------
create table activities (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons (id) on delete cascade,
  chapter_id uuid references material_chapters (id) on delete cascade,
  title text not null,
  type activity_type not null,
  prompt text not null,
  options jsonb not null default '[]', -- [{id, text, correct}]
  correct_explanation text,
  expected_points jsonb not null default '[]',
  created_at timestamptz not null default now()
);
create index activities_lesson_idx on activities (lesson_id);

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules (id) on delete cascade,
  course_id uuid references courses (id) on delete cascade, -- avaliação final
  title text not null,
  kind quiz_kind not null default 'modulo',
  passing_score int not null default 70,
  created_at timestamptz not null default now(),
  check (module_id is not null or course_id is not null)
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes (id) on delete cascade,
  order_index int not null default 0,
  prompt text not null,
  explanation text not null default ''
);

create table answers ( -- opções de cada questão do quiz
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions (id) on delete cascade,
  order_index int not null default 0,
  text text not null,
  correct boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Matrícula, progresso, tentativas, certificados, assinaturas, avaliações
-- ---------------------------------------------------------------------------
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  course_id uuid references courses (id) on delete cascade,
  career_path_id uuid references career_paths (id) on delete cascade,
  status enrollment_status not null default 'em_andamento',
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (course_id is not null or career_path_id is not null)
);
create unique index enrollments_unique_course on enrollments (user_id, course_id) where course_id is not null;
create unique index enrollments_unique_path on enrollments (user_id, career_path_id) where career_path_id is not null;

create table lesson_progress (
  user_id uuid not null references profiles (id) on delete cascade,
  lesson_id uuid not null references lessons (id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  watched_seconds int not null default 0,
  primary key (user_id, lesson_id)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  quiz_id uuid not null references quizzes (id) on delete cascade,
  score int not null,
  passed boolean not null,
  answered_at timestamptz not null default now()
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  course_id uuid references courses (id) on delete set null,
  career_path_id uuid references career_paths (id) on delete set null,
  title text not null,
  issued_at timestamptz not null default now(),
  verification_code text unique not null,
  hours numeric not null default 0
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  plan plan_tier not null default 'gratuito',
  status subscription_status not null default 'trial',
  price numeric not null default 0,
  renews_at timestamptz,
  provider text, -- ex: stripe, mercadopago (integração futura)
  provider_customer_id text,
  created_at timestamptz not null default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  course_id uuid references courses (id) on delete cascade,
  career_path_id uuid references career_paths (id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- Histórico de conversas com o professor IA (auditoria + continuidade do chat)
create table ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  course_id uuid references courses (id) on delete cascade,
  lesson_id uuid references lessons (id) on delete cascade,
  ai_teacher_id uuid references ai_teachers (id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index ai_chat_messages_user_idx on ai_chat_messages (user_id, course_id, created_at);

-- Respostas do questionário "Descobrir profissão"
create table discovery_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles (id) on delete set null,
  answers jsonb not null default '[]',
  result jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table categories enable row level security;
alter table professions enable row level security;
alter table career_paths enable row level security;
alter table career_path_courses enable row level security;
alter table ai_teachers enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table course_materials enable row level security;
alter table material_chapters enable row level security;
alter table activities enable row level security;
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table answers enable row level security;
alter table enrollments enable row level security;
alter table lesson_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table certificates enable row level security;
alter table subscriptions enable row level security;
alter table reviews enable row level security;
alter table ai_chat_messages enable row level security;
alter table discovery_sessions enable row level security;

create function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Conteúdo público (leitura livre do que está publicado; admins leem/escrevem tudo)
create policy "categories_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

create policy "professions_read" on professions for select using (true);
create policy "professions_admin_write" on professions for all using (is_admin()) with check (is_admin());

create policy "career_paths_read" on career_paths for select using (published or is_admin());
create policy "career_paths_admin_write" on career_paths for all using (is_admin()) with check (is_admin());

create policy "career_path_courses_read" on career_path_courses for select using (true);
create policy "career_path_courses_admin_write" on career_path_courses for all using (is_admin()) with check (is_admin());

create policy "ai_teachers_read" on ai_teachers for select using (true);
create policy "ai_teachers_admin_write" on ai_teachers for all using (is_admin()) with check (is_admin());

create policy "courses_read" on courses for select using (published or is_admin());
create policy "courses_admin_write" on courses for all using (is_admin()) with check (is_admin());

create policy "modules_read" on modules for select using (true);
create policy "modules_admin_write" on modules for all using (is_admin()) with check (is_admin());

create policy "lessons_read" on lessons for select using (true);
create policy "lessons_admin_write" on lessons for all using (is_admin()) with check (is_admin());

create policy "materials_read" on course_materials for select using (true);
create policy "materials_admin_write" on course_materials for all using (is_admin()) with check (is_admin());

create policy "chapters_read" on material_chapters for select using (true);
create policy "chapters_admin_write" on material_chapters for all using (is_admin()) with check (is_admin());

create policy "activities_read" on activities for select using (true);
create policy "activities_admin_write" on activities for all using (is_admin()) with check (is_admin());

create policy "quizzes_read" on quizzes for select using (true);
create policy "quizzes_admin_write" on quizzes for all using (is_admin()) with check (is_admin());

create policy "questions_read" on questions for select using (true);
create policy "questions_admin_write" on questions for all using (is_admin()) with check (is_admin());

create policy "answers_read" on answers for select using (true);
create policy "answers_admin_write" on answers for all using (is_admin()) with check (is_admin());

-- Dados do próprio usuário
create policy "profiles_self_read" on profiles for select using (auth.uid() = id or is_admin());
create policy "profiles_self_update" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_self_insert" on profiles for insert with check (auth.uid() = id);

create policy "enrollments_self" on enrollments for all
  using (auth.uid() = user_id or is_admin()) with check (auth.uid() = user_id or is_admin());

create policy "lesson_progress_self" on lesson_progress for all
  using (auth.uid() = user_id or is_admin()) with check (auth.uid() = user_id or is_admin());

create policy "quiz_attempts_self" on quiz_attempts for all
  using (auth.uid() = user_id or is_admin()) with check (auth.uid() = user_id or is_admin());

create policy "certificates_self_read" on certificates for select using (auth.uid() = user_id or is_admin());
create policy "certificates_admin_write" on certificates for insert with check (is_admin() or auth.uid() = user_id);

create policy "subscriptions_self" on subscriptions for select using (auth.uid() = user_id or is_admin());
create policy "subscriptions_admin_write" on subscriptions for all using (is_admin()) with check (is_admin());

create policy "reviews_read" on reviews for select using (true);
create policy "reviews_self_write" on reviews for insert with check (auth.uid() = user_id);
create policy "reviews_self_update" on reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ai_chat_self" on ai_chat_messages for all
  using (auth.uid() = user_id or is_admin()) with check (auth.uid() = user_id or is_admin());

create policy "discovery_self" on discovery_sessions for all
  using (auth.uid() = user_id or user_id is null or is_admin())
  with check (auth.uid() = user_id or user_id is null);

-- ---------------------------------------------------------------------------
-- Perfil automático ao criar usuário no Supabase Auth
-- ---------------------------------------------------------------------------
create function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, name, role, plan)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)), 'aluno', 'gratuito');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
