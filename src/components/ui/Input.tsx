import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
}

export function Input({ label, error, hint, leftIcon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted-dim)]">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full rounded-[var(--radius-md)] px-3 py-2',
            'text-sm text-[var(--text-primary)]',
            'bg-[var(--surface-prompt)]',
            'border border-[var(--border-input)]',
            'placeholder:text-[var(--text-muted)] placeholder:opacity-40',
            'outline-none transition-all duration-fast',
            'focus:border-[var(--acc-img-border)] focus:ring-2 focus:ring-[var(--acc-img-soft)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[rgba(239,68,68,0.5)] focus:border-[rgba(239,68,68,0.7)] focus:ring-[rgba(239,68,68,0.1)]',
            leftIcon && 'pl-9',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-[var(--semantic-error)]">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--text-muted)]">
          {hint}
        </p>
      )}
    </div>
  )
}
