import {
  TextField,
  TextFieldProps,
  TextFieldSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

export type TextAreaProps = Omit<
  Omit<TextFieldProps, keyof TextFieldSpecificProps>,
  'theme' | 'axis'
> &
  ComponentThemeProps<Omit<typeof vars.com.textFieldMultiline, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLTextAreaElement>, keyof TextFieldProps | 'as'> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
  }

/**
 * ### 💡 알아두기
 *
 * 여러 줄 텍스트 입력을 위한 컴포넌트예요.
 * TextField를 재사용하며, eclipse theme의 Component Token이 적용되어 있어요.
 * Center가 내장되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { TextArea } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *
 *   return (
 *     <TextArea
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="내용을 입력하세요"
 *       minimumLine={3}
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 에러 상태
 * ```tsx
 * import { TextArea } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *   const [hasError, setHasError] = useState(false)
 *
 *   return (
 *     <TextArea
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="내용을 입력하세요"
 *       minimumLine={3}
 *       error={hasError}
 *     />
 *   )
 * }
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { theme, error = false, children, ...rest } = props

  const { variant: variantTokens, ...commonTokens } = vars.com.textFieldMultiline

  return (
    <TextField
      {...rest}
      ref={ref}
      axis="vertical"
      height="fit-content"
      theme={{
        ...commonTokens,
        ...(error && variantTokens.error),
        ...theme,
      }}
    >
      <TextField.Center>{children}</TextField.Center>
    </TextField>
  )
})
