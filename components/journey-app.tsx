'use client'

import { useEffect, useMemo, useState } from 'react'
import { Flame, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JourneyOverview } from '@/components/journey-overview'
import { RecordsView } from '@/components/records-view'
import { TodayView } from '@/components/today-view'
import { TOTAL_DAYS, getReading } from '@/lib/journey'
import { useJourney } from '@/lib/use-journey'

export function JourneyApp() {
  const journey = useJourney()
  const [tab, setTab] = useState('hoje')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // enquanto o usuário não navegar manualmente, acompanhamos o dia atual da jornada
  useEffect(() => {
    if (journey.loaded && selectedDay === null) {
      setSelectedDay(journey.currentDay)
    }
  }, [journey.loaded, journey.currentDay, selectedDay])

  const day = selectedDay ?? journey.currentDay
  const reading = useMemo(() => getReading(day), [day])
  const record = journey.getDay(day)

  const periodCompletedCount = useMemo(
    () =>
      journey.completedDays.filter(
        (value) => value >= reading.period.startDay && value <= reading.period.endDay,
      ).length,
    [journey.completedDays, reading.period],
  )

  const selectDay = (nextDay: number) => {
    setSelectedDay(Math.min(Math.max(nextDay, 1), TOTAL_DAYS))
    setTab('hoje')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-accent" aria-hidden="true" />
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Caminho 1 · Começar entendendo
            </p>
          </div>
          {journey.streak > 0 && (
            <Badge variant="outline" className="h-6 gap-1">
              <Flame className="text-accent" aria-hidden="true" />
              {journey.streak} {journey.streak === 1 ? 'dia seguido' : 'dias seguidos'}
            </Badge>
          )}
        </div>
        <h1 className="font-serif text-2xl leading-tight text-balance sm:text-3xl">
          Uma jornada de 73 dias por Lucas, Atos e João
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground">
          Um capítulo por dia, sem precisar decidir o que ler. Comece conhecendo Jesus, acompanhe o
          início da Igreja e aprofunde sua leitura.
        </p>
      </header>

      <Tabs value={tab} onValueChange={(value) => setTab(value as string)} className="gap-6">
        <TabsList className="w-full">
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="jornada">Jornada</TabsTrigger>
          <TabsTrigger value="registros">Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="hoje">
          <TodayView
            reading={reading}
            record={record}
            periodCompletedCount={periodCompletedCount}
            totalCompletedCount={journey.completedDays.length}
            onSelectDay={selectDay}
            onToggleCheck={(itemId) => journey.toggleCheck(day, itemId)}
            onUpdate={(patch) => journey.updateDay(day, patch)}
            onSetCompleted={(completed) => journey.setCompleted(day, completed)}
          />
        </TabsContent>

        <TabsContent value="jornada">
          <JourneyOverview
            currentDay={journey.currentDay}
            selectedDay={day}
            completedDays={journey.completedDays}
            streak={journey.streak}
            savedVersesCount={journey.savedVerses.length}
            onSelectDay={selectDay}
          />
        </TabsContent>

        <TabsContent value="registros">
          <RecordsView
            savedVerses={journey.savedVerses}
            notes={journey.notes}
            onSelectDay={selectDay}
            onReset={() => {
              journey.reset()
              setSelectedDay(1)
              setTab('hoje')
            }}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}
