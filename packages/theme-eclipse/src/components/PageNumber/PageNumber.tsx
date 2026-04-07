import {
  ComponentThemeProps,
  BasePageNumber,
  BasePageNumberProps,
  BasePageNumberSpecificProps,
  findComponent,
} from '@orbit-ui/core'
import { Children, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type PageNumberProps = Omit<BasePageNumberProps, keyof BasePageNumberSpecificProps> &
  ComponentThemeProps<typeof vars.com.pageCounter>

const PageNumberRoot = forwardRef<HTMLDivElement, PageNumberProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const { trailing } = findComponent({
    childrenArray: Children.toArray(children),
    target: [
      {
        name: 'trailing',
        component: PageNumberTrailing,
      },
    ],
  })

  return (
    <BasePageNumber ref={ref} theme={{ ...vars.com.pageCounter, ...theme }} {...rest}>
      {trailing && Children.only(trailing) && (
        <BasePageNumber.Trailing>{trailing as React.ReactElement}</BasePageNumber.Trailing>
      )}
    </BasePageNumber>
  )
})

// ========== PageNumberTrailing ==========

export type PageNumberTrailingProps = {
  children: React.ReactElement
}

const PageNumberTrailing: React.FC<PageNumberTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type PageNumberComponent = typeof PageNumberRoot & {
  Trailing: typeof PageNumberTrailing
}

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E--%ED%81%B4%EB%A0%88%EC%9D%B4--%EC%BD%94%EC%96%B4-0.30.1?node-id=24134-2134&m=dev)
 *
 * 현재 페이지와 전체 페이지 수를 텍스트로 표시하는 페이지 카운터 컴포넌트입니다.
 * 선택적으로 Trailing 슬롯에 아이콘을 추가할 수 있습니다.
 *
 * ### 🧩 서브컴포넌트
 * - {@link Trailing `PageNumber.Trailing`} 끝 영역 (아이콘 등)
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PageNumber } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *   return <PageNumber current={1} total={3} />
 * }
 * ```
 *
 * @example
 * ### 👇 아이콘과 함께
 * ```tsx
 * import { PageNumber, CloseIcon } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <PageNumber current={1} total={3}>
 *       <PageNumber.Trailing>
 *         <CloseIcon />
 *       </PageNumber.Trailing>
 *     </PageNumber>
 *   )
 * }
 * ```
 */
export const PageNumber: PageNumberComponent = Object.assign(PageNumberRoot, {
  Trailing: PageNumberTrailing,
})

PageNumber.displayName = 'PageNumber'
PageNumber.Trailing.displayName = 'PageNumber.Trailing'
