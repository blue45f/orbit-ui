/**
 * 문자열 ratio를 숫자 비율로 변환해요.
 * - e.g. '16:9' -> 9 / 16
 */
export function toNumberRatio<T extends string>(ratioStr: T): number {
  const [width, height] = ratioStr.split(':').map(Number)

  return height / width
}

/**
 * @description
 * CSS 단위를 포함한 문자열 반환해요.
 *
 * 문자열이 전달되면 그대로 반환하고, 숫자인 경우에는 지정된 단위를 추가해요.
 *
 * @param value 숫자 또는 문자열, 빈 값 (e.g. 100, '100px', '50%')
 * @param unit 단위 (기본값 'px')
 */
export const toCSSLength = (value?: number | string, unit = 'px'): string => {
  if (value === undefined || value === null) return ''

  return typeof value === 'number' ? `${value}${unit}` : value
}
