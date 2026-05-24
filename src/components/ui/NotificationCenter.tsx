'use client'

import { cn } from '@/lib/utils'
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type NotifVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp: string
  read: boolean
  icon?: ReactNode
  variant?: NotifVariant
}

interface NotificationCenterProps {
  notifications: NotificationItem[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onDismiss: (id: string) => void
  onClearAll?: () => void
  className?: string
}

const variantDot: Record<NotifVariant, string> = {
  default: 'bg-[var(--acc-img)]',
  success: 'bg-[var(--semantic-success)]',
  error:   'bg-[var(--semantic-error)]',
  warning: 'bg-[var(--semantic-warning)]',
  info:    'bg-[var(--semantic-info)]',
}

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClearAll,
  className,
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [])

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      {/* Bell trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notificações${unread > 0 ? `, ${unread} não lidas` : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]',
          'text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
          open && 'bg-[var(--surface-hover)] text-[var(--text-primary)]',
        )}
      >
        <Bell size={18} />
        {unread > 0 && (
          <span
            className={cn(
              'absolute right-1 top-1 flex h-4 w-4 items-center justify-center',
              'rounded-full bg-[var(--semantic-error)] text-[9px] font-bold text-white',
            )}
            aria-hidden="true"
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Centro de notificações"
          className={cn(
            'absolute right-0 top-full z-[var(--z-popover)] mt-2 w-80',
            'rounded-[var(--radius-xl)] border border-[var(--border)]',
            'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
            'animate-[fade-in-up_0.12s_ease-out]',
            'overflow-hidden',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Notificações</h2>
              {unread > 0 && (
                <span className="rounded-full bg-[var(--acc-img)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--acc-img)]">
                  {unread}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unread > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  title="Marcar todas como lidas"
                  className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  <CheckCheck size={14} />
                </button>
              )}
              {onClearAll && notifications.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  title="Limpar todas"
                  className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--semantic-error)]"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="scroll-area max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <Bell size={24} className="text-[var(--text-muted-dim)]" />
                <p className="text-sm text-[var(--text-muted)]">Nenhuma notificação</p>
              </div>
            ) : (
              <ul>
                {notifications.map((notif, i) => {
                  const variant = notif.variant ?? 'default'
                  return (
                    <li
                      key={notif.id}
                      className={cn(
                        'group relative flex gap-3 px-4 py-3 transition-colors',
                        i < notifications.length - 1 && 'border-b border-[var(--border-subtle)]',
                        !notif.read && 'bg-[var(--acc-img)]/[0.03]',
                        'hover:bg-[var(--surface-hover)]',
                      )}
                    >
                      {/* Icon / dot */}
                      <div className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-deep)]">
                        {notif.icon ? (
                          <span className="text-[var(--text-muted)]">{notif.icon}</span>
                        ) : (
                          <Bell size={14} className="text-[var(--text-muted)]" />
                        )}
                        {!notif.read && (
                          <span
                            className={cn('absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[var(--bg-modal)]', variantDot[variant])}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className={cn('text-sm font-medium', notif.read ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]')}>
                          {notif.title}
                        </p>
                        {notif.description && (
                          <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">{notif.description}</p>
                        )}
                        <p className="mt-1 text-[10px] text-[var(--text-muted-dim)]">{notif.timestamp}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 flex-col items-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {!notif.read && (
                          <button
                            type="button"
                            onClick={() => onMarkRead(notif.id)}
                            title="Marcar como lida"
                            className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--semantic-success)]"
                          >
                            <Check size={12} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onDismiss(notif.id)}
                          title="Remover"
                          className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--semantic-error)]"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
