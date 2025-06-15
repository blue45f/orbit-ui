import { AllHTMLAttributes, forwardRef } from 'react'

import { cn } from '../../styles'
import { toCSSLength, useControllableState } from '../../libs'
import { ContainerLayer } from '../primitives/Layer'
import { OverlayContainerLayerProps } from '../primitives/Overlay/OverlayContainerLayer'
import { Presence } from '../primitives/Presence'

/* ========================================================================
 * Types
 * ======================================================================== */

export type ScrimTheme = {
  fillColor?: string
}

export type ScrimSpecificProps = {
  width?: number | string
  height?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<ScrimTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type ScrimProps = ScrimSpecificProps & {
  /** 초기 열림 여부 (비제어) @defaultValue false */
  defaultIsPresented?: boolean
  /** 열림 여부 (제어) */
  isPresented?: boolean
  /** elevation 값 */
  elevation?: OverlayContainerLayerProps['elevation']
} & Omit<AllHTMLAttributes<HTMLDivElement>, keyof ScrimSpecificProps | 'children' | 'as' | 'open'>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 스크림(배경 딤) 컴포넌트
 *
 * @example
 * ```tsx
 * <Scrim isPresented={isOpen} />
 * ```
 */
export const Scrim = forwardRef<HTMLDivElement, ScrimProps>(
  (
    {
      className: classNameProp,
      isPresented: isPresentedProp,
      defaultIsPresented = false,
      width,
      height,
      style,
      theme,
      elevation = 1,
      ...rest
    },
    forwardedRef
  ) => {
    const [isPresented] = useControllableState({
      value: isPresentedProp,
      defaultValue: defaultIsPresented,
    })

    const className = cn(
      'fixed inset-0',
      'bg-black/50',
      'transition-opacity duration-200',
      classNameProp
    )

    const computedStyle: React.CSSProperties = {
      zIndex: elevation,
      backgroundColor: theme?.fillColor,
      ...(width !== undefined && { width: toCSSLength(width) }),
      ...(height !== undefined && { height: toCSSLength(height) }),
      ...style,
    }

    return (
      <Presence present={isPresented}>
        <ContainerLayer {...rest} ref={forwardedRef} className={className} style={computedStyle} />
      </Presence>
    )
  }
)
