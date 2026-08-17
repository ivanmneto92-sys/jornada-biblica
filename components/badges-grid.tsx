import { Award, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BADGES, type BadgeStats } from '@/lib/badges'
import { periodColor } from '@/lib/period-colors'
import { cn } from '@/lib/utils'

export function BadgesGrid({ stats }: { stats: BadgeStats }) {
  const earnedCount = BADGES.filter((badge) => badge.isEarned(stats)).length

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="size-4 text-primary" aria-hidden="true" />
          <CardTitle className="font-serif text-xl">Medalhas</CardTitle>
        </div>
        <span className="text-sm tabular-nums text-muted-foreground">
          {earnedCount} de {BADGES.length}
        </span>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((badge) => {
            const earned = badge.isEarned(stats)
            const color = badge.periodIndex ? periodColor(badge.periodIndex) : null

            return (
              <li key={badge.id}>
                <div
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border p-3 text-center"
                  role="group"
                  aria-label={`${badge.title} — ${badge.description} — ${earned ? 'conquistada' : 'ainda não conquistada'}`}
                >
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-full',
                      earned ? (color?.bg ?? 'bg-primary/15') : 'bg-muted',
                    )}
                  >
                    {earned ? (
                      <badge.icon
                        className={cn('size-5', color?.text ?? 'text-primary')}
                        aria-hidden="true"
                      />
                    ) : (
                      <Lock className="size-4 text-muted-foreground" aria-hidden="true" />
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-xs leading-tight font-medium text-pretty',
                      earned ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {badge.title}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
