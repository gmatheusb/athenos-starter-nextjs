import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ScrollAreaProps {
  children: ReactNode
  className?: string
  orientation?: 'vertical' | 'horizontal' | 'both'
}

export function ScrollArea({ children, className, orientation = 'vertical' }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        'scroll-area',
        orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
        orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
        orientation === 'both' && 'overflow-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}
