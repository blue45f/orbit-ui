/* ========================================================================
 * Spacing Utilities
 * ======================================================================== */

export type SpacingMap<Spacing extends string = string> =
  | (({ top?: Spacing; bottom?: Spacing; y?: never } | { y?: Spacing; top?: never; bottom?: never }) &
      ({ left?: Spacing; right?: Spacing; x?: never } | { x?: Spacing; left?: never; right?: never }))
  | Spacing

/**
 * 간격 값을 객체로 변환
 */
export const getPadding = (
  spacing?: SpacingMap
): { top: string; bottom: string; left: string; right: string } => {
  const spacingObj = typeof spacing === 'string' ? { x: spacing, y: spacing } : spacing

  return {
    top: spacingObj?.top || spacingObj?.y || '0px',
    bottom: spacingObj?.bottom || spacingObj?.y || '0px',
    left: spacingObj?.left || spacingObj?.x || '0px',
    right: spacingObj?.right || spacingObj?.x || '0px',
  }
}

/**
 * 간격 값을 CSS 스타일로 변환
 */
export const getSpacingStyle = (spacing?: SpacingMap): React.CSSProperties => {
  const { top, bottom, left, right } = getPadding(spacing)
  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right,
  }
}

/**
 * 간격 토큰 값
 */
export const spacingTokens = {
  '0': '0px',
  '50': '2px',
  '100': '4px',
  '150': '6px',
  '200': '8px',
  '250': '10px',
  '300': '12px',
  '400': '16px',
  '500': '20px',
  '600': '24px',
  '800': '32px',
  '1000': '40px',
  '1200': '48px',
  '1600': '64px',
} as const

export type SpacingToken = keyof typeof spacingTokens

/**
 * 간격 토큰을 CSS 값으로 변환
 */
export const getSpacingValue = (token: SpacingToken | string): string => {
  if (token in spacingTokens) {
    return spacingTokens[token as SpacingToken]
  }
  return token
}

/**
 * Legacy: assignInlineVars 대체 함수
 * @deprecated 직접 style 객체를 사용하세요
 */
export const getAssignedSpacingStyle = (
  _styles: { spacingTop?: string; spacingBottom?: string; spacingLeft?: string; spacingRight?: string },
  spacing?: SpacingMap
): React.CSSProperties => {
  return getSpacingStyle(spacing)
}

/**
 * Legacy: CSS Variable 변환 함수
 * @deprecated 직접 토큰 값을 사용하세요
 */
export const getSpacingCSSVariable = (spacing: SpacingMap | `${string}px`): SpacingMap<string> => {
  if (typeof spacing === 'object') {
    return Object.entries(spacing).reduce((acc, [key, value]) => {
      (acc as Record<string, string>)[key] = getSpacingValue(value as SpacingToken | string)
      return acc
    }, {} as SpacingMap<string>)
  }

  return getSpacingValue(spacing as SpacingToken | string)
}
