import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  children: ReactNode
  side?: TooltipSide
  className?: string
}

const sideClasses: Record<TooltipSide, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  return (
    <div className={cn('group relative inline-flex', className)}>
      {children}
      <div
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-[var(--z-tooltip)] whitespace-nowrap',
          'rounded-[var(--radius-md)] px-2.5 py-1.5',
          'bg-[var(--text-primary)] text-[11px] font-medium',
          'text-[var(--bg-canvas)]',
          'opacity-0 scale-95',
          'transition-all duration-fast',
          'group-hover:opacity-100 group-hover:scale-100',
          sideClasses[side],
        )}
      >
        {content}
      </div>
    </div>
  )
}
