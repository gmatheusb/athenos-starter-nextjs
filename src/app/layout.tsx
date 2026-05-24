import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/theme/ThemeProvider'

export const metadata: Metadata = {
  title: 'Athenos — Next.js Starter',
  description: 'Athenos Design System v2.0 — Starter Template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
