'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DeleteAccountButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    const firstConfirm = window.confirm(
      'Excluir sua conta apaga permanentemente seu login, progresso, anotações e versículos guardados. Esta ação não pode ser desfeita. Deseja continuar?',
    )
    if (!firstConfirm) return

    const secondConfirm = window.confirm(
      'Tem certeza mesmo? Não há como recuperar sua conta depois de excluída.',
    )
    if (!secondConfirm) return

    setPending(true)
    const response = await fetch('/api/account', { method: 'DELETE' })
    setPending(false)

    if (!response.ok) {
      window.alert('Não foi possível excluir sua conta agora. Tente novamente em instantes.')
      return
    }

    router.push('/entrar')
  }

  return (
    <Button type="button" variant="destructive" onClick={handleClick} disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
      Excluir conta permanentemente
    </Button>
  )
}
