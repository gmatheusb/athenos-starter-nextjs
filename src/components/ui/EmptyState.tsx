import { cn } from '@/lib/utils'
import { Button } from './Button'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'px-6 py-12 gap-4',
        className,
      )}
    >
      {icon && (
        <div
          className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-deep)] text-[var(--text-muted-dim)]"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-[280px]">
        <p className="text-[15px] font-semibold text-[var(--text-primary)]">{title}</p>
        {description && (
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
        )}
      </div>
      {action && (
        <Button variant={action.variant ?? 'primary'} size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
