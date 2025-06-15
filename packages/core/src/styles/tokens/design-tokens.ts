/**
 * 디자인 토큰 타입 정의
 */

// 색상 토큰
export const colors = {
  // Fill
  fillPrimary: 'bg-fill-primary',
  fillSecondary: 'bg-fill-secondary',
  fillTertiary: 'bg-fill-tertiary',
  fillNone: 'bg-transparent',
  fillInverted: 'bg-fill-inverted',

  // Foreground
  foregroundPrimary: 'text-foreground-primary',
  foregroundSecondary: 'text-foreground-secondary',
  foregroundTertiary: 'text-foreground-tertiary',
  foregroundQuaternary: 'text-foreground-quaternary',
  foregroundInverted: 'text-foreground-inverted',

  // Border
  borderPrimary: 'border-border-primary',
  borderSecondary: 'border-border-secondary',
  borderTertiary: 'border-border-tertiary',

  // Status
  statusPositive: 'text-status-positive',
  statusNegative: 'text-status-negative',
  statusWarning: 'text-status-warning',
  statusInfo: 'text-status-info',
} as const

// 간격 토큰
export const spacing = {
  0: 'p-0',
  50: 'p-50',
  100: 'p-100',
  150: 'p-150',
  200: 'p-200',
  250: 'p-250',
  300: 'p-300',
  400: 'p-400',
  500: 'p-500',
  600: 'p-600',
  800: 'p-800',
  1000: 'p-1000',
  1200: 'p-1200',
  1600: 'p-1600',
} as const

// 둥글기 토큰
export const radius = {
  none: 'rounded-none',
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const

// 폰트 크기 토큰
export const fontSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const

// 폰트 두께 토큰
export const fontWeight = {
  regular: 'font-regular',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

// 그림자 토큰
export const shadow = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const

// 트랜지션 토큰
export const transition = {
  fast: 'transition-all duration-fast',
  normal: 'transition-all duration-normal',
  slow: 'transition-all duration-slow',
} as const

/**
 * 모든 토큰
 */
export const tokens = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  shadow,
  transition,
} as const
