'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import type { Reading } from '@/lib/journey'
import type { DayRecord } from '@/lib/use-journey'

export function ReadingNotes({
  reading,
  record,
  onChange,
}: {
  reading: Reading
  record: DayRecord
  onChange: (patch: Partial<DayRecord>) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-base">Seus registros de hoje</CardTitle>
        <p className="text-sm text-muted-foreground">
          Escreva com suas próprias palavras. Nada aqui precisa ser perfeito.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="summary" className="text-sm font-medium">
            O que aconteceu em {reading.reference}?
          </label>
          <Textarea
            id="summary"
            value={record.summary}
            onChange={(event) => onChange({ summary: event.target.value })}
            placeholder="Resuma o capítulo em poucas frases."
            className="min-h-24 leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="question" className="text-sm font-medium">
            Ficou alguma dúvida?
          </label>
          <Textarea
            id="question"
            value={record.question}
            onChange={(event) => onChange({ question: event.target.value })}
            placeholder="Escreva o que não compreendeu ou o que quer investigar depois."
            className="min-h-20 leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="verse" className="text-sm font-medium">
            Versículo que deseja guardar
          </label>
          <Textarea
            id="verse"
            value={record.verse}
            onChange={(event) => onChange({ verse: event.target.value })}
            placeholder={`Ex.: ${reading.reference}:16 — copie a frase que chamou sua atenção.`}
            className="min-h-20 font-serif leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">
            Versículos guardados ficam reunidos na aba Registros.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
