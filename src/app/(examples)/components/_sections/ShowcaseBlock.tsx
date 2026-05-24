import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ShowcaseBlockProps {
  title: string
  description?: string
  children: ReactNode
  contentClassName?: string
  wide?: boolean
}

export function ShowcaseBlock({ title, description, children, contentClassName, wide = false }: ShowcaseBlockProps) {
  return (
    <div className={cn(
      'overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-modal)]',
      wide && 'col-span-full',
    )}>
      <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-deep)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
        {description && <p className="mt-0.5 text-xs text-[var(--text-muted)]">{description}</p>}
      </div>
      <div className={cn('p-5', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
