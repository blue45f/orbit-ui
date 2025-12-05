import { forwardRef, Children, cloneElement } from 'react'

import { cn } from '../../styles'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type TabsTheme = {
  fillColor?: string
  indicatorColor?: string
  gap?: string
}

export type TabItemsSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<TabsTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type TabItemsProps = TabItemsSpecificProps & {
  /** 현재 선택된 탭 인덱스 */
  selectedIndex?: number
  /** 탭 변경 콜백 */
  onTabChange?: (index: number) => void
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof TabItemsSpecificProps>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 탭 컨테이너 컴포넌트
 *
 * @example
 * ```tsx
 * <TabItems selectedIndex={0} onTabChange={setSelectedIndex}>
 *   <TabItem>탭 1</TabItem>
 *   <TabItem>탭 2</TabItem>
 *   <TabItem>탭 3</TabItem>
 * </TabItems>
 * ```
 */
export const TabItems = forwardRef<HTMLDivElement, TabItemsProps>(
  ({ children, selectedIndex = 0, onTabChange, className: classProp, style: styleProp, theme, ...rest }, ref) => {
    const className = cn('relative inline-flex', classProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      ...styleProp,
    }

    const childrenWithProps = Children.map(children, (child, index) => {
      if (!child || typeof child !== 'object') return child
      return cloneElement(child as React.ReactElement<any>, {
        selected: index === selectedIndex,
        onClick: () => onTabChange?.(index),
      })
    })

    return (
      <ContainerLayer as="div" ref={ref} className={className} style={style} role="tablist" {...rest}>
        <ContentLayer
          className="relative"
          direction="horizontal"
          alignment="center"
          style={{ gap: theme?.gap || '0px' }}
        >
          {childrenWithProps}
        </ContentLayer>
      </ContainerLayer>
    )
  }
)
