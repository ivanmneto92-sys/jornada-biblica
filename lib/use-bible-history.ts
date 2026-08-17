'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jornada-biblica-historico-leitura-v1'

export type HistoryEntry = {
  bookSlug: string
  bookName: string
  chapter: number
  readAt: string
}

function readStorage(): HistoryEntry | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as HistoryEntry
  } catch {
    return null
  }
}

export function useBibleHistory() {
  const [lastRead, setLastRead] = useState<HistoryEntry | null>(null)

  useEffect(() => {
    setLastRead(readStorage())
  }, [])

  const recordRead = useCallback((entry: Omit<HistoryEntry, 'readAt'>) => {
    const next: HistoryEntry = { ...entry, readAt: new Date().toISOString() }
    setLastRead(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // armazenamento indisponível (modo privado); mantemos apenas em memória
    }
  }, [])

  return { lastRead, recordRead }
}
