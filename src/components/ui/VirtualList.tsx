'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => ReactNode
  overscan?: number
  keyExtractor?: (item: T, index: number) => string
  className?: string
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  keyExtractor,
  className,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount + overscan * 2)

  const topPad = startIndex * itemHeight
  const bottomPad = Math.max(0, totalHeight - (endIndex + 1) * itemHeight)

  const visibleItems = items.slice(startIndex, endIndex + 1)

  return (
    <div
      ref={containerRef}
      className={cn('overflow-y-auto scroll-area', className)}
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      role="list"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ paddingTop: topPad, paddingBottom: bottomPad }}>
          {visibleItems.map((item, i) => {
            const realIndex = startIndex + i
            const key = keyExtractor ? keyExtractor(item, realIndex) : String(realIndex)
            return (
              <div key={key} role="listitem" style={{ height: itemHeight }}>
                {renderItem(item, realIndex)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
