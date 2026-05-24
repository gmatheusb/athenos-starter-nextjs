'use client'

import { cn } from '@/lib/utils'

const PRESET_MASKS: Record<string, string> = {
  cpf:   '###.###.###-##',
  cnpj:  '##.###.###/####-##',
  phone: '(##) #####-####',
  cep:   '#####-###',
  date:  '##/##/####',
}

function applyMask(digits: string, mask: string): string {
  let result = ''
  let di = 0
  for (const char of mask) {
    if (di >= digits.length) break
    if (char === '#') {
      result += digits[di++]
    } else {
      result += char
    }
  }
  return result
}

function stripDigits(value: string): string {
  return value.replace(/\D/g, '')
}

interface MaskInputProps {
  mask: 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date' | (string & {})
  value: string
  onChange: (formatted: string, raw: string) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  error?: string
  hint?: string
  className?: string
}

export function MaskInput({ mask, value, onChange, placeholder, disabled = false, label, error, hint, className }: MaskInputProps) {
  const pattern = PRESET_MASKS[mask] ?? mask
  const maxDigits = (pattern.match(/#/g) ?? []).length

  const handleChange = (raw: string) => {
    const digits = stripDigits(raw).slice(0, maxDigits)
    const formatted = applyMask(digits, pattern)
    onChange(formatted, digits)
  }

  const derivedPlaceholder = placeholder ?? pattern.replace(/#/g, '0')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>}

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={derivedPlaceholder}
        disabled={disabled}
        className={cn(
          'h-10 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]',
          'px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
          'transition-colors duration-150 outline-none',
          'focus:border-[var(--acc-img)] focus:ring-2 focus:ring-[var(--acc-img)]/20',
          error && 'border-[var(--semantic-error)]',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      />

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-[var(--semantic-error)]' : 'text-[var(--text-muted)]')}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
