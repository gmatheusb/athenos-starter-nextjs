'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface BarChartItem {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarChartItem[]
  height?: number
  showValues?: boolean
  unit?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function BarChart({
  data,
  height = 180,
  showValues = true,
  unit = '',
  orientation = 'vertical',
  className,
}: BarChartProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const max = Math.max(...data.map((d) => d.value), 1)

  if (orientation === 'horizontal') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {data.map((item) => {
          const pct = (item.value / max) * 100
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs text-[var(--text-muted)] truncate">
                {item.label}
              </span>
              <div className="flex flex-1 items-center gap-2">
                <div className="h-5 flex-1 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-deep)]">
                  <div
                    className="h-full rounded-[var(--radius-sm)] transition-all duration-700 ease-out"
                    style={{
                      width: mounted ? `${pct}%` : '0%',
                      background: item.color ?? 'var(--acc-img)',
                    }}
                  />
                </div>
                {showValues && (
                  <span className="w-10 shrink-0 text-right text-[10px] font-mono text-[var(--text-muted)]">
                    {item.value}{unit}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((item) => {
          const pct = (item.value / max) * 100
          return (
            <div key={item.label} className="flex flex-1 flex-col items-center justify-end gap-1.5">
              {showValues && (
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {item.value}{unit}
                </span>
              )}
              <div
                className="w-full rounded-t-[var(--radius-sm)] transition-all duration-700 ease-out"
                style={{
                  height: mounted ? `${pct}%` : '0%',
                  background: item.color ?? 'var(--acc-img)',
                  minHeight: mounted ? 2 : 0,
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 border-t border-[var(--border-subtle)] pt-2">
        {data.map((item) => (
          <div key={item.label} className="flex-1 text-center">
            <span className="text-[10px] text-[var(--text-muted)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
