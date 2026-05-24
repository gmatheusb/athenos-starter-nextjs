'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

const PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
  '#ffffff', '#94a3b8', '#475569', '#0f172a',
]

function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)
}

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  className?: string
}

export function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  const [input, setInput] = useState(value)

  const handleInputChange = (raw: string) => {
    const hex = raw.startsWith('#') ? raw : `#${raw}`
    setInput(hex)
    if (isValidHex(hex)) onChange(hex)
  }

  const handlePreset = (color: string) => {
    setInput(color)
    onChange(color)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      )}

      <div className="grid grid-cols-6 gap-1.5">
        {PRESETS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handlePreset(color)}
            aria-label={color}
            className={cn(
              'h-7 w-7 rounded-[var(--radius-sm)] border transition-transform duration-100 hover:scale-110',
              value === color
                ? 'ring-2 ring-[var(--acc-img)] ring-offset-2 ring-offset-[var(--bg-canvas)]'
                : 'border-[var(--border)]',
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)]"
          style={{ backgroundColor: isValidHex(input) ? input : '#ffffff' }}
        />
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">#</span>
          <input
            type="text"
            value={input.replace('#', '')}
            onChange={(e) => handleInputChange(e.target.value)}
            maxLength={7}
            placeholder="000000"
            className={cn(
              'h-9 w-full rounded-[var(--radius-md)] border border-[var(--border)]',
              'bg-[var(--surface)] pl-7 pr-3 font-mono text-sm text-[var(--text-primary)]',
              'transition-colors outline-none focus:border-[var(--acc-img)] focus:ring-2 focus:ring-[var(--acc-img)]/20',
            )}
          />
        </div>
        <input
          type="color"
          value={isValidHex(input) ? input : '#000000'}
          onChange={(e) => handleInputChange(e.target.value)}
          aria-label="Seletor de cor nativo"
          className="h-9 w-9 shrink-0 cursor-pointer rounded-[var(--radius-sm)] border border-[var(--border)] bg-transparent p-0.5"
        />
      </div>
    </div>
  )
}
