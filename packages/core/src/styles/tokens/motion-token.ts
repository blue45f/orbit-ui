/**
 * Motion 토큰 - 애니메이션 duration / easing / transition 프리셋
 *
 * 이 파일은 Foundation 패키지에서만 사용되며, 자동 생성되지 않는 수동 관리 파일입니다.
 * 디자인 시스템의 모션 일관성과 prefers-reduced-motion 대응을 보장합니다.
 */

/**
 * Duration scale (ms)
 * - instant : 즉시 (focus ring 등 미세한 상태)
 * - fast    : 빠름 (hover, button press)
 * - base    : 표준 (toggle, dropdown)
 * - slow    : 느림 (modal, drawer enter/exit)
 * - slower  : 더 느림 (page transition, layout shift)
 */
export const duration = {
  instant: 0,
  fast: 120,
  base: 200,
  slow: 320,
  slower: 480,
} as const

/**
 * Easing curves - cubic-bezier()
 *
 * Material/iOS/Linear 등 모던 디자인 시스템의 표준 곡선을 차용했습니다.
 * - standard   : 일반적 진입/이탈 (Linear/Vercel 표준)
 * - emphasized : 사용자가 시작한 큰 변화 (Material 3)
 * - decelerate : 들어오는 요소 (모달 enter)
 * - accelerate : 나가는 요소 (모달 exit)
 * - spring     : 탄성 (success/error 피드백)
 */
export const easing = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
  decelerate: 'cubic-bezier(0, 0, 0, 1)',
  accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  spring: 'cubic-bezier(0.5, 1.6, 0.4, 0.7)',
  linear: 'linear',
} as const

/**
 * Transition 프리셋 — 자주 쓰는 조합
 */
export const transition = {
  none: 'none',
  hover: `all ${duration.fast}ms ${easing.standard}`,
  press: `all ${duration.fast}ms ${easing.accelerate}`,
  focus: `box-shadow ${duration.fast}ms ${easing.standard}, outline-color ${duration.fast}ms ${easing.standard}`,
  fade: `opacity ${duration.base}ms ${easing.standard}`,
  collapse: `height ${duration.base}ms ${easing.emphasized}, opacity ${duration.base}ms ${easing.standard}`,
  enter: `transform ${duration.slow}ms ${easing.decelerate}, opacity ${duration.base}ms ${easing.decelerate}`,
  exit: `transform ${duration.base}ms ${easing.accelerate}, opacity ${duration.fast}ms ${easing.accelerate}`,
} as const

/* ─── CSS variable names ─────────────────────────────────────────────── */

const DURATION_VAR = Object.fromEntries(
  Object.entries(duration).map(([k]) => [k, `--sem-base-motion-duration-${k}`])
) as { [K in keyof typeof duration]: `--sem-base-motion-duration-${K & string}` }

const EASING_VAR = Object.fromEntries(
  Object.entries(easing).map(([k]) => [k, `--sem-base-motion-easing-${k}`])
) as { [K in keyof typeof easing]: `--sem-base-motion-easing-${K & string}` }

/**
 * theme.css 에서 사용되는 motion 변수 매핑
 */
export const motionTheme = {
  ...Object.fromEntries(
    Object.entries(duration).map(([k, v]) => [DURATION_VAR[k as keyof typeof duration], `${v}ms`])
  ),
  ...Object.fromEntries(
    Object.entries(easing).map(([k, v]) => [EASING_VAR[k as keyof typeof easing], v])
  ),
} as Record<string, string>

/**
 * vars.sem.motion.duration.fast / vars.sem.motion.easing.standard 형태로 접근 가능
 */
export const semanticMotionVars = {
  duration: Object.fromEntries(
    Object.entries(duration).map(([k]) => [k, `var(${DURATION_VAR[k as keyof typeof duration]})`])
  ) as { [K in keyof typeof duration]: string },
  easing: Object.fromEntries(
    Object.entries(easing).map(([k]) => [k, `var(${EASING_VAR[k as keyof typeof easing]})`])
  ) as { [K in keyof typeof easing]: string },
}

// reduced-motion CSS는 globals.css 와 motion-focus.css 에 정적으로 주입됨.
// 별도 export 헬퍼는 필요 시 다시 추가.
