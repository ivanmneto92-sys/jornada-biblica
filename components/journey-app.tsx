'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Flame, User } from 'lucide-react'
import { BottomNav } from '@/components/bottom-nav'
import { JourneyOverview } from '@/components/journey-overview'
import { RecordsView } from '@/components/records-view'
import { TodayView } from '@/components/today-view'
import { TOTAL_DAYS, getReading } from '@/lib/journey'
import { useJourney } from '@/lib/use-journey'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function JourneyApp({ userFirstName }: { userFirstName?: string }) {
  const journey = useJourney()
  const [tab, setTab] = useState('hoje')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [greeting, setGreeting] = useState('Olá')

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

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

  const changeTab = (value: string) => {
    setTab(value)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-svh pb-28 sm:pb-32">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-6 sm:px-6 sm:pt-10">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-serif text-2xl leading-tight sm:text-3xl">
              {greeting}
              {userFirstName ? `, ${userFirstName}` : ''}
            </h1>
            <div className="flex items-center gap-2">
              {journey.streak > 0 && (
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  <Flame className="size-4 text-accent" aria-hidden="true" />
                  {journey.streak}
                  <span className="text-muted-foreground">
                    {journey.streak === 1 ? 'dia' : 'dias'}
                  </span>
                </span>
              )}
              <Link
                href="/perfil"
                aria-label="Seu perfil"
                className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/70"
              >
                <User className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Caminho 1 · Começar entendendo · Lucas, Atos e João em {TOTAL_DAYS} dias
          </p>
        </header>

        {tab === 'hoje' && (
          <TodayView
            reading={reading}
            record={record}
            periodCompletedCount={periodCompletedCount}
            totalCompletedCount={journey.completedDays.length}
            streak={journey.streak}
            savedVersesCount={journey.savedVerses.length}
            onSelectDay={selectDay}
            onToggleCheck={(itemId) => journey.toggleCheck(day, itemId)}
            onUpdate={(patch) => journey.updateDay(day, patch)}
            onSetCompleted={(completed) => journey.setCompleted(day, completed)}
          />
        )}

        {tab === 'jornada' && (
          <JourneyOverview
            currentDay={journey.currentDay}
            selectedDay={day}
            completedDays={journey.completedDays}
            streak={journey.streak}
            savedVersesCount={journey.savedVerses.length}
            onSelectDay={selectDay}
          />
        )}

        {tab === 'registros' && (
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
        )}
      </main>

      <BottomNav value={tab} onChange={changeTab} />
    </div>
  )
}
