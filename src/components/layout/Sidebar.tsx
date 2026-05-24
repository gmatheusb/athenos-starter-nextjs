import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  href?: string
  badge?: string | number
  disabled?: boolean
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
        'bg-[#07080f] border-r border-[rgba(255,255,255,0.06)]',
        className,
      )}
    >
      {header && (
        <div className="border-b border-[rgba(255,255,255,0.06)] p-4">
          {header}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {sections.map((section, si) => (
          <div key={si} className={cn(si > 0 && 'mt-4')}>
            {section.title && (
              <p className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[rgba(148,163,184,0.4)]">
                {section.title}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map(item => {
                const isActive = item.id === activeId
                const Tag = item.href ? 'a' : 'button'
                return (
                  <Tag
                    key={item.id}
                    {...(item.href ? { href: item.href } : { type: 'button' as const })}
                    disabled={item.disabled}
                    onClick={() => !item.disabled && onNavigate?.(item.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2',
                      'text-sm font-medium transition-colors duration-fast',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
                      'disabled:cursor-not-allowed disabled:opacity-40',
                      isActive
                        ? 'bg-[rgba(168,85,247,0.12)] text-[#c084fc]'
                        : 'text-[rgba(148,163,184,0.65)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(226,232,240,0.9)]',
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn('shrink-0', isActive ? 'text-[#c084fc]' : 'text-[rgba(148,163,184,0.4)]')}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={cn(
                        'flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1.5',
                        'text-[10px] font-semibold',
                        isActive
                          ? 'bg-[rgba(168,85,247,0.2)] text-[#c084fc]'
                          : 'bg-[rgba(255,255,255,0.08)] text-[rgba(148,163,184,0.5)]',
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Tag>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <div className="border-t border-[rgba(255,255,255,0.06)] p-3">
          {footer}
        </div>
      )}
    </nav>
  )
}
