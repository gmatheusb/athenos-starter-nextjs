import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg-canvas)] px-4 text-center">

      {/* Orb decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: 'var(--acc-img)' }}
      />

      <div className="relative flex flex-col items-center gap-6">
        <p className="text-[120px] font-black leading-none tracking-tight text-[var(--border-strong)] select-none sm:text-[160px]">
          404
        </p>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Página não encontrada</h1>
          <p className="max-w-sm text-sm text-[var(--text-muted)]">
            O endereço que você tentou acessar não existe ou foi removido.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-[var(--radius-pill)] bg-[var(--acc-img)] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Voltar ao início
          </Link>
          <Link
            href="/components"
            className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            Ver componentes
          </Link>
        </div>
      </div>
    </div>
  )
}
