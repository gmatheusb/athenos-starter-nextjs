import { cn } from '@/lib/utils'
import { Info, Lightbulb, AlertTriangle, AlertCircle, BookOpen } from 'lucide-react'
import type { ReactNode } from 'react'

type CalloutVariant = 'info' | 'tip' | 'warning' | 'error' | 'note'

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

const styles: Record<CalloutVariant, { wrap: string; accent: string }> = {
  info:    { wrap: 'bg-[rgba(37,99,235,0.06)] border-l-[var(--semantic-info)]',    accent: 'text-[var(--semantic-info)]' },
  tip:     { wrap: 'bg-[rgba(22,163,74,0.06)] border-l-[var(--semantic-success)]', accent: 'text-[var(--semantic-success)]' },
  warning: { wrap: 'bg-[rgba(217,119,6,0.06)] border-l-[var(--semantic-warning)]', accent: 'text-[var(--semantic-warning)]' },
  error:   { wrap: 'bg-[rgba(239,68,68,0.06)] border-l-[var(--semantic-error)]',   accent: 'text-[var(--semantic-error)]' },
  note:    { wrap: 'bg-[var(--surface-deep)] border-l-[var(--border-strong)]',      accent: 'text-[var(--text-muted)]' },
}

const calloutIcons: Record<CalloutVariant, typeof Info> = {
  info:    Info,
  tip:     Lightbulb,
  warning: AlertTriangle,
  error:   AlertCircle,
  note:    BookOpen,
}

const defaultTitles: Record<CalloutVariant, string> = {
  info:    'Informação',
  tip:     'Dica',
  warning: 'Atenção',
  error:   'Erro',
  note:    'Nota',
}

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const s = styles[variant]
  const Icon = calloutIcons[variant]

  return (
    <div className={cn('rounded-r-[var(--radius-lg)] border-l-4 p-4', s.wrap, className)}>
      <div className={cn('mb-1.5 flex items-center gap-2', s.accent)}>
        <Icon size={14} aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          {title ?? defaultTitles[variant]}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </div>
  )
}
