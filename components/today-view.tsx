'use client'

import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  PartyPopper,
  RotateCcw,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChapterReader } from '@/components/chapter-reader'
import { ReadingChecklist } from '@/components/reading-checklist'
import { ReadingNotes } from '@/components/reading-notes'
import {
  CHECKLIST_ITEM_COUNT,
  NEXT_PATH_SUGGESTIONS,
  TOTAL_DAYS,
  getReading,
  type Reading,
} from '@/lib/journey'
import type { DayRecord } from '@/lib/use-journey'

type TodayViewProps = {
  reading: Reading
  record: DayRecord
  periodCompletedCount: number
  totalCompletedCount: number
  onSelectDay: (day: number) => void
  onToggleCheck: (itemId: string) => void
  onUpdate: (patch: Partial<DayRecord>) => void
  onSetCompleted: (completed: boolean) => void
}

export function TodayView({
  reading,
  record,
  periodCompletedCount,
  totalCompletedCount,
  onSelectDay,
  onToggleCheck,
  onUpdate,
  onSetCompleted,
}: TodayViewProps) {
  const { day, period } = reading
  const checkedCount = Object.values(record.checks).filter(Boolean).length
  const isLastDayOfPeriod = day === period.endDay
  const isLastDay = day === TOTAL_DAYS
  const nextReading = day < TOTAL_DAYS ? getReading(day + 1) : null
  const showPeriodCompletion = record.completed && isLastDayOfPeriod

  return (
    <div className="flex flex-col gap-6">
      <Card className="gap-5">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="h-6">
                Período {period.index} de 3
              </Badge>
              <span className="text-sm text-muted-foreground">{period.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => onSelectDay(day - 1)}
                disabled={day <= 1}
                aria-label="Dia anterior"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => onSelectDay(day + 1)}
                disabled={day >= TOTAL_DAYS}
                aria-label="Próximo dia"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-primary">
              Dia {day} de {TOTAL_DAYS}
            </p>
            <CardTitle className="font-serif text-3xl leading-tight text-balance sm:text-4xl">
              Sua leitura de hoje é {period.bookName}, capítulo {reading.chapter}.
            </CardTitle>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              Tempo estimado: cerca de 7 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4" aria-hidden="true" />
              {checkedCount} de {CHECKLIST_ITEM_COUNT} passos marcados
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className="flex items-start gap-2 rounded-lg bg-muted p-4 text-sm leading-relaxed">
            <Target className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-pretty">
              <span className="font-medium">Objetivo deste período: </span>
              {period.objective}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Progress
              value={Math.round((periodCompletedCount / period.chapters) * 100)}
              className="gap-2"
            >
              <div className="flex w-full items-center justify-between text-sm">
                <span className="font-medium">Progresso do período</span>
                <span className="tabular-nums text-muted-foreground">
                  {periodCompletedCount} de {period.chapters} capítulos
                </span>
              </div>
            </Progress>
            <Progress
              value={Math.round((totalCompletedCount / TOTAL_DAYS) * 100)}
              className="gap-2"
            >
              <div className="flex w-full items-center justify-between text-sm">
                <span className="font-medium">Progresso da jornada</span>
                <span className="tabular-nums text-muted-foreground">
                  {totalCompletedCount} de {TOTAL_DAYS} dias
                </span>
              </div>
            </Progress>
          </div>
        </CardContent>
      </Card>

      <ReadingChecklist reading={reading} record={record} onToggle={onToggleCheck} />

      <ChapterReader reading={reading} />

      <ReadingNotes reading={reading} record={record} onChange={onUpdate} />

      <Card className="gap-4">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-medium">
              {record.completed
                ? `Você marcou o dia ${day} como concluído.`
                : 'Terminou sua leitura de hoje?'}
            </p>
            {nextReading ? (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ArrowRight className="size-4" aria-hidden="true" />
                Próxima leitura: {nextReading.period.bookName}, capítulo {nextReading.chapter}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Este é o último dia da jornada.</p>
            )}
          </div>
          {record.completed ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => onSetCompleted(false)}>
                <RotateCcw className="size-4" />
                Desmarcar
              </Button>
              {nextReading && (
                <Button onClick={() => onSelectDay(day + 1)}>
                  Ir para o dia {day + 1}
                  <ChevronRight className="size-4" />
                </Button>
              )}
            </div>
          ) : (
            <Button size="lg" onClick={() => onSetCompleted(true)}>
              <Check className="size-4" />
              Marcar leitura como concluída
            </Button>
          )}
        </CardContent>
      </Card>

      {showPeriodCompletion && (
        <Card className="bg-primary text-primary-foreground ring-0">
          <CardHeader className="gap-2">
            <div className="flex items-center gap-2">
              <PartyPopper className="size-5" aria-hidden="true" />
              <CardTitle className="font-serif text-2xl text-balance">
                {period.completionTitle}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
            {period.completionBody.map((paragraph) => (
              <p key={paragraph} className="text-pretty opacity-90">
                {paragraph}
              </p>
            ))}
            {isLastDay && (
              <div className="flex flex-col gap-2 rounded-lg bg-primary-foreground/10 p-4">
                <p className="font-medium">Sugestão para o próximo caminho:</p>
                <ol className="flex flex-col gap-1 opacity-90">
                  {NEXT_PATH_SUGGESTIONS.map((item, index) => (
                    <li key={item}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
