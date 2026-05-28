import { useEffect, useState } from 'react'

/**
 * Blob 또는 File에서 Object URL을 생성하고, 언마운트 또는 blob 변경 시 자동으로 해제(revoke)합니다.
 *
 * SSR 안전: 서버 환경 또는 blob이 null/undefined인 경우 null을 반환합니다.
 *
 * @example
 * ```tsx
 * function Preview({ file }: { file: File | null }) {
 *   const url = useObjectUrl(file)
 *   return url ? <img src={url} alt="preview" /> : null
 * }
 * ```
 */
export function useObjectUrl(blob: Blob | MediaSource | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!blob || typeof URL === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(blob)
    setUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [blob])

  return url
}
