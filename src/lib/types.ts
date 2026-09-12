// Modelo de domínio da plataforma. Espelha o schema relacional em
// supabase/migrations/0001_init.sql — esta é a "forma" dos dados, seja a
// origem o Supabase (produção) ou o seed local em src/lib/data (demonstração).

export type Level = "iniciante" | "intermediario" | "avancado";

export type PlanTier = "gratuito" | "premium";

export interface Area {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // nome do ícone (lucide-react)
  colorFrom: string;
  colorTo: string;
}

export interface Profession {
  id: string;
  slug: string;
  areaId: string;
  name: string;
  summary: string;
  dailyActivities: string[];
  skills: string[];
  averageSalaryRange?: string;
  workEnvironments: string[];
  formationIds: string[];
}

export interface AITeacher {
  id: string;
  slug: string;
  name: string;
  avatar: string; // emoji ou url
  title: string; // ex: "Professor de Programação"
  specialty: string;
  personality: string; // descrição da personalidade profissional
  explanationStyle: string;
  systemPrompt: string; // instruções internas usadas na API de IA (nunca exposto ao aluno)
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string; // ex: "Formação — Desenvolvedor de Software"
  professionId: string;
  description: string;
  coverImage: string;
  totalHours: number;
  courseIds: string[]; // ordem define a jornada
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  areaId: string;
  aiTeacherId: string;
  level: Level;
  durationMinutes: number;
  published: boolean;
  moduleIds: string[];
  finalAssessmentId?: string;
  tags: string[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  summary: string;
  lessonIds: string[];
  quizId?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  durationMinutes: number;
  videoUrl?: string; // preparado para serviço de vídeo externo
  videoProvider?: "mux" | "youtube" | "vimeo" | "placeholder";
  transcript?: string;
  objectives: string[];
  materialId?: string; // apostila do curso (compartilhada) - referência ao capítulo
  chapterRef?: string; // id do capítulo da apostila relacionado à aula
  activityIds: string[];
}

export interface MaterialChapter {
  id: string;
  order: number;
  title: string;
  content: string; // markdown simplificado
  examples?: string[];
  summary?: string;
  exerciseIds: string[];
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  cover: string;
  chapters: MaterialChapter[];
}

export type ActivityType =
  | "multipla_escolha"
  | "verdadeiro_falso"
  | "aberta"
  | "pratica"
  | "desafio"
  | "estudo_de_caso";

export interface ActivityOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface Activity {
  id: string;
  lessonId?: string;
  title: string;
  type: ActivityType;
  prompt: string;
  options?: ActivityOption[];
  correctExplanation?: string;
  expectedPoints?: string[]; // guia de correção para perguntas abertas/práticas
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: ActivityOption[];
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId?: string;
  courseId?: string;
  title: string;
  kind: "modulo" | "avaliacao_final";
  passingScore: number; // percentual
  questions: QuizQuestion[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId?: string;
  careerPathId?: string;
  startedAt: string;
  status: "em_andamento" | "concluido" | "trancado";
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  watchedSeconds?: number;
}

export interface QuizAttempt {
  userId: string;
  quizId: string;
  score: number;
  passed: boolean;
  answeredAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId?: string;
  careerPathId?: string;
  studentName: string;
  title: string;
  issuedAt: string;
  verificationCode: string;
  hours: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanTier;
  status: "ativa" | "cancelada" | "trial";
  price: number;
  renewsAt?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  courseId?: string;
  careerPathId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: PlanTier;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

// ---- Descobrir profissão ----
export interface DiscoveryAnswer {
  questionId: string;
  choiceIds: string[];
}

export interface DiscoveryResult {
  areaSlug: string;
  professionSlug?: string;
  reason: string;
  matchStrength: "alta" | "media" | "exploratoria";
}
