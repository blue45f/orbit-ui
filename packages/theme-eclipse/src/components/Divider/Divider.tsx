import { BaseDivider, BaseDividerProps } from '@orbit-ui/core'
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
   * - Figma 명세에 따라 1px로 고정됩니다.
   * @defaultValue `1px`
   */
  thickness?: never
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=2827-139930&t=H8UboLdT0JP86Apg-11)
 * - 목록이나 콘텐츠 등을 구분할 때 사용하는 컴포넌트에요.
 *
 * @example
 * ### 👇 가로
 * ```
 * import { Divider } from '@orbit-ui/theme-eclipse'
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
 * import { Divider } from '@orbit-ui/theme-eclipse'
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
