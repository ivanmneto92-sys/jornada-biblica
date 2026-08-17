'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { MailCheck, TriangleAlert, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signUp, type SignUpFormState } from './actions'

const initialState: SignUpFormState = null

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState)
  const success = state !== null && 'success' in state

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-serif text-2xl">Jornada Bíblica</h1>
        <p className="text-sm text-muted-foreground">Crie sua conta e comece sua jornada.</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <MailCheck className="size-8 text-primary" aria-hidden="true" />
              <p className="text-sm text-pretty text-muted-foreground">
                Enviamos um e-mail de confirmação. Verifique sua caixa de entrada para ativar sua
                conta e entrar.
              </p>
              <Link href="/entrar" className="text-sm text-foreground underline underline-offset-4">
                Ir para o login
              </Link>
            </div>
          ) : (
            <>
              <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input id="name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres.</p>
                </div>

                {state && 'error' in state && (
                  <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {state.error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={pending} className="mt-1">
                  <UserPlus className="size-4" />
                  {pending ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Ao criar uma conta, você concorda com os{' '}
                <Link href="/termos-de-uso" className="underline underline-offset-4">
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link href="/politica-de-privacidade" className="underline underline-offset-4">
                  Política de Privacidade
                </Link>
                .
              </p>

              <p className="mt-3 text-center text-sm text-muted-foreground">
                Já tem conta?{' '}
                <Link href="/entrar" className="text-foreground underline underline-offset-4">
                  Entrar
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
