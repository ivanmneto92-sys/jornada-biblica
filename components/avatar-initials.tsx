import { avatarColor, initials } from '@/lib/avatar-color'
import { cn } from '@/lib/utils'

export function AvatarInitials({ name, className }: { name: string; className?: string }) {
  const color = avatarColor(name || '?')
  return (
    <span
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-full font-serif text-base font-medium',
        color.bg,
        color.text,
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
