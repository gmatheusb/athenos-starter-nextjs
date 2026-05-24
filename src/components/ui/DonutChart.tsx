'use client'

import { cn } from '@/lib/utils'

export interface DonutSegment {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  label?: string
  sublabel?: string
  className?: string
}

export function DonutChart({
  segments,
  size = 160,
  thickness = 22,
  label,
  sublabel,
  className,
}: DonutChartProps) {
  const r = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const total = segments.reduce((s, d) => s + d.value, 0)

  let cumulative = 0
  const segData = segments.map((seg) => {
    const dashLen = (seg.value / total) * circumference
    const offset = circumference - cumulative
    cumulative += dashLen
    return { ...seg, dashLen, offset }
  })

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--surface-deep)"
            strokeWidth={thickness}
          />

          {/* Segments */}
          {segData.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${seg.dashLen} ${circumference - seg.dashLen}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
        </svg>

        {/* Center label */}
        {label && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[var(--text-primary)]">{label}</span>
            {sublabel && (
              <span className="text-[10px] text-[var(--text-muted)]">{sublabel}</span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: seg.color }}
            />
            <span className="text-xs text-[var(--text-muted)]">{seg.label}</span>
            <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
              {((seg.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
