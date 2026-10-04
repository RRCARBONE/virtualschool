import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Briefcase, GraduationCap, Layers, Search } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { globalSearch, type SearchResult } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pesquisar",
};

const typeMeta: Record<SearchResult["type"], { label: string; icon: typeof Search }> = {
  area: { label: "Área", icon: Layers },
  profissao: { label: "Profissão", icon: Briefcase },
  curso: { label: "Curso", icon: BookOpen },
  formacao: { label: "Formação", icon: GraduationCap },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await globalSearch(query) : [];

  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-2xl font-extrabold sm:text-3xl">Pesquisar</h1>
      <div className="mt-5">
        <SearchBar defaultValue={query} />
      </div>

      {query && (
        <p className="mt-6 text-sm text-muted">
          {results.length} resultado{results.length !== 1 ? "s" : ""} para &quot;{query}&quot;
        </p>
      )}

      <div className="mt-4 space-y-2">
        {results.map((result, i) => {
          const meta = typeMeta[result.type];
          const Icon = meta.icon;
          return (
            <Link
              key={`${result.href}-${i}`}
              href={result.href}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card hover:bg-surface-muted"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">{meta.label}</span>
                <p className="font-semibold">{result.title}</p>
                <p className="line-clamp-1 text-sm text-muted">{result.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {query && results.length === 0 && (
        <p className="mt-8 text-center text-muted">
          Nenhum resultado para &quot;{query}&quot;. Tente pesquisar por uma área, profissão ou habilidade.
        </p>
      )}
    </div>
  );
}
