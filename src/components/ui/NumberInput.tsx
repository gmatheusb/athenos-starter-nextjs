import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  error?: string
  hint?: string
}

export function NumberInput({ value, onChange, min, max, step = 1, label, error, hint, className, disabled, id }: NumberInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  function increment() {
    const next = value + step
    if (max !== undefined && next > max) return
    onChange(next)
  }

  function decrement() {
    const next = value - step
    if (min !== undefined && next < min) return
    onChange(next)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
        >
          {label}
        </label>
      )}
      <div className={cn(
        'inline-flex items-center overflow-hidden',
        'rounded-[var(--radius-md)] border border-[var(--border-input)]',
        'bg-[var(--surface-prompt)]',
        error && 'border-[rgba(239,68,68,0.5)]',
        disabled && 'opacity-50',
      )}>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || (min !== undefined && value <= min)}
          aria-label="Diminuir"
          className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--text-muted)] transition-colors duration-fast hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>
        <input
          id={inputId}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-invalid={!!error}
          className="h-9 w-16 bg-transparent text-center text-sm font-medium tabular-nums text-[var(--text-primary)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && value >= max)}
          aria-label="Aumentar"
          className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--text-muted)] transition-colors duration-fast hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>
      {error && <p role="alert" className="text-xs text-[var(--semantic-error)]">{error}</p>}
      {hint && !error && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}
    </div>
  )
}
