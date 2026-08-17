'use client'

import { Check, Flame, CalendarCheck, BookMarked } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PERIODS, TOTAL_DAYS, getReading } from '@/lib/journey'
import { periodColor } from '@/lib/period-colors'
import { cn } from '@/lib/utils'

type JourneyOverviewProps = {
  currentDay: number
  selectedDay: number
  completedDays: number[]
  streak: number
  savedVersesCount: number
  onSelectDay: (day: number) => void
}

export function JourneyOverview({
  currentDay,
  selectedDay,
  completedDays,
  streak,
  savedVersesCount,
  onSelectDay,
}: JourneyOverviewProps) {
  const completedSet = new Set(completedDays)

  const stats = [
    {
      label: 'Dias concluídos',
      value: `${completedDays.length} de ${TOTAL_DAYS}`,
      icon: CalendarCheck,
    },
    { label: 'Dias seguidos', value: `${streak}`, icon: Flame },
    { label: 'Versículos guardados', value: `${savedVersesCount}`, icon: BookMarked },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <stat.icon className="size-4 text-primary" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-xl leading-tight tabular-nums">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {PERIODS.map((period) => {
        const days = Array.from(
          { length: period.chapters },
          (_, index) => period.startDay + index,
        )
        const done = days.filter((day) => completedSet.has(day)).length
        const color = periodColor(period.index)

        return (
          <Card key={period.index}>
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn('h-6 border-transparent', color.bg, color.text)}>
                  Período {period.index}
                </Badge>
                <CardTitle className="font-serif text-xl">{period.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                {period.bookName} 1 ao {period.chapters} · dias {period.startDay} a {period.endDay}
              </p>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {period.description}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Progress
                value={Math.round((done / period.chapters) * 100)}
                className="gap-2"
              >
                <div className="flex w-full items-center justify-between text-sm">
                  <span className="font-medium">Progresso</span>
                  <span className="tabular-nums text-muted-foreground">
                    {done} de {period.chapters}
                  </span>
                </div>
              </Progress>

              <ul className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((day) => {
                  const reading = getReading(day)
                  const isDone = completedSet.has(day)
                  const isCurrent = day === currentDay
                  const isSelected = day === selectedDay
                  return (
                    <li key={day}>
                      <button
                        type="button"
                        onClick={() => onSelectDay(day)}
                        aria-current={isSelected ? 'true' : undefined}
                        className={cn(
                          'flex w-full flex-col items-center gap-0.5 rounded-lg border px-2 py-2 text-center transition-colors',
                          'hover:border-primary/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                          isDone
                            ? cn(color.border, color.bg, 'text-foreground')
                            : 'border-border bg-card text-muted-foreground',
                          isCurrent && !isDone && cn(color.border, color.bg, 'text-foreground'),
                          isSelected && cn('ring-2', color.ring),
                        )}
                      >
                        <span className="flex items-center gap-1 text-xs font-medium tabular-nums">
                          {isDone && <Check className={cn('size-3', color.text)} aria-hidden="true" />}
                          Dia {day}
                        </span>
                        <span className="font-serif text-sm text-foreground">
                          {reading.period.bookName} {reading.chapter}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
