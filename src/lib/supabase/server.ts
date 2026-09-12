import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Cliente Supabase para Server Components, Route Handlers e Server Actions.
 * Retorna `null` em modo demonstração (sem variáveis de ambiente definidas).
 */
export async function createClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // chamado a partir de um Server Component sem permissão de escrita;
          // o proxy.ts cuida de renovar a sessão nesses casos.
        }
      },
    },
  });
}

export async function getCurrentProfile() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return profile
    ? { id: user.id, email: user.email ?? "", ...profile }
    : { id: user.id, email: user.email ?? "", name: user.email ?? "Aluno", role: "aluno", plan: "gratuito" };
}
