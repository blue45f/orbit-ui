import { useEffect, useState } from 'react'

export type SelectionState = {
  text: string
  rects: DOMRect[]
}

/**
 * 페이지의 현재 텍스트 선택을 추적합니다.
 *
 * `text`는 선택된 문자열, `rects`는 선택 영역의 바운딩 박스 목록입니다.
 * 선택이 해제되면 `{ text: '', rects: [] }`로 초기화됩니다.
 *
 * @example
 * ```tsx
 * const { text, rects } = useSelection()
 *
 * return (
 *   <div>
 *     {text && <Tooltip rects={rects}>복사하기</Tooltip>}
 *   </div>
 * )
 * ```
 *
 * SSR 안전: 서버에서는 빈 초기값을 반환하고 이벤트 리스너를 부착하지 않습니다.
 */
export function useSelection(): SelectionState {
  const [selection, setSelection] = useState<SelectionState>({ text: '', rects: [] })

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) {
        setSelection({ text: '', rects: [] })
        return
      }
      const rects: DOMRect[] = []
      for (let i = 0; i < sel.rangeCount; i++) {
        const range = sel.getRangeAt(i)
        rects.push(...Array.from(range.getClientRects()))
      }
      setSelection({ text: sel.toString(), rects })
    }

    document.addEventListener('selectionchange', handleSelection)
    return () => document.removeEventListener('selectionchange', handleSelection)
  }, [])

  return selection
}
