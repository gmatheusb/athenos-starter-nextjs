'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sun, Moon, Sparkles, ArrowLeft, ArrowRight,
  Check, ShoppingCart, CreditCard, QrCode, FileText,
  Package, Minus, Plus,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { AuthOrbs } from '@/components/auth/AuthOrbs'
import { Stepper } from '@/components/ui/Stepper'
import { Input } from '@/components/ui/Input'
import { MaskInput } from '@/components/ui/MaskInput'
import { RadioGroup } from '@/components/ui/Radio'
import { CopyButton } from '@/components/ui/CopyButton'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'cart', label: 'Carrinho', description: 'Itens do pedido' },
  { id: 'payment', label: 'Pagamento', description: 'Forma de pagamento' },
  { id: 'confirm', label: 'Confirmação', description: 'Pedido realizado' },
]

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

const PAYMENT_OPTIONS = [
  { value: 'card', label: 'Cartão de crédito', description: 'Visa, Mastercard, Amex' },
  { value: 'pix', label: 'PIX', description: 'Aprovação imediata' },
  { value: 'boleto', label: 'Boleto bancário', description: 'Vence em 3 dias úteis' },
]

const BOLETO_CODE = '23793.38128 60007.827136 95000.063305 2 10510000012900'

export default function CheckoutPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const [items, setItems] = useState<CartItem[]>([
    { id: 'i1', name: 'Athenos Pro — anual', price: 103, qty: 1 },
    { id: 'i2', name: 'Suporte prioritário', price: 29, qty: 1 },
    { id: 'i3', name: 'White-label add-on', price: 49, qty: 1 },
  ])
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const [payMethod, setPayMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  const orderNumber = `ATH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  function changeQty(id: string, delta: number) {
    setItems((prev) => prev
      .map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter((i) => i.qty > 0))
  }

  function applyCoupon() {
    if (coupon.trim().toLowerCase() === 'athenos10') {
      setCouponApplied(true)
      toast.success('Cupom aplicado — 10% de desconto!')
    } else {
      toast.error('Cupom inválido.')
    }
  }

  function canAdvance() {
    if (step === 0) return items.length > 0
    if (step === 1) {
      if (payMethod === 'card') return cardNumber.length >= 19 && cardName.trim() !== '' && cardExpiry.length >= 5 && cardCvv.length >= 3
      return true
    }
    return false
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      if (step === STEPS.length - 2) {
        setSubmitting(true)
        setTimeout(() => { setSubmitting(false); setStep((s) => s + 1) }, 1200)
        return
      }
      setStep((s) => s + 1)
    }
  }

  if (step === 2) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] px-4">
        <AuthOrbs />
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Alternar tema"
          className="fixed right-4 top-4 z-20 rounded-[var(--radius-md)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div
          className="relative z-10 flex flex-col items-center gap-5 text-center"
          style={{ animation: 'fade-in-up 0.35s ease both' }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--semantic-success)]/20 bg-[var(--semantic-success)]/10">
            <Check size={28} className="text-[var(--semantic-success)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Pedido confirmado!</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Número do pedido: <span className="font-mono font-semibold text-[var(--acc-img)]">{orderNumber}</span>
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Total pago: <span className="font-semibold text-[var(--text-primary)]">R$ {total}</span>
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/dashboard')}>
            Ver meu dashboard
            <ArrowRight size={13} />
          </Button>
          <button
            onClick={() => router.push('/')}
            className="text-xs text-[var(--text-muted-dim)] transition-colors hover:text-[var(--text-muted)]"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] px-4 py-10">
      <AuthOrbs />

      <button
        onClick={toggleTheme}
        type="button"
        aria-label="Alternar tema"
        className="fixed right-4 top-4 z-20 rounded-[var(--radius-md)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div
        className="relative z-10 w-full max-w-[480px] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg"
        style={{ animation: 'fade-in-up 0.35s ease both' }}
      >
        {/* Logo + heading */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--grad)' }}
          >
            <ShoppingCart size={18} className="text-white" />
          </div>
          <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[var(--text-primary)]">
            Finalizar compra
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{STEPS[step].description}</p>
        </div>

        <Stepper steps={STEPS} currentStep={step} orientation="horizontal" />

        <div className="mt-7">

          {/* Step 0 — Carrinho */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-deep)] p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--acc-img)]/10">
                      <Package size={14} className="text-[var(--acc-img)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--text-primary)]">{item.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">R$ {item.price}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-4 text-center text-sm font-medium text-[var(--text-primary)]">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2">
                <Input
                  placeholder="Cupom de desconto"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  hint={couponApplied ? undefined : 'Tente: ATHENOS10'}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={applyCoupon}
                  disabled={couponApplied || !coupon.trim()}
                  className="shrink-0 self-start mt-[22px]"
                >
                  Aplicar
                </Button>
              </div>

              {/* Summary */}
              <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-deep)] p-3 text-sm">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[var(--semantic-success)]">
                    <span>Desconto (10%)</span>
                    <span>-R$ {discount}</span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t border-[var(--border-subtle)] pt-2 font-bold text-[var(--text-primary)]">
                  <span>Total</span>
                  <span>R$ {total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Pagamento */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <RadioGroup
                name="payMethod"
                label="Método de pagamento"
                options={PAYMENT_OPTIONS}
                value={payMethod}
                onChange={setPayMethod}
              />

              {payMethod === 'card' && (
                <div className="flex flex-col gap-3">
                  <MaskInput
                    label="Número do cartão"
                    mask="####-####-####-####"
                    value={cardNumber}
                    onChange={(formatted) => setCardNumber(formatted)}
                    placeholder="0000-0000-0000-0000"
                  />
                  <Input
                    label="Nome no cartão"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Como aparece no cartão"
                    leftIcon={<CreditCard size={14} />}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <MaskInput
                      label="Validade"
                      mask="##/##"
                      value={cardExpiry}
                      onChange={(formatted) => setCardExpiry(formatted)}
                      placeholder="MM/AA"
                    />
                    <Input
                      label="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      type="password"
                    />
                  </div>
                </div>
              )}

              {payMethod === 'pix' && (
                <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface-deep)] p-6 text-center">
                  <QrCode size={64} className="text-[var(--text-muted-dim)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">QR Code PIX</p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">Escaneie com o app do seu banco</p>
                    <p className="mt-2 text-xs text-[var(--semantic-success)]">Aprovação imediata · R$ {total}</p>
                  </div>
                </div>
              )}

              {payMethod === 'boleto' && (
                <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-deep)] p-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[var(--text-muted)]" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Boleto bancário</span>
                  </div>
                  <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)] break-all">{BOLETO_CODE}</p>
                  <CopyButton text={BOLETO_CODE} label="Copiar código" />
                  <p className="text-xs text-[var(--text-muted-dim)]">Vence em 3 dias úteis · R$ {total}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ArrowLeft size={13} />
            Voltar
          </Button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === step ? 'h-1.5 w-5 bg-[var(--acc-img)]' :
                  i < step ? 'h-1.5 w-1.5 bg-[var(--acc-img)]/40' :
                  'h-1.5 w-1.5 bg-[var(--border-strong)]',
                )}
              />
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            isLoading={submitting}
            disabled={!canAdvance()}
          >
            {step === STEPS.length - 2 ? 'Finalizar pedido' : 'Continuar'}
            {step < STEPS.length - 2 && <ArrowRight size={13} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
