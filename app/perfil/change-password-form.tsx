'use client'

import { useState, type FormEvent } from 'react'
import { Check, KeyRound, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    setPending(false)
    if (updateError) {
      setError('Não foi possível trocar a senha agora.')
      return
    }
    setSuccess(true)
    setPassword('')
    setTimeout(() => {
      setSuccess(false)
      setOpen(false)
    }, 2000)
  }

  if (!open) {
    return (
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        <KeyRound className="size-4" />
        Trocar senha
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="new-password" className="text-sm font-medium">
          Nova senha
        </label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <TriangleAlert className="size-4" aria-hidden="true" />
          {error}
        </p>
      )}
      {success && (
        <p className="flex items-center gap-1.5 text-sm text-primary">
          <Check className="size-4" aria-hidden="true" />
          Senha atualizada.
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? 'Salvando...' : 'Salvar nova senha'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
