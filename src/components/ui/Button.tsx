import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
type ButtonSize    = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    text-white
    bg-[linear-gradient(135deg,var(--acc-img),var(--acc-vid))]
    hover:opacity-90 active:scale-[0.98]
    focus-visible:ring-[var(--acc-img)]
  `,
  secondary: `
    text-[var(--text-muted)]
    bg-[var(--surface)] border border-[var(--border)]
    hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
    focus-visible:ring-[var(--acc-img)]
  `,
  destructive: `
    text-[var(--semantic-error)]
    bg-[var(--error-soft)] border border-[rgba(239,68,68,0.2)]
    hover:bg-[rgba(239,68,68,0.15)]
    focus-visible:ring-[var(--semantic-error)]
  `,
  ghost: `
    text-[var(--text-muted)]
    hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
    focus-visible:ring-[var(--acc-img)]
    rounded-md
  `,
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-pill',
        'transition-all duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  )
}
