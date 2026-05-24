'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ShowcaseBlock } from './ShowcaseBlock'
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  truncate,
  capitalize,
  slugify,
  formatBytes,
  getInitials,
} from '@/lib/format'
import {
  isValidCPF,
  isValidCNPJ,
  isValidEmail,
  isValidPhone,
  isValidCEP,
  isValidURL,
} from '@/lib/validators'
import {
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  addDays,
  addMonths,
  diffInDays,
  startOfMonth,
  endOfMonth,
} from '@/lib/dates'
import { Input } from '@/components/ui/Input'

const ROW = 'flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)] last:border-0'
const LABEL = 'text-xs text-[var(--text-muted)] font-mono'
const VALUE = 'text-xs font-mono text-[var(--acc-img)]'

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={ROW}>
      <span className={LABEL}>{label}</span>
      <span className={VALUE}>{value}</span>
    </div>
  )
}

function ValidatorRow({ label, value, valid }: { label: string; value: string; valid: boolean | null }) {
  return (
    <div className={ROW}>
      <span className={LABEL}>{label}</span>
      {valid === null ? (
        <span className="text-xs text-[var(--text-muted-dim)]">—</span>
      ) : (
        <span className={cn('text-xs font-semibold', valid ? 'text-[var(--semantic-success)]' : 'text-[var(--semantic-error)]')}>
          {valid ? 'válido' : 'inválido'}
        </span>
      )}
    </div>
  )
}

export function UtilsSection() {
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [url, setUrl] = useState('')

  const today = new Date()
  const yesterday = addDays(today, -1)
  const nextWeek = addDays(today, 7)
  const nextMonth = addMonths(today, 1)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      {/* format.ts — números e moeda */}
      <ShowcaseBlock title="format — Números" description="formatCurrency, formatNumber, formatBytes">
        <div className="flex flex-col">
          <ResultRow label='formatCurrency(1990.5)' value={formatCurrency(1990.5)} />
          <ResultRow label='formatCurrency(49.99, "USD", "en-US")' value={formatCurrency(49.99, 'USD', 'en-US')} />
          <ResultRow label='formatNumber(1234567)' value={formatNumber(1234567)} />
          <ResultRow label='formatBytes(1536000)' value={formatBytes(1536000)} />
          <ResultRow label='formatBytes(0)' value={formatBytes(0)} />
          <ResultRow label='formatBytes(1073741824)' value={formatBytes(1073741824)} />
        </div>
      </ShowcaseBlock>

      {/* format.ts — datas */}
      <ShowcaseBlock title="format — Datas" description="formatDate, formatDateTime, formatRelativeTime">
        <div className="flex flex-col">
          <ResultRow label='formatDate("2025-05-24")' value={formatDate('2025-05-24')} />
          <ResultRow label='formatDateTime(new Date())' value={formatDateTime(new Date())} />
          <ResultRow label='formatRelativeTime(agora - 2min)' value={formatRelativeTime(new Date(Date.now() - 2 * 60 * 1000))} />
          <ResultRow label='formatRelativeTime(agora - 3dias)' value={formatRelativeTime(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000))} />
          <ResultRow label='formatRelativeTime(amanhã)' value={formatRelativeTime(addDays(today, 1))} />
        </div>
      </ShowcaseBlock>

      {/* format.ts — strings */}
      <ShowcaseBlock title="format — Strings" description="truncate, capitalize, slugify, getInitials">
        <div className="flex flex-col">
          <ResultRow label='truncate("Design System Athenos", 15)' value={truncate('Design System Athenos', 15)} />
          <ResultRow label='truncate("Curto", 20)' value={truncate('Curto', 20)} />
          <ResultRow label='capitalize("athenos design")' value={capitalize('athenos design')} />
          <ResultRow label='slugify("Olá Mundo! 2025")' value={slugify('Olá Mundo! 2025')} />
          <ResultRow label='getInitials("Gabriel Matheus B.")' value={getInitials('Gabriel Matheus B.')} />
          <ResultRow label='getInitials("Gabriel Matheus B.", 3)' value={getInitials('Gabriel Matheus B.', 3)} />
        </div>
      </ShowcaseBlock>

      {/* dates.ts — computed */}
      <ShowcaseBlock title="dates — Cálculos" description="addDays, addMonths, diffInDays, startOfMonth, endOfMonth">
        <div className="flex flex-col">
          <ResultRow label='addDays(hoje, 7)' value={formatDate(nextWeek)} />
          <ResultRow label='addDays(hoje, -1)' value={formatDate(yesterday)} />
          <ResultRow label='addMonths(hoje, 1)' value={formatDate(nextMonth)} />
          <ResultRow label='diffInDays(hoje, nextWeek)' value={`${diffInDays(today, nextWeek)} dias`} />
          <ResultRow label='startOfMonth(hoje)' value={formatDate(startOfMonth(today))} />
          <ResultRow label='endOfMonth(hoje)' value={formatDate(endOfMonth(today))} />
          <ResultRow label='isToday(hoje)' value={String(isToday(today))} />
          <ResultRow label='isBefore(ontem, hoje)' value={String(isBefore(yesterday, today))} />
          <ResultRow label='isAfter(semana, hoje)' value={String(isAfter(nextWeek, today))} />
          <ResultRow label='isSameDay(hoje, hoje)' value={String(isSameDay(today, today))} />
        </div>
      </ShowcaseBlock>

      {/* validators — CPF + CNPJ */}
      <ShowcaseBlock title="validators — CPF & CNPJ" description="isValidCPF, isValidCNPJ — aceita com ou sem máscara">
        <div className="flex flex-col gap-3">
          <Input
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
          />
          <Input
            label="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="00.000.000/0000-00"
          />
          <div className="flex flex-col rounded-[var(--radius-md)] bg-[var(--surface-deep)] px-3 py-1">
            <ValidatorRow label="isValidCPF()" value={cpf} valid={cpf ? isValidCPF(cpf) : null} />
            <ValidatorRow label="isValidCNPJ()" value={cnpj} valid={cnpj ? isValidCNPJ(cnpj) : null} />
          </div>
          <p className="text-[10px] text-[var(--text-muted-dim)]">CPF válido para teste: 529.982.247-25</p>
        </div>
      </ShowcaseBlock>

      {/* validators — contato */}
      <ShowcaseBlock title="validators — Contato" description="isValidEmail, isValidPhone, isValidCEP, isValidURL">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ex@email.com" />
            <Input label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="11999999999" />
            <Input label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="01310100" />
            <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex flex-col rounded-[var(--radius-md)] bg-[var(--surface-deep)] px-3 py-1">
            <ValidatorRow label="isValidEmail()" value={email} valid={email ? isValidEmail(email) : null} />
            <ValidatorRow label="isValidPhone()" value={phone} valid={phone ? isValidPhone(phone) : null} />
            <ValidatorRow label="isValidCEP()" value={cep} valid={cep ? isValidCEP(cep) : null} />
            <ValidatorRow label="isValidURL()" value={url} valid={url ? isValidURL(url) : null} />
          </div>
        </div>
      </ShowcaseBlock>

    </div>
  )
}
