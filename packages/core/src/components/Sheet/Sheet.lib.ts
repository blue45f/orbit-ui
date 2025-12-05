import { useDrag, UserDragConfig } from '@use-gesture/react'
import { useMemo, useRef, useState, createContext, useContext, createElement } from 'react'

type UseResizableParams = {
  enabled: boolean
  /**
   * 핸들 터치를 통한 크기 조절 브레이크 포인트
   * - 숫자 단위 기준 : % 단위
   * - 'HIDDEN' 단위 기준 : 전부 내릴 시 숨김 처리
   */
  breakpoints?: Array<number | 'HIDDEN'>
  onChangeHeight?: (height: number) => void
}

type UseResizableReturn<T extends HTMLElement = HTMLElement, K extends HTMLElement = HTMLElement> = {
  grabberElementRef: React.Ref<T>
  containerElementRef: React.Ref<K>
}

type ContainerInitialValue = {
  height: number | null
  transition: string | null
  transitionProperty: string | null
  transitionDuration: string | null
  transitionTimingFunction: string | null
  transitionDelay: string | null
}

export const useResizable = <T extends HTMLElement = HTMLElement, K extends HTMLElement = HTMLElement>(
  params: UseResizableParams,
): UseResizableReturn<T, K> => {
  const containerInitialStyle = useRef<ContainerInitialValue>({
    height: null,
    transition: null,
    transitionProperty: null,
    transitionDuration: null,
    transitionTimingFunction: null,
    transitionDelay: null,
  })

  const [grabberElement, setGrabberElement] = useState<T | null>(null)
  const [containerElement, setContainerElement] = useState<K | null>(null)

  const grabberElementRef = (el: T | null) => {
    setGrabberElement(el)
  }

  const containerElementRef = (el: K | null) => {
    setContainerElement(el)
  }

  const findClosestBreakpoint = (value: number, breakpoints: Array<number | 'HIDDEN'>) => {
    const normalizedBreakpoints = breakpoints.map((bp) => (bp === 'HIDDEN' ? 0 : bp))

    if (normalizedBreakpoints.length === 0) {
      return value
    }

    return normalizedBreakpoints.reduce((closest, current) => {
      const currentDiff = Math.abs(current - value)
      const closestDiff = Math.abs(closest - value)

      return currentDiff < closestDiff ? current : closest
    })
  }

  // useDrag 설정을 메모이제이션하여 엘리먼트가 변경될 때마다 업데이트되도록 함
  const useDragConfig: UserDragConfig = useMemo(
    () => ({
      enabled: params.enabled && grabberElement !== null,
      ...(grabberElement && { target: grabberElement }),

      axis: 'y',
      preventDefault: true,
    }),
    [params.enabled, grabberElement],
  )

  useDrag(({ movement: [_, movementY], first, last, dragging }) => {
    if (!grabberElement || !containerElement) {
      return
    }

    if (first) {
      containerInitialStyle.current.height = containerElement.offsetHeight
      containerInitialStyle.current.transition = containerElement.style.transition
    }

    const newHeight = containerInitialStyle.current.height! - movementY

    if (dragging) {
      containerElement.style.height = `${newHeight}px`
    }

    if (last) {
      const newHeightToPercent = (newHeight / window.innerHeight) * 100
      const closestBreakpoint = findClosestBreakpoint(newHeightToPercent, params.breakpoints ?? [])

      containerInitialStyle.current.height = null
      containerElement.style.transition = 'height 0.1s ease-in-out'

      containerElement.addEventListener(
        'transitionend',
        () => (containerElement.style.transition = containerInitialStyle.current.transition || 'unset'),
        {
          once: true,
        },
      )
      params.onChangeHeight?.(closestBreakpoint)
    }
  }, useDragConfig)

  return {
    grabberElementRef,
    containerElementRef,
  }
}

/* ========================================================================
 * Sheet Context
 * ======================================================================== */

export type SheetContextValue = {
  id: string
  isPresented: boolean
  changeIsPresented: (params: { changeParams: [newValue: boolean]; value: boolean }) => void
}

export const SheetContext = createContext<SheetContextValue | undefined>(undefined)

export const useSheetContext = (componentName: string): SheetContextValue => {
  const context = useContext(SheetContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Sheet`)
  }

  return context
}

export const SheetProvider: React.FC<{
  id: string
  isPresented: boolean
  changeIsPresented: (params: { changeParams: [newValue: boolean]; value: boolean }) => void
  children: React.ReactNode
}> = ({ id, isPresented, changeIsPresented, children }) => {
  return createElement(SheetContext.Provider, { value: { id, isPresented, changeIsPresented } }, children)
}
