import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  PropsWithChildren,
  HTMLAttributes,
  ReactNode,
} from 'react'

import { cn } from '../../styles'
import { mapChildrenWithSelection, toCSSLength } from '../../libs'
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
 * Tab Sub-component Types (for theme packages)
 * ======================================================================== */

export type ScrollableTabGroupTabTheme = {
  fillColor?: string
  foregroundColor?: string
  selectedFillColor?: string
  selectedForegroundColor?: string
  paddingHorizontal?: string
  paddingVertical?: string
}

export type ScrollableTabGroupTabProps = {
  /** 탭 값 */
  value?: string | number
  /** 탭 높이 */
  height?: number | string
  /** 선택 상태 */
  selected?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 테마 커스터마이징 */
  theme?: Partial<ScrollableTabGroupTabTheme>
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLButtonElement>, 'value'>

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
const InternalScrollableTabGroup = forwardRef<HTMLDivElement, ScrollableTabGroupProps>(
  (
    {
      children,
      selectedIndex = 0,
      onTabChange,
      className: classProp,
      style: styleProp,
      theme,
      ...rest
    },
    ref
  ) => {
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
      <ContainerLayer
        as="div"
        ref={ref}
        className={className}
        style={style}
        role="tablist"
        {...rest}
      >
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
          className={cn('absolute bottom-0 left-0', 'transition-all duration-200 ease-out')}
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

/* ========================================================================
 * Sub-components (for theme packages)
 * ======================================================================== */

/** Tab - 개별 탭 컴포넌트 */
const ScrollableTabGroupTab = forwardRef<HTMLButtonElement, ScrollableTabGroupTabProps>(
  (
    {
      value,
      height,
      selected,
      disabled,
      theme,
      children,
      className: classProp,
      style: styleProp,
      ...rest
    },
    ref
  ) => {
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
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap',
          classProp
        )}
        style={style}
        data-value={value}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

/** ActiveIndicator - 활성 탭 인디케이터 */
const ScrollableTabGroupActiveIndicator: React.FC<{
  height?: number
  className?: string
  style?: React.CSSProperties
}> = ({ height = 2, className, style }) => (
  <span
    className={cn('absolute bottom-0 left-0 bg-current transition-all', className)}
    style={{ height, ...style }}
  />
)

/** TabLeading - 탭 내 리딩 영역 */
const ScrollableTabGroupTabLeading: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/** TabCenter - 탭 내 센터 영역 */
const ScrollableTabGroupTabCenter: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/** TabTrailing - 탭 내 트레일링 영역 */
const ScrollableTabGroupTabTrailing: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center">{children}</span>
)

/* ========================================================================
 * Export
 * ======================================================================== */

type ScrollableTabGroupComponent = typeof InternalScrollableTabGroup & {
  Tab: typeof ScrollableTabGroupTab
  TabLeading: typeof ScrollableTabGroupTabLeading
  TabCenter: typeof ScrollableTabGroupTabCenter
  TabTrailing: typeof ScrollableTabGroupTabTrailing
  ActiveIndicator: typeof ScrollableTabGroupActiveIndicator
}

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
export const ScrollableTabGroup: ScrollableTabGroupComponent = Object.assign(
  InternalScrollableTabGroup,
  {
    Tab: ScrollableTabGroupTab,
    TabLeading: ScrollableTabGroupTabLeading,
    TabCenter: ScrollableTabGroupTabCenter,
    TabTrailing: ScrollableTabGroupTabTrailing,
    ActiveIndicator: ScrollableTabGroupActiveIndicator,
  }
)
