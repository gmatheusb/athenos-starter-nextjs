'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  withSeconds?: boolean
  disabled?: boolean
  label?: string
  error?: string
  hint?: string
  className?: string
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function TimeInput({ value, onChange, withSeconds = false, disabled = false, label, error, hint, className }: TimeInputProps) {
  const parts = value.split(':')
  const hh = parts[0] ?? '00'
  const mm = parts[1] ?? '00'
  const ss = parts[2] ?? '00'

  const mmRef = useRef<HTMLInputElement>(null)
  const ssRef = useRef<HTMLInputElement>(null)

  const emit = (h: string, m: string, s: string) => {
    onChange(withSeconds ? `${h}:${m}:${s}` : `${h}:${m}`)
  }

  const handleHH = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 2)
    const n = Number(digits)
    const val = pad(clamp(n, 0, 23))
    emit(val, mm, ss)
    if (digits.length === 2) mmRef.current?.focus()
  }

  const handleMM = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 2)
    const n = Number(digits)
    const val = pad(clamp(n, 0, 59))
    emit(hh, val, ss)
    if (digits.length === 2 && withSeconds) ssRef.current?.focus()
  }

  const handleSS = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 2)
    const n = Number(digits)
    emit(hh, mm, pad(clamp(n, 0, 59)))
  }

  const handleWheel = (field: 'hh' | 'mm' | 'ss', delta: number) => {
    if (field === 'hh') emit(pad(clamp(Number(hh) - delta, 0, 23)), mm, ss)
    if (field === 'mm') emit(hh, pad(clamp(Number(mm) - delta, 0, 59)), ss)
    if (field === 'ss') emit(hh, mm, pad(clamp(Number(ss) - delta, 0, 59)))
  }

  const segmentClass = cn(
    'w-9 bg-transparent text-center text-sm font-medium text-[var(--text-primary)]',
    'outline-none focus:text-[var(--acc-img)]',
    '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',
    disabled && 'cursor-not-allowed',
  )

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>}

      <div
        className={cn(
          'inline-flex h-10 items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3',
          'transition-colors duration-150 focus-within:border-[var(--acc-img)] focus-within:ring-2 focus-within:ring-[var(--acc-img)]/20',
          error && 'border-[var(--semantic-error)]',
          disabled && 'opacity-50',
        )}
      >
        <input
          type="number"
          min={0} max={23}
          value={hh}
          disabled={disabled}
          onChange={(e) => handleHH(e.target.value)}
          onFocus={(e) => e.target.select()}
          onWheel={(e) => { e.preventDefault(); handleWheel('hh', e.deltaY > 0 ? 1 : -1) }}
          aria-label="Hora"
          className={segmentClass}
        />
        <span className="text-sm font-medium text-[var(--text-muted)]">:</span>
        <input
          ref={mmRef}
          type="number"
          min={0} max={59}
          value={mm}
          disabled={disabled}
          onChange={(e) => handleMM(e.target.value)}
          onFocus={(e) => e.target.select()}
          onWheel={(e) => { e.preventDefault(); handleWheel('mm', e.deltaY > 0 ? 1 : -1) }}
          aria-label="Minuto"
          className={segmentClass}
        />
        {withSeconds && (
          <>
            <span className="text-sm font-medium text-[var(--text-muted)]">:</span>
            <input
              ref={ssRef}
              type="number"
              min={0} max={59}
              value={ss}
              disabled={disabled}
              onChange={(e) => handleSS(e.target.value)}
              onFocus={(e) => e.target.select()}
              onWheel={(e) => { e.preventDefault(); handleWheel('ss', e.deltaY > 0 ? 1 : -1) }}
              aria-label="Segundo"
              className={segmentClass}
            />
          </>
        )}
      </div>

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-[var(--semantic-error)]' : 'text-[var(--text-muted)]')}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
