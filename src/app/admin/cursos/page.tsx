"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/card";
import { useCoursesWithPublishState } from "@/lib/admin/use-admin";
import { adminStore } from "@/lib/admin/store";
import { areas, getModulesForCourse, getLessonsForModule } from "@/lib/data";
import { formatMinutes, levelLabel } from "@/lib/utils";

export default function AdminCoursesPage() {
  const courses = useCoursesWithPublishState();
  const [filterArea, setFilterArea] = useState("todas");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filterArea === "todas" ? courses : courses.filter((c) => c.areaId === filterArea)),
    [courses, filterArea]
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-extrabold">Cursos</h1>
        <p className="mt-1 text-muted">{courses.length} cursos cadastrados. Publique ou despublique para controlar a vitrine.</p>
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
        {filtered.map((course) => {
          const modules = getModulesForCourse(course.id);
          const isOpen = expanded === course.id;
          return (
            <div key={course.id}>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{course.title}</p>
                    <Badge variant={course.published ? "accent" : "warning"}>
                      {course.published ? "Publicado" : "Rascunho"}
                    </Badge>
                    <Badge>{levelLabel(course.level)}</Badge>
                  </div>
                  <p className="text-xs text-muted">{modules.length} módulos · {formatMinutes(course.durationMinutes)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adminStore.setCoursePublished(course.id, !course.published)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface-muted"
                  >
                    {course.published ? "Despublicar" : "Publicar"}
                  </button>
                  <Link
                    href={`/cursos/${course.slug}`}
                    target="_blank"
                    className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface-muted"
                  >
                    Ver <ExternalLink className="h-3 w-3" />
                  </Link>
                  <button
                    onClick={() => setExpanded(isOpen ? null : course.id)}
                    className="rounded-lg p-1.5 hover:bg-surface-muted"
                    aria-label="Ver estrutura"
                  >
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="space-y-2 bg-surface-muted p-4">
                  {modules.map((mod, i) => (
                    <div key={mod.id} className="rounded-xl bg-surface p-3 text-sm">
                      <p className="font-semibold">Módulo {i + 1}: {mod.title}</p>
                      <ul className="mt-1 list-disc pl-5 text-muted">
                        {getLessonsForModule(mod.id).map((lesson) => (
                          <li key={lesson.id}>{lesson.title}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
