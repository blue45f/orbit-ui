import { Bounds, DragConfig, useDrag } from '@use-gesture/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ElementSize, useElementSize } from './useElementSize'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * 스와이프 방향
 *
 * -1: axis가 x일 때 왼쪽, y일 때 위쪽
 * 1: axis가 x일 때 오른쪽, y일 때 아래쪽
 */
type Direction = -1 | 1
type Axis = 'x' | 'y'
type Threshold = number | `${number}%` | `${number}px`

export type SwipeOptions = {
  /**
   * 스와이프 기능 활성화 여부
   *
   * @defaultValue `false`
   */
  enabled?: boolean
  /**
   * 스와이프 동작을 지원하는 축
   *
   * @defaultValue `x`
   */
  axis?: Axis
  /**
   * 핸들러 호출을 위한 임계치
   *
   * % 단위의 문자열이면 요소 너비 또는 높이의 비율입니다. 그 외 값은 px 단위로 해석합니다.
   *
   * @example
   * - 20: 20px만큼 이동하면 핸들러를 호출
   * - '30px': 30px만큼 이동하면 핸들러를 호출
   * - '50%': 요소 너비 또는 높이의 50%만큼 이동하면 핸들러를 호출
   * @defaultValue `30%`
   */
  threshold?: Threshold
  /**
   * 스와이프 동작 시 함께 움직일 인접 요소의 선택자
   *
   * @example
   * { prev: '.prev-slide', next: '.next-slide' }
   */
  sibling?: { prev: string; next: string }
  /**
   * 드래그 이벤트 대상 요소
   *
   * 드래그 이벤트를 발생시키는 요소와 드래그로 이동될 요소가 서로 다른 경우 사용하세요.
   *
   * @example 바텀시트 핸들 영역
   */
  eventTarget?: React.RefObject<HTMLElement>
  /**
   * 드래그 가능한 상하좌우 영역 설정
   *
   * 지정되지 않은 방향은 Infinity로 설정됩니다.
   *
   * @example
   * ```
   * // 상하좌우 모두 50px만큼 드래그 가능
   * { top: -50, bottom: 50, left: -50, right: 50 }
   * ```
   */
  bounds?: Bounds
  /** 3px 이상 드래그된 경우 클릭 이벤트 호출 방지 */
  filterTaps?: boolean
  /**
   * 네이티브 터치 이벤트 방지 여부
   *
   * 내부 스크롤이 필요한 BottomSheet 등에서는 비활성화 해주세요.
   * @defaultValue `false`
   */
  preventNativeTouch?: boolean
  /**
   * 스와이프 중 스크롤 방지 여부
   *
   * - 좌우 스와이프로 동작하는 Carousel에서 활성화 해주세요.
   * @defaultValue `false`
   */
  preventScroll?: boolean
  pointer?: DragConfig['pointer']
}

