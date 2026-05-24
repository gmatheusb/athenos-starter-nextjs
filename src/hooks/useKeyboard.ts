import { useEffect } from 'react'

type Modifier = 'ctrl' | 'meta' | 'shift' | 'alt'

interface KeyboardOptions {
  modifiers?: Modifier[]
  enabled?: boolean
  preventDefault?: boolean
  target?: 'document' | 'window'
}

export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: KeyboardOptions = {},
) {
  const { modifiers = [], enabled = true, preventDefault = false } = options

  useEffect(() => {
    if (!enabled) return

    const listener = (e: KeyboardEvent) => {
      if (e.key !== key) return

      const modMatch =
        (!modifiers.includes('ctrl')  || e.ctrlKey)  &&
        (!modifiers.includes('meta')  || e.metaKey)  &&
        (!modifiers.includes('shift') || e.shiftKey) &&
        (!modifiers.includes('alt')   || e.altKey)

      if (!modMatch) return

      if (preventDefault) e.preventDefault()
      handler(e)
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [key, handler, modifiers, enabled, preventDefault])
}
