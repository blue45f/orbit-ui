/**
 * 이벤트 Handler를 합쳐 하나의 함수로 만들고자 할 때 사용
 * defaultPrevented 여부에 따라 추가 Event Handler가 동작하지 않을 수 있어요.
 */
function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkDefaultPrevented = true } = {}
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function handleEvent(event: E) {
    originalEventHandler?.(event)

    if (checkDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event)
    }
  }
}

export { composeEventHandlers }
