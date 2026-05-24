'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type DrawerSide = 'left' | 'right'
type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: DrawerSide
  title?: string
  children?: ReactNode
  size?: DrawerSize
  className?: string
}

const sizes: Record<DrawerSize, string> = {
  sm:   'max-w-[280px]',
  md:   'max-w-[380px]',
  lg:   'max-w-[520px]',
  full: 'max-w-full',
}

export function Drawer({ open, onClose, side = 'right', title, children, size = 'md', className }: DrawerProps) {
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
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'fixed bottom-0 top-0 z-[var(--z-modal)] flex w-full flex-col',
          'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
          side === 'right' ? 'right-0 border-l border-[var(--border)]' : 'left-0 border-r border-[var(--border)]',
          sizes[size],
          className,
        )}
        style={{ animation: `drawer-in-${side} 260ms cubic-bezier(0.32,0.72,0,1) both` }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] p-4">
          {title ? (
            <h2 id="drawer-title" className="text-[15px] font-semibold text-[var(--text-primary)]">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-[var(--radius-md)] text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors duration-fast"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
}
