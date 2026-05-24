'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useRef, useState } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  max?: number
  disabled?: boolean
  className?: string
}

export function TagInput({ value, onChange, placeholder = 'Adicionar tag...', max, disabled = false, className }: TagInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag || value.includes(tag) || (max && value.length >= max)) return
    onChange([...value, tag])
    setInput('')
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  const atMax = max !== undefined && value.length >= max

  return (
    <div
      className={cn(
        'flex min-h-10 flex-wrap items-center gap-1.5 rounded-[var(--radius-md)]',
        'border border-[var(--border)] bg-[var(--surface)] px-3 py-2',
        'transition-colors duration-150',
        'focus-within:border-[var(--acc-img)] focus-within:ring-2 focus-within:ring-[var(--acc-img)]/20',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={i}
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            'bg-[var(--acc-img)]/10 text-[var(--acc-img)]',
          )}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(i) }}
              aria-label={`Remover ${tag}`}
              className="rounded-full opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none"
            >
              <X size={10} />
            </button>
          )}
        </span>
      ))}

      {!atMax && !disabled && (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
        />
      )}
    </div>
  )
}
