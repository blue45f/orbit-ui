import { forwardRef } from 'react'

import { type ComponentThemeProps } from '../../libs'
import { vars } from '../../styles/theme.css'
import { TextField } from '../TextField'

export type PasswordFieldSpecificProps = {
  /**
   * PasswordField 높이
   * @defaultValue '48'
   */
  height?: number | string
}

export type PasswordFieldProps = PasswordFieldSpecificProps & {
  placeholder?: string
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
} & ComponentThemeProps<typeof vars.com.secureField>

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4?node-id=20033-8362)
 * - 비밀번호 입력을 위한 보안 텍스트 필드 컴포넌트예요.
 * - TextField를 재사용하며, type='password'로 설정되어 있어요.
 * - leading, trailing 슬롯 및 clear button은 지원하지 않아요.
 * - axis는 항상 'horizontal'이에요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { PasswordField } from '@orbit-ui/core'
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
 * ### 👇 ref로 input 요소 접근
 * ```tsx
 * import { PasswordField } from '@orbit-ui/core'
 * import { useRef } from 'react'
 *
 * function App() {
 *   const inputRef = useRef<HTMLInputElement>(null)
 *
 *   const handleFocus = () => {
 *     inputRef.current?.focus()
 *   }
 *
 *   return (
 *     <>
 *       <PasswordField ref={inputRef} placeholder="비밀번호 입력" />
 *       <button onClick={handleFocus}>입력 필드 포커스</button>
 *     </>
 *   )
 * }
 * ```
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const { theme, height = 48, ...rest } = props

  return (
    <TextField
      ref={ref}
      type="password"
      axis="horizontal"
      height={height}
      theme={{
        ...vars.com.secureField,
        ...theme,
      }}
      {...rest}
    />
  )
})

PasswordField.displayName = 'PasswordField'
