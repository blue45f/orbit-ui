import { MutableRefObject, useEffect, useRef } from 'react'

import { listen, noop, useEvent } from '../../../libs'

function attachPointerDownHandler(
  ownerDocument: Document,
  handlePointerDownOutside: EventListener,
  isPointerInsideReactTreeRef: MutableRefObject<boolean>,
  handleClickRef: MutableRefObject<EventListener>,
) {
  const handlePointerDown = (event: PointerEvent) => {
    if (event.target && !isPointerInsideReactTreeRef.current) {
      /**
       * 터치 디바이스에서는 클릭 이벤트를 기다려야 함
       * 브라우저가 사용자가 화면을 터치하고 나서 실제로 이벤트를 실행할 때까지 약 350ms의 지연시간이 있기때문
       *
       * 추가로, 이 방식은 클릭 이벤트가 발생하지 않는 상황들을 자동으로 처리할 수 있게 함
       * - 페이지가 스크롤된 경우
       * - 드래그 스크롤된 경우
       * - 길게 누른 경우(long-press) 등
       *
       * @see https://github.com/radix-ui/primitives/blob/08c0ceb541c0cc2c9610ed04619e252ffbb01cc4/packages/react/dismissable-layer/src/DismissableLayer.tsx#L246
       *
       */
      if (event.pointerType === 'touch') {
        ownerDocument.removeEventListener('click', handleClickRef.current)
        handleClickRef.current = handlePointerDownOutside
        ownerDocument.addEventListener('click', handleClickRef.current, { once: true })
      } else {
        handlePointerDownOutside(event)
      }
    } else {
      ownerDocument.removeEventListener('click', handleClickRef.current)
    }
    isPointerInsideReactTreeRef.current = false
  }
  /**
   * 만약 이 훅이 `pointerdown` 이벤트를 통해 마운트되는 컴포넌트에서 실행된다면,
   * 해당 이벤트가 document까지 버블링되어 올라가서
   * 의도치 않은 `pointerDownOutside` 이벤트를 발생시킬 수 있음.
   *
   * 우리는 document에 이벤트 리스너 등록을 지연시킴으로써 이 문제를 우회.
   *
   * 이는 React 특유의 동작이 아니라, DOM의 기본적인 작동 방식임
   * @see https://github.com/radix-ui/primitives/blob/08c0ceb541c0cc2c9610ed04619e252ffbb01cc4/packages/react/dismissable-layer/src/DismissableLayer.tsx
   * button.addEventListener('pointerdown', () => {
   *   console.log('I will log');
   *   document.addEventListener('pointerdown', () => {
   *     console.log('I will also log');
   *   })
   * });
   */
  const timerId = window.setTimeout(() => {
    ownerDocument.addEventListener('pointerdown', handlePointerDown)
  }, 0)

  return () => {
    window.clearTimeout(timerId)
    ownerDocument.removeEventListener('pointerdown', handlePointerDown)
    ownerDocument.removeEventListener('click', handleClickRef.current)
  }
}

export function usePointerDownOutside(
  onPointerDownOutside?: (event: PointerEvent) => void,
  ownerDocument: Document = globalThis?.document,
): { onPointerDownCapture: () => void } {
  const handlePointerDownOutside = useEvent(onPointerDownOutside || noop) as EventListener
  const isPointerInsideReactTreeRef = useRef(false)
  const handleClickRef = useRef(() => {})

  useEffect(() => {
    return attachPointerDownHandler(
      ownerDocument,
      handlePointerDownOutside,
      isPointerInsideReactTreeRef,
      handleClickRef,
    )
  }, [ownerDocument, handlePointerDownOutside])

  return {
    onPointerDownCapture: () => (isPointerInsideReactTreeRef.current = true),
  }
}

export function useFocusOutside(
  onFocusOutside?: (event: FocusEvent) => void,
  ownerDocument: Document = globalThis?.document,
): { onFocusCapture: () => void; onBlurCapture: () => void } {
  const handleFocusOutside = useEvent(onFocusOutside || noop) as EventListener
  const isFocusInsideReactTreeRef = useRef(false)

  useEffect(
    () =>
      listen(ownerDocument, 'focusin', (event) => {
        if (event.target && !isFocusInsideReactTreeRef.current) {
          handleFocusOutside(event)
        }
      }),
    [ownerDocument, handleFocusOutside],
  )

  return {
    /**
     * 이벤트 버블보다 캡처가 먼저 실행되는 원리를 이용해 레이어 내부에서 이벤트가 발생했는지 체크
     */
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  }
}

export function useEscapeKeydown(
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
): void {
  const onEscapeKeyDown = useEvent(onEscapeKeyDownProp || noop)

  useEffect(
    () =>
      listen(ownerDocument, 'keydown', (event) => {
        if (event.key === 'Escape') {
          onEscapeKeyDown(event)
        }
      }),
    [onEscapeKeyDown, ownerDocument],
  )
}
