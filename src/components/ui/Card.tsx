import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'stat'
  clickable?: boolean
}

export function Card({ children, variant = 'default', clickable, className, ...props }: CardProps) {
  if (variant === 'stat') {
    return (
      <div
        className={cn(
          'rounded-lg p-4',
          'bg-[var(--surface-deep)]',
          'border border-[var(--border-subtle)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-xl p-4',
        'bg-[var(--surface)]',
        'border border-[var(--border)]',
        'shadow-sm',
        'transition-all duration-fast',
        clickable && 'cursor-pointer hover:bg-[var(--surface-hover)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  value: string | number
  label: string
  className?: string
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card variant="stat" className={className}>
      <p className="text-[22px] font-bold tracking-tight text-[var(--text-primary)]">{value}</p>
      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted-dim)]">
        {label}
      </p>
    </Card>
  )
}
