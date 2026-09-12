"use client";

import type { AITeacher, CareerPath, Profession } from "@/lib/types";

/**
 * Estado do painel administrativo em modo demonstração.
 *
 * Sem um projeto Supabase conectado, as ações do admin (criar profissão,
 * publicar curso, cadastrar professor de IA...) ficam salvas no
 * localStorage deste navegador — o suficiente para demonstrar o fluxo
 * completo de CRUD descrito no painel. As tabelas `professions`,
 * `career_paths`, `courses` e `ai_teachers` do schema Supabase (ver
 * supabase/migrations/0001_init.sql) já têm exatamente esses campos, então
 * conectar o Supabase é a próxima etapa natural — sem redesenhar nada.
 */

interface AdminState {
  teachers: AITeacher[];
  professions: Profession[];
  careerPaths: CareerPath[];
  coursePublishOverrides: Record<string, boolean>;
}

const STORAGE_KEY = "aprenda:admin:v1";

function emptyState(): AdminState {
  return { teachers: [], professions: [], careerPaths: [], coursePublishOverrides: {} };
}

function readState(): AdminState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    return emptyState();
  }
}

function writeState(state: AdminState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

let cached = emptyState();
const serverSnapshot = emptyState();
const listeners = new Set<() => void>();

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export const adminStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): AdminState {
    return cached;
  },
  getServerSnapshot(): AdminState {
    return serverSnapshot;
  },
  init() {
    cached = readState();
  },

  // Professores de IA
  addTeacher(teacher: Omit<AITeacher, "id">) {
    cached = readState();
    const newTeacher = { ...teacher, id: uid("teacher") };
    cached.teachers = [...cached.teachers, newTeacher];
    writeState(cached);
    return newTeacher;
  },
  updateTeacher(id: string, patch: Partial<AITeacher>) {
    cached = readState();
    cached.teachers = cached.teachers.map((t) => (t.id === id ? { ...t, ...patch } : t));
    writeState(cached);
  },
  deleteTeacher(id: string) {
    cached = readState();
    cached.teachers = cached.teachers.filter((t) => t.id !== id);
    writeState(cached);
  },

  // Profissões
  addProfession(profession: Omit<Profession, "id">) {
    cached = readState();
    const newProfession = { ...profession, id: uid("profissao") };
    cached.professions = [...cached.professions, newProfession];
    writeState(cached);
    return newProfession;
  },
  updateProfession(id: string, patch: Partial<Profession>) {
    cached = readState();
    cached.professions = cached.professions.map((p) => (p.id === id ? { ...p, ...patch } : p));
    writeState(cached);
  },
  deleteProfession(id: string) {
    cached = readState();
    cached.professions = cached.professions.filter((p) => p.id !== id);
    writeState(cached);
  },

  // Formações
  addCareerPath(path: Omit<CareerPath, "id">) {
    cached = readState();
    const newPath = { ...path, id: uid("formacao") };
    cached.careerPaths = [...cached.careerPaths, newPath];
    writeState(cached);
    return newPath;
  },
  updateCareerPath(id: string, patch: Partial<CareerPath>) {
    cached = readState();
    cached.careerPaths = cached.careerPaths.map((p) => (p.id === id ? { ...p, ...patch } : p));
    writeState(cached);
  },
  deleteCareerPath(id: string) {
    cached = readState();
    cached.careerPaths = cached.careerPaths.filter((p) => p.id !== id);
    writeState(cached);
  },

  // Publicação de cursos
  setCoursePublished(courseId: string, published: boolean) {
    cached = readState();
    cached.coursePublishOverrides = { ...cached.coursePublishOverrides, [courseId]: published };
    writeState(cached);
  },
};

adminStore.init();
