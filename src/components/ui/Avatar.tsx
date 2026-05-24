import { cn } from '@/lib/utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  className?: string
}

const sizes: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-[13px]',
  lg: 'w-12 h-12 text-[15px]',
  xl: 'w-16 h-16 text-[18px]',
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = name ? getInitials(name) : '?'

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full overflow-hidden',
        'flex items-center justify-center',
        'font-semibold tracking-tight select-none',
        sizes[size],
        !src && 'text-white',
        className,
      )}
      style={!src ? { background: 'var(--grad)' } : undefined}
      aria-label={name ?? 'Avatar'}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? 'Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  )
}
