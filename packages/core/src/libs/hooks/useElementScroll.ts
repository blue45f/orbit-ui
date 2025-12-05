import { useState, useEffect } from 'react'

import { ResizeObserver } from '../utils/dom'
import { throttle } from '../utils/throttle'

interface UseElementScroll<T> {
  /**
   * 스크롤이 되었는지 여부를 반환
   */
  isScrolled: boolean
  /**
   * 스크롤이 가능한지 여부를 반환
   */
  isScrollable: boolean

  /**
   * 스크롤이 끝에 도달했는지 여부를 반환
   */
  isScrollEnd: boolean

  /**
   * 스크롤을 체크하는 엘리먼트의 ref
   */
  scrollRef: React.Ref<T>
}

export function useElementScroll<T extends HTMLElement>(): UseElementScroll<T> {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isScrollEnd, setIsScrollEnd] = useState(false)
  const [scrollElement, setScrollElement] = useState<T | null>(null)

  useEffect(() => {
    if (!scrollElement) return

    const update = throttle(() => {
      const { scrollTop, offsetHeight, scrollHeight } = scrollElement

      setIsScrolled(scrollTop > 1)
      setIsScrollable(offsetHeight < scrollHeight)
      setIsScrollEnd(scrollTop + offsetHeight >= scrollHeight)
    }, 100)
    const resizeObserver = new ResizeObserver(update)

    resizeObserver.observe(scrollElement)
    scrollElement.addEventListener('scroll', update)

    return () => {
      resizeObserver.disconnect()
      scrollElement.removeEventListener('scroll', update)
    }
  }, [scrollElement])

  return {
    isScrolled,
    isScrollable,
    isScrollEnd,
    scrollRef: setScrollElement,
  }
}
