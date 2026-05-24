'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  group?: string
  onSelect: () => void
}

interface CommandPaletteProps {
  items: CommandItem[]
  placeholder?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ items, placeholder = 'Buscar...', open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const open = controlledOpen ?? internalOpen

  function setOpen(next: boolean) {
    setInternalOpen(next)
    onOpenChange?.(next)
    if (!next) setQuery('')
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setFocused(0)
    }
  }, [open])

  const filtered = query.trim()
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : items

  const groups: Record<string, CommandItem[]> = {}
  const ungrouped: CommandItem[] = []
  for (const item of filtered) {
    item.group ? (groups[item.group] = [...(groups[item.group] ?? []), item]) : ungrouped.push(item)
  }
  const flat = [...ungrouped, ...Object.values(groups).flat()]

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(i => Math.min(i + 1, flat.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && flat[focused]) { flat[focused].onSelect(); setOpen(false) }
    else if (e.key === 'Escape') setOpen(false)
  }

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[var(--z-overlay)] bg-black/50 backdrop-blur-sm"
        style={{ animation: 'modal-backdrop-in 150ms ease both' }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        className="fixed left-1/2 top-[20%] z-[var(--z-modal)] w-full max-w-[520px] -translate-x-1/2 px-4"
        style={{ animation: 'modal-in 200ms cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-modal)] shadow-[var(--shadow-lg)]">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4">
            <Search size={16} className="shrink-0 text-[var(--text-muted-dim)]" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setFocused(0) }}
              onKeyDown={handleKey}
              placeholder={placeholder}
              className="h-12 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted-dim)]"
              aria-autocomplete="list"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[var(--text-muted-dim)] hover:text-[var(--text-muted)]" aria-label="Limpar">
                <X size={14} />
              </button>
            )}
            <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted-dim)]">Esc</kbd>
          </div>

          <div className="max-h-[320px] overflow-y-auto p-1.5" role="listbox">
            {flat.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--text-muted)]">Nenhum resultado.</p>
            ) : (
              <>
                {ungrouped.map(item => (
                  <CommandRow key={item.id} item={item} isFocused={flat.indexOf(item) === focused}
                    onSelect={() => { item.onSelect(); setOpen(false) }}
                    onHover={() => setFocused(flat.indexOf(item))}
                  />
                ))}
                {Object.entries(groups).map(([group, groupItems]) => (
                  <div key={group}>
                    <p className="px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-dim)]">
                      {group}
                    </p>
                    {groupItems.map(item => (
                      <CommandRow key={item.id} item={item} isFocused={flat.indexOf(item) === focused}
                        onSelect={() => { item.onSelect(); setOpen(false) }}
                        onHover={() => setFocused(flat.indexOf(item))}
                      />
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-[var(--border-subtle)] px-4 py-2.5">
            <span className="text-[10px] text-[var(--text-muted-dim)]">
              <kbd className="mr-1 rounded border border-[var(--border)] px-1 py-0.5">↑↓</kbd>navegar
            </span>
            <span className="text-[10px] text-[var(--text-muted-dim)]">
              <kbd className="mr-1 rounded border border-[var(--border)] px-1 py-0.5">↵</kbd>selecionar
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

interface CommandRowProps {
  item: CommandItem
  isFocused: boolean
  onSelect: () => void
  onHover: () => void
}

function CommandRow({ item, isFocused, onSelect, onHover }: CommandRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isFocused}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2.5 py-2',
        'text-left transition-colors duration-fast focus-visible:outline-none',
        isFocused
          ? 'bg-[var(--acc-img-soft)] text-[var(--acc-img)]'
          : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
      )}
    >
      {item.icon && (
        <span className={cn('shrink-0', isFocused ? 'text-[var(--acc-img)]' : 'text-[var(--text-muted-dim)]')} aria-hidden="true">
          {item.icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.label}</p>
        {item.description && (
          <p className={cn('truncate text-xs', isFocused ? 'text-[var(--acc-img-mid)]' : 'text-[var(--text-muted)]')}>
            {item.description}
          </p>
        )}
      </div>
    </button>
  )
}
