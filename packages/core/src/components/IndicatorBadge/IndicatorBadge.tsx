import { forwardRef } from 'react'

import { cn } from '../../styles'
import { toCSSLength, polymorphic } from '../../libs'
import { ContainerLayer, ContentLayer, ShapeLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type IndicatorBadgeTheme = {
  fillColor?: string
  borderColor?: string
  foregroundColor?: string
  radius?: string
}

export type IndicatorBadgeSpecificProps = {
  /** 너비 @defaultValue `8` */
  width?: number | string
  /** 높이 @defaultValue `8` */
  height?: number | string
  /** 테두리 두께 @defaultValue `0` */
  borderWidth?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<IndicatorBadgeTheme>
}

export type IndicatorBadgeProps = IndicatorBadgeSpecificProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof IndicatorBadgeSpecificProps>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 인디케이터 뱃지 컴포넌트
 *
 * @example
 * ```tsx
 * <IndicatorBadge />
 * ```
 */
export const IndicatorBadge = polymorphic<'span', 'div' | 'span', IndicatorBadgeSpecificProps>(
  (props, ref) => {
    const {
      as = 'span',
      width = 8,
      height = 8,
      borderWidth = 0,
      className: classProp,
      style: styleProp,
      theme,
      children,
      ...rest
    } = props

    const className = cn('relative inline-flex items-center justify-center', classProp)

    const style: React.CSSProperties = {
      width: toCSSLength(width),
      height: toCSSLength(height),
      borderWidth: toCSSLength(borderWidth),
      borderStyle: borderWidth ? 'solid' : 'none',
      borderColor: theme?.borderColor,
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '9999px',
      ...styleProp,
    }

    return (
      <ContainerLayer as={as} ref={ref} className={className} style={style} {...rest}>
        <ContentLayer className="relative" direction="horizontal" alignment="center">
          <ShapeLayer className="flex items-center justify-center">{children}</ShapeLayer>
        </ContentLayer>
      </ContainerLayer>
    )
  },
  { useForwardRef: true }
)
