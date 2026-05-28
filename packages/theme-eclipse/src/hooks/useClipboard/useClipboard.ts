import { useCallback, useEffect, useRef, useState } from 'react'

export type UseClipboardOptions = {
  /**
   * `hasCopied`가 true로 유지되는 밀리초.
   * @defaultValue 2000
   */
  timeout?: number
}

export type UseClipboardReturn = {
  /** 마지막으로 복사한 텍스트 (성공한 경우만 갱신) */
  value: string | null
  /** 마지막 복사 직후 일정 시간 동안 true. 토스트·아이콘 토글에 사용. */
  hasCopied: boolean
  /**
   * 복사를 시도합니다. 실패 시 Promise는 reject 되지만 throw 하지 않고 false를 반환합니다.
   * @returns 성공 여부
   */
  onCopy: (text: string) => Promise<boolean>
  /** 수동으로 `hasCopied`를 false로 리셋 */
  reset: () => void
}

/**
 * 텍스트 클립보드 복사 + 일정 시간 후 자동 리셋되는 시각 피드백을 한 줄로 제공합니다.
 *
 * @example
 * ```tsx
 * function ShareButton({ url }: { url: string }) {
 *   const { hasCopied, onCopy } = useClipboard()
 *   return (
 *     <SolidButton onClick={() => onCopy(url)}>
 *       <SolidButton.Center>{hasCopied ? '복사됨' : '링크 복사'}</SolidButton.Center>
 *     </SolidButton>
 *   )
 * }
 * ```
 *
 * SSR 안전: `navigator.clipboard`가 없는 환경 (Node, 일부 모바일 브라우저)에서는
 * `document.execCommand('copy')` 폴백을 사용합니다. 둘 다 실패하면 false 반환.
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000 } = options
  const [hasCopied, setHasCopied] = useState(false)
  const [value, setValue] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearTimer()
    setHasCopied(false)
  }, [clearTimer])

  const onCopy = useCallback(
    async (text: string): Promise<boolean> => {
      const succeeded = await writeToClipboard(text)
      if (succeeded) {
        setValue(text)
        setHasCopied(true)
        clearTimer()
        if (timeout > 0) {
          timerRef.current = setTimeout(() => {
            setHasCopied(false)
          }, timeout)
        }
      }
      return succeeded
    },
    [clearTimer, timeout],
  )

  useEffect(() => clearTimer, [clearTimer])

  return { value, hasCopied, onCopy, reset }
}

async function writeToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }
  if (window.navigator?.clipboard?.writeText) {
    try {
      await window.navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to execCommand fallback
    }
  }
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '-9999px'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}
