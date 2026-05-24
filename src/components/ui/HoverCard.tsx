'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Side = 'top' | 'bottom' | 'left' | 'right'

interface HoverCardProps {
  trigger: ReactNode
  children: ReactNode
  side?: Side
  openDelay?: number
  closeDelay?: number
  className?: string
}

const contentPosition: Record<Side, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function HoverCard({ trigger, children, side = 'bottom', openDelay = 300, closeDelay = 150, className }: HoverCardProps) {
  const [open, setOpen] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => setOpen(true), openDelay)
  }

  const hide = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay)
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {trigger}

      {open && (
        <div
          className={cn(
            'absolute z-[var(--z-popover)] w-64',
            'rounded-[var(--radius-lg)] border border-[var(--border)]',
            'bg-[var(--bg-modal)] p-4 shadow-[var(--shadow-lg)]',
            'animate-[fade-in-up_0.15s_ease-out]',
            contentPosition[side],
            className,
          )}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {children}
        </div>
      )}
    </div>
  )
}
