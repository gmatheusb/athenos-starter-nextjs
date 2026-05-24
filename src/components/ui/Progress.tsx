import { cn } from '@/lib/utils'

type ProgressVariant = 'default' | 'success' | 'error'
type ProgressSize = 'sm' | 'md'

interface ProgressProps {
  value: number
  variant?: ProgressVariant
  size?: ProgressSize
  label?: string
  showValue?: boolean
  className?: string
}

const trackHeight: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
}

const fillStyle: Record<ProgressVariant, string> = {
  default: 'bg-[image:var(--grad-progress)]',
  success: 'bg-[var(--semantic-success)]',
  error:   'bg-[var(--semantic-error)]',
}

export function Progress({ value, variant = 'default', size = 'md', label, showValue, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-[11px] font-medium text-[var(--text-muted)]">{label}</span>
          )}
          {showValue && (
            <span className="text-[11px] font-semibold tabular-nums text-[var(--text-primary)]">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progresso'}
        className={cn(
          'w-full overflow-hidden rounded-full',
          'bg-[var(--surface-skeleton)]',
          trackHeight[size],
        )}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-slow', fillStyle[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
