import {
  ComponentThemeProps,
  Checkbox,
  CheckboxProps,
  CheckboxSpecificProps,
} from '@heejun-com/core'
import { CheckIcon, MinusIcon } from '@heejun-com/icons'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

export type BoxedCheckboxProps = Omit<CheckboxProps, keyof CheckboxSpecificProps> &
  ComponentThemeProps<typeof vars.com.containedCheckbox> & {
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
 * import { BoxedCheckbox } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <BoxedCheckbox />
 *   )
 * }
 * ```
 */
export const BoxedCheckbox = forwardRef<HTMLButtonElement, BoxedCheckboxProps>((props, ref) => {
  const { theme, iconName, ...rest } = props

  return (
    <Checkbox
      ref={ref}
      {...rest}
      theme={{ ...vars.com.containedCheckbox, ...theme }}
      width={22}
      height={22}
      borderWidth={2}
    >
      <Checkbox.Icon>
        {iconName === 'minus' ? (
          <MinusIcon size={18} tone="soft" />
        ) : (
          <CheckIcon size={18} tone="soft" />
        )}
      </Checkbox.Icon>
    </Checkbox>
  )
})

/** @deprecated Use BoxedCheckbox instead */
export const ContainedCheckbox = BoxedCheckbox
