"use client";

import { useState } from "react";
import type { Profession } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AdminField, inputClass } from "./drawer";
import { areas } from "@/lib/data";

type FormValues = Omit<Profession, "id" | "formationIds"> & { formationIds?: string[] };

function toList(text: string) {
  return text.split(",").map((s) => s.trim()).filter(Boolean);
}

export function ProfessionForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Profession;
  onSave: (values: Omit<Profession, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [areaId, setAreaId] = useState(initial?.areaId ?? areas[0].id);
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [dailyActivities, setDailyActivities] = useState(initial?.dailyActivities.join(", ") ?? "");
  const [skills, setSkills] = useState(initial?.skills.join(", ") ?? "");
  const [workEnvironments, setWorkEnvironments] = useState(initial?.workEnvironments.join(", ") ?? "");
  const [averageSalaryRange, setAverageSalaryRange] = useState(initial?.averageSalaryRange ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const values: FormValues = {
          slug: initial?.slug ?? name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-"),
          areaId,
          name,
          summary,
          dailyActivities: toList(dailyActivities),
          skills: toList(skills),
          workEnvironments: toList(workEnvironments),
          averageSalaryRange: averageSalaryRange || undefined,
          formationIds: initial?.formationIds ?? [],
        };
        onSave(values as Omit<Profession, "id">);
      }}
      className="space-y-4"
    >
      <AdminField label="Nome da profissão">
        <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Analista de Dados" />
      </AdminField>
      <AdminField label="Área">
        <select className={inputClass} value={areaId} onChange={(e) => setAreaId(e.target.value)}>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </AdminField>
      <AdminField label="Resumo">
        <textarea required className={inputClass} rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
      </AdminField>
      <AdminField label="Atividades do dia a dia (separadas por vírgula)">
        <textarea className={inputClass} rows={2} value={dailyActivities} onChange={(e) => setDailyActivities(e.target.value)} />
      </AdminField>
      <AdminField label="Habilidades (separadas por vírgula)">
        <input className={inputClass} value={skills} onChange={(e) => setSkills(e.target.value)} />
      </AdminField>
      <AdminField label="Ambientes de trabalho (separados por vírgula)">
        <input className={inputClass} value={workEnvironments} onChange={(e) => setWorkEnvironments(e.target.value)} />
      </AdminField>
      <AdminField label="Faixa salarial de referência (opcional)">
        <input className={inputClass} value={averageSalaryRange} onChange={(e) => setAverageSalaryRange(e.target.value)} placeholder="R$ 3.000 – R$ 9.000" />
      </AdminField>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar profissão</Button>
      </div>
    </form>
  );
}
