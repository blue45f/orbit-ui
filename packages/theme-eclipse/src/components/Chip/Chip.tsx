import {
  ComponentThemeProps,
  filterComponents,
  Chip as BaseChip,
  ChipSpecificProps,
  ChipPropsAsButton,
} from '@heejun-com/core'
import { Children, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme-vars'

import * as styles from './Chip.css'

export type ChipProps = Omit<ChipPropsAsButton, keyof ChipSpecificProps> &
  ComponentThemeProps<typeof vars.com.chip>

const ChipRoot = forwardRef<HTMLButtonElement, ChipProps>((props, ref) => {
  const { theme, children, ...rest } = props

  const { filtered, unfiltered } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    ChipLeading,
    ChipTrailing
  )

  const { variant: _variant, ...chipTokens } = vars.com.chip

  return (
    <BaseChip
      {...rest}
      ref={ref}
      className={styles.chip}
      theme={{ ...chipTokens, gap: vars.ref.spacing[50], ...theme }}
      as="button"
    >
      {filtered[0].length > 0 && (
        <BaseChip.Leading size={18}>{filtered[0][0] as React.ReactElement}</BaseChip.Leading>
      )}

      {unfiltered}

      {filtered[1].length > 0 && (
        <BaseChip.Trailing size={16}>{filtered[1][0] as React.ReactElement}</BaseChip.Trailing>
      )}
    </BaseChip>
  )
})

// ========== ChipLeading ==========

export type ChipLeadingProps = {
  children: React.ReactElement
}

const ChipLeading: React.FC<ChipLeadingProps> = ({ children }) => <>{children}</>

// ========== ChipTrailing ==========

export type ChipTrailingProps = {
  children: React.ReactElement
}

const ChipTrailing: React.FC<ChipTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type ChipComponent = typeof ChipRoot & {
  Leading: typeof ChipLeading
  Trailing: typeof ChipTrailing
}

/**
 * ### 💡 알아두기
 *
 * ### 🧩 서브컴포넌트
 * - {@link Leading `Chip.Leading`} 시작 영역
 * - {@link Trailing `Chip.Trailing`} 끝 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Chip } from '@heejun-com/theme-eclipse'
 * import { CheckIcon, ChevronDownLineIcon } from '@heejun-com/icons'
 *
 * function App() {
 *   return (
 *     <Chip>
 *       <Chip.Leading>
 *         <CheckIcon size={18} />
 *       </Chip.Leading>
 *       Chip
 *       <Chip.Trailing>
 *         <ChevronDownLineIcon size={18} />
 *       </Chip.Trailing>
 *     </Chip>
 *   )
 * }
 * ```
 */
export const Chip: ChipComponent = Object.assign(ChipRoot, {
  Leading: ChipLeading,
  Trailing: ChipTrailing,
})
