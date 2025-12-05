type OverflowRect = {
  /** 위쪽으로 Overflow 여부 */
  top: boolean
  /** 아래쪽으로 Overflow 여부*/
  bottom: boolean
  /** 오른쪽으로 Overflow 여부 */
  right: boolean
  /** 왼쪽으로 Overflow 여부 */
  left: boolean
}

type OverflowOption = {
  /**
   * (TopBar와 같은) fixed 영역 공간 확보를 위한 값
   * - 양의 값을 넣어주세요.*/
  margin?: Partial<Margin>
  /**
   * target을 포함할 Container 영역
   * @defaultValue `Viewport`
   */
  container?: DOMRect
}

type Margin = {
  top: number
  right: number
  bottom: number
  left: number
}

/**
 * @param target 영역을 벗어나는 지 감시할 대상
 * @param option Option {@link OverflowOption}
 * @returns OverflowRect {@link OverflowRect}
 *
 * @example
 * ```ts
 * detectOverflow(target.getBoundingClientRect(), {
 *   margin: { top: 16, right: 0, bottom: 16, left: 0 },
 *   container: container.getBoundingClientRect(),
 * })
 * ```
 */
export function detectOverflow(target: DOMRect, option?: OverflowOption): OverflowRect {
  const marginOption = { top: 0, right: 0, bottom: 0, left: 0, ...option?.margin }

  const margin: Margin = {
    top: marginOption.top,
    right: marginOption.right,
    bottom: marginOption.bottom,
    left: marginOption.left,
  }

  const container = option?.container
  return container ? detectOverflowContainer(target, container, margin) : detectOverflowViewport(target, margin)
}
/**
 *
 * @param target Viewport의 영역을 벗어나는 지 감시할 대상
 * @param margin Viewport에서 (TopBar와 같은) fixed 영역 공간 확보를 위한 값. (양의 값을 넣어주세요.)
 * @returns OverflowRect {@link OverflowRect}
 */
function detectOverflowViewport(target: DOMRect, margin: Margin): OverflowRect {
  const { top, left, bottom, right } = target
  const { innerHeight, innerWidth } = window

  return {
    top: top < margin.top,
    right: right > innerWidth - margin.right,
    bottom: bottom > innerHeight - margin.bottom,
    left: left < margin.left,
  }
}

/**
 *
 * @param target Container 영역을 벗어나는 지 감시할 대상
 * @param container target을 포함할 Container 영역
 * @param margin Container에서 (TopBar와 같은) fixed 영역 공간 확보를 위한 값. (양의 값을 넣어주세요.)
 * @returns OverflowRect {@link OverflowRect}
 */
function detectOverflowContainer(target: DOMRect, container: DOMRect, margin: Margin): OverflowRect {
  const { bottom, right, top, left } = target

  return {
    top: top < margin.top + container.top,
    bottom: container.bottom - margin.bottom - bottom < 0,
    right: container.right - margin.right - right < 0,
    left: container.left + margin.left - left > 0,
  }
}
