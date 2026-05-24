import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  siblings?: number
  className?: string
}

function getPages(page: number, total: number, siblings: number): (number | '...')[] {
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i)

  const left  = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)

  const pages: (number | '...')[] = [1]

  if (left > 2) pages.push('...')
  pages.push(...range(left, right))
  if (right < total - 1) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
}

const btnBase =
  'inline-flex h-8 min-w-[32px] items-center justify-center rounded-[var(--radius-md)] px-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]'

export function Pagination({ page, totalPages, onChange, siblings = 1, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages, siblings)

  return (
    <nav aria-label="Paginação" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={cn(btnBase, 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed')}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-sm text-[var(--text-muted-dim)]">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Página ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              btnBase,
              p === page
                ? 'bg-[var(--acc-img)] text-white'
                : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Próxima página"
        className={cn(btnBase, 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed')}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}
