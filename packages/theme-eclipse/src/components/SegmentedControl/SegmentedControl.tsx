import {
  ComponentThemeProps,
  TabItems,
  TabItemsProps,
  TabItemsSpecificProps,
  TabItemsTabProps,
  filterComponents,
  getReactElementRef,
} from '@heejun-com/core'
import {
  Children,
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react'

import { vars } from '../../styles/theme.css'

export type SegmentedControlProps = Omit<TabItemsProps, keyof TabItemsSpecificProps> &
  ComponentThemeProps<typeof vars.com.segmentedControl>

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const {
    filtered: [segmentedControlTabs],
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], SegmentedControlTab)

  return (
    <TabItems
      ref={ref}
      {...rest}
      theme={{ ...vars.com.segmentedControl, ...theme } as TabItemsProps['theme']}
    >
      <TabItems.ActiveIndicator />
      {(segmentedControlTabs as ReactElement<ComponentProps<typeof TabItems.Tab>>[]).map((tab) => (
        <TabItems.Tab
          {...tab.props}
          ref={getReactElementRef(tab) as React.Ref<HTMLButtonElement>}
          key={tab.props.value}
          height={50}
          theme={{ ...tab.props.theme }}
        >
          {tab}
        </TabItems.Tab>
      ))}
    </TabItems>
  )
})

const SegmentedControlTab = forwardRef<HTMLButtonElement, TabItemsTabProps>((props) => {
  const { children } = props

  const {
    filtered: [leading, center, trailing],
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    SegmentedControlTabLeading,
    SegmentedControlTabCenter,
    SegmentedControlTabTrailing
  )

  return (
    <>
      {leading.length > 0 && <TabItems.TabLeading>{leading}</TabItems.TabLeading>}
      {center.length > 0 && <TabItems.TabCenter>{center}</TabItems.TabCenter>}
      {trailing.length > 0 && <TabItems.TabTrailing>{trailing}</TabItems.TabTrailing>}
    </>
  )
})

const SegmentedControlTabLeading: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const SegmentedControlTabCenter: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const SegmentedControlTabTrailing: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

// ========== exports ==========
type SegmentedControlComponent = typeof SegmentedControlRoot & {
  Tab: typeof SegmentedControlTab
  TabLeading: typeof SegmentedControlTabLeading
  TabCenter: typeof SegmentedControlTabCenter
  TabTrailing: typeof SegmentedControlTabTrailing
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * ### 🧩 서브컴포넌트
 * - {@link Tab `SegmentedControl.Tab`} 탭
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { SegmentedControl } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
// TODO: @hya.kwon 예시 추가
 *   )
 * }
 * ```
 */
export const SegmentedControl: SegmentedControlComponent = Object.assign(SegmentedControlRoot, {
  Tab: SegmentedControlTab,
  TabLeading: SegmentedControlTabLeading,
  TabCenter: SegmentedControlTabCenter,
  TabTrailing: SegmentedControlTabTrailing,
})
