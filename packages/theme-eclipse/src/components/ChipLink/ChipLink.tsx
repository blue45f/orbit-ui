import {
  ComponentThemeProps,
  filterComponents,
  Chip,
  ChipPropsAsAnchor,
  ChipSpecificProps,
} from '@heejun-com/core'
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
    <Chip {...rest} as="a" ref={ref} theme={{ ...theme }}>
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
 *
 * ### 🧩 서브컴포넌트
 * - {@link Leading `ChipLink.Leading`} 시작 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { ChipLink } from '@heejun-com/theme-eclipse'
 * import { CheckIcon } from '@heejun-com/icons'
 *
 * function App() {
 *   return (
 *     <ChipLink href='https://github.com/blue45f/ui-forge' target='_blank'>
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
