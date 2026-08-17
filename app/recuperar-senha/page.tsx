'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ChevronLeft, MailCheck, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    })

    setPending(false)
    if (resetError) {
      setError('Não foi possível enviar o e-mail agora. Tente novamente em instantes.')
      return
    }
    setSent(true)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-serif text-2xl">Jornada Bíblica</h1>
        <p className="text-sm text-muted-foreground">Recupere o acesso à sua conta.</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Esqueceu a senha?</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <MailCheck className="size-8 text-primary" aria-hidden="true" />
              <p className="text-sm text-pretty text-muted-foreground">
                Se houver uma conta com esse e-mail, enviamos um link pra você criar uma nova
                senha. Verifique sua caixa de entrada.
              </p>
              <Link href="/entrar" className="text-sm text-foreground underline underline-offset-4">
                Voltar ao login
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Informe o e-mail da sua conta. Vamos enviar um link para você criar uma nova
                senha.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                {error && (
                  <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={pending} className="mt-1">
                  {pending ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </form>

              <Link
                href="/entrar"
                className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Voltar ao login
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
