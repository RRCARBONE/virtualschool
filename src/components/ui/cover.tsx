import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

// Paleta fixa de gradientes usados como capa de cursos/formações/apostilas
// enquanto não há upload de imagens reais. As classes ficam escritas por
// extenso (não construídas dinamicamente) para o Tailwind conseguir gerá-las.
const gradients: Record<string, string> = {
  violet: "from-violet-600 via-indigo-500 to-purple-500",
  indigo: "from-indigo-600 via-blue-500 to-violet-500",
  sky: "from-sky-500 via-cyan-500 to-blue-500",
  amber: "from-amber-500 via-orange-500 to-yellow-400",
  emerald: "from-emerald-600 via-teal-500 to-green-500",
  rose: "from-rose-500 via-pink-500 to-fuchsia-500",
  orange: "from-orange-500 via-red-500 to-amber-500",
};

export function Cover({
  gradient = "violet",
  className,
  children,
  icon = true,
}: {
  gradient?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: boolean;
}) {
  const classes = gradients[gradient] ?? gradients.violet;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br text-white",
        classes,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_55%)]" />
      {children ?? (icon && <BookOpen className="relative h-10 w-10 opacity-90" strokeWidth={1.5} />)}
    </div>
  );
}
