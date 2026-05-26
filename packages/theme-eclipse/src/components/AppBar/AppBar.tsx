import {
  BaseAppBar,
  BaseAppBarProps,
  BaseAppBarSpecificProps,
  ComponentThemeProps,
  findComponent,
} from '@heejun-com/core'
import React, { Children, PropsWithChildren, ReactNode, forwardRef } from 'react'

import { vars } from '../../styles'

export type AppBarProps = Omit<BaseAppBarProps, keyof BaseAppBarSpecificProps> &
  ComponentThemeProps<typeof vars.com.navigationBar>

const AppBarRoot = forwardRef<HTMLDivElement, AppBarProps>((props, ref) => {
  const { children, theme, ...rest } = props

  const { leading, center, trailing } = findComponent({
    childrenArray: Children.toArray(children) as Awaited<ReactNode>[],
    target: [
      {
        name: 'leading',
        component: AppBarLeading,
      },
      {
        name: 'center',
        component: AppBarCenter,
      },
      {
        name: 'trailing',
        component: AppBarTrailing,
      },
    ],
  })

  return (
    <BaseAppBar ref={ref} theme={{ ...vars.com.navigationBar, ...theme }} {...rest}>
      {leading && <BaseAppBar.Leading>{leading}</BaseAppBar.Leading>}
      {center && <BaseAppBar.Center>{center}</BaseAppBar.Center>}
      {trailing && <BaseAppBar.Trailing>{trailing}</BaseAppBar.Trailing>}
    </BaseAppBar>
  )
})

const AppBarLeading: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const AppBarCenter: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>
const AppBarTrailing: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

type AppBarComponent = typeof AppBarRoot & {
  Leading: typeof AppBarLeading
  Center: typeof AppBarCenter
  Trailing: typeof AppBarTrailing
}

/**
 * ### 💡 알아두기
 * - [🔗 design 디자인가이드라인 바로가기](https://design.example.com/reference)
 * - 사용자가 머무르고 있는 화면의 제목과 주요 액션 버튼을 제공할 수 있어요.
 * - foundation의 AppBar를 기반으로 구현되었어요.
 *
 * ### 🧩 서브컴포넌트
 * - {@link NavigationBarLeading `AppBar.Leading`}: 좌측 영역이에요. 뒤로가기 버튼을 배치할 수 있어요.
 * - {@link NavigationBarCenter `AppBar.Center`}: 중앙 영역이에요. 제목(텍스트 또는 로고)을 배치해요.
 * - {@link NavigationBarTrailing `AppBar.Trailing`} (optional): 우측 영역이에요. 주요 액션 버튼들을 배치할 수 있어요.
 *
 * ### 📐 Variants
 * - **BG Color**: White (기본값) 또는 Transparent 배경을 사용할 수 있어요. `theme.fillColor`로 제어해요.
 * - **Title Type**: Text 또는 Logo를 Center 영역에 배치할 수 있어요.
 * - **Height**: iOS는 44px, Android는 56px 높이를 사용해요. `height` prop으로 제어해요.
 *
 * @example
 * ### 👇 기본 사용법 (Text Title)
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <AppBar>
 *      <AppBar.Center>Title</AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 backButton prop을 사용한 뒤로가기 버튼
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const handleBack = () => {
 *     console.log('뒤로가기')
 *   }
 *
 *   return (
 *     <AppBar>
 *       <AppBar.Leading>
 *         <FilledIconButton color='white' size='medium' onClick={handleBack}>
 *           <ArrowLeftIcon size={24} />
 *         </FilledIconButton>
 *       </AppBar.Leading>
 *       <AppBar.Center>Title</AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 타이틀 중앙 정렬. equal-weight로 블록 요소를 중앙 정렬할 수 있어요.
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <AppBar arrangement='equal-weight'>
 *       <AppBar.Center>Title</AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 Logo Title 사용
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <AppBar>
 *       <AppBar.Center>
 *         <img src="/logo.png" alt="Logo" />
 *       </AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 Transparent 배경 사용
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <AppBar
 *       theme={{
 *         fillColor: 'transparent',
 *         foregroundColor: 'white',
 *       }}
 *     >
 *       <AppBar.Center>Title</AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 Center 영역에 아이콘과 함께 사용
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 * import { ChevronDownIcon } from '@heejun-com/icons'
 *
 * function App() {
 *   return (
 *     <AppBar>
 *       <AppBar.Center>
 *         <span>아이콘 사용 예제</span>
 *         <ChevronDownIcon />
 *       </AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 검색 기능이 있는 네비게이션 바
 * ```tsx
 * import { AppBar } from '@heejun-com/theme-eclipse'
 * import { TextField } from '@heejun-com/core'
 * import { useState } from 'react'
 *
 * function App() {
 *   const [searchValue, setSearchValue] = useState('')
 *
 *   return (
 *     <AppBar>
 *       <AppBar.Center>
 *         <TextField
 *           style={{ width: '100%' }}
 *           value={searchValue}
 *           onChange={(e) => setSearchValue(e.target.value)}
 *           placeholder="Search.."
 *         >
 *           <TextField.ClearButton
 *             visibility="onPopulated"
 *             onClick={() => setSearchValue('')}
 *           />
 *         </TextField>
 *       </AppBar.Center>
 *     </AppBar>
 *   )
 * }
 * ```
 */
export const AppBar: AppBarComponent = Object.assign(AppBarRoot, {
  Leading: AppBarLeading,
  Center: AppBarCenter,
  Trailing: AppBarTrailing,
})
