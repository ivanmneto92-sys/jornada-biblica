'use client'

import Image from 'next/image'
import {
  ArrowRight,
  Check,
  ChevronRight,
  PartyPopper,
  RotateCcw,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChapterReader } from '@/components/chapter-reader'
import { JourneyStats } from '@/components/journey-stats'
import { ReadingChecklist } from '@/components/reading-checklist'
import { ReadingHero } from '@/components/reading-hero'
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
  streak: number
  savedVersesCount: number
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
  streak,
  savedVersesCount,
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

  const scrollToReader = () => {
    document.getElementById('leitor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex flex-col gap-8">
      <ReadingHero
        reading={reading}
        completed={record.completed}
        onSelectDay={onSelectDay}
        onStartReading={scrollToReader}
      />

      <JourneyStats
        completedCount={totalCompletedCount}
        streak={streak}
        savedVersesCount={savedVersesCount}
      />

      <section className="flex flex-col gap-3">
        <h3 className="font-serif text-xl">Seu progresso</h3>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-start gap-2 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
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
                  <span className="font-medium">Período {period.index}</span>
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
                  <span className="font-medium">Jornada completa</span>
                  <span className="tabular-nums text-muted-foreground">
                    {totalCompletedCount} de {TOTAL_DAYS} dias
                  </span>
                </div>
              </Progress>
            </div>

            <p className="text-sm text-muted-foreground">
              {checkedCount} de {CHECKLIST_ITEM_COUNT} passos marcados neste dia.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-serif text-xl">Roteiro do dia</h3>
        <ReadingChecklist reading={reading} record={record} onToggle={onToggleCheck} />
      </section>

      <section id="leitor" className="flex scroll-mt-6 flex-col gap-3">
        <h3 className="font-serif text-xl">
          {period.bookName} {reading.chapter}
        </h3>
        <ChapterReader reading={reading} />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-serif text-xl">Depois da leitura</h3>
        <ReadingNotes reading={reading} record={record} onChange={onUpdate} />
      </section>

      <Card>
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

      {nextReading && (
        <section className="flex flex-col gap-3">
          <h3 className="font-serif text-xl">Mais para você</h3>
          <Card className="overflow-hidden py-0">
            <button
              type="button"
              onClick={() => onSelectDay(day + 1)}
              className="flex items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/60"
            >
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Amanhã · dia {nextReading.day}
                </p>
                <p className="font-serif text-lg leading-snug text-pretty">
                  {nextReading.period.bookName} {nextReading.chapter}
                </p>
                <p className="text-sm text-muted-foreground">{nextReading.period.title}</p>
              </div>
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={nextReading.period.image || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </button>
          </Card>
        </section>
      )}

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
