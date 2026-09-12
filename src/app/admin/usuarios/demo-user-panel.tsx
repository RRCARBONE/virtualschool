"use client";

import { useProgress } from "@/lib/progress/use-progress";

export function DemoUserPanel() {
  const state = useProgress();

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <table className="w-full text-sm">
        <thead className="bg-surface-muted text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="p-4">Aluno</th>
            <th className="p-4">Aulas concluídas</th>
            <th className="p-4">Certificados</th>
            <th className="p-4">Plano</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="p-4 font-medium">{state.studentName} (este navegador)</td>
            <td className="p-4">{state.completedLessons.length}</td>
            <td className="p-4">{state.certificates.length}</td>
            <td className="p-4">Gratuito</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
