import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Area } from "@/lib/types";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/profissoes/${area.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
        style={{ background: `linear-gradient(135deg, ${area.colorFrom}, ${area.colorTo})` }}
      >
        <DynamicIcon name={area.icon} className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold">{area.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{area.description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
        Explorar <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
