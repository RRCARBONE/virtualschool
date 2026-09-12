"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthShell, FormField } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setSent(true);
      return;
    }
    setLoading(true);
    const supabase = createClient();
    await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Enviaremos um link para você redefinir sua senha."
      footer={
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Voltar para o login
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-accent" />
          <p className="text-sm text-muted">
            Se {email || "esse e-mail"} estiver cadastrado, você receberá um link de recuperação em instantes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Enviar link de recuperação
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
