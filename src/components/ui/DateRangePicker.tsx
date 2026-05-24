'use client'

import { cn } from '@/lib/utils'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

function pad2(n: number) { return String(n).padStart(2, '0') }
function toISO(y: number, m: number, d: number) { return `${y}-${pad2(m + 1)}-${pad2(d)}` }
function formatBR(iso: string) { const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}` }

function buildCalendar(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = (firstDay + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export interface DateRange {
  start: string | null
  end: string | null
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  placeholder?: string
  min?: string
  max?: string
  clearable?: boolean
  disabled?: boolean
  label?: string
  error?: string
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Selecionar período',
  min,
  max,
  clearable = true,
  disabled = false,
  label,
  error,
  className,
}: DateRangePickerProps) {
  const today = toISO(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  const ref = new Date()

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(ref.getFullYear())
  const [viewMonth, setViewMonth] = useState(ref.getMonth())
  const [phase, setPhase] = useState<'start' | 'end'>('start')
  const [hovered, setHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setHovered(null)
      }
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setHovered(null) } }
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

  const handleDayClick = (day: number) => {
    const iso = toISO(viewYear, viewMonth, day)
    if (phase === 'start') {
      onChange({ start: iso, end: null })
      setPhase('end')
    } else {
      const start = value.start!
      if (iso < start) {
        onChange({ start: iso, end: start })
      } else {
        onChange({ start, end: iso })
      }
      setPhase('start')
      setOpen(false)
      setHovered(null)
    }
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange({ start: null, end: null })
    setPhase('start')
  }

  const isDisabled = (day: number): boolean => {
    const iso = toISO(viewYear, viewMonth, day)
    if (min && iso < min) return true
    if (max && iso > max) return true
    return false
  }

  const getDayState = (day: number) => {
    const iso = toISO(viewYear, viewMonth, day)
    const { start, end } = value
    const rangeEnd = phase === 'end' && hovered ? hovered : end

    const isStart = iso === start
    const isEnd = end ? iso === end : (phase === 'end' && iso === hovered && !!start)
    const inRange = !!(start && rangeEnd && iso > (start < rangeEnd ? start : rangeEnd) && iso < (start < rangeEnd ? rangeEnd : start) || (start && rangeEnd && iso > start && iso < rangeEnd))
    const isToday = iso === today

    return { iso, isStart, isEnd, inRange, isToday }
  }

  const displayText = value.start
    ? value.end
      ? `${formatBR(value.start)} — ${formatBR(value.end)}`
      : phase === 'end'
        ? `${formatBR(value.start)} — ...`
        : formatBR(value.start)
    : null

  const cells = buildCalendar(viewYear, viewMonth)

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => { setOpen((o) => !o); if (!open) setPhase(value.start && !value.end ? 'end' : 'start') }}
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
          <span className={cn('flex items-center gap-2', displayText ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
            <CalendarDays size={14} className="shrink-0 text-[var(--text-muted)]" />
            {displayText ?? placeholder}
          </span>
          {clearable && value.start && !disabled && (
            <span onClick={clear} className="rounded p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X size={13} />
            </span>
          )}
        </button>

        {open && (
          <div
            role="dialog"
            aria-label="Seletor de período"
            className={cn(
              'absolute top-full left-0 z-[var(--z-popover)] mt-1 w-72',
              'rounded-[var(--radius-xl)] border border-[var(--border)]',
              'bg-[var(--bg-modal)] p-4 shadow-[var(--shadow-lg)]',
              'animate-[fade-in-up_0.12s_ease-out]',
            )}
          >
            {/* Phase indicator */}
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--acc-img)]">
              {phase === 'start' ? 'Selecione a data inicial' : 'Selecione a data final'}
            </p>

            {/* Month nav */}
            <div className="mb-3 flex items-center justify-between">
              <button type="button" onClick={prevMonth} aria-label="Mês anterior"
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button type="button" onClick={nextMonth} aria-label="Próximo mês"
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Weekdays */}
            <div className="mb-1 grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <div key={d} className="flex h-7 items-center justify-center text-[10px] font-medium text-[var(--text-muted-dim)]">{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />
                const { iso, isStart, isEnd, inRange, isToday } = getDayState(day)
                const off = isDisabled(day)

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={off}
                    onClick={() => !off && handleDayClick(day)}
                    onMouseEnter={() => phase === 'end' && !off && setHovered(iso)}
                    aria-label={formatBR(iso)}
                    className={cn(
                      'flex h-8 w-full items-center justify-center text-sm transition-colors duration-100',
                      (isStart || isEnd) && 'rounded-[var(--radius-sm)] bg-[var(--acc-img)] font-semibold text-white',
                      inRange && !isStart && !isEnd && 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]',
                      !isStart && !isEnd && !inRange && isToday && 'rounded-[var(--radius-sm)] border border-[var(--acc-img)] font-semibold text-[var(--acc-img)]',
                      !isStart && !isEnd && !inRange && !isToday && !off && 'rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]',
                      off && 'cursor-not-allowed opacity-30',
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {value.start && value.end && (
              <div className="mt-3 border-t border-[var(--border-subtle)] pt-2.5 text-center text-xs text-[var(--text-muted)]">
                {formatBR(value.start)} — {formatBR(value.end)}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[var(--semantic-error)]">{error}</p>}
    </div>
  )
}
