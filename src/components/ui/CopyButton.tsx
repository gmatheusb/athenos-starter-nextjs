'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copiado!' : `Copiar${label ? ` ${label}` : ''}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5',
        'text-xs font-medium rounded-[var(--radius-md)]',
        'border border-[var(--border)] bg-[var(--surface)]',
        'transition-all duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
        copied
          ? 'text-[var(--semantic-success)] border-[rgba(22,163,74,0.25)] bg-[var(--semantic-success-soft)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
        className,
      )}
    >
      {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
      {label && <span>{copied ? 'Copiado!' : label}</span>}
    </button>
  )
}
