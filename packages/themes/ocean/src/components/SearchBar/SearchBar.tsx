import {
  TextField,
  TextFieldProps,
  TextFieldSpecificProps,
  ComponentThemeProps,
  composeRefs,
  useFocus,
} from '@prism-ui/core'
import { CircleCancelFillIcon, SearchIcon } from '@prism-ui/icons'
import React, { AllHTMLAttributes, forwardRef, useState } from 'react'

import { vars } from '../../styles/theme.css'
import { FilledIconButton } from '../SolidIconButton'
import { Typography } from '../Text'

import * as styles from './SearchBar.css'

export type SearchBarProps = Omit<Omit<TextFieldProps, keyof TextFieldSpecificProps>, 'theme' | 'axis'> &
  ComponentThemeProps<typeof vars.com.searchField> &
  Omit<AllHTMLAttributes<HTMLInputElement>, keyof TextFieldProps | 'as'> & {
    caption?: string
  }

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EB%AF%BC%ED%8A%B8-2.0--%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8?node-id=3690-51255&m=dev)
 *
 * 검색어 입력을 위한 컴포넌트예요.
 * TextField를 재사용하며, mint theme의 Component Token이 적용되어 있어요.
 * Leading에 SearchIcon이 자동으로 추가되고, Center와 ClearButton이 내장되어 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { SearchBar } from '@prism-ui/theme-ocean'
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
    (props.value?.length ?? props.defaultValue?.length ?? 0) > 0 || isFocused,
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
      axis='horizontal'
      theme={{
        ...vars.com.searchField,
        ...theme,
      }}
      onChange={handleChange}
    >
      <TextField.Leading>
        <SearchIcon size={18} color={vars.sem.color.foregroundTertiary} />
      </TextField.Leading>

      <TextField.Center className={styles.captionWrapper}>
        {children}
        {!isFocused && caption.length > 0 && isCaptionVisible && (
          <Typography className={styles.caption} textStyle='descriptionMedium' color='foregroundTertiary'>
            {caption}
          </Typography>
        )}
      </TextField.Center>

      <TextField.ClearButton visibility='onPopulated' className={styles.clearButton}>
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

SearchBar.displayName = 'SearchBar'
