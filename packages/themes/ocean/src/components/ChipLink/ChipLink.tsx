import {
  ComponentThemeProps,
  filterComponents,
  Chip,
  ChipPropsAsAnchor,
  ChipSpecificProps,
} from '@prism-ui/core'
import { Children, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'

export type ChipLinkProps = Omit<ChipPropsAsAnchor, keyof ChipSpecificProps | 'as'> &
  ComponentThemeProps<typeof vars.com.chip>

const ChipLinkRoot = forwardRef<HTMLAnchorElement, ChipLinkProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const {
    filtered: [leading],
    unfiltered,
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], ChipLinkLeading)

  return (
    <Chip {...rest} as='a' ref={ref} theme={{ ...theme }}>
      {leading.length > 0 && <Chip.Leading size={18}>{leading[0]}</Chip.Leading>}

      {unfiltered}
    </Chip>
  )
})

// ========== ChipLinkLeading ==========

export type ChipLinkLeadingProps = {
  children: React.ReactElement
}

const ChipLinkLeading: React.FC<ChipLinkLeadingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type ChipLinkComponent = typeof ChipLinkRoot & {
  Leading: typeof ChipLinkLeading
}

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/pDTX2coGNHcsL25Jy6vsRZ/0.10.12-Chip%2C-Badge%2C-Button?node-id=12166-1102&t=qSEdzclH9DZ1OLxr-4)
 *
 * ### 🧩 서브컴포넌트
 * - {@link Leading `ChipLink.Leading`} 시작 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { ChipLink } from '@prism-ui/theme-ocean'
 * import { CheckIcon } from '@prism-ui/icons'
 *
 * function App() {
 *   return (
 *     <ChipLink href='https://www.claykit.com' target='_blank'>
 *       <ChipLink.Leading>
 *         <CheckIcon size={24} />
 *       </ChipLink.Leading>
 *       ChipLink
 *     </ChipLink>
 *   )
 * }
 * ```
 */
export const ChipLink: ChipLinkComponent = Object.assign(ChipLinkRoot, {
  Leading: ChipLinkLeading,
})
