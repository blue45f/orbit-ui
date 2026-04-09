import { ThemeProvider, LottieProvider, Portal, TextStyleBaseSize } from '@heejun-com/core'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

import { darkTheme, lightTheme, textStyleTheme } from '../../styles'

import { ReusableSVG } from './ReusableSVG'

import '@heejun-com/core/style.css'
import '../../styles/theme.css'

export type EclipseProviderProps = {
  /**
   * 현재 테마 모드
   * @defaultValue `light`
   */
  mode?: 'light' | 'dark'

  /**
   * 플랫폼 모드 (모바일 또는 PC)
   * @defaultValue `mobile`
   */
  platform?: 'mobile' | 'pc'

  /**
   * 전체 타이포그래피 스케일의 기준이 되는 BaseSize 모드를 설정해요.
   * 이 값을 변경하면 UI에 사용되는 모든 폰트 사이즈가 선택된 모드를 기준으로 일관되게 조정할 수 있어요.
   * @default 'medium'
   */
  baseTextSize?: TextStyleBaseSize
}

/**
 * ### 💡 알아두기
 * - 사용처 앱의 최상단에 배치되는 Provider 컴포넌트예요.
 * - 테마와 패키지 단위의 Provider로 구성돼요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { EclipseProvider } from '@heejun-com/theme-eclipse'
 *
 * function MyApp() {
 *  return (
 *    <EclipseProvider mode='light' platform='pc'>
 *      <App />
 *    </EclipseProvider>
 *  )
 * }
 * ```
 */
export const EclipseProvider: React.FC<PropsWithChildren<EclipseProviderProps>> = ({
  mode = 'light',
  platform = 'mobile',
  baseTextSize = 'medium',
  children,
}) => {
  const themeClass = {
    [darkTheme]: mode === 'dark',
    [lightTheme]: mode === 'light',
    [`platform-${platform}`]: true,
  }
  const textStyleClass = textStyleTheme[baseTextSize]

  return (
    <ThemeProvider
      mode={mode}
      themeClass={clsx(themeClass, textStyleClass)}
      baseTextSize={baseTextSize}
    >
      <Portal>
        <ReusableSVG />
      </Portal>
      <LottieProvider>{children}</LottieProvider>
    </ThemeProvider>
  )
}
