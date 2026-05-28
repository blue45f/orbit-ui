import { useEffect, useRef, useState } from 'react'

export type ClipboardPasteState = {
  text: string
  files: File[]
}

export type UseClipboardPasteOptions = {
  onPaste?: (state: ClipboardPasteState) => void
}

/**
 * document 의 paste 이벤트를 구독하고 클립보드의 텍스트 및 파일을 추출합니다.
 *
 * SSR 환경에서는 이벤트 리스너를 등록하지 않습니다 (`document` 없음).
 *
 * @example
 * ```tsx
 * const { text, files } = useClipboardPaste({
 *   onPaste: ({ text, files }) => {
 *     console.log('Pasted text:', text)
 *     console.log('Pasted files:', files)
 *   },
 * })
 * ```
 */
export function useClipboardPaste(options: UseClipboardPasteOptions = {}): ClipboardPasteState {
  const [state, setState] = useState<ClipboardPasteState>({ text: '', files: [] })
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text/plain') ?? ''
      const files = Array.from(e.clipboardData?.files ?? [])
      const next: ClipboardPasteState = { text, files }
      setState(next)
      optionsRef.current.onPaste?.(next)
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  return state
}
