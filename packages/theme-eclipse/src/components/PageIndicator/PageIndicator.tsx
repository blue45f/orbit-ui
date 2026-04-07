import {
  ComponentThemeProps,
  BasePageIndicator,
  BasePageIndicatorProps,
  BasePageIndicatorSpecificProps,
} from '@orbit-ui/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type PageIndicatorProps = Omit<
  BasePageIndicatorProps,
  keyof BasePageIndicatorSpecificProps
> &
  ComponentThemeProps<typeof vars.com.pageControl>

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E--%ED%81%B4%EB%A0%88%EC%9D%B4--%EC%BD%94%EC%96%B4-0.30.1?node-id=24134-1761&m=dev)
 *
 * 여러 페이지를 도트로 표현하는 페이지 컨트롤 컴포넌트입니다.
 * 내부적으로 DotIndicator 컴포넌트들을 렌더링하여 현재 페이지를 시각적으로 표시합니다.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PageIndicator } from '@orbit-ui/theme-eclipse'
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
