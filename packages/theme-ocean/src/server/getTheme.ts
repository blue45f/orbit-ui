import { TextStyleBaseSize } from '@prism-ui/core'
import clsx from 'clsx'

import { darkTheme, lightTheme, textStyleTheme } from '../styles/theme.css'

type Options = {
  /** @defaultValue `light` */
  mode?: 'light' | 'dark'
  baseTextSize?: TextStyleBaseSize
}

/**
 * ### 💡 알아두기
 * - 서버사이드 렌더링, 서버 컴포넌트 사용 시 필요한 body theme class를 반환해주어요.
 * - body 태그에 class로 추가해주어야 Server Component & SSR 환경에서 깜빡임이 없어요.
 * - 기본 테마는 라이트('light') 테마입니다.
 *
 * ### 👇 기본 사용법
 * @example
 * ```
 * <html>
 *  <body class={getTheme({ mode: 'light' })}>
 *  ...
 *  <NextScript />
 *  </body>
 * </html>
 * ```
 */
export const getTheme = (options?: Options): string => {
  const { mode = 'light', baseTextSize = 'medium' } = options || {}

  return clsx([textStyleTheme[baseTextSize]], {
    [darkTheme]: mode === 'dark',
    [lightTheme]: mode === 'light',
  })
}
