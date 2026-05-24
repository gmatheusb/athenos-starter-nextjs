import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassBarProps {
  children: ReactNode
  className?: string
}

export function GlassBar({ children, className }: GlassBarProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-[var(--z-sticky)]',
        'flex items-center justify-between',
        'px-7 py-2.5',
        'bg-[var(--glass)]',
        'backdrop-blur-[24px]',
        '[backdrop-filter:blur(24px)]',
        '[-webkit-backdrop-filter:blur(24px)]',
        'border-b border-[var(--border)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
