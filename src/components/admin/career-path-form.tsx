"use client";

import { useState } from "react";
import type { CareerPath } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AdminField, inputClass } from "./drawer";
import { professions } from "@/lib/data/professions";
import { allCourses } from "@/lib/data/catalog";

export function CareerPathForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: CareerPath;
  onSave: (values: Omit<CareerPath, "id">) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "Formação — ");
  const [professionId, setProfessionId] = useState(initial?.professionId ?? professions[0]?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [totalHours, setTotalHours] = useState(initial?.totalHours ?? 4);
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "violet");
  const [courseIds, setCourseIds] = useState<string[]>(initial?.courseIds ?? []);

  function toggleCourse(id: string) {
    setCourseIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          slug: initial?.slug ?? title.toLowerCase().replace(/formação\s*—?\s*/i, "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-"),
          title,
          professionId,
          description,
          coverImage,
          totalHours: Number(totalHours),
          courseIds,
        });
      }}
      className="space-y-4"
    >
      <AdminField label="Título da formação">
        <input required className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
      </AdminField>
      <AdminField label="Profissão relacionada">
        <select className={inputClass} value={professionId} onChange={(e) => setProfessionId(e.target.value)}>
          {professions.map((p) => (
            <option key={p.slug} value={p.id}>{p.name}</option>
          ))}
        </select>
      </AdminField>
      <AdminField label="Descrição">
        <textarea required className={inputClass} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </AdminField>
      <div className="grid grid-cols-2 gap-3">
        <AdminField label="Carga horária (h)">
          <input type="number" min={1} className={inputClass} value={totalHours} onChange={(e) => setTotalHours(Number(e.target.value))} />
        </AdminField>
        <AdminField label="Cor da capa">
          <select className={inputClass} value={coverImage} onChange={(e) => setCoverImage(e.target.value)}>
            {["violet", "indigo", "sky", "amber", "emerald", "rose", "orange"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </AdminField>
      </div>
      <AdminField label="Cursos incluídos na jornada">
        <div className="max-h-48 space-y-1.5 overflow-y-auto rounded-xl border border-border p-3">
          {allCourses.map((course) => (
            <label key={course.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={courseIds.includes(course.id)} onChange={() => toggleCourse(course.id)} />
              {course.title}
            </label>
          ))}
        </div>
      </AdminField>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar formação</Button>
      </div>
    </form>
  );
}
