import { setupContext, usePrevious, useIsomorphicLayoutEffect } from '../../../libs'
import { darkTheme, lightTheme, textStyleTheme } from '../../../styles'
import { TextStyleBaseSize } from '../../../styles/types'
import { OverlayContainerLayerProvider } from '../Overlay/OverlayContainerLayer'
import { UniqueIDProvider } from '../UniqueIDProvider'

export type ThemeProviderContextValue = {
  mode: 'dark' | 'light'
  baseTextSize: TextStyleBaseSize
}

export const [ThemeProviderProvider, useThemeProviderContext] =
  setupContext<ThemeProviderContextValue>('ThemeProvider')

type Props = {
  /**
   * 현재 테마 모드
   * @defaultValue `light`
   */
  mode?: ThemeProviderContextValue['mode']
  /**
   * 각 패키지에서 생성된 테마 클래스명
   * - `mode` 값에 대응되는 클래스명을 전달해주세요.
   */
  themeClass: string

  /**
   * 전체 타이포그래피 스케일의 기준이 되는 BaseSize 모드를 설정해요.
   * 이 값을 변경하면 UI에 사용되는 모든 폰트 사이즈가 선택된 모드를 기준으로 일관되게 조정할 수 있어요.
   * @default 'medium'
   */
  baseTextSize?: TextStyleBaseSize

  children: React.ReactNode
}

/**
 * ### 💡 알아두기
 * - 사용처 앱의 최상단에 배치되는 Provider를 구성하는 공통 컴포넌트예요.
 * - `<body>` 태그에 테마 클래스명을 추가하거나, context를 통한 전역 상태 전달 등의 역할을 해요.
 */
export const ThemeProvider: React.FC<Props> = ({
  mode = 'light',
  themeClass,
  baseTextSize = 'medium',
  children,
}) => {
  const foundationTheme = {
    light: lightTheme,
    dark: darkTheme,
  }

  useTheme(foundationTheme[mode])
  useTheme(textStyleTheme[baseTextSize])

  useTheme(themeClass)

  return (
    <ThemeProviderProvider mode={mode} baseTextSize={baseTextSize}>
      <UniqueIDProvider>
        <OverlayContainerLayerProvider>{children}</OverlayContainerLayerProvider>
      </UniqueIDProvider>
    </ThemeProviderProvider>
  )
}

const useTheme = (themeClass: string) => {
  const prevThemeClass = usePrevious(themeClass)

  useIsomorphicLayoutEffect(() => {
    const tokens = themeClass.split(' ').filter(Boolean)
    const prevTokens = prevThemeClass.split(' ').filter(Boolean)
    document.body.classList.remove(...prevTokens)
    document.body.classList.add(...tokens)

    return () => {
      // 언마운트 시 현재 themeClass 정리. 다른 ThemeProvider가 같은 토큰을 쓸 수 있으므로
      // remove만 안전하게 호출한다 (브라우저는 없는 클래스 제거에 관대하다).
      document.body.classList.remove(...tokens)
    }
  }, [themeClass])
}
