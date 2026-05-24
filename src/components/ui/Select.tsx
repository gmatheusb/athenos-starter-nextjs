import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({ label, error, hint, options, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          className={cn(
            'w-full appearance-none rounded-[var(--radius-md)] px-3 py-2 pr-8',
            'text-sm text-[var(--text-primary)]',
            'bg-[var(--surface-prompt)]',
            'border border-[var(--border-input)]',
            'outline-none transition-all duration-fast',
            'focus:border-[var(--acc-img-border)] focus:ring-2 focus:ring-[var(--acc-img-soft)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[rgba(239,68,68,0.5)] focus:border-[rgba(239,68,68,0.7)] focus:ring-[rgba(239,68,68,0.1)]',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted-dim)]"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${selectId}-error`} role="alert" className="text-xs text-[var(--semantic-error)]">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${selectId}-hint`} className="text-xs text-[var(--text-muted)]">
          {hint}
        </p>
      )}
    </div>
  )
}
