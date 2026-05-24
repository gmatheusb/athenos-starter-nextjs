'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Sparkles, Sun, Moon, MessageCircle, ArrowRight } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { AuthOrbs } from '@/components/auth/AuthOrbs'
import { Switch } from '@/components/ui/Switch'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Para começar e explorar',
    cta: 'Começar grátis',
    features: ['5 projetos', '1 usuário', 'Componentes básicos', 'Suporte da comunidade'],
  },
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 49,
    priceYearly: 39,
    description: 'Para times pequenos',
    cta: 'Assinar Starter',
    features: ['20 projetos', '3 usuários', 'Todos os componentes', 'Suporte por e-mail', 'Analytics básico'],
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 129,
    priceYearly: 103,
    description: 'Para times que escalam',
    cta: 'Assinar Pro',
    recommended: true,
    features: ['Projetos ilimitados', 'Usuários ilimitados', 'White-label', 'Suporte prioritário', 'Analytics avançado', 'API access'],
  },
]

const FEATURE_MATRIX = [
  { feature: 'Projetos', free: '5', starter: '20', pro: 'Ilimitado' },
  { feature: 'Usuários', free: '1', starter: '3', pro: 'Ilimitado' },
  { feature: 'Componentes', free: 'Básicos', starter: 'Todos', pro: 'Todos' },
  { feature: 'Analytics', free: false, starter: 'Básico', pro: 'Avançado' },
  { feature: 'White-label', free: false, starter: false, pro: true },
  { feature: 'API access', free: false, starter: false, pro: true },
  { feature: 'Suporte', free: 'Comunidade', starter: 'E-mail', pro: 'Prioritário' },
]

const FAQ_ITEMS = [
  {
    id: 'cancel',
    title: 'Posso cancelar a qualquer momento?',
    content: (
      <p className="text-sm text-[var(--text-muted)]">
        Sim. Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Ao cancelar, você continua com acesso até o final do período pago.
      </p>
    ),
  },
  {
    id: 'trial',
    title: 'Existe período de teste gratuito?',
    content: (
      <p className="text-sm text-[var(--text-muted)]">
        Todos os planos pagos têm 14 dias de teste gratuito, sem necessidade de cartão de crédito. Você só é cobrado se decidir continuar após o período.
      </p>
    ),
  },
  {
    id: 'upgrade',
    title: 'Como funciona o upgrade de plano?',
    content: (
      <p className="text-sm text-[var(--text-muted)]">
        O upgrade é imediato. Você paga apenas a diferença proporcional dos dias restantes do ciclo atual. O downgrade entra em vigor no próximo ciclo de cobrança.
      </p>
    ),
  },
  {
    id: 'payment',
    title: 'Quais formas de pagamento são aceitas?',
    content: (
      <p className="text-sm text-[var(--text-muted)]">
        Aceitamos cartão de crédito (Visa, Mastercard, Amex), PIX e boleto bancário. Todos os pagamentos são processados com segurança via Stripe.
      </p>
    ),
  },
  {
    id: 'invoice',
    title: 'Emitem nota fiscal?',
    content: (
      <p className="text-sm text-[var(--text-muted)]">
        Sim. Emitimos nota fiscal eletrônica para todas as transações. Você pode baixar suas notas fiscais diretamente no painel de faturamento.
      </p>
    ),
  },
]

export default function PricingPage() {
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()
  const [annual, setAnnual] = useState(false)

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)]">
      <AuthOrbs />

      {/* Header */}
      <header className="sticky top-0 z-[var(--z-sticky)] flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">Athenos</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] sm:block"
          >
            Componentes
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-4 py-16">

        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">
            Escolha seu plano
          </h1>
          <p className="mt-3 text-base text-[var(--text-muted)]">
            Comece grátis e escale conforme crescer. Sem surpresas.
          </p>

          {/* Annual toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={cn('text-sm transition-colors', !annual ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
              Mensal
            </span>
            <Switch checked={annual} onChange={setAnnual} />
            <span className={cn('text-sm transition-colors', annual ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
              Anual
            </span>
            {annual && (
              <span className="rounded-full bg-[var(--semantic-success)]/15 px-2.5 py-0.5 text-xs font-semibold text-[var(--semantic-success)]">
                20% off
              </span>
            )}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PLANS.map((plan) => {
            const price = annual ? plan.priceYearly : plan.priceMonthly
            return (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-[var(--radius-xl)] border p-6 transition-all',
                  plan.recommended
                    ? 'border-[var(--acc-img)] bg-[var(--acc-img)]/5 shadow-lg'
                    : 'border-[var(--border)] bg-[var(--surface)]',
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[var(--acc-img)] px-3 py-1 text-[11px] font-semibold text-white">
                      Recomendado
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-base font-bold text-[var(--text-primary)]">{plan.name}</h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[var(--text-primary)]">
                      {price === 0 ? 'Grátis' : `R$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-xs text-[var(--text-muted)]">/mês</span>
                    )}
                  </div>
                  {annual && price > 0 && (
                    <p className="mt-0.5 text-[11px] text-[var(--semantic-success)]">
                      Cobrado R${price * 12}/ano
                    </p>
                  )}
                </div>

                <Button
                  variant={plan.recommended ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => toast.success(`Plano ${plan.name} selecionado!`)}
                >
                  {plan.cta}
                  <ArrowRight size={13} />
                </Button>

                <ul className="mt-5 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <Check size={13} className="shrink-0 text-[var(--semantic-success)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Feature comparison */}
        <div className="mt-16">
          <h2 className="mb-6 text-center text-lg font-bold text-[var(--text-primary)]">
            Comparativo de recursos
          </h2>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-deep)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted-dim)]">Recurso</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted-dim)]">Free</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted-dim)]">Starter</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--acc-img)]">Pro</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_MATRIX.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      'border-b border-[var(--border-subtle)] last:border-0',
                      i % 2 === 0 ? 'bg-[var(--surface)]' : 'bg-[var(--surface-deep)]',
                    )}
                  >
                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{row.feature}</td>
                    {([row.free, row.starter, row.pro] as (boolean | string)[]).map((val, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        {val === true ? (
                          <Check size={14} className="mx-auto text-[var(--semantic-success)]" />
                        ) : val === false ? (
                          <X size={14} className="mx-auto text-[var(--border-strong)]" />
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-6 text-center text-lg font-bold text-[var(--text-primary)]">
            Perguntas frequentes
          </h2>
          <Accordion items={FAQ_ITEMS} single />
        </div>

        {/* CTA final */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--acc-img)]/10">
            <MessageCircle size={20} className="text-[var(--acc-img)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Ainda com dúvidas?</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Nossa equipe responde em menos de 24 horas.</p>
          </div>
          <Button
            variant="primary"
            onClick={() => toast.info('Chat de suporte aberto!')}
          >
            <MessageCircle size={14} />
            Falar com a equipe
          </Button>
        </div>

      </div>
    </div>
  )
}
