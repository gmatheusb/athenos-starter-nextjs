'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string[]
  single?: boolean
  className?: string
}

export function Accordion({ items, defaultOpen = [], single = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen))

  function toggle(id: string) {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (single) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={cn('flex flex-col divide-y divide-[var(--border-subtle)]', className)}>
      {items.map(item => {
        const isOpen = open.has(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              className={cn(
                'flex w-full items-center justify-between gap-4 py-4 px-1',
                'text-left text-sm font-medium text-[var(--text-primary)]',
                'transition-colors duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-inset',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                !item.disabled && 'hover:text-[var(--acc-img)]',
              )}
            >
              {item.title}
              <ChevronDown
                size={16}
                className={cn(
                  'shrink-0 text-[var(--text-muted-dim)] transition-transform duration-base',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div
                id={`accordion-${item.id}`}
                role="region"
                className="pb-4 px-1 text-sm text-[var(--text-muted)] leading-relaxed"
                style={{ animation: 'fade-in-up 180ms ease both' }}
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
