'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface NavSubItem {
  label: string
  href: string
  description?: string
  icon?: ReactNode
}

interface NavItem {
  label: string
  href?: string
  children?: NavSubItem[]
  active?: boolean
}

interface NavigationMenuProps {
  items: NavItem[]
  className?: string
}

export function NavigationMenu({ items, className }: NavigationMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenIndex(i)
  }

  const close = () => {
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120)
  }

  const keep = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => item.children && open(i)}
          onMouseLeave={close}
        >
          {item.href && !item.children ? (
            <a
              href={item.href}
              className={cn(
                'flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-medium',
                'transition-colors duration-150',
                item.active
                  ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
              )}
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => item.children && (openIndex === i ? setOpenIndex(null) : open(i))}
              aria-haspopup="true"
              aria-expanded={openIndex === i}
              className={cn(
                'flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-medium',
                'transition-colors duration-150',
                item.active || openIndex === i
                  ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
              )}
            >
              {item.label}
              {item.children && (
                <ChevronDown
                  size={13}
                  className={cn('transition-transform duration-200', openIndex === i && 'rotate-180')}
                />
              )}
            </button>
          )}

          {item.children && openIndex === i && (
            <div
              className={cn(
                'absolute top-full left-0 z-[var(--z-popover)] mt-1.5 min-w-[220px] p-1.5',
                'rounded-[var(--radius-lg)] border border-[var(--border)]',
                'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
                'animate-[fade-in-up_0.12s_ease-out]',
              )}
              onMouseEnter={keep}
              onMouseLeave={close}
            >
              {item.children.map((sub, j) => (
                <a
                  key={j}
                  href={sub.href}
                  className={cn(
                    'flex items-start gap-3 rounded-[var(--radius-md)] p-2.5',
                    'text-sm transition-colors hover:bg-[var(--surface-hover)]',
                  )}
                >
                  {sub.icon && (
                    <span className="mt-0.5 shrink-0 text-[var(--text-muted)]">{sub.icon}</span>
                  )}
                  <span>
                    <span className="block font-medium text-[var(--text-primary)]">{sub.label}</span>
                    {sub.description && (
                      <span className="mt-0.5 block text-xs text-[var(--text-muted)]">{sub.description}</span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
