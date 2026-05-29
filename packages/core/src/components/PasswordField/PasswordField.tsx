import { HideIcon, ShowIcon } from '@heejun-com/icons'
import React, { forwardRef, useState } from 'react'

import { type ComponentThemeProps } from '../../libs'
import { cn, vars } from '../../styles'
import { TextField } from '../TextField'

export type PasswordFieldSpecificProps = {
  /**
   * PasswordField 높이
   * @defaultValue '44'
   */
  height?: number | string
  /**
   * 비밀번호 표시/숨기기 토글 버튼 노출 여부
   * @defaultValue true
   */
  revealable?: boolean
}

export type PasswordFieldProps = PasswordFieldSpecificProps & {
  placeholder?: string
  disabled?: boolean
  /** 유효성 검증 실패 여부 */
  error?: boolean
  /** 에러 메시지 */
  errorText?: React.ReactNode
  /** 보조 설명 텍스트 */
  helperText?: React.ReactNode
  /** 라벨 */
  label?: React.ReactNode
  /** 필수 입력 여부 */
  required?: boolean
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
 * import { PasswordField } from '@heejun-com/core'
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
 * import { PasswordField } from '@heejun-com/core'
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
  const { theme, height = 44, revealable = true, ...rest } = props

  // 입력 글자 표시 여부. 기본은 숨김(type=password).
  const [revealed, setRevealed] = useState(false)

  const toggleLabel = revealed ? '비밀번호 숨기기' : '비밀번호 표시'

  return (
    <TextField
      ref={ref}
      type={revealed ? 'text' : 'password'}
      axis="horizontal"
      height={height}
      theme={{
        ...vars.com.secureField,
        ...theme,
      }}
      {...rest}
    >
      {revealable && (
        <TextField.Trailing>
          <button
            type="button"
            aria-pressed={revealed}
            aria-label={toggleLabel}
            title={toggleLabel}
            // mousedown 의 기본동작(blur)을 막아 토글 후에도 input 포커스 유지
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setRevealed((v) => !v)}
            className={cn(
              'inline-flex items-center justify-center flex-shrink-0',
              // 최소 44x44 hit area, 아이콘은 16px 유지
              'min-w-11 min-h-11 -mr-2.5 rounded-full',
              'cursor-pointer transition-colors duration-150',
              'hover:[&>span]:bg-[var(--sem-eclipse-color-fillSecondary,rgba(0,0,20,0.1))]',
              '[&>span]:flex [&>span]:items-center [&>span]:justify-center',
              '[&>span]:w-6 [&>span]:h-6 [&>span]:rounded-full'
            )}
          >
            <span>
              {revealed ? <HideIcon size={16} tone="soft" /> : <ShowIcon size={16} tone="soft" />}
            </span>
          </button>
        </TextField.Trailing>
      )}
    </TextField>
  )
})

PasswordField.displayName = 'PasswordField'
