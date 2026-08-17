'use client'

import useSWR from 'swr'
import { BookOpen, Loader2, Minus, Plus, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Reading } from '@/lib/journey'
import { useReadingPreferences } from '@/lib/use-reading-preferences'

type ChapterResponse = {
  reference: string
  translation: string
  verses: { verse: number; text: string }[]
}

const fetcher = async (url: string): Promise<ChapterResponse> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Falha ao carregar o texto')
  return response.json()
}

export function ChapterReader({ reading }: { reading: Reading }) {
  const { fontStep, setFontStep } = useReadingPreferences()
  const { data, error, isLoading } = useSWR<ChapterResponse>(
    `/api/chapter?book=${reading.period.bookSlug}&chapter=${reading.chapter}`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: false },
  )

  const textSize = ['text-base', 'text-lg', 'text-xl'][fontStep]

  return (
    <Card className="gap-0">
      <CardHeader className="flex-row items-center justify-between gap-3 border-b">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-primary" aria-hidden="true" />
          <CardTitle className="font-serif text-base">{reading.reference}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFontStep(fontStep - 1)}
            disabled={fontStep === 0}
            aria-label="Diminuir tamanho do texto"
          >
            <Minus className="size-4" />
          </Button>
          <span className="sr-only" aria-live="polite">
            Tamanho do texto: {fontStep + 1} de 3
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFontStep(fontStep + 1)}
            disabled={fontStep === 2}
            aria-label="Aumentar tamanho do texto"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        {isLoading && (
          <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Carregando {reading.reference}...
          </div>
        )}

        {error && !isLoading && (
          <div className="flex items-start gap-2 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <p>
              Não conseguimos carregar o texto agora. Você pode ler{' '}
              <strong className="text-foreground">{reading.reference}</strong> na sua Bíblia e
              continuar a jornada normalmente.
            </p>
          </div>
        )}

        {data && !isLoading && (
          <div className="flex flex-col gap-4">
            <div className={`flex flex-col gap-3 font-serif leading-relaxed ${textSize}`}>
              {data.verses.map((verse) => (
                <p key={verse.verse} className="text-pretty">
                  <span className="mr-1.5 align-super text-xs font-sans font-semibold text-primary">
                    {verse.verse}
                  </span>
                  {verse.text}
                </p>
              ))}
            </div>
            <p className="border-t pt-3 text-xs text-muted-foreground">
              Tradução: {data.translation} · {data.verses.length} versículos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
