import {
  ComponentThemeProps,
  BasePageDots,
  BasePageDotsProps,
  BasePageDotsSpecificProps,
} from '@heejun-com/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

export type PageDotsProps = Omit<BasePageDotsProps, keyof BasePageDotsSpecificProps | 'size'> &
  ComponentThemeProps<typeof vars.com.dotIndicator>

/**
 * ### 💡 알아두기
 *
 * 페이지 인디케이터의 개별 도트 요소입니다. 선택/비선택 상태를 표현하며 클릭 가능한 버튼입니다.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PageDots } from '@heejun-com/theme-eclipse'
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

  return (
    <BasePageDots ref={ref} theme={{ ...vars.com.dotIndicator, ...theme }} size={6} {...rest} />
  )
})

PageDots.displayName = 'PageDots'
