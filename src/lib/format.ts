// ── Currency ──────────────────────────────────────────────────────
export function formatCurrency(
  value: number,
  currency = 'BRL',
  locale = 'pt-BR',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

// ── Number ────────────────────────────────────────────────────────
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = 'pt-BR',
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

// ── Date ──────────────────────────────────────────────────────────
type DateInput = string | number | Date

export function formatDate(
  input: DateInput,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' },
  locale = 'pt-BR',
): string {
  const date = typeof input === 'string' && input.length === 10
    ? new Date(input + 'T00:00:00')
    : new Date(input)
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export function formatDateTime(input: DateInput, locale = 'pt-BR'): string {
  return formatDate(input, {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }, locale)
}

// ── Relative time ─────────────────────────────────────────────────
export function formatRelativeTime(input: DateInput, locale = 'pt-BR'): string {
  const date = new Date(input)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)
  const diffWeek = Math.round(diffDay / 7)
  const diffMonth = Math.round(diffDay / 30)
  const diffYear = Math.round(diffDay / 365)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second')
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute')
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour')
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, 'day')
  if (Math.abs(diffWeek) < 5) return rtf.format(diffWeek, 'week')
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month')
  return rtf.format(diffYear, 'year')
}

// ── String ────────────────────────────────────────────────────────
export function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - ellipsis.length) + ellipsis
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── File size ─────────────────────────────────────────────────────
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`
}

// ── Initials ──────────────────────────────────────────────────────
export function getInitials(name: string, max = 2): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, max)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
