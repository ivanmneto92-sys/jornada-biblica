'use server'

import { createClient } from '@/lib/supabase/server'

export type SignUpFormState = { error: string } | { success: true } | null

export async function signUp(_prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!name || !email || !password) {
    return { error: 'Preencha nome, e-mail e senha.' }
  }

  if (password.length < 6) {
    return { error: 'A senha precisa ter pelo menos 6 caracteres.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  })

  if (error) {
    if (error.code === 'user_already_exists') {
      return { error: 'Já existe uma conta com esse e-mail.' }
    }
    return { error: 'Não foi possível criar sua conta. Tente novamente.' }
  }

  return { success: true }
}
