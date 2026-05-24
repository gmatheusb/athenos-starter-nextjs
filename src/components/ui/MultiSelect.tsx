'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  max?: number
  disabled?: boolean
  label?: string
  error?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
  searchPlaceholder = 'Buscar...',
  max,
  disabled = false,
  label,
  error,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

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

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else if (!max || value.length < max) {
      onChange([...value, optValue])
    }
  }

  const remove = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optValue))
  }

  const selectedLabels = value.map((v) => options.find((o) => o.value === v)?.label ?? v)

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      )}

      <div className="relative">
        <div
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={cn(
            'flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-[var(--radius-md)]',
            'border border-[var(--border)] bg-[var(--surface)] px-3 py-2 pr-8 text-sm',
            'cursor-pointer transition-colors duration-150 outline-none',
            open && 'border-[var(--acc-img)] ring-2 ring-[var(--acc-img)]/20',
            error && !open && 'border-[var(--semantic-error)]',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {selectedLabels.length === 0 && (
            <span className="text-[var(--text-muted)]">{placeholder}</span>
          )}
          {selectedLabels.map((label, i) => (
            <span
              key={value[i]}
              className="flex items-center gap-1 rounded-full bg-[var(--acc-img)]/10 px-2 py-0.5 text-xs font-medium text-[var(--acc-img)]"
            >
              {label}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => remove(value[i], e)}
                  aria-label={`Remover ${label}`}
                  className="opacity-60 hover:opacity-100 focus-visible:outline-none"
                >
                  <X size={10} />
                </button>
              )}
            </span>
          ))}

          <ChevronDown
            size={14}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </div>

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

            {max && (
              <p className="px-3 pt-2 text-[10px] text-[var(--text-muted-dim)]">
                {value.length}/{max} selecionados
              </p>
            )}

            <ul role="listbox" aria-multiselectable="true" className="max-h-56 overflow-y-auto p-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-[var(--text-muted)]">Nenhum resultado</li>
              )}
              {filtered.map((opt) => {
                const isSelected = value.includes(opt.value)
                const atMax = !!max && value.length >= max && !isSelected

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => !opt.disabled && !atMax && toggle(opt.value)}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm',
                      'text-[var(--text-secondary)] transition-colors duration-100',
                      !opt.disabled && !atMax && 'hover:bg-[var(--surface-hover)]',
                      (opt.disabled || atMax) && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded',
                        'border transition-colors duration-100',
                        isSelected
                          ? 'border-[var(--acc-img)] bg-[var(--acc-img)]'
                          : 'border-[var(--border-strong)] bg-transparent',
                      )}
                    >
                      {isSelected && <Check size={10} className="text-white" />}
                    </span>
                    {opt.label}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[var(--semantic-error)]">{error}</p>}
    </div>
  )
}
