'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type UpdateNameState = { error: string } | null

export async function updateName(
  _prevState: UpdateNameState,
  formData: FormData,
): Promise<UpdateNameState> {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) {
    return { error: 'O nome não pode ficar em branco.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/entrar')

  const { error } = await supabase.from('profiles').update({ full_name: name }).eq('id', user.id)
  if (error) {
    return { error: 'Não foi possível salvar o nome agora.' }
  }

  revalidatePath('/perfil')
  return null
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/entrar')
}

export async function resetJourney() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  await supabase.from('day_records').delete().eq('user_id', user.id)
  redirect('/')
}
