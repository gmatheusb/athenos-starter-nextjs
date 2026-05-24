import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

type AlertVariant = 'error' | 'success' | 'warning' | 'info'

const alertStyles: Record<AlertVariant, { container: string; icon: string }> = {
  error: {
    container: 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-[var(--semantic-error)]',
    icon: 'text-[var(--semantic-error)]',
  },
  success: {
    container: 'bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)] text-[var(--semantic-success)]',
    icon: 'text-[var(--semantic-success)]',
  },
  warning: {
    container: 'bg-[rgba(245,158,11,0.07)] border-[rgba(245,158,11,0.2)] text-[var(--semantic-warning)]',
    icon: 'text-[var(--semantic-warning)]',
  },
  info: {
    container: 'bg-[rgba(96,165,250,0.08)] border-[rgba(96,165,250,0.2)] text-[var(--semantic-info)]',
    icon: 'text-[var(--semantic-info)]',
  },
}

const icons: Record<AlertVariant, typeof AlertCircle> = {
  error:   AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info:    Info,
}

interface AlertProps {
  variant?: AlertVariant
  children: ReactNode
  className?: string
}

export function Alert({ variant = 'error', children, className }: AlertProps) {
  const styles = alertStyles[variant]
  const Icon = icons[variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2.5 p-3',
        'rounded-[var(--radius-md)]',
        'text-sm border',
        styles.container,
        className,
      )}
    >
      <Icon size={16} className={cn('mt-0.5 shrink-0', styles.icon)} aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
