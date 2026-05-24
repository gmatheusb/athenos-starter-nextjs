import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type TagVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'img' | 'vid'

const tagStyles: Record<TagVariant, string> = {
  default: 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]',
  success: 'bg-[var(--semantic-success-soft)] border-[rgba(22,163,74,0.25)] text-[var(--semantic-success)]',
  error:   'bg-[var(--semantic-error-soft)] border-[rgba(239,68,68,0.25)] text-[var(--semantic-error)]',
  warning: 'bg-[var(--semantic-warning-soft)] border-[rgba(217,119,6,0.25)] text-[var(--semantic-warning)]',
  info:    'bg-[var(--semantic-info-soft)] border-[rgba(37,99,235,0.25)] text-[var(--semantic-info)]',
  img:     'bg-[var(--acc-img-soft)] border-[var(--acc-img-border-soft)] text-[var(--acc-img)]',
  vid:     'bg-[var(--acc-vid-soft)] border-[var(--acc-vid-border-soft)] text-[var(--acc-vid)]',
}

interface TagProps {
  label: string
  variant?: TagVariant
  icon?: ReactNode
  onRemove?: () => void
  className?: string
}

export function Tag({ label, variant = 'default', icon, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1',
        'text-xs font-medium rounded-pill border',
        'transition-colors duration-fast',
        tagStyles[variant],
        className,
      )}
    >
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${label}`}
          className="shrink-0 rounded-full hover:opacity-70 transition-opacity duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      )}
    </span>
  )
}
