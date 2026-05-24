'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface SidebarSubItem {
  id: string
  label: string
}

interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  href?: string
  badge?: string | number
  disabled?: boolean
  subitems?: SidebarSubItem[]
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  activeId?: string
  onNavigate?: (id: string) => void
  header?: ReactNode
  footer?: ReactNode
  className?: string
}

export function Sidebar({ sections, activeId, onNavigate, header, footer, className }: SidebarProps) {
  return (
    <nav
      className={cn(
        'flex h-full w-60 flex-col',
        'bg-[var(--bg-panel-deep)] border-r border-[var(--border-subtle)]',
        className,
      )}
    >
      {header && (
        <div className="border-b border-[var(--border-subtle)] p-4">
          {header}
        </div>
      )}

      <div className="scroll-area flex-1 overflow-y-auto px-2 py-3">
        {sections.map((section, si) => (
          <div key={si} className={cn(si > 0 && 'mt-4')}>
            {section.title && (
              <p className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-dim)]">
                {section.title}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map(item => {
                const isActive = item.id === activeId
                const hasSubitems = !!item.subitems?.length
                const Tag = item.href ? 'a' : 'button'

                return (
                  <div key={item.id}>
                    <Tag
                      {...(item.href ? { href: item.href } : { type: 'button' as const })}
                      disabled={item.disabled}
                      onClick={() => !item.disabled && onNavigate?.(item.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2',
                        'text-sm font-medium transition-colors duration-fast',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
                        isActive
                          ? 'bg-[rgba(168,85,247,0.12)] text-[var(--acc-img)]'
                          : item.disabled
                            ? 'cursor-default text-[var(--text-muted)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn('shrink-0', isActive ? 'text-[var(--acc-img)]' : 'text-[var(--text-muted-dim)]')}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      {item.badge !== undefined && !hasSubitems && (
                        <span className={cn(
                          'flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1.5',
                          'text-[10px] font-semibold',
                          isActive
                            ? 'bg-[rgba(168,85,247,0.2)] text-[var(--acc-img)]'
                            : 'bg-[var(--surface-hover)] text-[var(--text-muted)]',
                        )}>
                          {item.badge}
                        </span>
                      )}
                      {hasSubitems && (
                        <ChevronDown
                          size={13}
                          className={cn(
                            'shrink-0 transition-transform duration-200',
                            isActive ? 'rotate-180 text-[var(--acc-img)]' : 'text-[var(--text-muted-dim)]',
                          )}
                        />
                      )}
                    </Tag>

                    {hasSubitems && isActive && (
                      <div className="mb-1 ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-[var(--border-subtle)] pl-3">
                        {item.subitems!.map(sub => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(sub.label.replace(/\s+/g, ''))
                              if (!el) return
                              let parent = el.parentElement
                              while (parent) {
                                const { overflow, overflowY } = getComputedStyle(parent)
                                if (/(auto|scroll)/.test(overflow + overflowY)) {
                                  const offset = el.getBoundingClientRect().top - parent.getBoundingClientRect().top + parent.scrollTop - 32
                                  parent.scrollTo({ top: offset, behavior: 'smooth' })
                                  break
                                }
                                parent = parent.parentElement
                              }
                              el.classList.remove('showcase-highlight')
                              void el.offsetWidth
                              el.classList.add('showcase-highlight')
                              el.addEventListener('animationend', () => el.classList.remove('showcase-highlight'), { once: true })
                            }}
                            className="truncate rounded-[var(--radius-sm)] px-2 py-1 text-left text-xs text-[var(--text-muted)] transition-colors duration-fast hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <div className="border-t border-[var(--border-subtle)] p-3">
          {footer}
        </div>
      )}
    </nav>
  )
}
