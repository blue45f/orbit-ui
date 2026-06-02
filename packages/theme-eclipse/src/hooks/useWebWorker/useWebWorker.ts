import { useCallback, useEffect, useRef, useState } from 'react'

export type WebWorkerStatus = 'idle' | 'running' | 'success' | 'error' | 'terminated'

export type UseWebWorkerReturn<T> = {
  result: T | null
  status: WebWorkerStatus
  error: Error | null
  run: (...args: unknown[]) => void
  terminate: () => void
}

function workerScript(fn: (...args: unknown[]) => unknown): string {
  return `
    self.onmessage = function(e) {
      try {
        const result = (${fn.toString()})(...e.data)
        self.postMessage({ result, error: null })
      } catch (err) {
        self.postMessage({ result: null, error: err.message })
      }
    }
  `
}

/**
 * 함수를 Web Worker에서 실행합니다. Blob URL을 통해 동적으로 워커를 생성합니다.
 *
 * @param fn - 워커에서 실행할 함수 (순수 함수여야 하며, 클로저 변수에 접근 불가)
 * @returns `{ run, result, status, error, terminate }`
 *
 * @example
 * ```tsx
 * function HeavyCompute() {
 *   const { run, result, status } = useWebWorker((n: number) => {
 *     let sum = 0
 *     for (let i = 0; i < n; i++) sum += i
 *     return sum
 *   })
 *   return (
 *     <div>
 *       <button onClick={() => run(1_000_000)}>Compute</button>
 *       {status === 'success' && <p>Result: {result}</p>}
 *     </div>
 *   )
 * }
 * ```
 */
export function useWebWorker<T = unknown>(fn: (...args: unknown[]) => T): UseWebWorkerReturn<T> {
  const [status, setStatus] = useState<WebWorkerStatus>('idle')
  const [result, setResult] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const fnRef = useRef(fn)
  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const terminate = useCallback(() => {
    workerRef.current?.terminate()
    workerRef.current = null
    setStatus('terminated')
  }, [])

  const run = useCallback(
    (...args: unknown[]) => {
      if (typeof Worker === 'undefined') return
      terminate()

      const blob = new Blob([workerScript(fnRef.current)], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      const worker = new Worker(url)
      workerRef.current = worker
      setStatus('running')
      setError(null)

      worker.onmessage = (e: MessageEvent<{ result: T; error: string | null }>) => {
        URL.revokeObjectURL(url)
        if (e.data.error) {
          setError(new Error(e.data.error))
          setStatus('error')
        } else {
          setResult(e.data.result)
          setStatus('success')
        }
        workerRef.current = null
      }

      worker.onerror = () => {
        URL.revokeObjectURL(url)
        setError(new Error('Worker error'))
        setStatus('error')
        workerRef.current = null
      }

      worker.postMessage(args)
    },
    [terminate]
  )

  useEffect(
    () => () => {
      workerRef.current?.terminate()
    },
    []
  )

  return { result, status, error, run, terminate }
}
