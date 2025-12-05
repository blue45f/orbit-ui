import { cn } from '../../styles'
import { polymorphic } from '../../libs'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type BadgeTheme = {
  fillColor?: string
  foregroundColor?: string
  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type BadgeSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<BadgeTheme>
}

/* ========================================================================
 * Main Component
 * ======================================================================== */

const BadgeRoot = polymorphic<'span', 'div' | 'span', BadgeSpecificProps>(
  (props, ref) => {
    const {
      as = 'span',
      className: classNameProp,
      theme,
      style: styleProp,
      children,
      ...rest
    } = props

    const className = cn('relative inline-flex items-center', classNameProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '9999px',
      paddingLeft: theme?.paddingHorizontal || '8px',
      paddingRight: theme?.paddingHorizontal || '8px',
      paddingTop: theme?.paddingVertical || '2px',
      paddingBottom: theme?.paddingVertical || '2px',
      ...styleProp,
    }

    return (
      <ContainerLayer as={as} ref={ref} className={className} style={style} {...rest}>
        <ContentLayer
          className="relative"
          direction="horizontal"
          alignment="center"
          style={{ gap: theme?.gap || '4px' }}
        >
          {children}
        </ContentLayer>
      </ContainerLayer>
    )
  },
  { useForwardRef: true }
)

/* ========================================================================
 * Sub-components
 * ======================================================================== */

const BadgeLeading: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className: classNameProp,
  ...rest
}) => {
  return <span className={cn('inline-flex items-center justify-center', classNameProp)} {...rest} />
}

const BadgeTrailing: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className: classNameProp,
  ...rest
}) => {
  return <span className={cn('inline-flex items-center justify-center', classNameProp)} {...rest} />
}

/* ========================================================================
 * Export
 * ======================================================================== */

/**
 * 뱃지 컴포넌트
 *
 * @example
 * ```tsx
 * <Badge>
 *   <Badge.Leading><CheckIcon /></Badge.Leading>
 *   필수
 * </Badge>
 * ```
 */
export const Badge = Object.assign(BadgeRoot, {
  Leading: BadgeLeading,
  Trailing: BadgeTrailing,
})
