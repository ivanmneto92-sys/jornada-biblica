export const PERIOD_COLOR = {
  1: { text: 'text-period-1', bg: 'bg-period-1/12', border: 'border-period-1/35', ring: 'ring-period-1/50' },
  2: { text: 'text-period-2', bg: 'bg-period-2/12', border: 'border-period-2/35', ring: 'ring-period-2/50' },
  3: { text: 'text-period-3', bg: 'bg-period-3/12', border: 'border-period-3/35', ring: 'ring-period-3/50' },
} as const

export function periodColor(index: number) {
  return PERIOD_COLOR[index as keyof typeof PERIOD_COLOR] ?? PERIOD_COLOR[1]
}
