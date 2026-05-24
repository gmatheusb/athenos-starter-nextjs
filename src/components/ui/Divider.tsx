import { cn } from '@/lib/utils'

interface DividerProps {
  label?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Divider({ label, orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-[var(--border-subtle)]', className)}
      />
    )
  }

  if (label) {
    return (
      <div role="separator" className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        <span className="text-[11px] font-medium whitespace-nowrap text-[var(--text-muted-dim)]">
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      </div>
    )
  }

  return (
    <hr
      role="separator"
      className={cn('border-0 border-t border-[var(--border-subtle)]', className)}
    />
  )
}
