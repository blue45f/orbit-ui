import {
  BasePasswordField,
  BasePasswordFieldProps,
  ComponentThemeProps,
  BasePasswordFieldSpecificProps,
} from '@heejun-com/core'
import { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

export type PasswordFieldProps = Omit<
  Omit<BasePasswordFieldProps, keyof BasePasswordFieldSpecificProps>,
  'theme'
> &
  ComponentThemeProps<Omit<typeof vars.com.secureField, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof BasePasswordFieldProps> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
  }

const PasswordFieldRoot = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const { theme, error = false, ...rest } = props

  const { variant: variantTokens, ...commonTokens } = vars.com.secureField

  return (
    <BasePasswordField
      {...rest}
      ref={ref}
      theme={{
        ...commonTokens,
        ...(error && variantTokens.error),
        ...theme,
      }}
      height={50}
    />
  )
})

PasswordFieldRoot.displayName = 'PasswordField'

/**
 * ### 💡 알아두기
 *
 * 비밀번호와 같이 입력중인/입력한 글자를 숨겨야할 때 사용하는 컴포넌트예요.
 * BasePasswordField를 재사용하며, eclipse theme의 Component Token이 적용되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PasswordField } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [password, setPassword] = useState('')
 *
 *   return (
 *     <PasswordField
 *       value={password}
 *       onChange={(e) => setPassword(e.target.value)}
 *       placeholder="비밀번호를 입력하세요"
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 에러 상태
 * ```tsx
 * import { PasswordField } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [password, setPassword] = useState('')
 *   const [hasError, setHasError] = useState(false)
 *
 *   return (
 *     <PasswordField
 *       value={password}
 *       onChange={(e) => setPassword(e.target.value)}
 *       placeholder="비밀번호를 입력하세요"
 *       error={hasError}
 *     />
 *   )
 * }
 * ```
 */
export const PasswordField = PasswordFieldRoot
