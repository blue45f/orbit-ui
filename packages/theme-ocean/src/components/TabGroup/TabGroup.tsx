import {
  ComponentThemeProps,
  TabItems,
  TabItemsProps,
  TabItemsSpecificProps,
  TabItemsTabProps,
  filterComponents,
  getReactElementRef,
} from '@prism-ui/core'
import { Children, ComponentProps, forwardRef, PropsWithChildren, ReactElement, ReactNode } from 'react'

import { vars } from '../../styles'

export type FixedTabsProps = Omit<TabItemsProps, keyof TabItemsSpecificProps> &
  ComponentThemeProps<typeof vars.com.tabs>

const FixedTabsRoot = forwardRef<HTMLDivElement, FixedTabsProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const {
    filtered: [tabs],
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], FixedTabsTab)

  return (
    <TabItems ref={ref} {...rest} theme={{ ...vars.com.tabs, ...theme }}>
      <TabItems.ActiveIndicator />
      {(tabs as ReactElement<ComponentProps<typeof TabItems.Tab>>[]).map((tab) => (
        <TabItems.Tab
          {...tab.props}
          ref={getReactElementRef(tab)}
          key={tab.props.value}
          height={44}
          theme={{ ...tab.props.theme }}
        >
          {tab}
        </TabItems.Tab>
      ))}
    </TabItems>
  )
})

const FixedTabsTab = forwardRef<HTMLButtonElement, TabItemsTabProps>((props) => {
  const { children } = props

  const {
    filtered: [leading, center, trailing],
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    FixedTabsTabLeading,
    FixedTabsTabCenter,
    FixedTabsTabTrailing,
  )

  return (
    <>
      {leading.length > 0 && <TabItems.TabLeading>{leading}</TabItems.TabLeading>}
      {center.length > 0 && <TabItems.TabCenter>{center}</TabItems.TabCenter>}
      {trailing.length > 0 && <TabItems.TabTrailing>{trailing}</TabItems.TabTrailing>}
    </>
  )
})

const FixedTabsTabLeading: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const FixedTabsTabCenter: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const FixedTabsTabTrailing: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

// ========== exports ==========
type FixedTabsComponent = typeof FixedTabsRoot & {
  Tab: typeof FixedTabsTab
  TabLeading: typeof FixedTabsTabLeading
  TabCenter: typeof FixedTabsTabCenter
  TabTrailing: typeof FixedTabsTabTrailing
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * ### 🧩 서브컴포넌트
 * - {@link Tab `FixedTabs.Tab`} 탭
 * - {@link TabLeading `FixedTabs.TabLeading`} 탭 내 리딩 영역
 * - {@link TabCenter `FixedTabs.TabCenter`} 탭 내 센터 영역
 * - {@link TabTrailing `FixedTabs.TabTrailing`} 탭 내 트레일링 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Tabs } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
// TODO: @hya.kwon 예시 추가
 *   )
 * }
 * ```
 */
export const FixedTabs: FixedTabsComponent = Object.assign(FixedTabsRoot, {
  Tab: FixedTabsTab,
  TabLeading: FixedTabsTabLeading,
  TabCenter: FixedTabsTabCenter,
  TabTrailing: FixedTabsTabTrailing,
})
