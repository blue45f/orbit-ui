import {
  ComponentThemeProps,
  TabItemProps,
  TabItemSpecificProps,
  filterComponents,
  TabItem,
} from '@heejun-com/core'
import { Children, forwardRef, PropsWithChildren, ReactNode } from 'react'

import { vars } from '../../styles/theme-vars'

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
 * - [🔗 design 디자인가이드라인 바로가기](https://design.example.com/reference)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * ### 🧩 서브컴포넌트
 * - {@link Tab `Tab`} 탭
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { useState } from 'react'
 * import { Tab } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [active, setActive] = useState('home')
 *
 *   return (
 *     <div style={{ display: 'flex' }}>
 *       <Tab value="home" selected={active === 'home'} onClick={() => setActive('home')}>
 *         <Tab.Center>홈</Tab.Center>
 *       </Tab>
 *       <Tab value="settings" selected={active === 'settings'} onClick={() => setActive('settings')}>
 *         <Tab.Center>설정</Tab.Center>
 *       </Tab>
 *     </div>
 *   )
 * }
 * ```
 */
export const Tab: TabComponent = Object.assign(TabRoot, {
  Leading: Leading,
  Center: Center,
  Trailing: Trailing,
})
