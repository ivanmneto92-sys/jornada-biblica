'use client'

import Image from 'next/image'
import { BookOpen, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TOTAL_DAYS, type Reading } from '@/lib/journey'

type ReadingHeroProps = {
  reading: Reading
  completed: boolean
  onSelectDay: (day: number) => void
  onStartReading: () => void
}

export function ReadingHero({
  reading,
  completed,
  onSelectDay,
  onStartReading,
}: ReadingHeroProps) {
  const { day, period } = reading

  return (
    <section
      aria-label="Leitura de hoje"
      className="relative isolate overflow-hidden rounded-3xl border border-border"
    >
      <Image
        src={period.image || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay/95 via-overlay/70 to-overlay/25" />

      <div className="relative flex min-h-[22rem] flex-col justify-between gap-8 p-6 sm:min-h-[24rem] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-[0.14em] text-overlay-foreground/70 uppercase">
              Leitura de hoje
            </p>
            <p className="text-sm font-medium text-overlay-foreground">
              Período {period.index} · {period.title}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full bg-overlay-foreground/15 text-overlay-foreground hover:bg-overlay-foreground/25 hover:text-overlay-foreground"
              onClick={() => onSelectDay(day - 1)}
              disabled={day <= 1}
              aria-label="Dia anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full bg-overlay-foreground/15 text-overlay-foreground hover:bg-overlay-foreground/25 hover:text-overlay-foreground"
              onClick={() => onSelectDay(day + 1)}
              disabled={day >= TOTAL_DAYS}
              aria-label="Próximo dia"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-overlay-foreground/80">
              Dia {day} de {TOTAL_DAYS}
            </p>
            <h2 className="font-serif text-4xl leading-tight text-balance text-overlay-foreground sm:text-5xl">
              {period.bookName} {reading.chapter}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-pretty text-overlay-foreground/80">
              {period.invitation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full bg-overlay-foreground text-overlay hover:bg-overlay-foreground/90"
              onClick={onStartReading}
            >
              <BookOpen className="size-4" />
              {completed ? 'Reler capítulo' : 'Começar a leitura'}
            </Button>
            <span className="flex items-center gap-1.5 text-sm text-overlay-foreground/75">
              {completed ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  Concluído
                </>
              ) : (
                <>
                  <Clock className="size-4" aria-hidden="true" />
                  cerca de 7 minutos
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
