'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { resetJourney } from './actions'

export function ResetJourneyButton() {
  return (
    <form
      action={resetJourney}
      onSubmit={(event) => {
        if (!window.confirm('Apagar todo o progresso, anotações e versículos guardados?')) {
          event.preventDefault()
        }
      }}
    >
      <Button type="submit" variant="outline">
        <Trash2 className="size-4" />
        Recomeçar a jornada
      </Button>
    </form>
  )
}
