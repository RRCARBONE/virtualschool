"use client";

import type { Certificate } from "@/lib/types";

/**
 * Progresso do aluno em modo demonstração.
 *
 * Sem um projeto Supabase conectado, guardamos o progresso do aluno no
 * localStorage do navegador — o suficiente para navegar pela jornada
 * completa (assistir aula, concluir atividades, tirar certificado) sem
 * exigir backend. As tabelas `enrollments`, `lesson_progress`,
 * `quiz_attempts` e `certificates` do schema Supabase (ver
 * supabase/migrations/0001_init.sql) espelham exatamente esta estrutura,
 * então a troca para dados reais é apenas de camada de persistência.
 */

interface ProgressState {
  completedLessons: string[];
  enrolledCourses: string[];
  enrolledPaths: string[];
  quizAttempts: Record<string, { score: number; passed: boolean; answeredAt: string }>;
  certificates: Certificate[];
  studentName: string;
}

const STORAGE_KEY = "aprenda:progress:v1";

function emptyState(): ProgressState {
  return {
    completedLessons: [],
    enrolledCourses: [],
    enrolledPaths: [],
    quizAttempts: {},
    certificates: [],
    studentName: "Aluno",
  };
}

function readState(): ProgressState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    return emptyState();
  }
}

function writeState(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((listener) => listener());
}

let cached = emptyState();
const serverSnapshot = emptyState();
const listeners = new Set<() => void>();

export const progressStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ProgressState {
    return cached;
  },
  getServerSnapshot(): ProgressState {
    return serverSnapshot;
  },
  init() {
    cached = readState();
  },
  enrollCourse(courseId: string) {
    cached = readState();
    if (!cached.enrolledCourses.includes(courseId)) {
      cached.enrolledCourses = [...cached.enrolledCourses, courseId];
      writeState(cached);
    }
  },
  enrollPath(pathId: string) {
    cached = readState();
    if (!cached.enrolledPaths.includes(pathId)) {
      cached.enrolledPaths = [...cached.enrolledPaths, pathId];
      writeState(cached);
    }
  },
  completeLesson(lessonId: string) {
    cached = readState();
    if (!cached.completedLessons.includes(lessonId)) {
      cached.completedLessons = [...cached.completedLessons, lessonId];
      writeState(cached);
    }
  },
  isLessonCompleted(lessonId: string) {
    return readState().completedLessons.includes(lessonId);
  },
  recordQuizAttempt(quizId: string, score: number, passed: boolean) {
    cached = readState();
    cached.quizAttempts = {
      ...cached.quizAttempts,
      [quizId]: { score, passed, answeredAt: new Date().toISOString() },
    };
    writeState(cached);
  },
  setStudentName(name: string) {
    cached = readState();
    cached.studentName = name;
    writeState(cached);
  },
  issueCertificate(input: { courseId?: string; careerPathId?: string; title: string; hours: number }) {
    cached = readState();
    const existing = cached.certificates.find(
      (c) => (input.courseId && c.courseId === input.courseId) || (input.careerPathId && c.careerPathId === input.careerPathId)
    );
    if (existing) return existing;

    const certificate: Certificate = {
      id: `cert-${Math.random().toString(36).slice(2, 10)}`,
      userId: "demo",
      courseId: input.courseId,
      careerPathId: input.careerPathId,
      studentName: cached.studentName || "Aluno",
      title: input.title,
      issuedAt: new Date().toISOString(),
      verificationCode: Math.random().toString(36).slice(2, 10).toUpperCase(),
      hours: input.hours,
    };
    cached.certificates = [...cached.certificates, certificate];
    writeState(cached);
    return certificate;
  },
  reset() {
    cached = emptyState();
    writeState(cached);
  },
};

progressStore.init();
