/**
 * element 요소의 value 값을 설정할 수 있어요.
 *
 * @link https://github.com/facebook/react/issues/10135#issuecomment-401496776
 * @param element value값을 적용할 요소
 * @param value 적용할 value 값
 */
export function setNativeValue(element: HTMLElement, value: string | boolean): void {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {}
  const prototype = Object.getPrototypeOf(element)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } else if (valueSetter) {
    valueSetter.call(element, value)
  } else {
    throw new Error('The given element does not have a value setter')
  }

  element.dispatchEvent(new Event('change', { bubbles: true }))
}

/**
 * select 요소의 value 값을 조회해요.
 *
 * @param target select 요소
 * @returns multiple 여부에 따른 값 또는 값 배열
 */
export const parseSelectValue = (target: HTMLSelectElement): string | string[] => {
  const { multiple, selectedOptions, value } = target

  if (multiple) {
    return Array.from(selectedOptions).map((option) => option.value)
  }

  return value
}

// ResizeObserver 모바일 브라우저 호환성: 크롬 64+, 사파리 13.4+
// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#browser_compatibility
// ResizeObserver is natively supported in modern browsers (Chrome 64+, Safari 13.1+)
// No polyfill needed for target browsers (chrome >= 105, safari >= 15)

/**
 * ResizeObserver wrapper for better module compatibility
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
export const ResizeObserverWrapper =
  typeof ResizeObserver !== 'undefined'
    ? ResizeObserver
    : (class {
        observe() {}
        unobserve() {}
        disconnect() {}
      } as unknown as typeof ResizeObserver)

// Re-export for backward compatibility
export { ResizeObserverWrapper as ResizeObserver }

type EventMap<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends Worker
      ? WorkerEventMap
      : GlobalEventHandlersEventMap

/**
 * 정리 함수를 반환하는 이벤트 수신기 부착 함수.
 *
 * @example
 * const clear = listen(target, 'click', callback)
 * // ...
 * clear()
 */
export function listen<T extends EventTarget, E extends EventMap<T>, K extends keyof EventMap<T>>(
  target: T,
  type: K,
  listener: (evt: E[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void {
  target.addEventListener(type as string, listener as unknown as EventListener, options)

  return () => {
    target.removeEventListener(type as string, listener as unknown as EventListener, options)
  }
}
