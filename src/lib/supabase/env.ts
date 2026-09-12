export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * A plataforma roda em "modo demonstração" (dados locais em src/lib/data)
 * enquanto as variáveis do Supabase não são configuradas. Isso permite
 * navegar por toda a experiência sem exigir infraestrutura externa, e troca
 * para dados reais assim que o projeto Supabase é conectado.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
