import { useEffect, useState } from 'react'

const BREAKPOINTS = {
  sm:  '(min-width: 640px)',
  md:  '(min-width: 768px)',
  lg:  '(min-width: 1024px)',
  xl:  '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

type Breakpoint = keyof typeof BREAKPOINTS

export function useMediaQuery(query: Breakpoint | (string & {})): boolean {
  const resolved = (BREAKPOINTS as Record<string, string>)[query] ?? query

  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(resolved).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(resolved)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [resolved])

  return matches
}
