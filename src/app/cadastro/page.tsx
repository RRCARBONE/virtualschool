"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthShell, FormField } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { progressStore } from "@/lib/progress/store";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      progressStore.setStudentName(name || "Aluno");
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase!.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    progressStore.setStudentName(name || "Aluno");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthShell
      title="Crie sua conta grátis"
      subtitle="Comece a aprender hoje mesmo. Cancele quando quiser."
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      {!isSupabaseConfigured && (
        <p className="mb-4 rounded-xl bg-warning/15 p-3 text-xs text-warning">
          Modo demonstração: seu cadastro fica salvo apenas neste navegador.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        <FormField label="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
        <FormField label="Senha" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Criar conta grátis
        </Button>
        <p className="text-center text-xs text-muted">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
      </form>
    </AuthShell>
  );
}
