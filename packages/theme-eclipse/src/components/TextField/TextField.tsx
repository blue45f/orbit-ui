import {
  BaseTextField,
  BaseTextFieldProps,
  BaseTextFieldSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import { CircleCancelFillIcon } from '@heejun-com/icons'
import { AllHTMLAttributes, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'
import { FilledIconButton } from '../SolidIconButton'

import * as styles from './TextField.css'

export type TextFieldProps = Omit<
  Omit<BaseTextFieldProps, keyof BaseTextFieldSpecificProps>,
  'theme' | 'axis'
> &
  ComponentThemeProps<Omit<typeof vars.com.textFieldSingleline, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof BaseTextFieldProps | 'as'> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
    children?: ReactNode
  }

/**
 * ### 💡 알아두기
 *
 * 한 줄 텍스트 입력을 위한 컴포넌트예요.
 * TextField를 재사용하며, eclipse theme의 Component Token이 적용되어 있어요.
 * Center와 ClearButton이 내장되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { TextField } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *
 *   return (
 *     <TextField
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="검색어를 입력하세요"
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 에러 상태
 * ```tsx
 * import { TextField } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *   const [hasError, setHasError] = useState(false)
 *
 *   return (
 *     <TextField
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="이름을 입력하세요"
 *       error={hasError}
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 Clear Button visibility 설정
 * ```tsx
 * import { TextField } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *
 *   return (
 *     <TextField
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="검색어를 입력하세요"
 *     />
 *   )
 * }
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { theme, error = false, children, ...rest } = props

  const { variant: variantTokens, ...commonTokens } = vars.com.textFieldSingleline

  return (
    <BaseTextField
      {...rest}
      ref={ref}
      axis="horizontal"
      height={50}
      theme={{
        ...commonTokens,
        ...(error && variantTokens.error),
        ...theme,
      }}
    >
      <BaseTextField.Center>{children}</BaseTextField.Center>
      <BaseTextField.ClearButton visibility="onFocused">
        <FilledIconButton
          color="white"
          size="medium"
          theme={{ enabledFillColor: vars.sem.color.fillNone }}
          className={styles.iconButton}
        >
          <CircleCancelFillIcon size={16} color={vars.sem.color.foregroundQuaternary} />
        </FilledIconButton>
      </BaseTextField.ClearButton>
    </BaseTextField>
  )
})
