'use client'

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { useState } from 'react'

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  max?: number
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
  className?: string
}

const starSize: Record<'sm' | 'md' | 'lg', number> = { sm: 14, md: 18, lg: 24 }

export function Rating({ value = 0, onChange, max = 5, size = 'md', readOnly = false, className }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const active = hovered ?? value

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="radiogroup"
      aria-label="Avaliação"
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= active

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} estrela${starValue > 1 ? 's' : ''}`}
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            className={cn(
              'transition-transform duration-100',
              !readOnly && 'cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
              readOnly && 'cursor-default',
            )}
          >
            <Star
              size={starSize[size]}
              className={cn(
                'transition-colors duration-100',
                filled
                  ? 'fill-[var(--semantic-warning)] text-[var(--semantic-warning)]'
                  : 'fill-transparent text-[var(--border-strong)]',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
