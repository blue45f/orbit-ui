/**
 * Foundation 컴포넌트의 elevation 레벨을 정의합니다.
 *
 * 이 파일은 Foundation 패키지에서만 사용되며, 자동 생성되지 않는 수동 관리 파일입니다.
 * Reference Token과 달리 Figma에서 자동 생성되지 않으므로, 여기서 직접 관리합니다.
 *
 * 컴포넌트의 z-index는 이 elevation 시멘틱 토큰을 기반으로 정의됩니다.
 */

/**
 * Elevation 레벨 시멘틱 토큰 정의
 *
 * 컴포넌트의 z-index는 이 시멘틱 토큰을 기반으로 정의됩니다.
 */
export const elevation = {
  none: 0,
  level1: 100,
  level2: 200,
  level3: 300,
  level4: 400,
  level5: 500,
} as const

/**
 * Elevation CSS 변수명 정의
 * elevation의 키를 기반으로 CSS 변수명을 생성합니다.
 * @example
 * { none: '--sem-base-elevation-none', level1: '--sem-base-elevation-level1', ... }
 */
export const VAR_NAME = Object.fromEntries(
  Object.entries(elevation).map(([key]) => [key, `--sem-base-elevation-${key}`])
) as {
  [K in keyof typeof elevation]: `--sem-base-elevation-${K & string}`
}

/**
 * Elevation CSS 변수 객체
 * theme.css.ts에서 사용하여 CSS 변수로 제공됩니다.
 * vars.sem.elevation.level3 형태로 접근 가능합니다.
 */
export const semanticElevationVars = Object.fromEntries(
  Object.entries(elevation).map(([key]) => [key, `var(${VAR_NAME[key as keyof typeof VAR_NAME]})`])
)

/**
 * Elevation 테마 객체 (CSS 변수에 값 할당)
 * theme.css.ts의 darkTheme, lightTheme에 포함됩니다.
 * elevation 레벨별로 CSS 변수에 값을 할당합니다.
 */
export const elevationTheme = {
  [VAR_NAME.none]: String(elevation.none),
  [VAR_NAME.level1]: String(elevation.level1),
  [VAR_NAME.level2]: String(elevation.level2),
  [VAR_NAME.level3]: String(elevation.level3),
  [VAR_NAME.level4]: String(elevation.level4),
  [VAR_NAME.level5]: String(elevation.level5),
} as const
