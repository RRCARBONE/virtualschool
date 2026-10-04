"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/admin/drawer";
import { CareerPathForm } from "@/components/admin/career-path-form";
import { useAllCareerPaths } from "@/lib/admin/use-admin";
import { adminStore } from "@/lib/admin/store";
import type { CareerPath } from "@/lib/types";
import { careerPaths as seedCareerPaths } from "@/lib/data/career-paths";
import { getProfessionById } from "@/lib/data/professions";

export default function AdminCareerPathsPage() {
  const paths = useAllCareerPaths();
  const [editing, setEditing] = useState<CareerPath | "new" | null>(null);

  const isSeed = (id: string) => seedCareerPaths.some((p) => p.id === id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Formações</h1>
          <p className="mt-1 text-muted">Trilhas completas que conectam vários cursos a uma profissão.</p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus className="h-4 w-4" /> Nova formação
        </Button>
      </div>

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface shadow-card">
        {paths.map((path) => {
          const profession = getProfessionById(path.professionId) ?? { name: path.professionId };
          return (
            <div key={path.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{path.title}</p>
                <p className="text-xs text-muted">
                  {profession.name} · {path.courseIds.length} cursos · {path.totalHours}h
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(path)}>
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Button>
                {!isSeed(path.id) && (
                  <Button size="sm" variant="ghost" onClick={() => adminStore.deleteCareerPath(path.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Remover
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Drawer
        open={editing !== null}
        title={editing === "new" ? "Nova formação" : `Editar ${editing ? editing.title : ""}`}
        onClose={() => setEditing(null)}
      >
        <CareerPathForm
          initial={editing && editing !== "new" ? editing : undefined}
          onCancel={() => setEditing(null)}
          onSave={(values) => {
            if (editing && editing !== "new") {
              adminStore.updateCareerPath(editing.id, values);
            } else {
              adminStore.addCareerPath(values);
            }
            setEditing(null);
          }}
        />
      </Drawer>
    </div>
  );
}
