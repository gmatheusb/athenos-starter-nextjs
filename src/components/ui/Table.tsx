import { cn } from '@/lib/utils'
import { Skeleton } from './Skeleton'
import type { ReactNode } from 'react'

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: string
  render?: (value: unknown, row: T) => ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
  className?: string
}

const alignClass = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  emptyMessage = 'Nenhum resultado encontrado.',
  onRowClick,
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto',
        'rounded-[var(--radius-xl)] border border-[var(--border)]',
        className,
      )}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-deep)]">
            {columns.map(col => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'px-4 py-3',
                  'text-[10px] font-semibold uppercase tracking-widest',
                  'text-[var(--text-muted-dim)]',
                  alignClass[col.align ?? 'left'],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3.5">
                    <Skeleton variant="line" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-[var(--text-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-[var(--border-subtle)] last:border-0',
                  'transition-colors duration-fast',
                  onRowClick && 'cursor-pointer hover:bg-[var(--surface-hover)]',
                )}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3.5',
                      'text-sm text-[var(--text-primary)]',
                      alignClass[col.align ?? 'left'],
                    )}
                  >
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
