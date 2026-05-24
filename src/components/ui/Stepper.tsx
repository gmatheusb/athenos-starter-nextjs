import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type StepStatus = 'completed' | 'active' | 'upcoming'

interface Step {
  id: string
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function stepStatus(index: number, current: number): StepStatus {
  if (index < current) return 'completed'
  if (index === current) return 'active'
  return 'upcoming'
}

const dotStyles: Record<StepStatus, string> = {
  completed: 'bg-[var(--acc-img)] border-[var(--acc-img)] text-white',
  active:    'border-[var(--acc-img)] text-[var(--acc-img)] bg-[var(--acc-img-soft)]',
  upcoming:  'border-[var(--border-strong)] text-[var(--text-muted-dim)] bg-transparent',
}

export function Stepper({ steps, currentStep, orientation = 'horizontal', className }: StepperProps) {
  if (orientation === 'vertical') {
    return (
      <ol className={cn('flex flex-col', className)}>
        {steps.map((step, i) => {
          const status = stepStatus(i, currentStep)
          const isLast = i === steps.length - 1
          return (
            <li key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2',
                  'text-xs font-bold transition-colors duration-base',
                  dotStyles[status],
                )}>
                  {status === 'completed' ? <Check size={13} strokeWidth={2.5} /> : i + 1}
                </div>
                {!isLast && (
                  <div className={cn(
                    'w-px flex-1 my-1 transition-colors duration-base',
                    status === 'completed' ? 'bg-[var(--acc-img)]' : 'bg-[var(--border-subtle)]',
                  )} />
                )}
              </div>
              <div className={cn('pb-6', isLast && 'pb-0')}>
                <p className={cn(
                  'text-sm font-medium',
                  status === 'upcoming' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]',
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{step.description}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className={cn('flex items-start', className)}>
      {steps.map((step, i) => {
        const status = stepStatus(i, currentStep)
        const isLast = i === steps.length - 1
        return (
          <li key={step.id} className={cn('flex items-center', !isLast && 'flex-1')}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2',
                'text-xs font-bold transition-colors duration-base',
                dotStyles[status],
              )}>
                {status === 'completed' ? <Check size={13} strokeWidth={2.5} /> : i + 1}
              </div>
              <p className={cn(
                'text-[11px] font-medium text-center max-w-[80px]',
                status === 'upcoming' ? 'text-[var(--text-muted-dim)]' : 'text-[var(--text-primary)]',
              )}>
                {step.label}
              </p>
            </div>
            {!isLast && (
              <div className={cn(
                'flex-1 h-px mx-2 mb-5 transition-colors duration-base',
                status === 'completed' ? 'bg-[var(--acc-img)]' : 'bg-[var(--border-subtle)]',
              )} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
