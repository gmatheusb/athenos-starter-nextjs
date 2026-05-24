import { cn } from '@/lib/utils'
import { Check, Minus } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  indeterminate?: boolean
}

export function Checkbox({ label, description, indeterminate, className, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'flex items-start gap-2.5',
        props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            'flex h-4 w-4 items-center justify-center',
            'rounded-[var(--radius-sm)] border border-[var(--border-input)]',
            'bg-[var(--surface-prompt)]',
            'transition-all duration-fast',
            'peer-checked:bg-[var(--acc-img)] peer-checked:border-[var(--acc-img)]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--acc-img-soft)] peer-focus-visible:ring-offset-1',
            className,
          )}
        >
          {indeterminate ? (
            <Minus size={10} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
          ) : (
            <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm text-[var(--text-primary)]">{label}</span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-muted)]">{description}</span>
          )}
        </div>
      )}
    </label>
  )
}
