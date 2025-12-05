import { ComponentThemeProps, Checkbox, CheckboxProps, CheckboxSpecificProps } from '@ui-forge/core'
import { CheckIcon, MinusIcon } from '@ui-forge/icons'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type CheckboxProps = Omit<CheckboxProps, keyof CheckboxSpecificProps> &
  ComponentThemeProps<typeof vars.com.plainCheckbox> & {
    /** @defaultValue `check` */
    iconName?: 'check' | 'minus'
  }

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-0.10.6?node-id=10375-4382&m=dev)
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Checkbox } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   return (
 *     <Checkbox />
 *   )
 * }
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { theme, iconName, ...rest } = props

  return (
    <Checkbox
      ref={ref}
      {...rest}
      theme={{ ...vars.com.plainCheckbox, ...theme }}
      width={22}
      height={22}
      borderWidth={2}
    >
      <Checkbox.Icon>{iconName === 'minus' ? <MinusIcon size={18} /> : <CheckIcon size={18} />}</Checkbox.Icon>
    </Checkbox>
  )
})
