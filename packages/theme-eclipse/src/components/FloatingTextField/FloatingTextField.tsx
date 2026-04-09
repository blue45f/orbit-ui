import {
  BaseFloatingTextField,
  BaseFloatingTextFieldProps,
  BaseFloatingTextFieldSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import { CircleCancelFillIcon } from '@heejun-com/icons'
import React, { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'
import { FilledIconButton } from '../SolidIconButton'

export type FloatingTextFieldProps = Omit<
  Omit<BaseFloatingTextFieldProps, keyof BaseFloatingTextFieldSpecificProps>,
  'theme'
> &
  ComponentThemeProps<Omit<typeof vars.com.textFieldWithLabelAnimation, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof BaseFloatingTextFieldProps | 'as'> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
    /** 스타일 */
    style?: React.CSSProperties
    /** 클래스명 */
    className?: string
    children?: React.ReactNode
  }

/**
 * ### 💡 알아두기
 *
 * 라벨 애니메이션이 있는 텍스트 필드 컴포넌트예요.
 * BaseFloatingTextField을 재사용하며, eclipse theme의 Component Token이 적용되어 있어요.
 * ClearButton이 내장되어 있어요 (visibility는 'onFocused'로 고정).
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { FloatingTextField } from '@heejun-com/theme-eclipse'
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
 * import { FloatingTextField } from '@heejun-com/theme-eclipse'
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
        <BaseFloatingTextField.ClearButton visibility="onFocused">
          <FilledIconButton
            color="white"
            size="medium"
            theme={{ enabledFillColor: vars.sem.color.fillNone }}
          >
            <CircleCancelFillIcon size={16} color={vars.sem.color.foregroundQuaternary} />
          </FilledIconButton>
        </BaseFloatingTextField.ClearButton>
      </BaseFloatingTextField>
    )
  }
)

FloatingTextField.displayName = 'FloatingTextField'
