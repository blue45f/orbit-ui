import {
  ComponentThemeProps,
  BaseCheckbox,
  BaseCheckboxProps,
  BaseCheckboxSpecificProps,
} from '@heejun-com/core'
import { CheckIcon, MinusIcon } from '@heejun-com/icons'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

export type CheckboxProps = Omit<BaseCheckboxProps, keyof BaseCheckboxSpecificProps> &
  ComponentThemeProps<typeof vars.com.plainCheckbox> & {
    /** @defaultValue `check` */
    iconName?: 'check' | 'minus'
  }

/**
 * ### 💡 알아두기
 * - [🔗 design 디자인가이드라인 바로가기](https://design.example.com/reference)
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Checkbox } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <Checkbox />
 *   )
 * }
 * ```
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const { theme, iconName, ...rest } = props

  return (
    <BaseCheckbox
      ref={ref}
      {...rest}
      theme={{ ...vars.com.plainCheckbox, ...theme }}
      width={22}
      height={22}
      borderWidth={2}
    >
      <BaseCheckbox.Icon>
        {iconName === 'minus' ? (
          <MinusIcon size={18} tone="soft" />
        ) : (
          <CheckIcon size={18} tone="soft" />
        )}
      </BaseCheckbox.Icon>
    </BaseCheckbox>
  )
})
