import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import type { ReactNode } from 'react'

interface ShowcaseBlockProps {
  title: string
  description?: string
  children: ReactNode
  contentClassName?: string
  wide?: boolean
}

export function ShowcaseBlock({ title, description, children, contentClassName, wide = false }: ShowcaseBlockProps) {
  const id = title.replace(/\s+/g, '')
  return (
    <Card id={id} data-showcase={title} className={cn('p-0', wide && 'col-span-full')}>
      <div className="rounded-t-xl border-b border-[var(--border-subtle)] bg-[var(--surface-deep)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
        {description && (
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      <div className={cn('p-5', contentClassName)}>
        {children}
      </div>
    </Card>
  )
}
