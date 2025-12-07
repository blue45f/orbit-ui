import {
  ComponentThemeProps,
  BasePageDots,
  BasePageDotsProps,
  BasePageDotsSpecificProps,
} from '@prism-ui/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type PageDotsProps = Omit<BasePageDotsProps, keyof BasePageDotsSpecificProps | 'size'> &
  ComponentThemeProps<typeof vars.com.dotIndicator>

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E--%ED%81%B4%EB%A0%88%EC%9D%B4--%EC%BD%94%EC%96%B4-0.30.1?node-id=24143-2229&m=dev)
 *
 * 페이지 인디케이터의 개별 도트 요소입니다. 선택/비선택 상태를 표현하며 클릭 가능한 버튼입니다.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PageDots } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   const [selected, setSelected] = useState(false)
 *
 *   return (
 *     <PageDots
 *       selected={selected}
 *       onClick={() => setSelected(!selected)}
 *     />
 *   )
 * }
 * ```
 */
export const PageDots = forwardRef<HTMLButtonElement, PageDotsProps>((props, ref) => {
  const { theme, ...rest } = props

  return <BasePageDots ref={ref} theme={{ ...vars.com.dotIndicator, ...theme }} size={6} {...rest} />
})

PageDots.displayName = 'PageDots'
