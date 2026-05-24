import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pill'
  className?: string
}

export function Tabs({ tabs, active, onChange, variant = 'underline', className }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div
        role="tablist"
        className={cn(
          'inline-flex gap-1 p-1 rounded-[var(--radius-lg)]',
          'bg-[var(--surface-deep)] border border-[var(--border-subtle)]',
          className,
        )}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5',
              'text-sm font-medium rounded-[var(--radius-md)]',
              'transition-all duration-fast',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              active === tab.id
                ? 'bg-[var(--bg-modal)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      role="tablist"
      className={cn('flex border-b border-[var(--border-subtle)]', className)}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={active === tab.id}
          disabled={tab.disabled}
          onClick={() => !tab.disabled && onChange(tab.id)}
          className={cn(
            'inline-flex items-center gap-1.5 px-4 py-2.5',
            'text-sm font-medium border-b-2 -mb-px',
            'transition-all duration-fast',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-inset',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            active === tab.id
              ? 'border-[var(--acc-img)] text-[var(--acc-img)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
          )}
        >
          {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
