/* Design Tokens */

export * from './component-token'
export * from './semantic-token'

/* Reference token direct exports for theme packages */
export { ref, referenceLightTheme, referenceDarkTheme } from './reference-token'

/* Motion / Focus 토큰 (수동 관리, Foundation 단계에서 보강) */
export {
  duration as motionDuration,
  easing as motionEasing,
  transition as motionTransition,
  motionTheme,
  semanticMotionVars,
} from './motion-token'

export {
  focusRing,
  focusThemeLight,
  focusThemeDark,
  semanticFocusVars,
  focusRingCSS,
} from './focus-token'

/* z-index 시맨틱 가이드 (elevation 기반) */
export { zIndexLayer, type ZIndexLayer } from './elevation-token'

/* Namespace exports to avoid naming conflicts */
export * as elevationToken from './elevation-token'
export * as referenceToken from './reference-token'
export * as textStyleToken from './text-style-token'
export * as designTokens from './design-tokens'
export * as motionToken from './motion-token'
export * as focusToken from './focus-token'
