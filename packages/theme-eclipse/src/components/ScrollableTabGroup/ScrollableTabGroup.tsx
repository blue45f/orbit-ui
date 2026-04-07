import {
  ComponentThemeProps,
  BaseScrollableTabGroupProps,
  BaseScrollableTabGroupSpecificProps,
  BaseScrollableTabGroupTabProps,
  filterComponents,
  getReactElementRef,
  BaseScrollableTabGroup,
} from '@orbit-ui/core'
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
  (props) => {
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
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
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
 * import { ScrollableTabGroup } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *   return (
// TODO: @hya.kwon 예시 추가
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
