'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  side?: Side
  align?: Align
  className?: string
}

function getPositionClass(side: Side, align: Align): string {
  const alignMap: Record<Side, Record<Align, string>> = {
    bottom: { start: 'top-full left-0 mt-2', center: 'top-full left-1/2 -translate-x-1/2 mt-2', end: 'top-full right-0 mt-2' },
    top:    { start: 'bottom-full left-0 mb-2', center: 'bottom-full left-1/2 -translate-x-1/2 mb-2', end: 'bottom-full right-0 mb-2' },
    left:   { start: 'right-full top-0 mr-2', center: 'right-full top-1/2 -translate-y-1/2 mr-2', end: 'right-full bottom-0 mr-2' },
    right:  { start: 'left-full top-0 ml-2', center: 'left-full top-1/2 -translate-y-1/2 ml-2', end: 'left-full bottom-0 ml-2' },
  }
  return alignMap[side][align]
}

export function Popover({ trigger, children, side = 'bottom', align = 'start', className }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div className="relative inline-flex" ref={containerRef}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: 'contents' }}>
        {trigger}
      </div>

      {open && (
        <div
          role="dialog"
          className={cn(
            'absolute z-[var(--z-popover)] min-w-[200px]',
            'rounded-[var(--radius-lg)] border border-[var(--border)]',
            'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
            'animate-[fade-in-up_0.12s_ease-out]',
            getPositionClass(side, align),
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
