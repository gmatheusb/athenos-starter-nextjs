'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function CountUp({
  to,
  from = 0,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const [current, setCurrent] = useState(from)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    startTime.current = null

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setCurrent(from + (to - from) * eased)

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [to, from, duration])

  const formatted = current.toFixed(decimals)

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {prefix}{formatted}{suffix}
    </span>
  )
}
