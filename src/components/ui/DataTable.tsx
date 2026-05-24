'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Skeleton } from './Skeleton'
import { SearchInput } from './SearchInput'

export interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => React.ReactNode
  sortValue?: (row: T) => string | number
  searchValue?: (row: T) => string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  keyExtractor: (row: T) => string
  searchable?: boolean
  searchPlaceholder?: string
  loading?: boolean
  loadingRows?: number
  emptyMessage?: string
  onRowClick?: (row: T) => void
  className?: string
}

type SortDir = 'asc' | 'desc'

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  loading = false,
  loadingRows = 5,
  emptyMessage = 'Nenhum resultado encontrado.',
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortValue) return
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(col.key)
      setSortDir('asc')
    }
  }

  const searchableCols = columns.filter((c) => c.searchValue)

  const processed = useMemo(() => {
    let rows = [...data]

    if (searchable && query && searchableCols.length > 0) {
      const q = query.toLowerCase()
      rows = rows.filter((row) =>
        searchableCols.some((col) => col.searchValue!(row).toLowerCase().includes(q)),
      )
    }

    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey)
      if (col?.sortValue) {
        rows.sort((a, b) => {
          const va = col.sortValue!(a)
          const vb = col.sortValue!(b)
          const cmp = va < vb ? -1 : va > vb ? 1 : 0
          return sortDir === 'asc' ? cmp : -cmp
        })
      }
    }

    return rows
  }, [data, query, sortKey, sortDir, searchable, searchableCols, columns])

  const alignClass: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {searchable && searchableCols.length > 0 && (
        <div className="flex justify-end">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={searchPlaceholder}
            className="w-64"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-deep)]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn(
                      'px-4 py-3 font-medium text-[var(--text-muted)]',
                      alignClass[col.align ?? 'left'],
                      col.sortValue && 'cursor-pointer select-none hover:text-[var(--text-primary)]',
                    )}
                    onClick={() => handleSort(col)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {col.sortValue && (
                        sortKey === col.key ? (
                          sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                        ) : (
                          <ChevronsUpDown size={13} className="opacity-40" />
                        )
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <Skeleton className="h-4 w-full max-w-[120px]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : processed.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-[var(--text-muted)]">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                processed.map((row) => (
                  <tr
                    key={keyExtractor(row)}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'border-b border-[var(--border-subtle)] transition-colors last:border-0',
                      'text-[var(--text-secondary)]',
                      onRowClick && 'cursor-pointer hover:bg-[var(--surface-hover)]',
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn('px-4 py-3', alignClass[col.align ?? 'left'])}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && processed.length > 0 && (
        <p className="text-right text-xs text-[var(--text-muted-dim)]">
          {processed.length} de {data.length} {data.length === 1 ? 'resultado' : 'resultados'}
        </p>
      )}
    </div>
  )
}
