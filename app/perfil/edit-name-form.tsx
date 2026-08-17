'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Check, Pencil, TriangleAlert, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateName, type UpdateNameState } from './actions'

const initialState: UpdateNameState = null

export function EditNameForm({ name }: { name: string }) {
  const [editing, setEditing] = useState(false)
  const [state, formAction, pending] = useActionState(updateName, initialState)
  const submittedRef = useRef(false)

  useEffect(() => {
    if (submittedRef.current && !pending && state === null) {
      setEditing(false)
      submittedRef.current = false
    }
  }, [pending, state])

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="flex items-center gap-1.5 text-left font-serif text-xl hover:text-primary"
      >
        {name || 'Sua conta'}
        <Pencil className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </button>
    )
  }

  return (
    <form
      action={(formData) => {
        submittedRef.current = true
        formAction(formData)
      }}
      className="flex items-center gap-2"
    >
      <Input name="name" defaultValue={name} autoFocus className="h-9 max-w-48" />
      <Button type="submit" size="icon-sm" variant="ghost" disabled={pending} aria-label="Salvar">
        <Check className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        onClick={() => setEditing(false)}
        aria-label="Cancelar"
      >
        <X className="size-4" />
      </Button>
      {state?.error && (
        <span className="flex items-center gap-1 text-xs text-destructive">
          <TriangleAlert className="size-3" aria-hidden="true" />
          {state.error}
        </span>
      )}
    </form>
  )
}
