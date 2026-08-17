'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jornada-biblica-preferencias-leitura-v1'
const FONT_STEPS = 3

export type ReadingPreferences = {
  fontStep: number
}

const defaultPreferences: ReadingPreferences = { fontStep: 1 }

function readStorage(): ReadingPreferences {
  if (typeof window === 'undefined') return defaultPreferences
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPreferences
    const parsed = JSON.parse(raw) as Partial<ReadingPreferences>
    const fontStep = Number(parsed.fontStep)
    if (!Number.isInteger(fontStep) || fontStep < 0 || fontStep >= FONT_STEPS) {
      return defaultPreferences
    }
    return { fontStep }
  } catch {
    return defaultPreferences
  }
}

export function useReadingPreferences() {
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultPreferences)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setPreferences(readStorage())
    setLoaded(true)
  }, [])

  const setFontStep = useCallback((step: number) => {
    const clamped = Math.min(FONT_STEPS - 1, Math.max(0, step))
    setPreferences((current) => {
      const next = { ...current, fontStep: clamped }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // armazenamento indisponível (modo privado); mantemos apenas em memória
      }
      return next
    })
  }, [])

  return { loaded, fontStep: preferences.fontStep, setFontStep }
}
