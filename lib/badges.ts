import {
  BookMarked,
  Compass,
  Flame,
  Heart,
  NotebookPen,
  Star,
  Sunrise,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { PERIODS, TOTAL_DAYS } from './journey'

export type BadgeStats = {
  completedDays: number[]
  streak: number
  savedVersesCount: number
  notesCount: number
}

export type BadgeDef = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  periodIndex?: number
  isEarned: (stats: BadgeStats) => boolean
}

function periodCompleted(stats: BadgeStats, periodIndex: number) {
  const period = PERIODS.find((p) => p.index === periodIndex)
  if (!period) return false
  const completed = new Set(stats.completedDays)
  for (let day = period.startDay; day <= period.endDay; day++) {
    if (!completed.has(day)) return false
  }
  return true
}

export const BADGES: BadgeDef[] = [
  {
    id: 'primeiro-dia',
    title: 'Primeiro Passo',
    description: 'Concluiu o primeiro dia da jornada.',
    icon: Sunrise,
    isEarned: (s) => s.completedDays.length >= 1,
  },
  {
    id: 'periodo-1',
    title: 'Conheceu Jesus',
    description: 'Concluiu o Evangelho de Lucas.',
    icon: Compass,
    periodIndex: 1,
    isEarned: (s) => periodCompleted(s, 1),
  },
  {
    id: 'periodo-2',
    title: 'Igreja em Missão',
    description: 'Concluiu o livro de Atos.',
    icon: Users,
    periodIndex: 2,
    isEarned: (s) => periodCompleted(s, 2),
  },
  {
    id: 'periodo-3',
    title: 'Fé que Transforma',
    description: 'Concluiu o Evangelho de João.',
    icon: Heart,
    periodIndex: 3,
    isEarned: (s) => periodCompleted(s, 3),
  },
  {
    id: 'jornada-completa',
    title: 'Jornada Completa',
    description: `Concluiu os ${TOTAL_DAYS} dias do Caminho 1.`,
    icon: Star,
    isEarned: (s) => s.completedDays.length >= TOTAL_DAYS,
  },
  {
    id: 'sequencia-3',
    title: 'Ritmo',
    description: '3 dias seguidos de leitura.',
    icon: Flame,
    isEarned: (s) => s.streak >= 3,
  },
  {
    id: 'sequencia-7',
    title: 'Uma Semana Fiel',
    description: '7 dias seguidos de leitura.',
    icon: Flame,
    isEarned: (s) => s.streak >= 7,
  },
  {
    id: 'sequencia-30',
    title: 'Um Mês Fiel',
    description: '30 dias seguidos de leitura.',
    icon: Flame,
    isEarned: (s) => s.streak >= 30,
  },
  {
    id: 'primeira-anotacao',
    title: 'Primeira Reflexão',
    description: 'Escreveu sua primeira anotação.',
    icon: NotebookPen,
    isEarned: (s) => s.notesCount >= 1,
  },
  {
    id: 'primeiro-versiculo',
    title: 'Palavra Guardada',
    description: 'Guardou seu primeiro versículo.',
    icon: BookMarked,
    isEarned: (s) => s.savedVersesCount >= 1,
  },
  {
    id: 'dez-versiculos',
    title: 'Tesouro na Memória',
    description: 'Guardou 10 versículos.',
    icon: BookMarked,
    isEarned: (s) => s.savedVersesCount >= 10,
  },
  {
    id: 'trinta-dias',
    title: 'Perseverança',
    description: 'Concluiu 30 dias de leitura.',
    icon: Trophy,
    isEarned: (s) => s.completedDays.length >= 30,
  },
]
