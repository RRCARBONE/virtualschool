"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchBar({
  className,
  placeholder = "O que você quer aprender?",
  defaultValue = "",
}: {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/buscar${value ? `?q=${encodeURIComponent(value)}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft",
        className
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-base outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="hidden shrink-0 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark sm:block"
      >
        Pesquisar
      </button>
    </form>
  );
}
