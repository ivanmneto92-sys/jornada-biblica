const PALETTE = [
  { bg: 'bg-period-1/15', text: 'text-period-1' },
  { bg: 'bg-period-2/15', text: 'text-period-2' },
  { bg: 'bg-period-3/15', text: 'text-period-3' },
  { bg: 'bg-primary/15', text: 'text-primary' },
]

export function avatarColor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return PALETTE[hash % PALETTE.length]
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
