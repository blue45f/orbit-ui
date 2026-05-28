import { useCallback, useEffect, useRef, useState } from 'react'

export type FetchState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error }

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit,
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    status: 'loading',
    data: null,
    error: null,
  })
  const [counter, setCounter] = useState(0)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  })

  const refetch = useCallback(() => {
    setState({ status: 'loading', data: null, error: null })
    setCounter((c) => c + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const controller = new AbortController()

    window
      .fetch(url, { signal: controller.signal, ...optionsRef.current })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }
        const data = (await res.json()) as T
        setState({ status: 'success', data, error: null })
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setState({
          status: 'error',
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      })

    return () => {
      controller.abort()
    }
  }, [url, counter])

  return { ...state, refetch }
}
