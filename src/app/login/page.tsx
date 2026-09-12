"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthShell, FormField } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      router.push(params.get("next") || "/dashboard");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push(params.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <AuthShell
      title="Entrar na sua conta"
      subtitle="Continue de onde parou na sua jornada de aprendizado."
      footer={
        <>
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-semibold text-brand hover:underline">
            Cadastre-se grátis
          </Link>
        </>
      }
    >
      {!isSupabaseConfigured && (
        <p className="mb-4 rounded-xl bg-warning/15 p-3 text-xs text-warning">
          Modo demonstração: qualquer e-mail e senha te levam direto para a área do aluno.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
        <FormField label="Senha" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        {error && <p className="text-sm text-danger">{error}</p>}
        <div className="flex justify-end">
          <Link href="/recuperar-senha" className="text-xs font-medium text-brand hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Entrar
        </Button>
      </form>
    </AuthShell>
  );
}
