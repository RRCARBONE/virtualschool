import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { DemoUserPanel } from "./demo-user-panel";

export default async function AdminUsersPage() {
  let profiles: { id: string; name: string; role: string; plan: string; created_at: string }[] = [];

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = (await supabase?.from("profiles").select("id, name, role, plan, created_at").limit(100)) ?? {};
    profiles = data ?? [];
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Usuários</h1>
      <p className="mt-1 text-muted">Visualize alunos cadastrados, plano e progresso geral.</p>

      {!isSupabaseConfigured ? (
        <>
          <p className="mt-6 rounded-xl bg-warning/15 p-4 text-sm text-warning">
            Conecte um projeto Supabase para listar todos os alunos reais. Abaixo, o progresso salvo
            localmente neste navegador (modo demonstração).
          </p>
          <DemoUserPanel />
        </>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Papel</th>
                <th className="p-4">Plano</th>
                <th className="p-4">Cadastrado em</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-t border-border">
                  <td className="p-4 font-medium">{profile.name}</td>
                  <td className="p-4 capitalize">{profile.role}</td>
                  <td className="p-4 capitalize">{profile.plan}</td>
                  <td className="p-4">{new Date(profile.created_at).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted">Nenhum usuário cadastrado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
