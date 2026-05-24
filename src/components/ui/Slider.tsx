import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, label, showValue, className, disabled }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
              {value}
            </span>
          )}
        </div>
      )}
      <div className={cn('relative flex h-5 items-center', disabled && 'opacity-50 cursor-not-allowed')}>
        <div className="absolute h-1.5 w-full rounded-full bg-[var(--surface-skeleton)]" />
        <div
          className="pointer-events-none absolute h-1.5 rounded-full"
          style={{ width: `${percentage}%`, background: 'var(--grad-progress)' }}
        />
        <div
          className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-[var(--acc-img)] bg-white shadow-sm transition-transform duration-fast"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          className="absolute h-5 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  )
}
