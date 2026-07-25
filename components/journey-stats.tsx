import { BookMarked, Flame, ListChecks } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { TOTAL_DAYS } from '@/lib/journey'

type JourneyStatsProps = {
  completedCount: number
  streak: number
  savedVersesCount: number
}

export function JourneyStats({ completedCount, streak, savedVersesCount }: JourneyStatsProps) {
  const stats = [
    {
      icon: ListChecks,
      value: `${completedCount}`,
      suffix: `de ${TOTAL_DAYS}`,
      label: 'Capítulos concluídos',
    },
    {
      icon: Flame,
      value: `${streak}`,
      suffix: streak === 1 ? 'dia' : 'dias',
      label: 'Sequência de leitura',
    },
    {
      icon: BookMarked,
      value: `${savedVersesCount}`,
      suffix: '',
      label: 'Versículos guardados',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="py-4">
          <CardContent className="flex items-center justify-between gap-3 px-4">
            <div className="flex flex-col gap-0.5">
              <p className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl leading-none tabular-nums">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-xs text-muted-foreground">{stat.suffix}</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <stat.icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
