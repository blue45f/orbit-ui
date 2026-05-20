/**
 * Focus Ring 토큰 - 키보드 포커스 표시 일관성 보장
 *
 * WCAG 2.4.7 (Focus Visible) 및 2.4.11 (Focus Appearance) 권고를 따릅니다.
 * 모든 인터랙티브 컴포넌트는 이 토큰 세트를 사용해 동일한 ring 표현을 제공해야 합니다.
 */

export const focusRing = {
  /** outline 두께 (px) - WCAG 2.4.11은 최소 2px 권고 */
  width: 2,
  /** ring 과 요소 사이 간격 (px) */
  offset: 2,
  /** ring border-radius - 요소 자체 radius + offset */
  radiusGap: 2,
} as const

/* CSS variable names */
const FOCUS_VAR = {
  width: '--sem-base-focus-ring-width',
  offset: '--sem-base-focus-ring-offset',
  color: '--sem-base-focus-ring-color',
  colorContrast: '--sem-base-focus-ring-color-contrast',
} as const

/**
 * theme.css에서 사용되는 focus 변수 매핑 (Light/Dark 별도)
 */
export const focusThemeLight = {
  [FOCUS_VAR.width]: `${focusRing.width}px`,
  [FOCUS_VAR.offset]: `${focusRing.offset}px`,
  [FOCUS_VAR.color]: 'rgba(37, 99, 235, 0.85)',
  [FOCUS_VAR.colorContrast]: 'rgba(255, 255, 255, 0.95)',
} as const

export const focusThemeDark = {
  [FOCUS_VAR.width]: `${focusRing.width}px`,
  [FOCUS_VAR.offset]: `${focusRing.offset}px`,
  [FOCUS_VAR.color]: 'rgba(96, 165, 250, 0.95)',
  [FOCUS_VAR.colorContrast]: 'rgba(0, 0, 0, 0.85)',
} as const

/**
 * vars.sem.focus.* 형태로 접근 가능
 */
export const semanticFocusVars = {
  width: `var(${FOCUS_VAR.width})`,
  offset: `var(${FOCUS_VAR.offset})`,
  color: `var(${FOCUS_VAR.color})`,
  colorContrast: `var(${FOCUS_VAR.colorContrast})`,
} as const

/**
 * focus-visible 헬퍼 — `:focus-visible { ...focusRingCSS }` 형태로 적용
 *
 * 마우스 클릭으로 포커스되었을 때는 ring을 표시하지 않고
 * 키보드(Tab/Arrow) 포커스에서만 표시합니다.
 */
export const focusRingCSS = `
outline: var(${FOCUS_VAR.width}) solid var(${FOCUS_VAR.color});
outline-offset: var(${FOCUS_VAR.offset});
`.trim()
