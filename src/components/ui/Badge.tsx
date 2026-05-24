import { cn } from '@/lib/utils'

type RoleKey = 'admin' | 'clevel' | 'finance' | 'marketing'

const roleStyles: Record<RoleKey, string> = {
  admin:     'bg-[rgba(168,85,247,0.12)] border-[rgba(168,85,247,0.3)] text-[#c084fc]',
  clevel:    'bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.3)] text-[#93c5fd]',
  finance:   'bg-[rgba(34,197,94,0.12)]  border-[rgba(34,197,94,0.3)]  text-[#86efac]',
  marketing: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.3)] text-[#fcd34d]',
}

interface RoleBadgeProps {
  role: RoleKey
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2 py-0.5',
        'text-[10px] font-medium border',
        roleStyles[role],
        className,
      )}
    >
      {role}
    </span>
  )
}

type StatusVariant = 'success' | 'error' | 'warning' | 'info'

const statusStyles: Record<StatusVariant, string> = {
  success: 'bg-[var(--success-soft)] border-[rgba(34,197,94,0.25)] text-[var(--semantic-success)]',
  error:   'bg-[var(--error-soft)]   border-[rgba(239,68,68,0.25)]  text-[var(--semantic-error)]',
  warning: 'bg-[var(--warning-soft)] border-[rgba(245,158,11,0.25)] text-[var(--semantic-warning)]',
  info:    'bg-[var(--info-soft)]    border-[rgba(59,130,246,0.25)]  text-[var(--semantic-info)]',
}

interface StatusBadgeProps {
  status: StatusVariant
  label: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2.5 py-0.5',
        'text-[11px] font-medium border',
        statusStyles[status],
        className,
      )}
    >
      {label}
    </span>
  )
}
