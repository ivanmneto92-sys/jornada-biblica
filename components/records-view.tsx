'use client'

import { useMemo, useState } from 'react'
import { BookMarked, Check, HelpCircle, NotebookPen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getReading } from '@/lib/journey'
import { cn } from '@/lib/utils'

type FeedItem =
  | { kind: 'verse'; day: number; verse: string }
  | { kind: 'summary'; day: number; text: string }
  | { kind: 'question'; day: number; text: string }
  | { kind: 'completed'; day: number }

type FilterId = 'todos' | 'versiculos' | 'anotacoes' | 'concluidos'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'versiculos', label: 'Versículos' },
  { id: 'anotacoes', label: 'Anotações' },
  { id: 'concluidos', label: 'Concluídos' },
]

function matchesFilter(item: FeedItem, filter: FilterId) {
  if (filter === 'todos') return true
  if (filter === 'versiculos') return item.kind === 'verse'
  if (filter === 'anotacoes') return item.kind === 'summary' || item.kind === 'question'
  return item.kind === 'completed'
}

type RecordsViewProps = {
  savedVerses: { day: number; verse: string }[]
  notes: { day: number; summary: string; question: string }[]
  completedDays: number[]
  onSelectDay: (day: number) => void
  onReset: () => void
}

export function RecordsView({
  savedVerses,
  notes,
  completedDays,
  onSelectDay,
  onReset,
}: RecordsViewProps) {
  const [filter, setFilter] = useState<FilterId>('todos')

  const items = useMemo(() => {
    const feed: FeedItem[] = []
    for (const { day, verse } of savedVerses) feed.push({ kind: 'verse', day, verse })
    for (const { day, summary, question } of notes) {
      if (summary) feed.push({ kind: 'summary', day, text: summary })
      if (question) feed.push({ kind: 'question', day, text: question })
    }
    for (const day of completedDays) feed.push({ kind: 'completed', day })
    return feed.sort((a, b) => b.day - a.day)
  }, [savedVerses, notes, completedDays])

  const visibleItems = items.filter((item) => matchesFilter(item, filter))

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFilter(option.id)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              filter === option.id
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {visibleItems.length === 0 ? (
        <p className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
          Nada por aqui ainda. Seus versículos, anotações e dias concluídos aparecem
          automaticamente.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visibleItems.map((item) => {
            const reading = getReading(item.day)
            return (
              <li key={`${item.kind}-${item.day}`}>
                <Card size="sm">
                  <CardContent className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectDay(item.day)}
                      className="flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {item.kind === 'verse' && (
                        <BookMarked className="size-3.5 text-primary" aria-hidden="true" />
                      )}
                      {item.kind === 'summary' && (
                        <NotebookPen className="size-3.5 text-primary" aria-hidden="true" />
                      )}
                      {item.kind === 'question' && (
                        <HelpCircle className="size-3.5 text-accent" aria-hidden="true" />
                      )}
                      {item.kind === 'completed' && (
                        <Check className="size-3.5 text-primary" aria-hidden="true" />
                      )}
                      Dia {item.day} · {reading.reference}
                    </button>

                    {item.kind === 'verse' && (
                      <blockquote className="font-serif text-lg leading-relaxed text-pretty">
                        {item.verse}
                      </blockquote>
                    )}
                    {item.kind === 'summary' && (
                      <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                        {item.text}
                      </p>
                    )}
                    {item.kind === 'question' && (
                      <p className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm leading-relaxed">
                        <HelpCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        <span className="text-pretty">{item.text}</span>
                      </p>
                    )}
                    {item.kind === 'completed' && (
                      <p className="text-sm text-muted-foreground">Leitura concluída.</p>
                    )}
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      )}

      <Card size="sm">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Seu progresso fica salvo na sua conta e pode ser acessado de qualquer aparelho.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm('Apagar todo o progresso, anotações e versículos guardados?')) {
                onReset()
              }
            }}
          >
            <Trash2 className="size-4" />
            Recomeçar a jornada
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
