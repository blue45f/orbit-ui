import { TextField, TextFieldProps, TextFieldSpecificProps, ComponentThemeProps } from '@ui-forge/core'
import { CircleCancelFillIcon } from '@ui-forge/icons'
import { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'
import { FilledIconButton } from '../SolidIconButton'

import * as styles from './TextField.css'

export type TextFieldProps = Omit<
  Omit<TextFieldProps, keyof TextFieldSpecificProps>,
  'theme' | 'axis'
> &
  ComponentThemeProps<Omit<typeof vars.com.textFieldSingleline, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof TextFieldProps | 'as'> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
  }

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=2179-62550&m=dev)
 *
 * 한 줄 텍스트 입력을 위한 컴포넌트예요.
 * TextField를 재사용하며, mint theme의 Component Token이 적용되어 있어요.
 * Center와 ClearButton이 내장되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { TextField } from '@ui-forge/theme-ocean'
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
 * import { TextField } from '@ui-forge/theme-ocean'
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
 * import { TextField } from '@ui-forge/theme-ocean'
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
    <TextField
      {...rest}
      ref={ref}
      axis='horizontal'
      height={50}
      theme={{
        ...commonTokens,
        ...(error && variantTokens.error),
        ...theme,
      }}
    >
      <TextField.Center>{children}</TextField.Center>
      <TextField.ClearButton visibility='onFocused' className={styles.clearButton}>
        <FilledIconButton
          color='white'
          size='medium'
          theme={{ enabledFillColor: vars.sem.color.fillNone }}
          className={styles.iconButton}
        >
          <CircleCancelFillIcon size={16} color={vars.sem.color.foregroundQuaternary} />
        </FilledIconButton>
      </TextField.ClearButton>
    </TextField>
  )
})
