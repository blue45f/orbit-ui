import { forwardRef } from 'react'

import { cn } from '../../../styles'
import { SpacingMap, getSpacingValue, SpacingToken } from '../../../libs'

export type { SpacingMap } from '../../../libs'

export type ContainerProps = {
  children?: React.ReactNode
  /** 음수 여백 여부 */
  negative?: boolean
  /**
   * 여백 값
   * - 값이 string인 경우, 모든 방향에 동일한 여백을 적용해요.
   * - 값이 객체인 경우, 방향별로 여백을 적용해요.
   */
  spacing?: SpacingMap<SpacingToken | string>
} & React.HTMLAttributes<HTMLDivElement>

/**
 * 여백 컨테이너 컴포넌트
 *
 * @example
 * ```tsx
 * <Container spacing="400">
 *   <Container negative spacing={{ x: '500', y: '500' }}>
 *     <img src={...} />
 *   </Container>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const {
    children,
    className: classProp,
    style: styleProps,
    spacing: spacingProp,
    negative = false,
    ...rest
  } = props

  // 간격 값 계산
  const spacingObj = typeof spacingProp === 'string' ? { x: spacingProp, y: spacingProp } : spacingProp

  const top = getSpacingValue(spacingObj?.top || spacingObj?.y || '0')
  const bottom = getSpacingValue(spacingObj?.bottom || spacingObj?.y || '0')
  const left = getSpacingValue(spacingObj?.left || spacingObj?.x || '0')
  const right = getSpacingValue(spacingObj?.right || spacingObj?.x || '0')

  const className = cn(classProp)

  const style: React.CSSProperties = negative
    ? {
        marginTop: `-${top}`,
        marginBottom: `-${bottom}`,
        marginLeft: `-${left}`,
        marginRight: `-${right}`,
        ...styleProps,
      }
    : {
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
        ...styleProps,
      }

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  )
})
