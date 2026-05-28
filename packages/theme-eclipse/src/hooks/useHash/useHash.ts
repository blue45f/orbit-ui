import { useEffect, useState } from 'react'

export type UseHashReturn = {
  /** 현재 URL 해시. '#' 접두사 포함. 예: '#section-2' */
  hash: string
  /** location.hash를 업데이트하고 상태를 동기화합니다. */
  setHash: (hash: string) => void
}

const getHash = (): string => {
  if (typeof window === 'undefined') return ''
  return window.location.hash
}

/**
 * URL 해시(`location.hash`)를 React 상태와 동기화합니다.
 *
 * `hashchange` 이벤트를 구독해 외부 변경(링크 클릭, 브라우저 뒤로가기 등)도
 * 자동으로 반영합니다. SSR 환경에서는 빈 문자열을 반환합니다.
 *
 * @example
 * ```tsx
 * const { hash, setHash } = useHash()
 *
 * return (
 *   <>
 *     <p>현재 해시: {hash}</p>
 *     <button onClick={() => setHash('#section-2')}>섹션 2로</button>
 *   </>
 * )
 * ```
 */
export function useHash(): UseHashReturn {
  const [hash, setHashState] = useState<string>(getHash)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHashChange = () => {
      setHashState(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const setHash = (h: string) => {
    if (typeof window === 'undefined') return
    window.location.hash = h
  }

  return { hash, setHash }
}
