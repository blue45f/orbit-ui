import {
  polymorphic,
  BaseTextProps,
  ForcedBaseTextStyle,
  BaseText,
  BaseTextContext,
} from '@heejun-com/core'
import React, { JSX, useContext } from 'react'

export type TextProps = BaseTextProps

/**
 * textStyle prop (e.g., "titleLarge", "bodyMedium") → CSS properties.
 *
 * Each text style has 5 associated CSS variables:
 *   --sem-eclipse-textStyle-{name}Size
 *   --sem-eclipse-textStyle-{name}Weight
 *   --sem-eclipse-textStyle-{name}LineHeight
 *   --sem-eclipse-textStyle-{name}Tracking
 *   --sem-eclipse-textStyle-{name}Face
 *
 * We convert these to valid CSS var() references so the browser renders them.
 */
function textStyleToTheme(textStyle: string): NonNullable<BaseTextProps['theme']> {
  const base = `--sem-eclipse-textStyle-${textStyle}`
  return {
    fontSize: `var(${base}Size)`,
    fontWeight: `var(${base}Weight)`,
    lineHeight: `var(${base}LineHeight)`,
    letterSpacing: `var(${base}Tracking)`,
    color: undefined,
  }
}

export const ForcedTextStyle: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const { children, ...rest } = props
  return <ForcedBaseTextStyle {...rest}>{children}</ForcedBaseTextStyle>
}

export const Text = polymorphic<'span', keyof JSX.IntrinsicElements, TextProps>((props) => {
  const externalContext = useContext(BaseTextContext)
  const { textStyle } = props

  const resolvedTextStyle = textStyle ?? externalContext.textStyle
  const textStyleTheme = resolvedTextStyle ? textStyleToTheme(resolvedTextStyle) : {}

  return (
    <ForcedBaseTextStyle
      {...externalContext}
      textStyle={resolvedTextStyle}
      theme={{ ...textStyleTheme, ...externalContext.theme }}
    >
      <BaseText {...props} />
    </ForcedBaseTextStyle>
  )
})
