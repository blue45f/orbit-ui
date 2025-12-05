import { forwardRef } from 'react'

import { cn } from '../../styles'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type PageCounterTheme = {
  fillColor?: string
  foregroundColor?: string
  radius?: string
  padding?: string
}

export type PageNumberSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<PageCounterTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type PageNumberProps = PageNumberSpecificProps & {
  /** 현재 페이지 */
  current: number
  /** 전체 페이지 수 */
  total: number
  /** trailing 영역 */
  trailing?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof PageNumberSpecificProps>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 페이지 카운터 컴포넌트
 *
 * @example
 * ```tsx
 * <PageNumber current={1} total={10} />
 * ```
 */
export const PageNumber = forwardRef<HTMLDivElement, PageNumberProps>(
  ({ current, total, trailing, className: classProp, style: styleProp, theme, ...rest }, ref) => {
    const className = cn('relative inline-flex items-center', classProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '9999px',
      padding: theme?.padding || '4px 8px',
      ...styleProp,
    }

    return (
      <ContainerLayer as="div" ref={ref} className={className} style={style} {...rest}>
        <ContentLayer className="relative" direction="horizontal" alignment="center" style={{ gap: '4px' }}>
          <span className="text-sm font-medium">
            {current} / {total}
          </span>
          {trailing && <span className="flex-shrink-0">{trailing}</span>}
        </ContentLayer>
      </ContainerLayer>
    )
  }
)
