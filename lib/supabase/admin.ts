import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Client com a service role key — ignora Row Level Security. Nunca importar
 * fora de código server-only (rotas de API, Server Actions), e a chave nunca
 * deve ter o prefixo NEXT_PUBLIC_.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
