'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function OTPInput({ length = 6, value, onChange, disabled = false, className }: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const focus = (index: number) => refs.current[index]?.focus()

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = digits.map((d, i) => (i === index ? digit : d))
    onChange(next.join(''))
    if (digit && index < length - 1) focus(index + 1)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? '' : d))
        onChange(next.join(''))
      } else if (index > 0) {
        const next = digits.map((d, i) => (i === index - 1 ? '' : d))
        onChange(next.join(''))
        focus(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focus(index - 1)
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focus(index + 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = Array.from({ length }, (_, i) => pasted[i] ?? '')
    onChange(next.join(''))
    focus(Math.min(pasted.length, length - 1))
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Dígito ${i + 1} de ${length}`}
          className={cn(
            'h-12 w-10 rounded-[var(--radius-md)] border border-[var(--border)]',
            'bg-[var(--surface)] text-center text-lg font-semibold text-[var(--text-primary)]',
            'transition-colors duration-150 outline-none',
            'focus:border-[var(--acc-img)] focus:ring-2 focus:ring-[var(--acc-img)]/20',
            'caret-[var(--acc-img)] selection:bg-[var(--acc-img)]/20',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        />
      ))}
    </div>
  )
}
