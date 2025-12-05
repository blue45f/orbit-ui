import { AllHTMLAttributes, createElement, forwardRef, JSX } from 'react'

import { cn } from '../../../styles'
import { Flex, FlexProps } from '../Flex'

/* ========================================================================
 * Layer CSS Variables (Theme)
 * ======================================================================== */

export type LayerTheme = {
  borderWidth?: string
  borderColor?: string
  fill?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  radiusTopLeft?: string
  radiusTopRight?: string
  radiusBottomRight?: string
  radiusBottomLeft?: string
  shadow?: string
  elevation?: string
  gap?: string
  foreground?: string
}

/**
 * 레이어 테마를 CSS 스타일로 변환
 */
export function layerThemeToStyle(theme?: LayerTheme): React.CSSProperties {
  if (!theme) return {}

  return {
    ...(theme.borderWidth && { '--layer-border-width': theme.borderWidth }),
    ...(theme.borderColor && { '--layer-border-color': theme.borderColor }),
    ...(theme.fill && { '--layer-fill': theme.fill }),
    ...(theme.paddingTop && { '--layer-padding-top': theme.paddingTop }),
    ...(theme.paddingRight && { '--layer-padding-right': theme.paddingRight }),
    ...(theme.paddingBottom && { '--layer-padding-bottom': theme.paddingBottom }),
    ...(theme.paddingLeft && { '--layer-padding-left': theme.paddingLeft }),
    ...(theme.radiusTopLeft && { '--layer-radius-tl': theme.radiusTopLeft }),
    ...(theme.radiusTopRight && { '--layer-radius-tr': theme.radiusTopRight }),
    ...(theme.radiusBottomRight && { '--layer-radius-br': theme.radiusBottomRight }),
    ...(theme.radiusBottomLeft && { '--layer-radius-bl': theme.radiusBottomLeft }),
    ...(theme.shadow && { '--layer-shadow': theme.shadow }),
    ...(theme.elevation && { zIndex: theme.elevation }),
    ...(theme.gap && { '--layer-gap': theme.gap }),
    ...(theme.foreground && { '--layer-foreground': theme.foreground }),
  } as React.CSSProperties
}

/* ========================================================================
 * Container Layer
 * ======================================================================== */

const containerLayerStyles = cn(
  'relative inline-flex',
  '[background-color:var(--layer-fill,transparent)]',
  '[border-radius:var(--layer-radius-tl,0)_var(--layer-radius-tr,0)_var(--layer-radius-br,0)_var(--layer-radius-bl,0)]',
  '[padding:var(--layer-padding-top,0)_var(--layer-padding-right,0)_var(--layer-padding-bottom,0)_var(--layer-padding-left,0)]',
  '[box-shadow:var(--layer-shadow,none)]',
  '[color:var(--layer-foreground,inherit)]'
)

export type ContainerLayerOwnProps = {
  as?: keyof JSX.IntrinsicElements
  children?: React.ReactNode
  className?: string
}

export type ContainerLayerProps = ContainerLayerOwnProps & Omit<AllHTMLAttributes<HTMLElement>, keyof ContainerLayerOwnProps>

export const ContainerLayer = forwardRef<HTMLElement, ContainerLayerProps>(
  ({ as = 'div', className, children, ...rest }, ref) => {
    return createElement(as, {
      ref,
      className: cn(containerLayerStyles, className),
      ...rest,
      children,
    })
  }
)

/* ========================================================================
 * Border Layer
 * ======================================================================== */

export type BorderLayerProps = { className?: string; style?: React.CSSProperties }

const borderLayerStyles = cn(
  'absolute inset-0 rounded-[inherit] pointer-events-none',
  '[border-width:var(--layer-border-width,0)]',
  '[border-style:solid]',
  '[border-color:var(--layer-border-color,transparent)]'
)

export const BorderLayer: React.FC<BorderLayerProps> = ({ className, style }) => {
  return <span className={cn(borderLayerStyles, className)} style={style} />
}

/* ========================================================================
 * State Layer
 * ======================================================================== */

export type StateLayerProps = { className?: string; style?: React.CSSProperties }

const stateLayerStyles = cn(
  'absolute inset-0 rounded-[inherit] pointer-events-none',
  'transition-colors duration-150'
)

/** `ContainerLayer`의 자식 컴포넌트로 위치해주세요 */
export const StateLayer: React.FC<StateLayerProps> = ({ className, style }) => {
  return <span className={cn(stateLayerStyles, className)} style={style} />
}

/* ========================================================================
 * Content Layer
 * ======================================================================== */

export type ContentLayerProps = {
  /** @defaultValue `horizontal` */
  direction?: 'horizontal' | 'vertical'
  alignment?: 'top' | 'center' | 'bottom'
  arrangement?: 'start' | 'center' | 'end' | 'space-between' | 'equal-weight'
  children: React.ReactNode
} & Pick<FlexProps, 'rowGap' | 'columnGap'> &
  React.HTMLAttributes<HTMLDivElement>

const contentLayerStyles = cn('w-full h-full', '[color:var(--layer-foreground,inherit)]')

export const ContentLayer = forwardRef<HTMLDivElement, ContentLayerProps>(
  ({ direction = 'horizontal', alignment, arrangement, className, style, ...rest }, ref) => {
    const flexDirection = direction === 'horizontal' ? 'row' : 'column'
    const gapProp = flexDirection === 'row' ? 'columnGap' : 'rowGap'
    const alignItems = alignment === 'top' ? 'flex-start' : alignment === 'center' ? 'center' : 'flex-end'
    const justifyContent =
      {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        'space-between': 'space-between',
        'equal-weight': undefined,
      }[arrangement!] ?? 'normal'

    return (
      <Flex
        ref={ref}
        {...rest}
        className={cn(contentLayerStyles, className)}
        style={{
          gap: 'var(--layer-gap, 0)',
          ...style,
        }}
        flexDirection={flexDirection}
        alignItems={alignItems}
        justifyContent={justifyContent}
        data-arrangement={arrangement}
      />
    )
  }
)

/* ========================================================================
 * Shape Layer
 * ======================================================================== */

const shapeLayerStyles = cn(
  'absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden',
  '[color:var(--layer-foreground,inherit)]'
)

export const ShapeLayer: React.FC<AllHTMLAttributes<HTMLElement>> = ({ as = 'div', className, ...rest }) => {
  return createElement(as, { className: cn(shapeLayerStyles, className), ...rest })
}

/* ========================================================================
 * Exports
 * ======================================================================== */

// Legacy exports for backward compatibility
export const layerVars = {
  borderWidth: 'var(--layer-border-width)',
  borderColor: 'var(--layer-border-color)',
  fill: 'var(--layer-fill)',
  paddingTop: 'var(--layer-padding-top)',
  paddingRight: 'var(--layer-padding-right)',
  paddingBottom: 'var(--layer-padding-bottom)',
  paddingLeft: 'var(--layer-padding-left)',
  radiusTopLeft: 'var(--layer-radius-tl)',
  radiusTopRight: 'var(--layer-radius-tr)',
  radiusBottomRight: 'var(--layer-radius-br)',
  radiusBottomLeft: 'var(--layer-radius-bl)',
  shadow: 'var(--layer-shadow)',
  elevation: 'var(--layer-elevation)',
  gap: 'var(--layer-gap)',
  foreground: 'var(--layer-foreground)',
}

export * as layerUtils from './shorthand'
