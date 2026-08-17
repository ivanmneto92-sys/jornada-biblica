'use client'

import { Book, BookMarked, Home, Map } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { value: 'hoje', label: 'Hoje', icon: Home },
  { value: 'biblia', label: 'Bíblia', icon: Book },
  { value: 'jornada', label: 'Jornada', icon: Map },
  { value: 'registros', label: 'Registros', icon: BookMarked },
]

type BottomNavProps = {
  value: string
  onChange: (value: string) => void
}

export function BottomNav({ value, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-full sm:border"
    >
      <ul className="mx-auto flex w-full max-w-md items-center justify-around gap-1 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:w-auto sm:max-w-none sm:gap-2 sm:px-2 sm:py-2">
        {ITEMS.map((item) => {
          const active = value === item.value
          return (
            <li key={item.value} className="flex-1 sm:flex-none">
              <button
                type="button"
                onClick={() => onChange(item.value)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs font-medium transition-colors sm:flex-row sm:gap-2 sm:rounded-full sm:text-sm',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <item.icon className="size-5 sm:size-4" aria-hidden="true" />
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
