import {
  ComponentThemeProps,
  BaseScrollableTabGroupProps,
  BaseScrollableTabGroupSpecificProps,
  BaseScrollableTabGroupTabProps,
  filterComponents,
  getReactElementRef,
  BaseScrollableTabGroup,
} from '@heejun-com/core'
import {
  Children,
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react'

import { vars } from '../../styles'

export type ScrollableTabGroupProps = Omit<
  BaseScrollableTabGroupProps,
  keyof BaseScrollableTabGroupSpecificProps
> &
  ComponentThemeProps<typeof vars.com.scrollableTabs>

const ScrollableTabGroupRoot = forwardRef<HTMLDivElement, ScrollableTabGroupProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const {
    filtered: [tabs],
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], ScrollableTabGroupTab)

  return (
    <BaseScrollableTabGroup ref={ref} {...rest} theme={{ ...vars.com.scrollableTabs, ...theme }}>
      <BaseScrollableTabGroup.ActiveIndicator height={2} />
      {(tabs as ReactElement<ComponentProps<typeof BaseScrollableTabGroup.Tab>>[]).map((tab) => (
        <BaseScrollableTabGroup.Tab
          {...tab.props}
          ref={getReactElementRef(tab) as React.Ref<HTMLButtonElement>}
          key={tab.props.value}
          height={44}
          theme={{ ...tab.props.theme }}
        >
          {tab}
        </BaseScrollableTabGroup.Tab>
      ))}
    </BaseScrollableTabGroup>
  )
})

const ScrollableTabGroupTab = forwardRef<HTMLButtonElement, BaseScrollableTabGroupTabProps>(
  (props, _ref) => {
    const { children } = props

    const {
      filtered: [leading, center, trailing],
    } = filterComponents(
      Children.toArray(children) as Awaited<ReactNode>[],
      ScrollableTabGroupTabLeading,
      ScrollableTabGroupTabCenter,
      ScrollableTabGroupTabTrailing
    )

    return (
      <>
        {leading.length > 0 && (
          <BaseScrollableTabGroup.TabLeading>{leading}</BaseScrollableTabGroup.TabLeading>
        )}
        {center.length > 0 && (
          <BaseScrollableTabGroup.TabCenter>{center}</BaseScrollableTabGroup.TabCenter>
        )}
        {trailing.length > 0 && (
          <BaseScrollableTabGroup.TabTrailing>{trailing}</BaseScrollableTabGroup.TabTrailing>
        )}
      </>
    )
  }
)

const ScrollableTabGroupTabLeading: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const ScrollableTabGroupTabCenter: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const ScrollableTabGroupTabTrailing: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

// ========== exports ==========
type ScrollableTabGroupComponent = typeof ScrollableTabGroupRoot & {
  Tab: typeof ScrollableTabGroupTab
  TabLeading: typeof ScrollableTabGroupTabLeading
  TabCenter: typeof ScrollableTabGroupTabCenter
  TabTrailing: typeof ScrollableTabGroupTabTrailing
}

/**
 * ### 💡 알아두기
 * - 디자인 명세는 토큰 문서를 기준으로 합니다.
 *
 * ### 🧩 서브컴포넌트
 * - {@link Tab `ScrollableTabGroup.Tab`} 탭
 * - {@link TabLeading `ScrollableTabGroup.TabLeading`} 탭 내 리딩 영역
 * - {@link TabCenter `ScrollableTabGroup.TabCenter`} 탭 내 센터 영역
 * - {@link TabTrailing `ScrollableTabGroup.TabTrailing`} 탭 내 트레일링 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { useState } from 'react'
 * import { ScrollableTabGroup } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [selected, setSelected] = useState(0)
 *
 *   return (
 *     <ScrollableTabGroup selectedIndex={selected} onTabChange={setSelected}>
 *       <ScrollableTabGroup.Tab value="all">
 *         <ScrollableTabGroup.TabCenter>All</ScrollableTabGroup.TabCenter>
 *       </ScrollableTabGroup.Tab>
 *       <ScrollableTabGroup.Tab value="featured">
 *         <ScrollableTabGroup.TabCenter>Featured</ScrollableTabGroup.TabCenter>
 *       </ScrollableTabGroup.Tab>
 *       <ScrollableTabGroup.Tab value="new">
 *         <ScrollableTabGroup.TabCenter>New Arrivals</ScrollableTabGroup.TabCenter>
 *       </ScrollableTabGroup.Tab>
 *     </ScrollableTabGroup>
 *   )
 * }
 * ```
 */
export const ScrollableTabGroup: ScrollableTabGroupComponent = Object.assign(
  ScrollableTabGroupRoot,
  {
    Tab: ScrollableTabGroupTab,
    TabLeading: ScrollableTabGroupTabLeading,
    TabCenter: ScrollableTabGroupTabCenter,
    TabTrailing: ScrollableTabGroupTabTrailing,
  }
)
