import {
  ComponentThemeProps,
  TabItemProps,
  TabItemSpecificProps,
  filterComponents,
  TabItem,
} from '@heejun-com/core'
import { Children, forwardRef, PropsWithChildren, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'

export type TabProps = Omit<TabItemProps, keyof TabItemSpecificProps> &
  ComponentThemeProps<typeof vars.com.tab>

const TabRoot = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const {
    filtered: [leading, center, trailing],
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    Leading,
    Center,
    Trailing
  )

  return (
    <TabItem {...rest} ref={ref} height={44} theme={{ ...vars.com.tab, ...theme }}>
      {leading.length > 0 && <TabItem.Leading>{leading}</TabItem.Leading>}
      {center.length > 0 && <TabItem.Center>{center}</TabItem.Center>}
      {trailing.length > 0 && <TabItem.Trailing>{trailing}</TabItem.Trailing>}
    </TabItem>
  )
})

const Leading: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const Center: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const Trailing: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

// ========== exports ==========
type TabComponent = typeof TabRoot & {
  Leading: typeof Leading
  Center: typeof Center
  Trailing: typeof Trailing
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * ### 🧩 서브컴포넌트
 * - {@link Tab `Tab`} 탭
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
export const Tab: TabComponent = Object.assign(TabRoot, {
  Leading: Leading,
  Center: Center,
  Trailing: Trailing,
})
