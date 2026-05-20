import {
  TextField,
  TextFieldProps,
  TextFieldSpecificProps,
  ComponentThemeProps,
  composeRefs,
  useFocus,
} from '@heejun-com/core'
import { CircleCancelFillIcon, SearchIcon } from '@heejun-com/icons'
import React, { AllHTMLAttributes, forwardRef, useState } from 'react'

import { vars } from '../../styles/theme-vars'
import { FilledIconButton } from '../SolidIconButton'
import { Typography } from '../Text'

const SEARCHBAR_CLASS = {
  captionWrapper: 'flex gap-[var(--ref-spacing-50)]',
  caption: 'whitespace-nowrap',
  clearButton: 'w-6 h-6 overflow-visible',
  iconButton: 'shrink-0',
}

export type SearchBarProps = Omit<
  Omit<TextFieldProps, keyof TextFieldSpecificProps>,
  'theme' | 'axis'
> &
  ComponentThemeProps<typeof vars.com.searchField> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof TextFieldProps | 'as'> & {
    caption?: string
  }

/**
 * ### 💡 알아두기
 *
 * 검색어 입력을 위한 컴포넌트예요.
 * TextField를 재사용하며, eclipse theme의 Component Token이 적용되어 있어요.
 * Leading에 SearchIcon이 자동으로 추가되고, Center와 ClearButton이 내장되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { SearchBar } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   const [value, setValue] = useState('')
 *
 *   return (
 *     <SearchBar
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="검색어를 입력하세요"
 *     />
 *   )
 * }
 * ```
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const { theme, children, placeholder, caption = '', onFocus, onBlur, onChange, ...rest } = props

  const {
    isFocused,
    ref: selfRef,
    ...handlers
  } = useFocus({
    onFocus,
    onBlur,
  })
  const refs = composeRefs(ref, selfRef)

  const [isCaptionVisible, setIsCaptionVisible] = useState(
    (props.value?.length ?? props.defaultValue?.length ?? 0) > 0 || isFocused
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onChange?.(e)
    setIsCaptionVisible(e.currentTarget.value.length > 0)
  }

  return (
    <TextField
      {...handlers}
      {...rest}
      ref={refs}
      height={44}
      placeholder={placeholder}
      axis="horizontal"
      theme={{
        ...vars.com.searchField,
        ...theme,
      }}
      onChange={handleChange}
    >
      <TextField.Leading>
        <SearchIcon size={18} color={vars.sem.color.foregroundTertiary} />
      </TextField.Leading>

      <TextField.Center className={SEARCHBAR_CLASS.captionWrapper}>
        {children}
        {!isFocused && caption.length > 0 && isCaptionVisible && (
          <Typography
            className={SEARCHBAR_CLASS.caption}
            textStyle="descriptionMedium"
            color="foregroundTertiary"
          >
            {caption}
          </Typography>
        )}
      </TextField.Center>

      <TextField.ClearButton visibility="onPopulated">
        <FilledIconButton
          color="white"
          size="medium"
          theme={{ enabledFillColor: vars.sem.color.fillNone }}
          className={SEARCHBAR_CLASS.iconButton}
        >
          <CircleCancelFillIcon size={16} color={vars.sem.color.foregroundQuaternary} />
        </FilledIconButton>
      </TextField.ClearButton>
    </TextField>
  )
})

SearchBar.displayName = 'SearchBar'
