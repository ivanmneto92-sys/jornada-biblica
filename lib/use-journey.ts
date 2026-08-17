'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOTAL_DAYS } from '@/lib/journey'
import { createClient } from '@/lib/supabase/client'

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

type DayRow = {
  day: number
  completed: boolean
  completed_at: string | null
  checks: Record<string, boolean> | null
  summary: string | null
  question: string | null
  verse: string | null
}

function rowsToState(rows: DayRow[]): JourneyState {
  const days: Record<string, DayRecord> = {}
  for (const row of rows) {
    days[String(row.day)] = {
      completed: row.completed,
      completedAt: row.completed_at,
      checks: row.checks ?? {},
      summary: row.summary ?? '',
      question: row.question ?? '',
      verse: row.verse ?? '',
    }
  }
  return { days }
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

export function useJourney() {
  const supabase = useMemo(() => createClient(), [])
  const [userId, setUserId] = useState<string | null>(null)
  const [state, setState] = useState<JourneyState>({ days: {} })
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!active) return

      if (!user) {
        setLoaded(true)
        return
      }

      setUserId(user.id)
      const { data, error } = await supabase.from('day_records').select('*').eq('user_id', user.id)
      if (!active) return

      if (!error && data) {
        setState(rowsToState(data as DayRow[]))
      } else {
        console.error('Falha ao carregar progresso da jornada:', error)
        setLoadError(true)
      }
      setLoaded(true)
    }

    load()
    return () => {
      active = false
    }
  }, [supabase])

  const persistDay = useCallback(
    (day: number, record: DayRecord) => {
      if (!userId) return
      supabase
        .from('day_records')
        .upsert({
          user_id: userId,
          day,
          completed: record.completed,
          completed_at: record.completedAt,
          checks: record.checks,
          summary: record.summary,
          question: record.question,
          verse: record.verse,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error('Falha ao salvar progresso da jornada', error)
        })
    },
    [supabase, userId],
  )

  const updateDay = useCallback(
    (day: number, patch: Partial<DayRecord>) => {
      setState((current) => {
        const key = String(day)
        const previous = current.days[key] ?? emptyDay
        const next = { ...previous, ...patch }
        persistDay(day, next)
        return { ...current, days: { ...current.days, [key]: next } }
      })
    },
    [persistDay],
  )

  const toggleCheck = useCallback(
    (day: number, itemId: string) => {
      setState((current) => {
        const key = String(day)
        const previous = current.days[key] ?? emptyDay
        const checks = { ...previous.checks, [itemId]: !previous.checks[itemId] }
        const next = { ...previous, checks }
        persistDay(day, next)
        return { ...current, days: { ...current.days, [key]: next } }
      })
    },
    [persistDay],
  )

  const setCompleted = useCallback(
    (day: number, completed: boolean) => {
      updateDay(day, { completed, completedAt: completed ? new Date().toISOString() : null })
    },
    [updateDay],
  )

  const reset = useCallback(() => {
    if (userId) {
      supabase
        .from('day_records')
        .delete()
        .eq('user_id', userId)
        .then(({ error }) => {
          if (error) console.error('Falha ao apagar progresso da jornada', error)
        })
    }
    setState({ days: {} })
  }, [supabase, userId])

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
    loadError,
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
