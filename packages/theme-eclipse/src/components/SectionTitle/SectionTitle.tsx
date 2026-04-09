import {
  ListNode,
  ListNodeProps,
  ListNodeSpecificProps,
  ComponentThemeProps,
  findComponent,
  Flex,
  polymorphic,
} from '@heejun-com/core'
import { IconPropsContext } from '@heejun-com/icons'
import type { TypographyTheme } from '@heejun-com/core'
import { Children, createElement } from 'react'

import { vars } from '../../token'
import { ForcedTypographyStyle, Typography } from '../Text'

type SectionTitleOwnProps = ComponentThemeProps<typeof vars.com.listHeader>
export type SectionTitleProps = Omit<ListNodeProps, keyof ListNodeSpecificProps> &
  SectionTitleOwnProps

const SectionTitleRoot = polymorphic<'div', 'div', SectionTitleOwnProps>((props, ref) => {
  const { theme, children, ...rest } = props
  const { title, description, trailing } = findComponent({
    childrenArray: Children.toArray(children),
    target: [
      { name: 'title', component: SectionTitleTitle },
      { name: 'description', component: SectionTitleDescription },
      { name: 'trailing', component: SectionTitleTrailing },
    ],
  })

  return (
    <ListNode ref={ref} theme={{ ...vars.com.listHeader, ...theme }} {...rest}>
      <ListNode.Center>
        <ForcedTypographyStyle maxLines={1} theme={vars.com.listHeader as Partial<TypographyTheme>}>
          <IconPropsContext.Provider
            value={{ size: '16px', forcedColor: vars.sem.color.foregroundQuaternary }}
          >
            {title}
          </IconPropsContext.Provider>
        </ForcedTypographyStyle>
        {description}
      </ListNode.Center>

      <ListNode.Trailing>{trailing}</ListNode.Trailing>
    </ListNode>
  )
})

const SectionTitleTitle = polymorphic<
  'div',
  'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span',
  React.PropsWithChildren
>(
  (props, ref) => {
    const { as = 'div', children, ...rest } = props

    return (
      <ForcedTypographyStyle maxLines={1} theme={vars.com.listHeader as Partial<TypographyTheme>}>
        <Flex
          as={as as keyof React.JSX.IntrinsicElements}
          ref={ref}
          gap={vars.ref.spacing['50']}
          alignItems="center"
          {...rest}
        >
          {children}
        </Flex>
      </ForcedTypographyStyle>
    )
  },
  {
    useForwardRef: true,
  }
)

const SectionTitleDescription = polymorphic<
  'div',
  'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span',
  React.PropsWithChildren
>(({ as = 'div', children, ...rest }, ref) => {
  return (
    <Typography
      as={as as 'div'}
      ref={ref as React.Ref<HTMLDivElement>}
      textStyle="descriptionMedium"
      color="foregroundTertiary"
      {...rest}
    >
      {children}
    </Typography>
  )
})

const SectionTitleTrailing = polymorphic<
  'div',
  'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span',
  React.PropsWithChildren
>(({ as, ...props }, ref) => {
  return createElement(as ?? 'div', { ref, ...props })
})

type SectionTitleComponent = typeof SectionTitleRoot & {
  /**
   * 리스트 헤더의 제목 영역이에요. 텍스트와 아이콘을 함께 배치할 수 있어요.
   */
  Title: typeof SectionTitleTitle

  /**
   * 리스트 헤더의 설명 영역이에요. 제목 아래에 보조 텍스트를 표시할 수 있어요.
   */
  Description: typeof SectionTitleDescription

  /**
   * 리스트 헤더의 끝 영역이에요. ActionButton, AdBadge 등의 액션 요소를 배치할 수 있어요.
   */
  Trailing: typeof SectionTitleTrailing
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=13-5&m=dev)
 * - 리스트 섹션의 헤더를 표시하는 컴포넌트예요. 제목과 설명, 그리고 액션 요소를 배치할 수 있어요.
 *
 * ### 🧩 서브컴포넌트
 * - {@link SectionTitleTitle `SectionTitle.Title`} 제목 영역
 * - {@link SectionTitleDescription `SectionTitle.Description`} 설명 영역
 * - {@link SectionTitleTrailing `SectionTitle.Trailing`} 끝 영역 (ActionButton, AdBadge 등)
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { SectionTitle } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <SectionTitle>
 *       <SectionTitle.Title>List Header</SectionTitle.Title>
 *       <SectionTitle.Description>Description</SectionTitle.Description>
 *     </SectionTitle>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 툴팁 아이콘과 함께 사용
 * ```tsx
 * import { SectionTitle } from '@heejun-com/theme-eclipse'
 * import { CircleInfoLineIcon } from '@heejun-com/icons'
 *
 * function App() {
 *   return (
 *     <SectionTitle>
 *       <SectionTitle.Title>
 *         List Header <CircleInfoLineIcon />
 *       </SectionTitle.Title>
 *       <SectionTitle.Description>Description</SectionTitle.Description>
 *     </SectionTitle>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 텍스트 버튼과 함께 사용
 * ```tsx
 * import { SectionTitle } from '@heejun-com/theme-eclipse'
 * import { TextButton } from '@heejun-com/theme-eclipse'
 * import { ChevronRightLineIcon } from '@heejun-com/icons'
 *
 * function App() {
 *   return (
 *     <SectionTitle>
 *       <SectionTitle.Title>List Header</SectionTitle.Title>
 *       <SectionTitle.Description>Description</SectionTitle.Description>
 *       <SectionTitle.Trailing>
 *         <TextButton color='black' size='small'>
 *           <TextButton.Center>Link Action</TextButton.Center>
 *           <TextButton.Trailing>
 *             <ChevronRightLineIcon />
 *           </TextButton.Trailing>
 *         </TextButton>
 *       </SectionTitle.Trailing>
 *     </SectionTitle>
 *   )
 * }
 * ```
 */
export const SectionTitle: SectionTitleComponent = Object.assign(SectionTitleRoot, {
  Title: SectionTitleTitle,
  Description: SectionTitleDescription,
  Trailing: SectionTitleTrailing,
})
