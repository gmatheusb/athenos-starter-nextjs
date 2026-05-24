import { useCallback, useEffect, useRef, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>
  reset: () => void
}

export function useAsync<T>(
  fn: (...args: unknown[]) => Promise<T>,
  immediate = false,
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await fn(...args)
        if (mountedRef.current) setState({ data: result, loading: false, error: null })
      } catch (err) {
        if (mountedRef.current) setState({ data: null, loading: false, error: err instanceof Error ? err : new Error(String(err)) })
      }
    },
    [fn],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  useEffect(() => {
    if (immediate) execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return { ...state, execute, reset }
}
