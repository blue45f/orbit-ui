import { cn } from '../../styles'
import { toCSSLength } from '../../libs'

/* ========================================================================
 * Types
 * ======================================================================== */

export type DividerProps = {
  /**
   * Divider 컴포넌트의 방향
   * @defaultValue `horizontal`
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Divider 컴포넌트의 두께
   * @defaultValue `1px`
   */
  thickness?: string | number
  /**
   * Divider 크기
   * - `orientation`으로 지정한 방향의 크기
   * @defaultValue `100%`
   */
  length?: string | number
  /**
   * 색상
   */
  color?: string
} & React.HTMLAttributes<HTMLDivElement>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 구분선 컴포넌트
 *
 * @example
 * ```tsx
 * // 가로
 * <Divider thickness="1px" length="100%" />
 *
 * // 세로
 * <Divider orientation="vertical" thickness="1px" length="20px" />
 * ```
 */
export const Divider: React.FC<DividerProps> = (props) => {
  const {
    orientation = 'horizontal',
    thickness = '1px',
    length = '100%',
    color,
    style: styleProp,
    className: classProp,
    ...rest
  } = props

  const isHorizontal = orientation === 'horizontal'

  const className = cn('flex-shrink-0', isHorizontal ? 'w-full' : 'h-full', classProp)

  const style: React.CSSProperties = {
    backgroundColor: color || 'var(--border-secondary, rgba(228, 230, 232, 1))',
    ...(isHorizontal
      ? {
          width: toCSSLength(length),
          height: toCSSLength(thickness),
        }
      : {
          width: toCSSLength(thickness),
          height: toCSSLength(length),
        }),
    ...styleProp,
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      {...rest}
      style={style}
      className={className}
    />
  )
}
