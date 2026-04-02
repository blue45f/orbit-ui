import {
  BasePasswordField,
  BasePasswordFieldProps,
  ComponentThemeProps,
  BasePasswordFieldSpecificProps,
} from '@prism-ui/core'
import { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type PasswordFieldProps = Omit<Omit<BasePasswordFieldProps, keyof BasePasswordFieldSpecificProps>, 'theme'> &
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
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=2179-61441&m=dev)
 *
 * 비밀번호와 같이 입력중인/입력한 글자를 숨겨야할 때 사용하는 컴포넌트예요.
 * BasePasswordField를 재사용하며, ocean theme의 Component Token이 적용되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PasswordField } from '@prism-ui/theme-ocean'
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
 * import { PasswordField } from '@prism-ui/theme-ocean'
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
