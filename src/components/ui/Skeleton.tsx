import { cn } from '@/lib/utils'

type SkeletonVariant = 'block' | 'line' | 'circle'

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  lines?: number
  className?: string
}

const shimmer = 'animate-[skeleton-shimmer_1.6s_ease-in-out_infinite] bg-[var(--surface-skeleton)]'

export function Skeleton({ variant = 'block', width, height, lines = 1, className }: SkeletonProps) {
  if (variant === 'circle') {
    const size = height ?? width ?? 40
    return (
      <div
        className={cn('rounded-full', shimmer, className)}
        style={{ width: size, height: size }}
      />
    )
  }

  if (variant === 'line') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn('h-3 rounded-full', shimmer)}
            style={{
              width: i === lines - 1 && lines > 1 ? '65%' : (width ?? '100%'),
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn('rounded-[var(--radius-md)]', shimmer, className)}
      style={{ width: width ?? '100%', height: height ?? 40 }}
    />
  )
}
