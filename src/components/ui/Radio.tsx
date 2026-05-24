import { cn } from '@/lib/utils'

interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  label?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  label,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label && (
        <legend className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)] mb-1">
          {label}
        </legend>
      )}
      <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
        {options.map(opt => (
          <label
            key={opt.value}
            className={cn(
              'flex items-start gap-2.5',
              opt.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            )}
          >
            <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => !opt.disabled && onChange(opt.value)}
                disabled={opt.disabled}
                className="peer sr-only"
              />
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center',
                  'rounded-full border border-[var(--border-input)]',
                  'bg-[var(--surface-prompt)]',
                  'transition-all duration-fast',
                  'peer-checked:border-[var(--acc-img)]',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--acc-img-soft)] peer-focus-visible:ring-offset-1',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full bg-[var(--acc-img)]',
                    'scale-0 transition-transform duration-fast',
                    value === opt.value && 'scale-100',
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[var(--text-primary)]">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-[var(--text-muted)]">{opt.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
