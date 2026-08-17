import { redirect } from 'next/navigation'
import { JourneyApp } from '@/components/journey-app'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/entrar')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const firstName = profile?.full_name?.trim().split(' ')[0]

  return <JourneyApp userFirstName={firstName} />
}
