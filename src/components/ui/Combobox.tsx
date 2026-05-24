'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  clearable?: boolean
  disabled?: boolean
  label?: string
  error?: string
  className?: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
  searchPlaceholder = 'Buscar...',
  clearable = false,
  disabled = false,
  label,
  error,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selected = options.find((o) => o.value === value) ?? null
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
    else setQuery('')
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (opt: ComboboxOption) => {
    if (opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)]',
            'border border-[var(--border)] bg-[var(--surface)] px-3 text-sm',
            'transition-colors duration-150 outline-none',
            open && 'border-[var(--acc-img)] ring-2 ring-[var(--acc-img)]/20',
            error && !open && 'border-[var(--semantic-error)]',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <span className={cn('truncate', selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
            {selected?.label ?? placeholder}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {clearable && selected && (
              <span onClick={clear} className="rounded p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={12} />
              </span>
            )}
            <ChevronDown
              size={14}
              className={cn('text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')}
            />
          </span>
        </button>

        {open && (
          <div
            className={cn(
              'absolute top-full z-[var(--z-popover)] mt-1 w-full overflow-hidden',
              'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-modal)]',
              'shadow-[var(--shadow-lg)]',
              'animate-[fade-in-up_0.12s_ease-out]',
            )}
          >
            <div className="border-b border-[var(--border-subtle)] p-2">
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
              />
            </div>

            <ul role="listbox" className="max-h-56 overflow-y-auto p-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-[var(--text-muted)]">Nenhum resultado</li>
              )}
              {filtered.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => select(opt)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-sm',
                    'text-[var(--text-secondary)] transition-colors duration-100',
                    opt.value === value && 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]',
                    opt.value !== value && !opt.disabled && 'hover:bg-[var(--surface-hover)]',
                    opt.disabled && 'cursor-not-allowed opacity-40',
                  )}
                >
                  {opt.label}
                  {opt.value === value && <Check size={13} />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[var(--semantic-error)]">{error}</p>}
    </div>
  )
}
