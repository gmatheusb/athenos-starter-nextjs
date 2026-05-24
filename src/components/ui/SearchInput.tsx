'use client'

import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...', disabled = false, className }: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search
        size={14}
        className="pointer-events-none absolute left-3 text-[var(--text-muted)]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-9 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]',
          'pl-8 pr-8 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
          'transition-colors duration-150 outline-none',
          'focus:border-[var(--acc-img)] focus:ring-2 focus:ring-[var(--acc-img)]/20',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      />
      {value && !disabled && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-2.5 rounded p-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
