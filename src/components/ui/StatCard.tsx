import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { ReactNode } from 'react'

type Trend = 'up' | 'down' | 'neutral'

interface StatCardProps {
  value: string | number
  label: string
  description?: string
  icon?: ReactNode
  trend?: Trend
  trendValue?: string
  className?: string
}

const trendConfig: Record<Trend, { icon: typeof TrendingUp; color: string }> = {
  up:      { icon: TrendingUp,   color: 'text-[var(--semantic-success)]' },
  down:    { icon: TrendingDown, color: 'text-[var(--semantic-error)]' },
  neutral: { icon: Minus,        color: 'text-[var(--text-muted)]' },
}

export function StatCard({ value, label, description, icon, trend, trendValue, className }: StatCardProps) {
  const tc = trend ? trendConfig[trend] : null
  const TrendIcon = tc?.icon

  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--border)]',
        'bg-[var(--surface)] p-5',
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-[var(--text-muted)]">{label}</p>
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-deep)] text-[var(--text-muted)]">
            {icon}
          </span>
        )}
      </div>

      <p className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">{value}</p>

      {(trendValue || description) && (
        <div className="mt-2 flex items-center gap-1.5">
          {TrendIcon && trendValue && (
            <span className={cn('flex items-center gap-0.5 text-xs font-medium', tc?.color)}>
              <TrendIcon size={13} />
              {trendValue}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-muted-dim)]">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}
