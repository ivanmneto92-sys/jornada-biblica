'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CHECKLIST, type Reading } from '@/lib/journey'
import type { DayRecord } from '@/lib/use-journey'

export function ReadingChecklist({
  reading,
  record,
  onToggle,
}: {
  reading: Reading
  record: DayRecord
  onToggle: (itemId: string) => void
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {CHECKLIST.map((stage) => {
        const done = stage.items.filter((item) => record.checks[item.id]).length
        return (
          <Card key={stage.id} size="sm" className="gap-3">
            <CardHeader className="gap-1">
              <CardTitle className="flex items-center justify-between gap-2 text-sm">
                <span className="font-serif text-base">{stage.title}</span>
                <span className="text-xs font-normal tabular-nums text-muted-foreground">
                  {done}/{stage.items.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {stage.items.map((item) => {
                  const checked = Boolean(record.checks[item.id])
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                        <Checkbox
                          className="mt-0.5"
                          checked={checked}
                          onCheckedChange={() => onToggle(item.id)}
                        />
                        <span className={checked ? 'text-muted-foreground line-through' : ''}>
                          {item.label(reading)}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
