import { MouseEventHandler } from 'react'

import { setupContext } from '../../libs'

export type TextFieldContextValue = {
  disabled?: boolean
  focused?: boolean
  populated?: boolean
  axis?: 'horizontal' | 'vertical'
  maximumLine?: number
  minimumLine?: number
  maxLength?: number
  placeholder?: string
  value?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'url'
  onClear?: () => void
  focusElement?: () => void
  handleClear?: () => void
  preventElementBlur?: MouseEventHandler<HTMLOrSVGElement>
  valueSizeRef?: React.RefObject<HTMLSpanElement | null>
}

export const [TextFieldProvider, useTextFieldContext] =
  setupContext<TextFieldContextValue>('TextField')