export const useSwipe = <T extends HTMLElement = HTMLDivElement>(
  handler: (direction: Direction) => void,
  options?: SwipeOptions,
): ((element: T) => void) => {
  const {
    enabled = false,
    axis = 'x',
    threshold: thresholdOption = '30%',
    sibling,
    eventTarget,
    bounds,
    filterTaps,
    preventNativeTouch = false,
    preventScroll = false,
    pointer = { touch: true },
  } = options || {}
  const [self, size] = useElementSize<T>()
  const [selfElement, setSelfElement] = useState<T | null>(null)
  const prev = useRef<T | null>(null)
  const next = useRef<T | null>(null)
  const threshold = useRef<number>(0)
  const translateAttr = axis === 'x' ? 'translateX' : 'translateY'
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // filterTaps 기본값 설정을 위해 터치 가능 여부를 판단합니다.
  useIsomorphicLayoutEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // 타겟 요소 크기와 그에 따른 threshold 값, 터치 이벤트 관련 스타일을 설정합니다.
  useEffect(() => {
    if (self.current) {
      threshold.current = computeThreshold({ axis, threshold: thresholdOption }, size)

      const targetElement = eventTarget?.current || self.current

      // 스와이프 방향에 따른 브라우저 스크롤 동작 제어
      // https://use-gesture.netlify.app/docs/extras/#touch-action
      targetElement.style.touchAction = axis === 'x' ? 'pan-y' : 'pan-x'
      targetElement.style.userSelect = 'none'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axis, thresholdOption, selfElement, size])

  // 사용자 제스처에 따라 슬라이드를 움직입니다.
  const translate = (el: T, v: string) => {
    el.style.transition = 'unset'
    el.style.transform = `${translateAttr}(${v})`
  }

  // 스와이프를 통한 슬라이드 이동 전 사용처 스타일에 영향을 주지 않기 위해 속성을 제거합니다.
  const unset = (el: T) => {
    el.style.removeProperty('transition')
    el.style.removeProperty('transform')
  }

  const assignSiblingIfNeeded = () => {
    if (sibling?.prev && !prev.current) {
      prev.current = document.querySelector(sibling.prev) as T
    }

    if (sibling?.next && !next.current) {
      next.current = document.querySelector(sibling.next) as T
    }
  }

  useDrag(
    ({ active, movement: [mx, my], velocity: [vx, vy] }) => {
      const movement = axis === 'x' ? mx : my
      const velocity = axis === 'x' ? vx : vy
      const isOverThreshold = Math.abs(movement) > threshold.current || velocity > 0.5

      if (active) {
        assignSiblingIfNeeded()

        if (self.current) translate(self.current, `${movement}px`)
        if (prev.current) translate(prev.current, `calc(-100% + ${movement}px)`)
        if (next.current) translate(next.current, `calc(100% + ${movement}px)`)

        return
      }

      if (isOverThreshold) {
        handler(movement > 0 ? 1 : -1)
      }

      if (self.current) unset(self.current)
      if (prev.current) unset(prev.current)
      if (next.current) unset(next.current)

      prev.current = null
      next.current = null
    },
    {
      axis,
      enabled,
      // target이 없으면 기본값은 자체 요소
      target: eventTarget || self,
      // 네이티브 드래그 기능 비활성화
      // https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
      eventOptions: { passive: false },
      preventDefault: true,
      /*
       * 스와이프 중 스크롤 방지
       *
       * preventScroll과 filterTaps를 동시 활성화 시 클릭 이벤트가 발생하지 않는 이슈가 있음
       * https://github.com/pmndrs/use-gesture/issues/593
       *
       * 위 이슈 해결 전까지 filterTaps 옵션 설정을 지원함
       *
       * TODO: @sh.lee 위 이슈 해결 후 외부에 제공되는 filterTaps 옵션 제거
       */
      preventScroll,
      filterTaps: filterTaps ?? !isTouchDevice,
      bounds,
      /*
       * IOS 네이티브에서 page navigation 과정에서 Drag 동작이 멈추는 이슈가 있음.
       * https://github.com/pmndrs/use-gesture/issues/349
       */
      pointer,
    },
  )

  // NOTE: ref가 사용처 요소에 바인딩될 때 selfElement 상태로 렌더링을 발생시키기 위한 콜백 함수
  const ref = useCallback((el: T) => {
    setSelfElement(el)
    self.current = el
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 네이티브 스와이프와의 충돌을 방지하기 위한 처리
  useEffect(() => {
    if (!selfElement || !preventNativeTouch) return

    let ongoingTouches: Touch[] = []

    const handleTouchMove = (e: TouchEvent) => {
      ongoingTouches.push(e.changedTouches[0])

      const ongoingTouchAxis = computeTouchAxis(ongoingTouches)
      // NOTE: 수직 방향 스크롤 허용을 위해 동일한 방향인 경우에만 preventDefault 처리
      const shouldPrevent = !ongoingTouchAxis || (axis === 'x' ? ongoingTouchAxis === 'x' : ongoingTouchAxis === 'y')

      if (shouldPrevent) {
        if (e.cancelable) e.preventDefault()
      } else {
        selfElement.removeEventListener('touchmove', handleTouchMove)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      ongoingTouches = [e.changedTouches[0]]

      selfElement.addEventListener('touchmove', handleTouchMove)
    }

    selfElement.addEventListener('touchstart', handleTouchStart)

    return () => {
      selfElement.removeEventListener('touchstart', handleTouchStart)
      selfElement.removeEventListener('touchmove', handleTouchMove)
    }
  }, [axis, selfElement, preventNativeTouch])

  return ref
}

const computeTouchAxis = (touches: Touch[]): Axis | undefined => {
  if (touches.length < 2) return

  const { screenX: x1, screenY: y1 } = touches[0]
  const { screenX: x2, screenY: y2 } = touches[touches.length - 1]
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)

  return dx > dy ? 'x' : 'y'
}

// px 또는 % 문자열로 전달되는 값을 숫자로 변환합니다.
export const computeThreshold = (
  { axis, threshold }: { axis: Axis; threshold: Threshold },
  rect: ElementSize,
): number => {
  if (typeof threshold === 'number') return threshold

  const parsed = parseInt(threshold, 10)

  if (threshold.endsWith('%')) {
    const ratio = parsed / 100
    return (axis === 'x' ? rect.width : rect.height) * ratio
  }

  return parsed
}
