import { cn } from '@/lib/utils'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Megaphone } from 'lucide-react'
import type { ReactNode } from 'react'

type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

interface BannerProps {
  variant?: BannerVariant
  children: ReactNode
  onClose?: () => void
  action?: { label: string; onClick: () => void }
  className?: string
}

const styles: Record<BannerVariant, string> = {
  default: 'bg-[var(--surface-deep)] border-[var(--border)] text-[var(--text-primary)]',
  info:    'bg-[rgba(37,99,235,0.08)] border-[rgba(37,99,235,0.2)] text-[var(--semantic-info)]',
  success: 'bg-[rgba(22,163,74,0.08)] border-[rgba(22,163,74,0.2)] text-[var(--semantic-success)]',
  warning: 'bg-[rgba(217,119,6,0.08)] border-[rgba(217,119,6,0.2)] text-[var(--semantic-warning)]',
  error:   'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-[var(--semantic-error)]',
}

const icons: Record<BannerVariant, typeof Info> = {
  default: Megaphone,
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error:   AlertCircle,
}

export function Banner({ variant = 'default', children, onClose, action, className }: BannerProps) {
  const Icon = icons[variant]

  return (
    <div
      className={cn(
        'flex items-center gap-3 border px-4 py-3',
        styles[variant],
        className,
      )}
    >
      <Icon size={15} className="shrink-0" aria-hidden="true" />
      <p className="flex-1 text-sm">{children}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 text-xs font-semibold underline underline-offset-2 hover:no-underline transition-all focus-visible:outline-none"
        >
          {action.label}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
