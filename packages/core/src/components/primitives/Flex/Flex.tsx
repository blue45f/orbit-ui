import { CSSProperties, createElement, useRef } from 'react'

import { cn } from '../../../styles'
import { composeRefs, polymorphic } from '../../../libs'

/* ========================================================================
 * Flex
 * ======================================================================== */

export type FlexProps = {
  children?: React.ReactNode
  /**
   * inlineFlex 여부
   * @defaultValue `false`
   */
  inline?: boolean
  rowGap?: string
  columnGap?: string
  gap?: string
} & Pick<
  CSSProperties,
  'flexDirection' | 'justifyContent' | 'alignItems' | 'alignContent' | 'flexWrap'
>

/**
 * ### 💡 알아두기
 * - CSS Flexbox 속성을 지원하는 컴포넌트예요.
 * - 내부 아이템들의 간격을 지정할 때는 gap prop을 사용해주세요.
 * - className, style prop을 전달해 별도 스타일링을 할 수 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * <Flex flexWrap='wrap' gap='10px'>
 *   <Flex.Item>Box 1</Flex.Item>
 *   <Flex.Item>Box 2</Flex.Item>
 * </Flex>
 * ```
 */
export const Flex = polymorphic<'div', keyof React.JSX.IntrinsicElements, FlexProps>(
  (props, ref) => {
    const {
      as,
      inline = false,
      flexDirection = 'row',
      flexWrap = 'nowrap',
      alignItems = 'normal',
      alignContent = 'normal',
      justifyContent = 'normal',
      rowGap,
      columnGap,
      gap,
      className: classProp,
      style: styleProp,
      ...rest
    } = props
    const selfRef = useRef<HTMLElement>(null)
    const refs = composeRefs(ref as React.RefObject<HTMLElement | null>, selfRef)

    const className = cn(inline ? 'inline-flex' : 'flex', classProp)

    const style: React.CSSProperties = {
      flexDirection,
      flexWrap,
      alignItems,
      alignContent,
      justifyContent,
      ...(gap && { gap }),
      ...(rowGap && { rowGap }),
      ...(columnGap && { columnGap }),
      ...styleProp,
    }

    return createElement(as ?? 'div', { ref: refs, className, style, ...rest })
  },
  { useForwardRef: true }
)

/* ========================================================================
 * FlexItem
 * ======================================================================== */

export type FlexItemProps = Pick<
  CSSProperties,
  'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf'
> & {
  /** @defaultValue 'div' */
  as?: React.ElementType
}

/**
 * ### 💡 알아두기
 * - CSS Flexbox 아이템 역할을 담당하는 컴포넌트예요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * <Flex>
 *   <Flex.Item as='section'>Box 1</div>
 *   <Flex.Item flexGrow={1}>Box 2</div>
 * </Flex>
 * ```
 */
export const FlexItem = polymorphic<'div', keyof React.JSX.IntrinsicElements, FlexItemProps>(
  (props, ref) => {
    const {
      as,
      flexGrow = 0,
      flexShrink = 1,
      flexBasis = 'auto',
      alignSelf = 'auto',
      children,
      className,
      style,
      ...rest
    } = props

    return createElement(
      as ?? 'div',
      {
        ref,
        ...rest,
        className,
        style: {
          flexGrow,
          flexShrink,
          flexBasis,
          alignSelf,
          ...style,
        },
      },
      children
    )
  },
  { useForwardRef: true }
)
