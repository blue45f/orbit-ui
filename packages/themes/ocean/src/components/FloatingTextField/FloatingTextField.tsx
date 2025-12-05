import {
  BaseFloatingTextField,
  BaseFloatingTextFieldProps,
  BaseFloatingTextFieldSpecificProps,
  ComponentThemeProps,
} from '@ui-forge/core'
import { CircleCancelFillIcon } from '@ui-forge/icons'
import { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'
import { FilledIconButton } from '../SolidIconButton'

export type FloatingTextFieldProps = Omit<
  Omit<BaseFloatingTextFieldProps, keyof BaseFloatingTextFieldSpecificProps>,
  'theme'
> &
  ComponentThemeProps<Omit<typeof vars.com.textFieldWithLabelAnimation, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof BaseFloatingTextFieldProps> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
  }

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=32-4279&m=dev)
 *
 * 라벨 애니메이션이 있는 텍스트 필드 컴포넌트예요.
 * BaseFloatingTextField을 재사용하며, mint theme의 Component Token이 적용되어 있어요.
 * ClearButton이 내장되어 있어요 (visibility는 'onFocused'로 고정).
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { FloatingTextField } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *
 *   return (
 *     <FloatingTextField
 *       placeholder="이메일을 입력하세요"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 에러 상태
 * ```tsx
 * import { FloatingTextField } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *   const [hasError, setHasError] = useState(false)
 *
 *   return (
 *     <FloatingTextField
 *       placeholder="이메일을 입력하세요"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       error={hasError}
 *     />
 *   )
 * }
 * ```
 */
export const FloatingTextField = forwardRef<HTMLInputElement, FloatingTextFieldProps>(
  (props, ref) => {
    const { theme, error = false, children, ...rest } = props

    const { variant: variantTokens, ...commonTokens } = vars.com.textFieldWithLabelAnimation

    return (
      <BaseFloatingTextField
        {...rest}
        ref={ref}
        theme={{
          ...commonTokens,
          ...(error && variantTokens.error),
          ...theme,
        }}
      >
        {children}
        <BaseFloatingTextField.ClearButton visibility='onFocused'>
          <FilledIconButton color='white' size='medium' theme={{ enabledFillColor: vars.sem.color.fillNone }}>
            <CircleCancelFillIcon size={16} color={vars.sem.color.foregroundQuaternary} />
          </FilledIconButton>
        </BaseFloatingTextField.ClearButton>
      </BaseFloatingTextField>
    )
  },
)

FloatingTextField.displayName = 'FloatingTextField'
