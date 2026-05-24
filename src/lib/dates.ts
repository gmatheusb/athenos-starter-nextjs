type DateInput = string | number | Date

function toDate(input: DateInput): Date {
  if (typeof input === 'string' && input.length === 10) {
    return new Date(input + 'T00:00:00')
  }
  return new Date(input)
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ── Comparison ────────────────────────────────────────────────────
export function isSameDay(a: DateInput, b: DateInput): boolean {
  return toISO(toDate(a)) === toISO(toDate(b))
}

export function isToday(input: DateInput): boolean {
  return isSameDay(input, new Date())
}

export function isBefore(a: DateInput, b: DateInput): boolean {
  return toDate(a) < toDate(b)
}

export function isAfter(a: DateInput, b: DateInput): boolean {
  return toDate(a) > toDate(b)
}

export function isBetween(date: DateInput, start: DateInput, end: DateInput): boolean {
  const d = toDate(date).getTime()
  return d >= toDate(start).getTime() && d <= toDate(end).getTime()
}

// ── Arithmetic ────────────────────────────────────────────────────
export function addDays(input: DateInput, days: number): Date {
  const d = toDate(input)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(input: DateInput, months: number): Date {
  const d = toDate(input)
  d.setMonth(d.getMonth() + months)
  return d
}

export function addYears(input: DateInput, years: number): Date {
  const d = toDate(input)
  d.setFullYear(d.getFullYear() + years)
  return d
}

export function diffInDays(a: DateInput, b: DateInput): number {
  const ms = toDate(b).getTime() - toDate(a).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

export function diffInMonths(a: DateInput, b: DateInput): number {
  const da = toDate(a)
  const db = toDate(b)
  return (db.getFullYear() - da.getFullYear()) * 12 + (db.getMonth() - da.getMonth())
}

// ── Boundaries ────────────────────────────────────────────────────
export function startOfDay(input: DateInput): Date {
  const d = toDate(input)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(input: DateInput): Date {
  const d = toDate(input)
  d.setHours(23, 59, 59, 999)
  return d
}

export function startOfMonth(input: DateInput): Date {
  const d = toDate(input)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function endOfMonth(input: DateInput): Date {
  const d = toDate(input)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

export function startOfWeek(input: DateInput, weekStartsOn: 0 | 1 = 1): Date {
  const d = toDate(input)
  const day = d.getDay()
  const diff = (day - weekStartsOn + 7) % 7
  return addDays(d, -diff)
}

export function endOfWeek(input: DateInput, weekStartsOn: 0 | 1 = 1): Date {
  return addDays(startOfWeek(input, weekStartsOn), 6)
}

// ── Utilities ─────────────────────────────────────────────────────
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function toISODate(input: DateInput): string {
  return toISO(toDate(input))
}

export function fromISODate(iso: string): Date {
  return toDate(iso)
}
