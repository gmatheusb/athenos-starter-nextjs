import { cn } from '@/lib/utils'

type SwitchSize = 'sm' | 'md'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  size?: SwitchSize
  id?: string
}

const sizes: Record<SwitchSize, { track: string; thumb: string; on: string }> = {
  sm: { track: 'w-8 h-4',   thumb: 'w-3 h-3 top-0.5 left-0.5',   on: 'translate-x-4' },
  md: { track: 'w-11 h-6',  thumb: 'w-5 h-5 top-0.5 left-0.5',   on: 'translate-x-5' },
}

export function Switch({ checked, onChange, label, description, disabled, size = 'md', id }: SwitchProps) {
  const s = sizes[size]

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-start gap-3',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative shrink-0 rounded-full transition-colors duration-base',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2',
          s.track,
          checked
            ? 'bg-[var(--acc-img)]'
            : 'bg-[var(--surface-skeleton)]',
        )}
      >
        <span
          className={cn(
            'absolute rounded-full bg-white shadow-sm transition-transform duration-base',
            s.thumb,
            checked && s.on,
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col gap-0.5 pt-0.5">
          {label && <span className="text-sm text-[var(--text-primary)]">{label}</span>}
          {description && <span className="text-xs text-[var(--text-muted)]">{description}</span>}
        </div>
      )}
    </label>
  )
}
