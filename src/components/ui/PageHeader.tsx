import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, description, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Caminho" className="flex items-center gap-1.5">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[var(--text-muted-dim)]">/</span>}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-xs text-[var(--text-muted-dim)]">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">{description}</p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  )
}
