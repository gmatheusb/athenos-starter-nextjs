'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface CarouselProps {
  items: ReactNode[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  loop?: boolean
  className?: string
}

export function Carousel({
  items,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  loop = true,
  className,
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const total = items.length

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? (loop ? total - 1 : 0) : c - 1))
  }, [loop, total])

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? (loop ? 0 : total - 1) : c + 1))
  }, [loop, total])

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [autoPlay, interval, next])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [prev, next])

  if (total === 0) return null

  return (
    <div
      className={cn('group relative overflow-hidden rounded-[var(--radius-xl)]', className)}
      role="region"
      aria-label="Carrossel"
      aria-roledescription="carousel"
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== current}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            disabled={!loop && current === 0}
            aria-label="Slide anterior"
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2',
              'flex h-9 w-9 items-center justify-center rounded-full',
              'bg-[var(--bg-modal)]/80 text-[var(--text-primary)] shadow-[var(--shadow-md)]',
              'opacity-0 transition-opacity group-hover:opacity-100',
              'disabled:cursor-not-allowed disabled:opacity-30',
              'hover:bg-[var(--bg-modal)]',
            )}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!loop && current === total - 1}
            aria-label="Próximo slide"
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'flex h-9 w-9 items-center justify-center rounded-full',
              'bg-[var(--bg-modal)]/80 text-[var(--text-primary)] shadow-[var(--shadow-md)]',
              'opacity-0 transition-opacity group-hover:opacity-100',
              'disabled:cursor-not-allowed disabled:opacity-30',
              'hover:bg-[var(--bg-modal)]',
            )}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === current}
              className={cn(
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
