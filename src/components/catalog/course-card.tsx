import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/types";
import { Cover } from "@/components/ui/cover";
import { Badge } from "@/components/ui/card";
import { formatMinutes, levelLabel } from "@/lib/utils";
import { getAITeacher, getModulesForCourse, getAllLessonsForCourse } from "@/lib/data";

export async function CourseCard({ course }: { course: Course }) {
  const [teacher, lessons, modules] = await Promise.all([
    getAITeacher(course.aiTeacherId),
    getAllLessonsForCourse(course.id),
    getModulesForCourse(course.id),
  ]);

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
    >
      <Cover gradient={course.cover} className="h-32 w-full rounded-none" icon={false}>
        <PlayCircle className="h-9 w-9 text-white/90" strokeWidth={1.5} />
      </Cover>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <Badge variant="brand">{levelLabel(course.level)}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" /> {formatMinutes(course.durationMinutes)}
          </span>
        </div>
        <h3 className="font-semibold leading-snug">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{course.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted">
          <span>{modules.length} módulos · {lessons.length} aulas</span>
          {teacher && (
            <span className="flex items-center gap-1 font-medium text-foreground">
              {teacher.avatar} {teacher.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
