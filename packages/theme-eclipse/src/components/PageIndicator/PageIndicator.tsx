import {
  ComponentThemeProps,
  BasePageIndicator,
  BasePageIndicatorProps,
  BasePageIndicatorSpecificProps,
} from '@heejun-com/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type PageIndicatorProps = Omit<
  BasePageIndicatorProps,
  keyof BasePageIndicatorSpecificProps
> &
  ComponentThemeProps<typeof vars.com.pageControl>

/**
 * ### 💡 알아두기
 *
 * 여러 페이지를 도트로 표현하는 페이지 컨트롤 컴포넌트입니다.
 * 내부적으로 DotIndicator 컴포넌트들을 렌더링하여 현재 페이지를 시각적으로 표시합니다.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PageIndicator } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [current, setCurrent] = useState(0)
 *
 *   return (
 *     <PageIndicator
 *       total={5}
 *       current={current}
 *       onPageChange={setCurrent}
 *     />
 *   )
 * }
 * ```
 */
export const PageIndicator = forwardRef<HTMLDivElement, PageIndicatorProps>((props, ref) => {
  const { theme, ...rest } = props

  return <BasePageIndicator ref={ref} theme={{ ...vars.com.pageControl, ...theme }} {...rest} />
})

PageIndicator.displayName = 'PageIndicator'
