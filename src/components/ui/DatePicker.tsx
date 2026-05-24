'use client'

import { cn } from '@/lib/utils'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

function formatDisplay(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildCalendar(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  // Convert Sunday=0 to Mon-first offset
  const offset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

interface DatePickerProps {
  value?: string
  onChange?: (iso: string | null) => void
  placeholder?: string
  min?: string
  max?: string
  clearable?: boolean
  disabled?: boolean
  label?: string
  error?: string
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Selecionar data',
  min,
  max,
  clearable = false,
  disabled = false,
  label,
  error,
  className,
}: DatePickerProps) {
  const today = toISO(new Date())
  const initial = value ? new Date(value + 'T00:00:00') : new Date()

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  const selectDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange?.(iso)
    setOpen(false)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null)
  }

  const cells = buildCalendar(viewYear, viewMonth)

  const isDisabled = (day: number): boolean => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    if (min && iso < min) return true
    if (max && iso > max) return true
    return false
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            'flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)]',
            'border border-[var(--border)] bg-[var(--surface)] px-3 text-sm',
            'transition-colors duration-150 outline-none',
            open && 'border-[var(--acc-img)] ring-2 ring-[var(--acc-img)]/20',
            error && !open && 'border-[var(--semantic-error)]',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <span className={cn('flex items-center gap-2', value ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
            <CalendarDays size={14} className="shrink-0 text-[var(--text-muted)]" />
            {value ? formatDisplay(value) : placeholder}
          </span>

          {clearable && value && !disabled ? (
            <span onClick={clear} className="rounded p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X size={13} />
            </span>
          ) : (
            <ChevronDown size={14} className={cn('shrink-0 text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')} />
          )}
        </button>

        {open && (
          <div
            role="dialog"
            aria-label="Calendário"
            className={cn(
              'absolute top-full left-0 z-[var(--z-popover)] mt-1 w-72',
              'rounded-[var(--radius-xl)] border border-[var(--border)]',
              'bg-[var(--bg-modal)] p-4 shadow-[var(--shadow-lg)]',
              'animate-[fade-in-up_0.12s_ease-out]',
            )}
          >
            {/* Month navigation */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Mês anterior"
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {MONTHS[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Próximo mês"
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="mb-1 grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <div key={d} className="flex h-7 items-center justify-center text-[10px] font-medium text-[var(--text-muted-dim)]">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />

                const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                const isSelected = value === iso
                const isToday = today === iso
                const off = isDisabled(day)

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={off}
                    onClick={() => !off && selectDay(day)}
                    aria-label={formatDisplay(iso)}
                    aria-pressed={isSelected}
                    className={cn(
                      'flex h-8 w-full items-center justify-center rounded-[var(--radius-sm)] text-sm',
                      'transition-colors duration-100',
                      isSelected && 'bg-[var(--acc-img)] font-semibold text-white',
                      !isSelected && isToday && 'border border-[var(--acc-img)] font-semibold text-[var(--acc-img)]',
                      !isSelected && !isToday && !off && 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]',
                      off && 'cursor-not-allowed opacity-30',
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Today shortcut */}
            <div className="mt-3 border-t border-[var(--border-subtle)] pt-2.5 text-center">
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  setViewYear(now.getFullYear())
                  setViewMonth(now.getMonth())
                  onChange?.(today)
                  setOpen(false)
                }}
                className="text-xs text-[var(--acc-img)] transition-opacity hover:opacity-70"
              >
                Hoje
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[var(--semantic-error)]">{error}</p>}
    </div>
  )
}

// Local alias to avoid import conflict
function ChevronDown({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
