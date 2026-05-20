import { forwardRef } from 'react'

import { cn } from '../../styles'
import { mapChildrenWithSelection } from '../../libs'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type PageControlTheme = {
  fillColor?: string
  gap?: string
}

export type PageIndicatorSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<PageControlTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type PageIndicatorProps = PageIndicatorSpecificProps & {
  /** 현재 페이지 인덱스 */
  currentPage?: number
  /** 페이지 변경 콜백 */
  onPageChange?: (page: number) => void
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof PageIndicatorSpecificProps>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 페이지 컨트롤 컴포넌트
 *
 * @example
 * ```tsx
 * <PageIndicator currentPage={0} onPageChange={setPage}>
 *   <PageDots />
 *   <PageDots />
 *   <PageDots />
 * </PageIndicator>
 * ```
 */
export const PageIndicator = forwardRef<HTMLDivElement, PageIndicatorProps>(
  (
    {
      children,
      currentPage = 0,
      onPageChange,
      className: classProp,
      style: styleProp,
      theme,
      ...rest
    },
    ref
  ) => {
    const className = cn('relative inline-flex', classProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      ...styleProp,
    }

    const childrenWithProps = mapChildrenWithSelection(children, currentPage, onPageChange)

    return (
      // 페이지네이션은 tab UI가 아니라 navigation landmark에 가깝다.
      <ContainerLayer
        as="nav"
        ref={ref}
        className={className}
        style={style}
        aria-label="Pagination"
        {...rest}
      >
        <ContentLayer
          className="relative"
          direction="horizontal"
          alignment="center"
          style={{ gap: theme?.gap || '8px' }}
        >
          {childrenWithProps}
        </ContentLayer>
      </ContainerLayer>
    )
  }
)
