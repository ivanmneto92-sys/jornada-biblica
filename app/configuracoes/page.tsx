'use client'

import Link from 'next/link'
import { ChevronLeft, Type, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useReadingPreferences } from '@/lib/use-reading-preferences'
import { cn } from '@/lib/utils'

const FONT_OPTIONS = [
  { step: 0, label: 'Pequena', sample: 'text-sm' },
  { step: 1, label: 'Média', sample: 'text-base' },
  { step: 2, label: 'Grande', sample: 'text-lg' },
]

export default function SettingsPage() {
  const { fontStep, setFontStep } = useReadingPreferences()

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-6 px-4 pt-6 pb-10 sm:px-6 sm:pt-10">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Voltar
      </Link>

      <h1 className="font-serif text-2xl">Configurações</h1>

      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <Type className="size-4 text-primary" aria-hidden="true" />
          <CardTitle className="font-serif text-lg">Tamanho da fonte na leitura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Tamanho da fonte">
            {FONT_OPTIONS.map((option) => {
              const active = fontStep === option.step
              return (
                <button
                  key={option.step}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFontStep(option.step)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-colors',
                    'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    active
                      ? 'border-primary/40 bg-primary/10 text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30',
                  )}
                >
                  <span className={cn('font-serif', option.sample)}>Aa</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Aplica-se ao texto do capítulo na leitura de cada dia.
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden py-0">
        <Link
          href="/perfil"
          className="flex items-center gap-3 p-5 transition-colors hover:bg-secondary/60"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary">
            <User className="size-4 text-secondary-foreground" aria-hidden="true" />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="font-medium">Conta</span>
            <span className="text-sm text-muted-foreground">
              Editar perfil, sair ou apagar seu progresso
            </span>
          </span>
        </Link>
      </Card>
    </div>
  )
}
