'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface CollapsibleProps {
  trigger: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  disabled?: boolean
  className?: string
}

export function Collapsible({ trigger, children, defaultOpen = false, disabled = false, className }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('w-full', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-2 py-3 text-sm font-medium',
          'text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-1',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <span>{trigger}</span>
        <ChevronDown
          size={15}
          className={cn('shrink-0 text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="pb-3 text-sm text-[var(--text-muted)]">
          {children}
        </div>
      )}
    </div>
  )
}
