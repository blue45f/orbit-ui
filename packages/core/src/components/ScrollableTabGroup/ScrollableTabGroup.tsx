import { forwardRef, useRef, useEffect, useState } from 'react'

import { cn } from '../../styles'
import { mapChildrenWithSelection } from '../../libs'
import { ContainerLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type ScrollableTabsTheme = {
  fillColor?: string
  indicatorColor?: string
  indicatorHeight?: string
  gap?: string
  height?: string
}

export type ScrollableTabGroupSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<ScrollableTabsTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type ScrollableTabGroupProps = ScrollableTabGroupSpecificProps & {
  /** 현재 선택된 탭 인덱스 */
  selectedIndex?: number
  /** 탭 변경 콜백 */
  onTabChange?: (index: number) => void
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ScrollableTabGroupSpecificProps>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 스크롤 가능한 탭 컨테이너 컴포넌트
 *
 * @example
 * ```tsx
 * <ScrollableTabGroup selectedIndex={0} onTabChange={setSelectedIndex}>
 *   <TabItem>탭 1</TabItem>
 *   <TabItem>탭 2</TabItem>
 *   <TabItem>탭 3</TabItem>
 * </ScrollableTabGroup>
 * ```
 */
export const ScrollableTabGroup = forwardRef<HTMLDivElement, ScrollableTabGroupProps>(
  ({ children, selectedIndex = 0, onTabChange, className: classProp, style: styleProp, theme, ...rest }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})

    useEffect(() => {
      if (!containerRef.current) return

      const tabs = containerRef.current.querySelectorAll('[role="tab"]')
      const selectedTab = tabs[selectedIndex] as HTMLElement

      if (selectedTab) {
        setIndicatorStyle({
          width: selectedTab.offsetWidth,
          transform: `translateX(${selectedTab.offsetLeft}px)`,
        })
      }
    }, [selectedIndex])

    const className = cn('relative w-full overflow-x-auto', classProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      height: theme?.height,
      ...styleProp,
    }

    const childrenWithProps = mapChildrenWithSelection(children, selectedIndex, onTabChange)

    return (
      <ContainerLayer as="div" ref={ref} className={className} style={style} role="tablist" {...rest}>
        <div ref={containerRef} className="inline-flex min-w-full">
          <ContentLayer
            className="relative"
            direction="horizontal"
            alignment="center"
            style={{ gap: theme?.gap || '0px' }}
          >
            {childrenWithProps}
          </ContentLayer>
        </div>
        {/* Active indicator */}
        <div
          className={cn(
            'absolute bottom-0 left-0',
            'transition-all duration-200 ease-out'
          )}
          style={{
            height: theme?.indicatorHeight || '2px',
            backgroundColor: theme?.indicatorColor || 'currentColor',
            ...indicatorStyle,
          }}
        />
      </ContainerLayer>
    )
  }
)
