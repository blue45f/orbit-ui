/**
 * 클릭 가능한 요소가 이벤트의 타겟 계층에서 존재하는지 확인
 * @param options.stopCheckCount - 수행할 최대 확인 횟수
 * @returns {boolean} - 클릭 가능한 요소가 발견 여부
 */
export function checkClickableElement(
  event: React.MouseEvent | React.TouchEvent,
  options?: {
    stopCheckCount?: number
  },
): boolean {
  const { stopCheckCount = 10 } = options || {}

  const { target, currentTarget } = event

  return isClickableRecursive(target as Element, currentTarget, stopCheckCount)
}

function isClickableRecursive(
  element: Element,
  stopCheckElement: Element | undefined | null,
  remainingChecks: number,
): boolean {
  if (element === stopCheckElement || !element.parentElement || remainingChecks < 0) {
    return false
  }

  if (getIsClickable(element)) {
    return true
  }

  return isClickableRecursive(element.parentElement, stopCheckElement, remainingChecks - 1)
}

function getIsClickable(target: Element) {
  return (
    target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement || target instanceof HTMLInputElement
  )
}
