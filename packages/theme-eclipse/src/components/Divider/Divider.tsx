import { BaseDivider, BaseDividerProps } from '@heejun-com/core'
import React from 'react'

export type DividerProps = Omit<BaseDividerProps, 'thickness'> & {
  /**
   * Divider 컴포넌트의 방향
   * @defaultValue `horizontal`
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Divider 크기
   * - `orientation`으로 지정한 방향의 크기
   * - e.g. `100%`, `20px`
   * @defaultValue `100%`
   */
  length?: string | number
  /**
   * Divider 컴포넌트의 두께
   * - 디자인 명세에 따라 1px로 고정됩니다.
   * @defaultValue `1px`
   */
  thickness?: never
}

/**
 * ### 💡 알아두기
 * - [🔗 design 디자인가이드라인 바로가기](https://design.example.com/reference)
 * - 목록이나 콘텐츠 등을 구분할 때 사용하는 컴포넌트에요.
 *
 * @example
 * ### 👇 가로
 * ```
 * import { Divider } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <Divider />
 *   )
 * }
 * ```
 *
 * ### 👇 세로
 * ```
 * import { Divider } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <Divider orientation='vertical' length='20px' />
 *   )
 * }
 * ```
 */
export const Divider: React.FC<DividerProps> = (props) => {
  const { orientation = 'horizontal', length = '100%', style, ...rest } = props

  return (
    <BaseDivider
      orientation={orientation}
      thickness="1px"
      length={length}
      style={style}
      {...rest}
    />
  )
}

Divider.displayName = 'Divider'
