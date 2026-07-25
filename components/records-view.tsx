'use client'

import { BookMarked, HelpCircle, NotebookPen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getReading } from '@/lib/journey'

type RecordsViewProps = {
  savedVerses: { day: number; verse: string }[]
  notes: { day: number; summary: string; question: string }[]
  onSelectDay: (day: number) => void
  onReset: () => void
}

export function RecordsView({ savedVerses, notes, onSelectDay, onReset }: RecordsViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-1">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <BookMarked className="size-4 text-primary" aria-hidden="true" />
            Versículos guardados
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Frases que você escolheu guardar durante a jornada.
          </p>
        </CardHeader>
        <CardContent>
          {savedVerses.length === 0 ? (
            <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              Nenhum versículo guardado ainda. Ao final de cada leitura, escolha uma frase que
              chamou sua atenção.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {savedVerses.map(({ day, verse }) => {
                const reading = getReading(day)
                return (
                  <li key={day} className="flex flex-col gap-2 border-l-2 border-accent pl-4">
                    <blockquote className="font-serif text-lg leading-relaxed text-pretty">
                      {verse}
                    </blockquote>
                    <button
                      type="button"
                      onClick={() => onSelectDay(day)}
                      className="w-fit text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Dia {day} · {reading.reference}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-1">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <NotebookPen className="size-4 text-primary" aria-hidden="true" />
            Suas anotações
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Resumos dos capítulos e dúvidas registradas por dia.
          </p>
        </CardHeader>
        <CardContent>
          {notes.length === 0 ? (
            <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              Você ainda não escreveu anotações. Elas aparecem aqui automaticamente.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {notes.map(({ day, summary, question }, index) => {
                const reading = getReading(day)
                return (
                  <li key={day} className="flex flex-col gap-3">
                    {index > 0 && <Separator className="mb-2" />}
                    <button
                      type="button"
                      onClick={() => onSelectDay(day)}
                      className="w-fit text-sm font-medium underline-offset-4 hover:underline"
                    >
                      Dia {day} · {reading.reference}
                    </button>
                    {summary && (
                      <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                        {summary}
                      </p>
                    )}
                    {question && (
                      <p className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm leading-relaxed">
                        <HelpCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        <span className="text-pretty">{question}</span>
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card size="sm">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Seus dados ficam salvos apenas neste navegador.
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
