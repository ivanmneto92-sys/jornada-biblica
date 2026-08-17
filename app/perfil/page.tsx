import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronLeft, ChevronRight, LogOut, Settings } from 'lucide-react'
import { AvatarInitials } from '@/components/avatar-initials'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/server'
import { signOut } from './actions'
import { ChangePasswordForm } from './change-password-form'
import { DeleteAccountButton } from './delete-account-button'
import { EditNameForm } from './edit-name-form'
import { ResetJourneyButton } from './reset-button'

export default async function ProfilePage() {
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

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-6 px-4 pt-6 pb-10 sm:px-6 sm:pt-10">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Voltar
      </Link>

      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <AvatarInitials name={profile?.full_name || user.email || ''} />
          <div className="flex flex-col gap-0.5">
            <EditNameForm name={profile?.full_name ?? ''} />
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <form action={signOut}>
            <Button type="submit" variant="outline">
              <LogOut className="size-4" />
              Sair da conta
            </Button>
          </form>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <Card className="overflow-hidden py-0">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 p-5 transition-colors hover:bg-secondary/60"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary">
            <Settings className="size-4 text-secondary-foreground" aria-hidden="true" />
          </span>
          <span className="flex-1 font-medium">Configurações</span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
        </Link>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Sua jornada</CardTitle>
          <p className="text-sm text-muted-foreground">
            Seu progresso fica salvo na sua conta e pode ser acessado de qualquer aparelho.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Isso apaga permanentemente dias concluídos, anotações e versículos guardados.
            </p>
            <ResetJourneyButton />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-destructive">Zona de risco</CardTitle>
          <p className="text-sm text-muted-foreground">
            Exclui sua conta e todos os seus dados permanentemente. Diferente de recomeçar a
            jornada, isso remove seu login também.
          </p>
        </CardHeader>
        <CardContent>
          <DeleteAccountButton />
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        <Link href="/politica-de-privacidade" className="underline underline-offset-4">
          Política de Privacidade
        </Link>
        {' · '}
        <Link href="/termos-de-uso" className="underline underline-offset-4">
          Termos de Uso
        </Link>
      </p>
    </div>
  )
}
