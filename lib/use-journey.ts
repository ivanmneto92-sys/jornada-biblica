'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOTAL_DAYS } from '@/lib/journey'

const STORAGE_KEY = 'jornada-biblica-caminho-1-v1'

export type DayRecord = {
  completed: boolean
  completedAt: string | null
  checks: Record<string, boolean>
  summary: string
  question: string
  verse: string
}

export type JourneyState = {
  days: Record<string, DayRecord>
}

export const emptyDay: DayRecord = {
  completed: false,
  completedAt: null,
  checks: {},
  summary: '',
  question: '',
  verse: '',
}

function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const d = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}

function shiftDays(key: string, delta: number) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + delta)
  return todayKey(date)
}

function readStorage(): JourneyState {
  if (typeof window === 'undefined') return { days: {} }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { days: {} }
    const parsed = JSON.parse(raw) as JourneyState
    if (!parsed || typeof parsed !== 'object' || !parsed.days) return { days: {} }
    return parsed
  } catch {
    return { days: {} }
  }
}

export function useJourney() {
  const [state, setState] = useState<JourneyState>({ days: {} })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setState(readStorage())
    setLoaded(true)
  }, [])

  const persist = useCallback((next: JourneyState) => {
    setState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // armazenamento indisponível (modo privado); mantemos apenas em memória
    }
  }, [])

  const updateDay = useCallback(
    (day: number, patch: Partial<DayRecord>) => {
      setState((current) => {
        const key = String(day)
        const previous = current.days[key] ?? emptyDay
        const next: JourneyState = {
          ...current,
          days: { ...current.days, [key]: { ...previous, ...patch } },
        }
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignora falha de persistência
        }
        return next
      })
    },
    [],
  )

  const toggleCheck = useCallback(
    (day: number, itemId: string) => {
      setState((current) => {
        const key = String(day)
        const previous = current.days[key] ?? emptyDay
        const checks = { ...previous.checks, [itemId]: !previous.checks[itemId] }
        const next: JourneyState = {
          ...current,
          days: { ...current.days, [key]: { ...previous, checks } },
        }
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignora falha de persistência
        }
        return next
      })
    },
    [],
  )

  const setCompleted = useCallback(
    (day: number, completed: boolean) => {
      updateDay(day, { completed, completedAt: completed ? new Date().toISOString() : null })
    },
    [updateDay],
  )

  const reset = useCallback(() => {
    persist({ days: {} })
  }, [persist])

  const getDay = useCallback(
    (day: number): DayRecord => state.days[String(day)] ?? emptyDay,
    [state],
  )

  const completedDays = useMemo(
    () =>
      Object.entries(state.days)
        .filter(([, record]) => record.completed)
        .map(([day]) => Number(day))
        .sort((a, b) => a - b),
    [state],
  )

  /** primeiro dia ainda não concluído */
  const currentDay = useMemo(() => {
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      if (!state.days[String(day)]?.completed) return day
    }
    return TOTAL_DAYS
  }, [state])

  const streak = useMemo(() => {
    const dates = new Set(
      completedDays
        .map((day) => state.days[String(day)]?.completedAt)
        .filter((value): value is string => Boolean(value))
        .map((value) => todayKey(new Date(value))),
    )
    if (dates.size === 0) return 0
    const today = todayKey()
    let cursor = dates.has(today) ? today : shiftDays(today, -1)
    if (!dates.has(cursor)) return 0
    let count = 0
    while (dates.has(cursor)) {
      count++
      cursor = shiftDays(cursor, -1)
    }
    return count
  }, [completedDays, state])

  const savedVerses = useMemo(
    () =>
      Object.entries(state.days)
        .filter(([, record]) => record.verse.trim().length > 0)
        .map(([day, record]) => ({ day: Number(day), verse: record.verse.trim() }))
        .sort((a, b) => a.day - b.day),
    [state],
  )

  const notes = useMemo(
    () =>
      Object.entries(state.days)
        .filter(([, r]) => r.summary.trim().length > 0 || r.question.trim().length > 0)
        .map(([day, r]) => ({ day: Number(day), summary: r.summary.trim(), question: r.question.trim() }))
        .sort((a, b) => a.day - b.day),
    [state],
  )

  return {
    loaded,
    state,
    getDay,
    updateDay,
    toggleCheck,
    setCompleted,
    reset,
    completedDays,
    currentDay,
    streak,
    savedVerses,
    notes,
  }
}
