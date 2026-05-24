'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: string
  variant: ToastVariant
  message: string
  duration: number
}

interface ToastContextValue {
  add: (variant: ToastVariant, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')

  return {
    success: (message: string, duration?: number) => ctx.add('success', message, duration),
    error:   (message: string, duration?: number) => ctx.add('error',   message, duration),
    warning: (message: string, duration?: number) => ctx.add('warning', message, duration),
    info:    (message: string, duration?: number) => ctx.add('info',    message, duration),
  }
}

// ── Styles ────────────────────────────────────────────────────────────

const styles: Record<ToastVariant, { border: string; icon: string }> = {
  success: { border: 'border-[rgba(16,185,129,0.25)]',  icon: 'text-[var(--semantic-success)]' },
  error:   { border: 'border-[rgba(239,68,68,0.25)]',   icon: 'text-[var(--semantic-error)]'   },
  warning: { border: 'border-[rgba(245,158,11,0.25)]',  icon: 'text-[var(--semantic-warning)]' },
  info:    { border: 'border-[rgba(96,165,250,0.25)]',  icon: 'text-[var(--semantic-info)]'    },
}

const icons: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error:   AlertCircle,
  warning: AlertTriangle,
  info:    Info,
}

// ── Single toast card ─────────────────────────────────────────────────

interface ToastCardProps extends ToastItem {
  onDismiss: (id: string) => void
}

function ToastCard({ id, variant, message, duration, onDismiss }: ToastCardProps) {
  const [exiting, setExiting] = useState(false)
  const Icon = icons[variant]
  const s = styles[variant]

  function dismiss() {
    setExiting(true)
    setTimeout(() => onDismiss(id), 240)
  }

  useEffect(() => {
    const t = setTimeout(dismiss, duration)
    return () => clearTimeout(t)
  }, [duration])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-3.5 pr-3',
        'min-w-[280px] max-w-[360px]',
        'rounded-[var(--radius-lg)] border bg-[var(--bg-modal)]',
        'shadow-[var(--shadow-md)]',
        s.border,
      )}
      style={{
        animation: exiting
          ? 'toast-out 240ms ease forwards'
          : 'toast-in 300ms cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      <Icon size={16} className={cn('mt-0.5 shrink-0', s.icon)} aria-hidden="true" />
      <p className="flex-1 text-sm leading-snug text-[var(--text-primary)]">{message}</p>
      <button
        onClick={dismiss}
        aria-label="Fechar notificação"
        className="shrink-0 p-1 rounded-[var(--radius-sm)] text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors duration-fast"
      >
        <X size={14} />
      </button>
    </div>
  )
}

// ── Provider ──────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const add = useCallback((variant: ToastVariant, message: string, duration = 4000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, variant, message, duration }])
  }, [])

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {toasts.length > 0 && (
        <div
          aria-label="Notificações"
          className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col items-end gap-2"
        >
          {toasts.map(t => (
            <ToastCard key={t.id} {...t} onDismiss={dismiss} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
