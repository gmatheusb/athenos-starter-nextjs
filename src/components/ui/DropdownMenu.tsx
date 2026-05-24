'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  icon?: ReactNode
  onClick?: () => void
  variant?: 'default' | 'destructive'
  disabled?: boolean
}

interface DropdownSeparator {
  separator: true
}

type DropdownEntry = DropdownItem | DropdownSeparator

interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownEntry[]
  align?: 'left' | 'right'
  className?: string
}

function isSeparator(item: DropdownEntry): item is DropdownSeparator {
  return 'separator' in item
}

export function DropdownMenu({ trigger, items, align = 'right', className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <div onClick={() => setOpen(v => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            'absolute top-full mt-1.5 z-[var(--z-modal)]',
            'min-w-[180px] py-1',
            'rounded-[var(--radius-lg)] border border-[var(--border)]',
            'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
          style={{ animation: 'fade-in-up 150ms ease both' }}
          role="menu"
        >
          {items.map((item, i) =>
            isSeparator(item) ? (
              <div key={`sep-${i}`} className="my-1 border-t border-[var(--border-subtle)]" />
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2',
                  'text-sm text-left transition-colors duration-fast',
                  'focus-visible:outline-none focus-visible:bg-[var(--surface-hover)]',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  item.variant === 'destructive'
                    ? 'text-[var(--semantic-error)] hover:bg-[rgba(239,68,68,0.06)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
                )}
              >
                {item.icon && (
                  <span className="shrink-0 text-[var(--text-muted-dim)]" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
