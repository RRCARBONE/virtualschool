"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Cliente Supabase para uso em componentes client-side (auth, uploads
 * pontuais). Retorna `null` em modo demonstração para que as telas de
 * login/cadastro caiam graciosamente no fluxo simulado.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
