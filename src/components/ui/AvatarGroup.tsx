import { cn } from '@/lib/utils'
import { Avatar } from './Avatar'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarGroupItem {
  src?: string
  name?: string
}

interface AvatarGroupProps {
  avatars: AvatarGroupItem[]
  max?: number
  size?: AvatarSize
  className?: string
}

const overlap: Record<AvatarSize, string> = {
  xs: '-ml-1.5',
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3',
}

const overflowSize: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-10 h-10 text-[11px]',
  lg: 'w-12 h-12 text-[12px]',
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={cn('flex items-center', className)} aria-label={`${avatars.length} participantes`}>
      {visible.map((avatar, i) => (
        <div
          key={i}
          className={cn('rounded-full ring-2 ring-[var(--bg-canvas)]', i > 0 && overlap[size])}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full',
            'ring-2 ring-[var(--bg-canvas)]',
            'border border-[var(--border)] bg-[var(--surface-deep)]',
            'font-semibold text-[var(--text-muted)]',
            overflowSize[size],
            overlap[size],
          )}
          style={{ zIndex: 0 }}
          aria-label={`+${overflow} mais`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
