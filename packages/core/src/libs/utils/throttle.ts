export const throttle = <T extends unknown[]>(func: (...args: T) => void, wait = 100): ((...args: T) => void) => {
  let timeoutID: ReturnType<typeof setTimeout> | null = null

  return (...args: T) => {
    if (timeoutID) return

    timeoutID = setTimeout(() => {
      func(...args)
      timeoutID = null
    }, wait)
  }
}
