import { cn } from '@/lib/utils'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ code, language, showLineNumbers = false, className }: CodeBlockProps) {
  const lines = code.trim().split('\n')

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--border)] bg-[var(--bg-panel-deep)]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-2.5">
        <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted-dim)]">
          {language ?? 'código'}
        </span>
        <CopyButton text={code.trim()} />
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        {showLineNumbers ? (
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-5 shrink-0 select-none text-right text-[11px] text-[var(--text-muted-dim)]">
                  {i + 1}
                </span>
                <span className="text-[var(--text-secondary)]">{line || ' '}</span>
              </div>
            ))}
          </code>
        ) : (
          <code className="text-[var(--text-secondary)]">{code.trim()}</code>
        )}
      </pre>
    </div>
  )
}
