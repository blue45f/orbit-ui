import {
  ListNode,
  ListNodeProps,
  ListNodeSpecificProps,
  ComponentThemeProps,
  findComponent,
  polymorphic,
} from '@prism-ui/core'
import { IconPropsContext } from '@prism-ui/icons'
import { Children } from 'react'

import { vars } from '../../styles/theme.css'
import { Typography } from '../Text'

export type ListTileProps = Omit<ListNodeProps, keyof ListNodeSpecificProps> &
  ComponentThemeProps<typeof vars.com.listItem>

const ListTileRoot = polymorphic<'div', 'div' | 'a' | 'li' | 'button' | 'label', ListTileProps>(
  (props, ref) => {
    const { as = 'div' as const, theme, children, ...rest } = props

    const { leading, title, description, trailing } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        { name: 'leading', component: ListTileLeading },
        { name: 'title', component: ListTileTitle },
        { name: 'description', component: ListTileDescription },
        { name: 'trailing', component: ListTileTrailing },
      ],
    })

    return (
      <ListNode
        as={as as 'div'}
        ref={ref as React.Ref<HTMLDivElement>}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        theme={{ ...vars.com.listItem, ...theme }}
      >
        <ListNode.Leading>{leading}</ListNode.Leading>
        <ListNode.Center>
          {title}
          {description}
        </ListNode.Center>
        <ListNode.Trailing>{trailing}</ListNode.Trailing>
      </ListNode>
    )
  },
  {
    useForwardRef: true,
  },
)

export type ListTileTitleProps = {
  fontWeight?: 'regular' | 'bold'
  children: React.ReactNode
}

const ListTileTitle = polymorphic<
  'div',
  'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span',
  ListTileTitleProps
>(
  (props, ref) => {
    const { as = 'div', children, color: _color, fontWeight = 'regular', ...rest } = props

    return (
      <Typography
        as={as as 'div'}
        ref={ref as React.Ref<HTMLDivElement>}
        {...(rest as Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>)}
        maxLines={1}
        textStyle={fontWeight === 'regular' ? 'descriptionLarge' : 'descriptionLargeEmphasized'}
        color='foregroundPrimary'
      >
        {children}
      </Typography>
    )
  },
  {
    useForwardRef: true,
  },
)

const ListTileDescription = polymorphic<
  'div',
  'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span',
  React.PropsWithChildren
>(
  (props, ref) => {
    const { as = 'div', children, color: _color, ...rest } = props

    return (
      <Typography
        as={as as 'div'}
        ref={ref as React.Ref<HTMLDivElement>}
        {...(rest as Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>)}
        maxLines={1}
        textStyle='descriptionMedium'
        color='foregroundTertiary'
      >
        {children}
      </Typography>
    )
  },
  {
    useForwardRef: true,
  },
)

// ========== ListTileLeading ==========

export type ListTileLeadingProps = {
  children: React.ReactElement
}

const ListTileLeading: React.FC<ListTileLeadingProps> = ({ children }) => <>{children}</>

// ========== ListTileTrailing ==========

export type ListTileTrailingProps = {
  children: React.ReactElement
}

const ListTileTrailing: React.FC<ListTileTrailingProps> = ({ children }) => (
  <IconPropsContext.Provider value={{ size: 16, forcedColor: vars.sem.color.foregroundQuaternary }}>
    {children}
  </IconPropsContext.Provider>
)

// ========== exports ==========

type ListTileComponent = typeof ListTileRoot & {
  Leading: typeof ListTileLeading
  Title: typeof ListTileTitle
  Description: typeof ListTileDescription
  Trailing: typeof ListTileTrailing
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=13-5&m=dev)
 *
 * ### 🧩 서브컴포넌트
 * - {@link ListTileLeading `ListTile.Leading`} 시작 영역
 * - {@link ListTileTitle `ListTile.Title`} 타이틀
 * - {@link ListTileDescription `ListTile.Description`} 디스크립션
 * - {@link ListTileTrailing `ListTile.Trailing`} 끝 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { ListTile } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
 *     <ListTile>
 *       <ListTile.Title>
 *         Title
 *       </ListTile.Title>
 *       <ListTile.Description>
 *         Description
 *       </ListTile.Description>
 *     </ListTile>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 인터랙티브한 List Item
 * ```tsx
 * import { ListTile } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
 *     <ListTile as='button' onClick={() => console.log('clicked')}>
 *       <ListTile.Leading>
 *         <Icon />
 *       </ListTile.Leading>
 *       <ListTile.Title>
 *         Title
 *       </ListTile.Title>
 *       <ListTile.Description>
 *         Description
 *       </ListTile.Description>
 *       <ListTile.Trailing>
 *         <span>Detail</span>
 *       </ListTile.Trailing>
 *     </ListTile>
 *   )
 * }
 * ```
 */
export const ListTile: ListTileComponent = Object.assign(ListTileRoot, {
  Leading: ListTileLeading,
  Title: ListTileTitle,
  Description: ListTileDescription,
  Trailing: ListTileTrailing,
})
