"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { Drawer } from "@/components/admin/drawer";
import { ProfessionForm } from "@/components/admin/profession-form";
import { useAllProfessions } from "@/lib/admin/use-admin";
import { adminStore } from "@/lib/admin/store";
import type { Profession } from "@/lib/types";
import { areas } from "@/lib/data/areas";
import { professions as seedProfessions } from "@/lib/data/professions";

export default function AdminProfessionsPage() {
  const professions = useAllProfessions();
  const [editing, setEditing] = useState<Profession | "new" | null>(null);
  const [filterArea, setFilterArea] = useState("todas");

  const isSeed = (id: string) => seedProfessions.some((p) => p.id === id);

  const filtered = useMemo(
    () => (filterArea === "todas" ? professions : professions.filter((p) => p.areaId === filterArea)),
    [professions, filterArea]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Profissões</h1>
          <p className="mt-1 text-muted">{professions.length} profissões cadastradas em {areas.length} áreas.</p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus className="h-4 w-4" /> Nova profissão
        </Button>
      </div>

      <select
        value={filterArea}
        onChange={(e) => setFilterArea(e.target.value)}
        className="mt-6 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm"
      >
        <option value="todas">Todas as áreas</option>
        {areas.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface shadow-card">
        {filtered.map((profession) => {
          const area = areas.find((a) => a.id === profession.areaId);
          return (
            <div key={profession.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{profession.name}</p>
                  {profession.formationIds.length > 0 && (
                    <Badge variant="accent"><GraduationCap className="h-3 w-3" /> Formação</Badge>
                  )}
                </div>
                <p className="text-xs text-muted">{area?.name} · {profession.summary}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(profession)}>
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Button>
                {!isSeed(profession.id) && (
                  <Button size="sm" variant="ghost" onClick={() => adminStore.deleteProfession(profession.id)}>
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
        title={editing === "new" ? "Nova profissão" : `Editar ${editing ? editing.name : ""}`}
        onClose={() => setEditing(null)}
      >
        <ProfessionForm
          initial={editing && editing !== "new" ? editing : undefined}
          onCancel={() => setEditing(null)}
          onSave={(values) => {
            if (editing && editing !== "new") {
              adminStore.updateProfession(editing.id, values);
            } else {
              adminStore.addProfession(values);
            }
            setEditing(null);
          }}
        />
      </Drawer>
    </div>
  );
}
