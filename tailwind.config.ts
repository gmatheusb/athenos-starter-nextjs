import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Fundos ────────────────────────────────────────
        canvas:          'var(--bg-canvas)',
        modal:           'var(--bg-modal)',
        panel:           'var(--bg-panel-deep)',
        // ── Superfícies ───────────────────────────────────
        surface:         'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        'surface-deep':  'var(--surface-deep)',
        // ── Glass ─────────────────────────────────────────
        'glass-bar':     'var(--glass)',
        // ── Bordas ────────────────────────────────────────
        border:          'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'border-input':  'var(--border-input)',
        // ── Texto ─────────────────────────────────────────
        heading:         'var(--text-primary)',
        body:            'var(--text-secondary)',
        muted:           'var(--text-muted)',
        'muted-dim':     'var(--text-muted-dim)',
        // ── Accent: Imagem (roxo) ──────────────────────────
        'accent-img':           'var(--acc-img)',
        'accent-img-mid':       'var(--acc-img-mid)',
        'accent-img-bg':        'var(--acc-img-soft)',
        'accent-img-border':    'var(--acc-img-border)',
        // ── Accent: Vídeo (pink) ───────────────────────────
        'accent-vid':           'var(--acc-vid)',
        'accent-vid-mid':       'var(--acc-vid-mid)',
        'accent-vid-bg':        'var(--acc-vid-soft)',
        'accent-vid-border':    'var(--acc-vid-border)',
        // ── Semântico ─────────────────────────────────────
        success:         'var(--semantic-success)',
        error:           'var(--semantic-error)',
        warning:         'var(--semantic-warning)',
        info:            'var(--semantic-info)',
        'success-soft':  'var(--semantic-success-soft)',
        'error-soft':    'var(--semantic-error-soft)',
        'warning-soft':  'var(--semantic-warning-soft)',
        'info-soft':     'var(--semantic-info-soft)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: '9999px',
      },
      boxShadow: {
        sm:    'var(--shadow-sm)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '350ms',
      },
      fontFamily: {
        sans: ["sohne-var", "'SF Pro Display'", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
