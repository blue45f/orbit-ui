import { createContext, useContext, createElement, MouseEventHandler } from 'react'

export type TextFieldWithLabelAnimationContextValue = {
  disabled?: boolean
  focused?: boolean
  populated?: boolean
  focusElement?: () => void
  preventElementBlur?: MouseEventHandler<HTMLOrSVGElement>
  handleClear?: () => void
}

export const TextFieldWithLabelAnimationContext = createContext<TextFieldWithLabelAnimationContextValue | undefined>(
  undefined,
)

export const useTextFieldWithLabelAnimationContext = (
  componentName: string,
): TextFieldWithLabelAnimationContextValue => {
  const context = useContext(TextFieldWithLabelAnimationContext)

  if (!context) {
    throw new Error(`${componentName} must be used within TextFieldWithLabelAnimation`)
  }

  return context
}

export const TextFieldWithLabelAnimationProvider: React.FC<{
  value: TextFieldWithLabelAnimationContextValue
  children: React.ReactNode
}> = ({ value, children }) => {
  return createElement(TextFieldWithLabelAnimationContext.Provider, { value }, children)
}
