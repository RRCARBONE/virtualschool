"use client";

import { useState } from "react";
import type { AITeacher } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AdminField, inputClass } from "./drawer";

const empty: Omit<AITeacher, "id"> = {
  slug: "",
  name: "",
  avatar: "🤖",
  title: "",
  specialty: "",
  personality: "",
  explanationStyle: "",
  systemPrompt: "",
};

export function TeacherForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: AITeacher;
  onSave: (values: Omit<AITeacher, "id">) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Omit<AITeacher, "id">>(initial ?? empty);

  function set<K extends keyof Omit<AITeacher, "id">>(key: K, value: Omit<AITeacher, "id">[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...values, slug: values.slug || values.name.toLowerCase().replace(/\s+/g, "-") });
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-[80px_1fr] gap-3">
        <AdminField label="Avatar">
          <input className={inputClass} value={values.avatar} onChange={(e) => set("avatar", e.target.value)} placeholder="🤖" />
        </AdminField>
        <AdminField label="Nome">
          <input required className={inputClass} value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Lucas" />
        </AdminField>
      </div>
      <AdminField label="Título / cargo">
        <input required className={inputClass} value={values.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex: Professor de Programação" />
      </AdminField>
      <AdminField label="Especialidade">
        <input required className={inputClass} value={values.specialty} onChange={(e) => set("specialty", e.target.value)} placeholder="Ex: Desenvolvimento web e lógica" />
      </AdminField>
      <AdminField label="Personalidade">
        <textarea className={inputClass} rows={2} value={values.personality} onChange={(e) => set("personality", e.target.value)} />
      </AdminField>
      <AdminField label="Estilo de explicação">
        <textarea className={inputClass} rows={2} value={values.explanationStyle} onChange={(e) => set("explanationStyle", e.target.value)} />
      </AdminField>
      <AdminField label="Instruções internas (system prompt da IA)">
        <textarea
          className={inputClass}
          rows={4}
          value={values.systemPrompt}
          onChange={(e) => set("systemPrompt", e.target.value)}
          placeholder="Como este professor deve se comportar ao conversar com o aluno..."
        />
      </AdminField>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar professor</Button>
      </div>
    </form>
  );
}
