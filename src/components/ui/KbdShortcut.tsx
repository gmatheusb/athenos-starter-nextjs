import { cn } from '@/lib/utils'

interface KbdShortcutProps {
  keys: string[]
  size?: 'sm' | 'md'
  className?: string
}

export function KbdShortcut({ keys, size = 'md', className }: KbdShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {keys.map((key, i) => (
        <kbd
          key={i}
          className={cn(
            'inline-flex items-center justify-center rounded border',
            'border-[var(--border)] bg-[var(--surface)] font-sans font-medium',
            'text-[var(--text-muted)] shadow-[0_1px_0_var(--border-strong)]',
            size === 'sm' && 'h-4 min-w-4 px-1 text-[9px]',
            size === 'md' && 'h-5 min-w-5 px-1.5 text-[10px]',
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}
