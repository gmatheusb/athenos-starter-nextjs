'use client'

import { cn } from '@/lib/utils'

export interface LineChartPoint {
  label: string
  value: number
}

interface LineChartProps {
  data: LineChartPoint[]
  height?: number
  color?: string
  showArea?: boolean
  showGrid?: boolean
  className?: string
}

const VW = 400
const PAD = { top: 28, bottom: 28, left: 8, right: 8 }

export function LineChart({
  data,
  height = 180,
  color = 'var(--acc-img)',
  showArea = true,
  showGrid = true,
  className,
}: LineChartProps) {
  if (data.length < 2) return null

  const chartH = 150
  const innerW = VW - PAD.left - PAD.right
  const innerH = chartH - PAD.top - PAD.bottom

  const maxVal = Math.max(...data.map((d) => d.value))
  const minVal = Math.min(...data.map((d) => d.value))
  const range = maxVal - minVal || 1

  const xStep = innerW / (data.length - 1)

  const points = data.map((d, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + ((maxVal - d.value) / range) * innerH,
    label: d.label,
    value: d.value,
  }))

  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath = [
    `M ${points[0].x},${chartH - PAD.bottom}`,
    ...points.map((p) => `L ${p.x},${p.y}`),
    `L ${points[points.length - 1].x},${chartH - PAD.bottom}`,
    'Z',
  ].join(' ')

  const gridYs = [0.25, 0.5, 0.75].map((pct) => PAD.top + pct * innerH)

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 ${VW} ${chartH}`}
        width="100%"
        style={{ height }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Grid lines */}
        {showGrid &&
          gridYs.map((y, i) => (
            <line
              key={i}
              x1={PAD.left}
              y1={y}
              x2={VW - PAD.right}
              y2={y}
              stroke="var(--border-subtle)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

        {/* Area fill */}
        {showArea && (
          <path d={areaPath} fill={color} fillOpacity={0.08} />
        )}

        {/* Line */}
        <polyline
          points={pointsStr}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots + value labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--bg-canvas)"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-muted)"
              fontFamily="monospace"
            >
              {p.value}
            </text>
            <text
              x={p.x}
              y={chartH - 6}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-muted)"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
