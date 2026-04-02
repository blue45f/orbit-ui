import { forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, useCallback, Children } from 'react'

import { cn } from '../../styles'
import { mapChildrenWithSelection, toCSSLength } from '../../libs'
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
 * Tab Sub-component Types (for theme packages)
 * ======================================================================== */

export type TabItemsTabTheme = {
  fillColor?: string
  foregroundColor?: string
  selectedFillColor?: string
  selectedForegroundColor?: string
  paddingHorizontal?: string
  paddingVertical?: string
}

export type TabItemsTabProps = {
  /** 탭 값 */
  value?: string | number
  /** 탭 높이 */
  height?: number | string
  /** 선택 상태 */
  selected?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 테마 커스터마이징 */
  theme?: Partial<TabItemsTabTheme>
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLButtonElement>, 'value'>

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
const InternalTabItems = forwardRef<HTMLDivElement, TabItemsProps>(
  ({ children, selectedIndex = 0, onTabChange, className: classProp, style: styleProp, theme, ...rest }, ref) => {
    const className = cn('relative inline-flex', classProp)

    const style: React.CSSProperties = {
      backgroundColor: theme?.fillColor,
      ...styleProp,
    }

    const tabCount = Children.count(children)

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!onTabChange || tabCount === 0) return

        let nextIndex: number | null = null

        switch (e.key) {
          case 'ArrowRight':
            nextIndex = (selectedIndex + 1) % tabCount
            break
          case 'ArrowLeft':
            nextIndex = (selectedIndex - 1 + tabCount) % tabCount
            break
          case 'Home':
            nextIndex = 0
            break
          case 'End':
            nextIndex = tabCount - 1
            break
          default:
            return
        }

        e.preventDefault()
        onTabChange(nextIndex)

        // Focus the newly selected tab button
        const tablist = e.currentTarget
        const tabs = tablist.querySelectorAll<HTMLElement>('[role="tab"]')
        tabs[nextIndex]?.focus()
      },
      [selectedIndex, tabCount, onTabChange]
    )

    const childrenWithProps = mapChildrenWithSelection(children, selectedIndex, onTabChange)

    return (
      <ContainerLayer as="div" ref={ref} className={className} style={style} role="tablist" onKeyDown={handleKeyDown} {...rest}>
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

/* ========================================================================
 * Sub-components (for theme packages)
 * ======================================================================== */

/** Tab - 개별 탭 컴포넌트 */
const TabItemsTab = forwardRef<HTMLButtonElement, TabItemsTabProps>(
  ({ value, height, selected, disabled, theme, children, className: classProp, style: styleProp, ...rest }, ref) => {
    const style: React.CSSProperties = {
      height: height ? toCSSLength(height) : undefined,
      backgroundColor: selected ? theme?.selectedFillColor : theme?.fillColor,
      color: selected ? theme?.selectedForegroundColor : theme?.foregroundColor,
      paddingLeft: theme?.paddingHorizontal,
      paddingRight: theme?.paddingHorizontal,
      paddingTop: theme?.paddingVertical,
      paddingBottom: theme?.paddingVertical,
      ...styleProp,
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={selected}
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        className={cn('relative inline-flex items-center justify-center', classProp)}
        style={style}
        data-value={value}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

/** TabLeading - 탭 내 리딩 영역 */
const TabItemsTabLeading: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/** TabCenter - 탭 내 센터 영역 */
const TabItemsTabCenter: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/** TabTrailing - 탭 내 트레일링 영역 */
const TabItemsTabTrailing: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/** ActiveIndicator - 활성 탭 인디케이터 */
const TabItemsActiveIndicator: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <span
    className={cn('absolute bottom-0 left-0 h-0.5 bg-current transition-all', className)}
    style={style}
  />
)

/* ========================================================================
 * Export
 * ======================================================================== */

type TabItemsComponent = typeof InternalTabItems & {
  Tab: typeof TabItemsTab
  TabLeading: typeof TabItemsTabLeading
  TabCenter: typeof TabItemsTabCenter
  TabTrailing: typeof TabItemsTabTrailing
  ActiveIndicator: typeof TabItemsActiveIndicator
}

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
export const TabItems: TabItemsComponent = Object.assign(InternalTabItems, {
  Tab: TabItemsTab,
  TabLeading: TabItemsTabLeading,
  TabCenter: TabItemsTabCenter,
  TabTrailing: TabItemsTabTrailing,
  ActiveIndicator: TabItemsActiveIndicator,
})
