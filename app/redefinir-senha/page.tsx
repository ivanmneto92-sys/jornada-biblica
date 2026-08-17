'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'ready' | 'invalid'>('checking')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setStatus('ready')
    })

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus('ready')
    })

    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === 'checking' ? 'invalid' : current))
    }, 4000)

    return () => {
      listener.subscription.unsubscribe()
      window.clearTimeout(timeout)
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    setPending(false)
    if (updateError) {
      setError('Não foi possível salvar a nova senha. Tente novamente.')
      return
    }
    router.push('/')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-serif text-2xl">Jornada Bíblica</h1>
        <p className="text-sm text-muted-foreground">Crie uma nova senha.</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Nova senha</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'checking' && (
            <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Verificando o link...
            </div>
          )}

          {status === 'invalid' && (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <TriangleAlert className="size-8 text-destructive" aria-hidden="true" />
              <p className="text-sm text-pretty text-muted-foreground">
                Esse link de recuperação é inválido ou expirou. Solicite um novo.
              </p>
              <Link
                href="/recuperar-senha"
                className="text-sm text-foreground underline underline-offset-4"
              >
                Solicitar novo link
              </Link>
            </div>
          )}

          {status === 'ready' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Nova senha
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres.</p>
              </div>

              {error && (
                <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={pending} className="mt-1">
                {pending ? 'Salvando...' : 'Salvar nova senha'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
