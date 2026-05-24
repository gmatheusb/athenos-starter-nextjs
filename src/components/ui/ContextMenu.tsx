'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ContextMenuItem {
  label: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  children: ReactNode
  className?: string
}

interface Position { x: number; y: number }

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [pos, setPos] = useState<Position | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = () => setPos(null)
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div onContextMenu={handleContextMenu} className={cn('contents', className)}>
        {children}
      </div>

      {pos && (
        <div
          ref={menuRef}
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            'fixed z-[var(--z-modal)] min-w-[168px] overflow-hidden p-1',
            'rounded-[var(--radius-lg)] border border-[var(--border)]',
            'bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]',
            'animate-[fade-in-up_0.12s_ease-out]',
          )}
          style={{ left: pos.x, top: pos.y }}
        >
          {items.map((item, i) => {
            if (item.separator) {
              return <div key={i} className="my-1 h-px bg-[var(--border-subtle)]" role="separator" />
            }

            return (
              <button
                key={i}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setPos(null) }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-left text-sm',
                  'transition-colors duration-100',
                  !item.disabled && !item.destructive && 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                  item.destructive && !item.disabled && 'text-[var(--semantic-error)] hover:bg-[var(--semantic-error)]/10',
                  item.disabled && 'cursor-not-allowed opacity-40',
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
