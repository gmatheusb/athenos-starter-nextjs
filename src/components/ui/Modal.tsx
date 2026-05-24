'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: ReactNode
  size?: ModalSize
  className?: string
}

const sizes: Record<ModalSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[540px]',
  lg: 'max-w-[680px]',
}

export function Modal({ open, onClose, title, description, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[var(--z-overlay)] bg-black/50 backdrop-blur-sm"
        style={{ animation: 'modal-backdrop-in 200ms ease both' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn('fixed left-1/2 top-1/2 z-[var(--z-modal)] w-full px-4', sizes[size])}
      >
        <div
          className={cn(
            'relative rounded-[var(--radius-xl)]',
            'bg-[var(--bg-modal)] border border-[var(--border)]',
            'shadow-[var(--shadow-lg)] p-6',
            className,
          )}
          style={{ animation: 'modal-in 220ms cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          {(title || description) && (
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-[17px] font-semibold tracking-[-0.2px] text-[var(--text-primary)]"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="shrink-0 p-1.5 rounded-[var(--radius-md)] text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors duration-fast"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {!title && !description && (
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 p-1.5 rounded-[var(--radius-md)] text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors duration-fast"
            >
              <X size={16} />
            </button>
          )}

          {children}
        </div>
      </div>
    </>
  )
}
