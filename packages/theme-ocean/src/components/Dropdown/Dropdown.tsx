import { ComponentThemeProps, filterComponents, BaseDropdown, BaseDropdownProps } from '@prism-ui/core'
import { IconPropsContext } from '@prism-ui/icons'
import { AllHTMLAttributes, Children, forwardRef, ReactNode, useMemo, useState } from 'react'

import { vars } from '../../styles/theme.css'

export type DropdownProps = Omit<BaseDropdownProps, 'theme' | 'height'> &
  ComponentThemeProps<Omit<typeof vars.com.select, 'variant'>> &
  Omit<AllHTMLAttributes<HTMLButtonElement>, keyof BaseDropdownProps> & {
    /**
     * 에러 상태
     * @defaultValue `false`
     */
    error?: boolean
  }

const DropdownRoot = forwardRef<HTMLButtonElement, DropdownProps>((props, ref) => {
  const { theme, children, className, activated, disabled, error = false, onFocus, onBlur, ...rest } = props
  const [isFocused, setIsFocused] = useState(false)

  const {
    filtered: [leading, trailing],
    unfiltered: center,
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], DropdownLeading, DropdownTrailing)

  const leadingColor = useMemo(() => {
    if (disabled) return vars.sem.color.foregroundDisabled
    return vars.sem.color.foregroundTertiary
  }, [disabled])

  const trailingColor = useMemo(() => {
    if (disabled) return vars.sem.color.foregroundDisabled
    if (activated || isFocused) return vars.sem.color.foregroundPrimary
    return vars.sem.color.foregroundTertiary
  }, [activated, disabled, isFocused])

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const { variant: variantTokens, ...commonTokens } = vars.com.select

  return (
    <BaseDropdown
      ref={ref}
      theme={{
        ...commonTokens,
        ...(error ? variantTokens.error : {}),
        ...theme,
      }}
      height={50}
      className={className}
      activated={activated}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {leading.length > 0 && (
        <BaseDropdown.Leading>
          <IconPropsContext.Provider value={{ forcedColor: leadingColor }}>{leading[0]}</IconPropsContext.Provider>
        </BaseDropdown.Leading>
      )}

      {center}

      {trailing.length > 0 && (
        <BaseDropdown.Trailing>
          <IconPropsContext.Provider value={{ forcedColor: trailingColor }}>{trailing[0]}</IconPropsContext.Provider>
        </BaseDropdown.Trailing>
      )}
    </BaseDropdown>
  )
})

// ========== DropdownLeading ==========

export type DropdownLeadingProps = {
  children: React.ReactElement
}

const DropdownLeading: React.FC<DropdownLeadingProps> = ({ children }) => <>{children}</>

// ========== DropdownTrailing ==========

export type DropdownTrailingProps = {
  children: React.ReactElement
}

const DropdownTrailing: React.FC<DropdownTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type DropdownComponent = typeof DropdownRoot & {
  Leading: typeof DropdownLeading
  Center: typeof BaseDropdown.Center
  Trailing: typeof DropdownTrailing
}

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4?node-id=22471-8272&m=dev)
 *
 * ### 🧩 서브컴포넌트
 * - {@link DropdownLeading `Dropdown.Leading`} 좌측 영역
 * - {@link BaseDropdown.Center `Dropdown.Center`} 중앙 영역
 * - {@link DropdownTrailing `Dropdown.Trailing`} 우측 영역 (없으면 자동으로 chevron 표시)
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { Dropdown } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false)
 *
 *   return (
 *     <Dropdown
 *       value="Option 1"
 *       activated={isOpen}
 *       onClick={() => setIsOpen(!isOpen)}
 *       placeholder="선택하세요"
 *     />
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 Leading 아이콘 추가
 * ```tsx
 * import { Dropdown, SearchIcon } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
 *     <Dropdown value="Option 1" placeholder="선택하세요">
 *       <Dropdown.Leading><SearchIcon size={24} /></Dropdown.Leading>
 *     </Dropdown>
 *   )
 * }
 * ```
 */
export const Dropdown: DropdownComponent = Object.assign(DropdownRoot, {
  Leading: DropdownLeading,
  Center: BaseDropdown.Center,
  Trailing: DropdownTrailing,
})
