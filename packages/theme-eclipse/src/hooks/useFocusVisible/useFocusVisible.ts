import { useEffect, useState } from 'react'

/**
 * 현재 키보드 내비게이션으로 인한 포커스인지 추적합니다.
 *
 * 브라우저의 `:focus-visible` pseudo-class와 동일한 헷지: 키보드 입력 직후의 포커스만 보이는 것으로 간주.
 * 마우스 클릭으로 인한 포커스는 false. 컴포넌트의 `outline`을 JS로 분기해야 하는 드문 케이스에 사용합니다.
 *
 * 대부분의 컴포넌트는 CSS `:focus-visible` 셀렉터로 충분하지만, JS에서 분기해야 할 때
 * (예: 풀-블리드 hero에서 포커스 상태에 따라 다른 애니메이션 트리거) 이 훅을 사용.
 *
 * @example
 * ```tsx
 * const { isFocusVisible } = useFocusVisible()
 * <button data-focus-visible={isFocusVisible ? 'on' : 'off'}>...</button>
 * ```
 */
export function useFocusVisible(): { isFocusVisible: boolean } {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return

    let keyboardModality = false

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.altKey || event.ctrlKey) return
      keyboardModality = true
    }

    const handlePointerDown = () => {
      keyboardModality = false
    }

    const handleFocus = () => {
      setIsFocusVisible(keyboardModality)
    }

    const handleBlur = () => {
      setIsFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('mousedown', handlePointerDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('touchstart', handlePointerDown, true)
    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('mousedown', handlePointerDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('touchstart', handlePointerDown, true)
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])

  return { isFocusVisible }
}
