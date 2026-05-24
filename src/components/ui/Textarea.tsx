import { cn } from '@/lib/utils'
import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export function Textarea({ label, error, hint, className, id, rows = 4, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        className={cn(
          'w-full rounded-[var(--radius-md)] px-3 py-2',
          'text-sm text-[var(--text-primary)]',
          'bg-[var(--surface-prompt)]',
          'border border-[var(--border-input)]',
          'placeholder:text-[var(--text-muted)] placeholder:opacity-40',
          'outline-none transition-all duration-fast resize-y',
          'focus:border-[var(--acc-img-border)] focus:ring-2 focus:ring-[var(--acc-img-soft)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-[rgba(239,68,68,0.5)] focus:border-[rgba(239,68,68,0.7)] focus:ring-[rgba(239,68,68,0.1)]',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} role="alert" className="text-xs text-[var(--semantic-error)]">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${textareaId}-hint`} className="text-xs text-[var(--text-muted)]">
          {hint}
        </p>
      )}
    </div>
  )
}
