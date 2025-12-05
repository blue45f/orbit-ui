export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait = 100,
  /** 최초 호출 시 즉시 실행할지 여부 */
  immediateCall = false,
): ((...args: T) => void) => {
  let timeoutID: ReturnType<typeof setTimeout> | null = null

  return (...args: T) => {
    if (immediateCall) {
      func(...args)
      immediateCall = false
      return
    }

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      func(...args)
      timeoutID = null
    }, wait)
  }
}
