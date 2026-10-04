"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/admin/drawer";
import { TeacherForm } from "@/components/admin/teacher-form";
import { useAllTeachers } from "@/lib/admin/use-admin";
import { adminStore } from "@/lib/admin/store";
import type { AITeacher } from "@/lib/types";
import { aiTeachers as seedTeachers } from "@/lib/data/ai-teachers";

export default function AdminTeachersPage() {
  const teachers = useAllTeachers();
  const [editing, setEditing] = useState<AITeacher | "new" | null>(null);

  const isSeed = (id: string) => seedTeachers.some((t) => t.id === id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Professores de IA</h1>
          <p className="mt-1 text-muted">Defina nome, avatar, especialidade e instruções de cada professor virtual.</p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus className="h-4 w-4" /> Novo professor
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-2xl">{teacher.avatar}</span>
              <div>
                <p className="font-semibold">{teacher.name}</p>
                <p className="text-xs text-muted">{teacher.title}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted">{teacher.specialty}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditing(teacher)}>
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Button>
              {!isSeed(teacher.id) && (
                <Button size="sm" variant="ghost" onClick={() => adminStore.deleteTeacher(teacher.id)}>
                  <Trash2 className="h-3.5 w-3.5" /> Remover
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Drawer
        open={editing !== null}
        title={editing === "new" ? "Novo professor de IA" : `Editar ${editing ? editing.name : ""}`}
        onClose={() => setEditing(null)}
      >
        <TeacherForm
          initial={editing && editing !== "new" ? editing : undefined}
          onCancel={() => setEditing(null)}
          onSave={(values) => {
            if (editing && editing !== "new") {
              adminStore.updateTeacher(editing.id, values);
            } else {
              adminStore.addTeacher(values);
            }
            setEditing(null);
          }}
        />
      </Drawer>
    </div>
  );
}
