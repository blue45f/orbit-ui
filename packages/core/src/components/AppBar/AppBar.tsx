import { forwardRef, Children, ReactNode } from 'react'
import { IconPropsContext } from '@ui-forge/icons'

import { cn } from '../../styles'
import { filterComponents, toCSSLength } from '../../libs'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type NavigationBarTheme = {
  fillColor?: string
  foregroundColor?: string
  paddingHorizontal?: string
  gap?: string
}

export type AppBarSpecificProps = {
  /** 최대 너비 */
  maxWidth?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<NavigationBarTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type AppBarProps = AppBarSpecificProps & {
  children?: ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, keyof AppBarSpecificProps>

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalAppBarRoot = forwardRef<HTMLElement, AppBarProps>((props, ref) => {
  const {
    children,
    maxWidth,
    theme,
    style: styleProp,
    className: classProp,
    ...rest
  } = props

  const className = cn('relative w-full', classProp)

  const style: React.CSSProperties = {
    backgroundColor: theme?.fillColor,
    color: theme?.foregroundColor,
    ...(maxWidth && { maxWidth: toCSSLength(maxWidth) }),
    ...styleProp,
  }

  const {
    filtered: [leading, center, trailing],
    unfiltered,
  } = filterComponents(
    Children.toArray(children) as React.ReactElement[],
    AppBarLeading,
    AppBarCenter,
    AppBarTrailing
  )

  return (
    <ContainerLayer as="nav" ref={ref} className={className} style={style} {...rest}>
      <ContentLayer
        className="relative"
        direction="horizontal"
        alignment="center"
        arrangement="space-between"
        style={{
          paddingLeft: theme?.paddingHorizontal || '16px',
          paddingRight: theme?.paddingHorizontal || '16px',
          gap: theme?.gap || '12px',
        }}
      >
        {leading}
        {center || unfiltered}
        {trailing}
      </ContentLayer>
    </ContainerLayer>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type AppBarLeadingProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const AppBarLeading: React.FC<AppBarLeadingProps> = ({
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={cn('inline-flex items-center flex-shrink-0', className)}>
    {children}
  </div>
)

export type AppBarCenterProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const AppBarCenter: React.FC<AppBarCenterProps> = ({
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={cn('flex-1 min-w-0 text-center', className)}>
    {children}
  </div>
)

export type AppBarTrailingProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const AppBarTrailing: React.FC<AppBarTrailingProps> = ({
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={cn('inline-flex items-center flex-shrink-0', className)}>
    {children}
  </div>
)

/* ========================================================================
 * Export
 * ======================================================================== */

type AppBarComponent = typeof InternalAppBarRoot & {
  Leading: typeof AppBarLeading
  Center: typeof AppBarCenter
  Trailing: typeof AppBarTrailing
}

/**
 * 네비게이션 바 컴포넌트
 *
 * @example
 * ```tsx
 * <AppBar>
 *   <AppBar.Leading><BackButton /></AppBar.Leading>
 *   <AppBar.Center>제목</AppBar.Center>
 *   <AppBar.Trailing><MenuButton /></AppBar.Trailing>
 * </AppBar>
 * ```
 */
export const AppBar: AppBarComponent = Object.assign(InternalAppBarRoot, {
  Leading: AppBarLeading,
  Center: AppBarCenter,
  Trailing: AppBarTrailing,
})
