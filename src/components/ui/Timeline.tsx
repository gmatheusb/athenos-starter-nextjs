import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type TimelineVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp?: string
  icon?: ReactNode
  variant?: TimelineVariant
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

const dotColor: Record<TimelineVariant, string> = {
  default: 'bg-[var(--border-strong)]',
  success: 'bg-[var(--semantic-success)]',
  error:   'bg-[var(--semantic-error)]',
  warning: 'bg-[var(--semantic-warning)]',
  info:    'bg-[var(--semantic-info)]',
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1
        const variant = event.variant ?? 'default'

        return (
          <li key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--bg-canvas)]">
                {event.icon ? (
                  <span className="text-[var(--text-muted)]" aria-hidden="true">{event.icon}</span>
                ) : (
                  <span className={cn('h-2 w-2 rounded-full', dotColor[variant])} />
                )}
              </div>
              {!isLast && <div className="my-1 w-px flex-1 bg-[var(--border-subtle)]" />}
            </div>

            <div className={cn('min-w-0 flex-1', isLast ? 'pb-0' : 'pb-6')}>
              <div className="mb-0.5 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-[var(--text-primary)]">{event.title}</p>
                {event.timestamp && (
                  <time className="shrink-0 text-xs text-[var(--text-muted-dim)]">{event.timestamp}</time>
                )}
              </div>
              {event.description && (
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{event.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
